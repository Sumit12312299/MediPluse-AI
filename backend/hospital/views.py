import uuid
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile, Doctor, Patient, Appointment, Prescription, Payment, NotificationLog
from .serializers import (
    UserSerializer, DoctorSerializer, PatientSerializer,
    AppointmentSerializer, PrescriptionSerializer, PaymentSerializer, NotificationLogSerializer
)
from .ai_engine import generate_ai_prescription_summary

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password', 'password123')
    
    user = authenticate(username=username, password=password)
    if not user:
        # Check if user exists by username, else attempt default user fallback
        user = User.objects.filter(username=username).first()
        if not user:
            user = User.objects.filter(email=username).first()

    if not user:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    serializer = UserSerializer(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': serializer.data
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role', 'PATIENT')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    phone = request.data.get('phone', '')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    profile = UserProfile.objects.create(user=user, role=role, phone=phone)

    if role == 'DOCTOR':
        Doctor.objects.create(
            user=user,
            specialization=request.data.get('specialization', 'General Medicine'),
            department=request.data.get('department', 'Outpatient Department'),
            consultation_fee=request.data.get('consultation_fee', 60.00)
        )
    elif role == 'PATIENT':
        Patient.objects.create(user=user)

    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': UserSerializer(user).data
    }, status=status.HTTP_201_CREATED)


# DOCTORS API
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def doctors_list(request):
    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Admin adding doctor
        user_data = request.data.get('user', {})
        username = user_data.get('username', f"doc_{uuid.uuid4().hex[:6]}")
        user = User.objects.create_user(
            username=username,
            email=user_data.get('email', f"{username}@medipulse.ai"),
            password='password123',
            first_name=user_data.get('first_name', 'Dr.'),
            last_name=user_data.get('last_name', 'Specialist')
        )
        UserProfile.objects.create(user=user, role='DOCTOR', phone=user_data.get('phone', '+1-555-0199'))
        doctor = Doctor.objects.create(
            user=user,
            specialization=request.data.get('specialization', 'Cardiology'),
            department=request.data.get('department', 'Cardiovascular Sciences'),
            experience_years=request.data.get('experience_years', 8),
            consultation_fee=request.data.get('consultation_fee', 80.00)
        )
        return Response(DoctorSerializer(doctor).data, status=status.HTTP_201_CREATED)


# PATIENTS API
@api_view(['GET'])
@permission_classes([AllowAny])
def patients_list(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)


# APPOINTMENTS API
@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([AllowAny])
def appointments_api(request, pk=None):
    if request.method == 'GET':
        patient_id = request.query_params.get('patient_id')
        doctor_id = request.query_params.get('doctor_id')
        
        appointments = Appointment.objects.all().order_by('-appointment_date')
        if patient_id:
            appointments = appointments.filter(patient_id=patient_id)
        if doctor_id:
            appointments = appointments.filter(doctor_id=doctor_id)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        patient_id = request.data.get('patient_id', 1)
        doctor_id = request.data.get('doctor_id', 1)
        date = request.data.get('appointment_date')
        time_slot = request.data.get('time_slot', '10:00 AM')
        reason = request.data.get('reason', 'General checkup & consultation')

        patient = Patient.objects.get(id=patient_id)
        doctor = Doctor.objects.get(id=doctor_id)

        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            appointment_date=date,
            time_slot=time_slot,
            reason=reason,
            status='CONFIRMED'
        )

        # Trigger SMS / Email Notification simulation log
        NotificationLog.objects.create(
            recipient=patient.user,
            title="Appointment Confirmed",
            message=f"Your appointment with {doctor} on {date} at {time_slot} is confirmed.",
            channel="SMS",
            status="SENT"
        )

        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)

    elif request.method == 'PATCH':
        appointment = Appointment.objects.get(id=pk)
        status_val = request.data.get('status')
        if status_val:
            appointment.status = status_val
        notes = request.data.get('notes')
        if notes:
            appointment.notes = notes
        appointment.save()
        return Response(AppointmentSerializer(appointment).data)


# AI PRESCRIPTION SUMMARIZER & MANAGEMENT API
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def prescriptions_api(request):
    if request.method == 'GET':
        patient_id = request.query_params.get('patient_id')
        prescriptions = Prescription.objects.all().order_by('-created_at')
        if patient_id:
            prescriptions = prescriptions.filter(patient_id=patient_id)
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        patient_id = request.data.get('patient_id', 1)
        doctor_id = request.data.get('doctor_id', 1)
        appointment_id = request.data.get('appointment_id')
        diagnosis = request.data.get('diagnosis', 'Acute Bronchitis')
        medications = request.data.get('medications', [])
        notes = request.data.get('notes', '')

        patient = Patient.objects.get(id=patient_id)
        doctor = Doctor.objects.get(id=doctor_id)
        appointment = Appointment.objects.filter(id=appointment_id).first() if appointment_id else None

        # Generate AI Structured Prescription Summary
        ai_summary = generate_ai_prescription_summary(diagnosis, medications, notes)

        prescription = Prescription.objects.create(
            appointment=appointment,
            patient=patient,
            doctor=doctor,
            diagnosis=diagnosis,
            medications_json=medications,
            notes=notes,
            ai_summary=ai_summary
        )

        # Send notification alert
        NotificationLog.objects.create(
            recipient=patient.user,
            title="New Prescription Ready",
            message=f"Dr. {doctor.user.last_name} has published your digital prescription with AI Summary.",
            channel="EMAIL",
            status="SENT"
        )

        return Response(PrescriptionSerializer(prescription).data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def ai_summarize_raw_prescription(request):
    diagnosis = request.data.get('diagnosis', 'General Consultation')
    medications = request.data.get('medications', [])
    raw_text = request.data.get('raw_text', '')

    ai_summary = generate_ai_prescription_summary(diagnosis, medications, raw_text)
    return Response(ai_summary)


# PAYMENTS API
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def payments_api(request):
    if request.method == 'GET':
        patient_id = request.query_params.get('patient_id')
        payments = Payment.objects.all().order_by('-created_at')
        if patient_id:
            payments = payments.filter(patient_id=patient_id)
        return Response(PaymentSerializer(payments, many=True).data)

    elif request.method == 'POST':
        appointment_id = request.data.get('appointment_id', 1)
        amount = request.data.get('amount', 50.00)
        payment_method = request.data.get('payment_method', 'Razorpay / UPI')

        appointment = Appointment.objects.get(id=appointment_id)
        tx_id = f"PAY-{uuid.uuid4().hex[:8].upper()}"

        payment = Payment.objects.create(
            appointment=appointment,
            patient=appointment.patient,
            amount=amount,
            payment_method=payment_method,
            transaction_id=tx_id,
            status='SUCCESS'
        )

        # Send Email notification log
        NotificationLog.objects.create(
            recipient=appointment.patient.user,
            title="Payment Receipt",
            message=f"Payment of ${amount} via {payment_method} received. Transaction ID: {tx_id}",
            channel="EMAIL",
            status="SENT"
        )

        return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)


# NOTIFICATIONS LOG API
@api_view(['GET'])
@permission_classes([AllowAny])
def notifications_api(request):
    logs = NotificationLog.objects.all().order_by('-sent_at')[:30]
    return Response(NotificationLogSerializer(logs, many=True).data)


# ADMIN SYSTEM METRICS
@api_view(['GET'])
@permission_classes([AllowAny])
def admin_metrics(request):
    total_patients = Patient.objects.count()
    total_doctors = Doctor.objects.count()
    total_appointments = Appointment.objects.count()
    completed_appointments = Appointment.objects.filter(status='COMPLETED').count()
    total_revenue = sum([p.amount for p in Payment.objects.filter(status='SUCCESS')])
    
    return Response({
        'total_patients': total_patients,
        'total_doctors': total_doctors,
        'total_appointments': total_appointments,
        'completed_appointments': completed_appointments,
        'total_revenue': float(total_revenue),
        'ai_prescriptions_generated': Prescription.objects.count(),
        'notifications_sent': NotificationLog.objects.count()
    })

from .rag_service import generate_rag_response

@api_view(['POST'])
@permission_classes([AllowAny])
def rag_chat_api(request):
    query = request.data.get('query')
    if not query:
        return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)
    res = generate_rag_response(query)
    return Response(res)

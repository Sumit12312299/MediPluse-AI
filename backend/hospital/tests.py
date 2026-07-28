from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile, Doctor, Patient


class ModelTestCase(TestCase):
    """Unit tests for hospital app data models."""

    def setUp(self):
        self.patient_user = User.objects.create_user(
            username='testpatient',
            email='patient@medipulse.ai',
            password='Password123!',
            first_name='Rahul',
            last_name='Sharma'
        )
        self.doctor_user = User.objects.create_user(
            username='testdoctor',
            email='doctor@medipulse.ai',
            password='Password123!',
            first_name='Ananya',
            last_name='Roy'
        )

    def test_user_profile_creation(self):
        profile = UserProfile.objects.create(
            user=self.patient_user,
            role='PATIENT',
            phone='+919876543210'
        )
        self.assertEqual(str(profile), 'testpatient (PATIENT)')
        self.assertEqual(profile.role, 'PATIENT')

    def test_doctor_profile_creation(self):
        doctor = Doctor.objects.create(
            user=self.doctor_user,
            specialization='Cardiology',
            department='Cardiovascular Sciences',
            qualification='MBBS, MD, DM',
            consultation_fee=750.00
        )
        self.assertIn('Ananya Roy', str(doctor))
        self.assertEqual(doctor.specialization, 'Cardiology')

    def test_patient_profile_creation(self):
        patient = Patient.objects.create(
            user=self.patient_user,
            gender='MALE',
            blood_group='O+',
            allergies='Penicillin'
        )
        self.assertEqual(str(patient), 'Rahul Sharma')
        self.assertEqual(patient.blood_group, 'O+')

    def test_doctor_default_rating(self):
        doctor = Doctor.objects.create(
            user=self.doctor_user,
            specialization='Neurology',
            department='Neurosciences',
            qualification='MBBS, MCh',
            consultation_fee=1000.00
        )
        self.assertEqual(float(doctor.rating), 5.0)


    def test_doctor_serializer_fee_validation(self):
        from .serializers import DoctorSerializer
        serializer = DoctorSerializer(data={'consultation_fee': -10.00})
        self.assertFalse(serializer.is_valid())
        self.assertIn('consultation_fee', serializer.errors)

    def test_appointment_serializer_status_validation(self):
        from .serializers import AppointmentSerializer
        serializer = AppointmentSerializer(data={'status': 'INVALID_STATUS'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('status', serializer.errors)

    def test_patient_serializer_blood_group_validation(self):
        from .serializers import PatientSerializer
        serializer = PatientSerializer(data={'blood_group': 'Z+'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('blood_group', serializer.errors)

    def test_appointment_model_string_representation(self):
        from .models import Appointment
        doctor = Doctor.objects.create(
            user=self.doctor_user,
            specialization='General Medicine',
            department='General OPD',
            qualification='MBBS',
            consultation_fee=500.00
        )
        patient = Patient.objects.create(
            user=self.patient_user,
            gender='MALE',
            blood_group='A+'
        )
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            appointment_date='2026-08-15',
            time_slot='11:00 AM',
            reason='General checkup'
        )
        self.assertIn('Rahul Sharma', str(appointment))
        self.assertIn('2026-08-15', str(appointment))

    def test_prescription_model_string_representation(self):
        from .models import Appointment, Prescription
        doctor = Doctor.objects.create(
            user=self.doctor_user,
            specialization='Dermatology',
            department='Skin Care',
            qualification='MBBS, MD',
            consultation_fee=700.00
        )
        patient = Patient.objects.create(
            user=self.patient_user,
            gender='FEMALE',
            blood_group='B+'
        )
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            appointment_date='2026-08-20',
            time_slot='03:00 PM',
            reason='Dermatitis consultation'
        )
        prescription = Prescription.objects.create(
            appointment=appointment,
            patient=patient,
            doctor=doctor,
            diagnosis='Acute Dermatitis',
            medications_json=[{'name': 'Hydrocortisone', 'dosage': '1%'}]
        )
        self.assertIn('Rx for', str(prescription))
        self.assertIn('Acute Dermatitis', str(prescription))

    def test_payment_model_string_representation(self):
        from .models import Appointment, Payment
        doctor = Doctor.objects.create(
            user=self.doctor_user,
            specialization='Orthopedics',
            department='Bone & Joint',
            qualification='MBBS, MS',
            consultation_fee=900.00
        )
        patient = Patient.objects.create(
            user=self.patient_user,
            gender='MALE',
            blood_group='O-'
        )
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            appointment_date='2026-08-25',
            time_slot='04:30 PM',
            reason='Knee joint evaluation'
        )
        payment = Payment.objects.create(
            appointment=appointment,
            patient=patient,
            amount=900.00,
            payment_method='UPI',
            transaction_id='TXN_IND_998877',
            status='SUCCESS'
        )
        self.assertIn('TXN_IND_998877', str(payment))
        self.assertIn('SUCCESS', str(payment))









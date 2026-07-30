from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Doctor, Patient, Appointment, Prescription, Payment, NotificationLog

class UserSerializer(serializers.ModelSerializer):
    """DRF Serializer for auth User objects with profile role, phone, and avatar fields."""
    role = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'avatar']

    def get_role(self, obj):
        return getattr(getattr(obj, 'profile', None), 'role', 'PATIENT')

    def get_phone(self, obj):
        return getattr(getattr(obj, 'profile', None), 'phone', '')

    def get_avatar(self, obj):
        return getattr(getattr(obj, 'profile', None), 'avatar', '')


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile settings and contact details."""
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def validate_phone(self, value):
        if value:
            import re
            if not re.match(r'^\+?[0-9\s\-]+$', value):
                raise serializers.ValidationError("Phone number must contain only digits, spaces, dashes, or a leading plus sign.")
            digits = re.sub(r'\D', '', value)
            if len(digits) < 10 or len(digits) > 15:
                raise serializers.ValidationError("Phone number must contain between 10 and 15 digits.")
        return value


class DoctorSerializer(serializers.ModelSerializer):
    """Serializer for medical specialist profiles, ratings, and consultation fees."""
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = '__all__'

    def get_name(self, obj):
        full = obj.user.get_full_name()
        return f"Dr. {full}" if full else f"Dr. {obj.user.username}"

    def get_email(self, obj):
        return obj.user.email

    def get_phone(self, obj):
        return getattr(getattr(obj.user, 'profile', None), 'phone', '')

    def validate_consultation_fee(self, value):
        if value < 0:
            raise serializers.ValidationError("Consultation fee must be a positive value.")
        return value

    def validate_rating(self, value):
        if value < 0.0 or value > 5.0:
            raise serializers.ValidationError("Doctor rating must be between 0.0 and 5.0.")
        return value




class PatientSerializer(serializers.ModelSerializer):
    """Serializer for patient records including blood group and medical history."""
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_name(self, obj):
        full = obj.user.get_full_name()
        return full if full else obj.user.username

    def validate_blood_group(self, value):
        valid_groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        if value and value.upper() not in valid_groups:
            raise serializers.ValidationError(f"Invalid blood group. Allowed: {', '.join(valid_groups)}")
        return value.upper() if value else 'O+'


    def get_email(self, obj):
        return obj.user.email

    def get_phone(self, obj):
        return getattr(getattr(obj.user, 'profile', None), 'phone', '')


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for OPD consultation bookings with doctor and patient display names."""
    doctor_name = serializers.SerializerMethodField()
    doctor_specialization = serializers.SerializerMethodField()
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'

    def get_doctor_name(self, obj):
        full = obj.doctor.user.get_full_name()
        return f"Dr. {full}" if full else f"Dr. {obj.doctor.user.username}"

    def get_doctor_specialization(self, obj):
        return obj.doctor.specialization

    def get_patient_name(self, obj):
        full = obj.patient.user.get_full_name()
        return full if full else obj.patient.user.username

    def validate_status(self, value):
        valid_statuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Invalid status '{value}'. Allowed: {valid_statuses}")
        return value



class PrescriptionSerializer(serializers.ModelSerializer):
    """Serializer for digital prescriptions containing medication lists and AI summaries."""
    doctor_name = serializers.SerializerMethodField()
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Prescription
        fields = '__all__'

    def get_doctor_name(self, obj):
        return f"Dr. {obj.doctor.user.get_full_name() or obj.doctor.user.username}"

    def get_patient_name(self, obj):
        return obj.patient.user.get_full_name() or obj.patient.user.username


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Razorpay / UPI consultation payments."""
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = '__all__'

    def get_patient_name(self, obj):
        return obj.patient.user.get_full_name() or obj.patient.user.username

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be greater than zero.")
        return value


class NotificationLogSerializer(serializers.ModelSerializer):
    """Serializer for SMS, Email, and System audit notification logs."""
    recipient_username = serializers.SerializerMethodField()
    recipient_name = serializers.SerializerMethodField()

    class Meta:
        model = NotificationLog
        fields = ['id', 'recipient', 'title', 'message', 'channel', 'status', 'sent_at', 'recipient_username', 'recipient_name']

    def get_recipient_username(self, obj):
        return obj.recipient.username

    def get_recipient_name(self, obj):
        return obj.recipient.get_full_name() or obj.recipient.username

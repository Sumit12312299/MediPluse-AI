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
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
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


class PatientSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_name(self, obj):
        full = obj.user.get_full_name()
        return full if full else obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_phone(self, obj):
        return getattr(getattr(obj.user, 'profile', None), 'phone', '')


class AppointmentSerializer(serializers.ModelSerializer):
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


class PrescriptionSerializer(serializers.ModelSerializer):
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
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = '__all__'

    def get_patient_name(self, obj):
        return obj.patient.user.get_full_name() or obj.patient.user.username


class NotificationLogSerializer(serializers.ModelSerializer):
    recipient_name = serializers.SerializerMethodField()

    class Meta:
        model = NotificationLog
        fields = '__all__'

    def get_recipient_name(self, obj):
        return obj.recipient.get_full_name() or obj.recipient.username

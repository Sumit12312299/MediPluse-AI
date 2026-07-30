from django.contrib import admin
from .models import UserProfile, Doctor, Patient, Appointment, Prescription, Payment


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'phone', 'created_at')
    list_filter = ('role',)
    search_fields = ('user__username', 'user__email', 'phone')


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'department', 'consultation_fee', 'rating')
    list_filter = ('specialization', 'department')
    search_fields = ('user__first_name', 'user__last_name', 'specialization')


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'blood_group', 'emergency_contact')
    list_filter = ('gender', 'blood_group')
    search_fields = ('user__first_name', 'user__last_name', 'emergency_contact')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'doctor', 'appointment_date', 'time_slot', 'status')
    list_filter = ('status', 'appointment_date')
    search_fields = ('patient__user__first_name', 'doctor__user__first_name')


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'doctor', 'diagnosis', 'created_at')
    search_fields = ('diagnosis', 'patient__user__first_name', 'doctor__user__first_name')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'appointment', 'amount', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'payment_method')
    search_fields = ('transaction_id',)


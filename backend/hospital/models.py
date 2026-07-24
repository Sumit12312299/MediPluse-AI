from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """Extended user profile storing role designation, contact phone, and avatar URL."""
    ROLE_CHOICES = (
        ('PATIENT', 'Patient'),
        ('DOCTOR', 'Doctor'),
        ('ADMIN', 'Admin'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='PATIENT')
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} ({self.role})"


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100, default='MBBS, MD')
    experience_years = models.IntegerField(default=5)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=50.00)
    availability_hours = models.CharField(max_length=100, default='09:00 AM - 05:00 PM')
    bio = models.TextField(blank=True, null=True)
    rating = models.FloatField(default=4.8)

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return f"Dr. {self.user.get_full_name() or self.user.username} - {self.specialization}"


class Patient(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='MALE')
    blood_group = models.CharField(max_length=5, default='O+')
    emergency_contact = models.CharField(max_length=20, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True, default='None reported')
    medical_history = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending Approval'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateField()
    time_slot = models.CharField(max_length=20)
    reason = models.TextField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='CONFIRMED')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment #{self.id} - {self.patient} with {self.doctor} on {self.appointment_date}"


class Prescription(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='prescription', null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='prescriptions')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='prescriptions')
    diagnosis = models.CharField(max_length=255)
    medications_json = models.JSONField(default=list)  # list of {name, dosage, frequency, duration}
    notes = models.TextField(blank=True, null=True)
    ai_summary = models.JSONField(blank=True, null=True)  # AI structured summary
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rx for {self.patient} by {self.doctor} ({self.diagnosis})"


class Payment(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    )
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='payments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='UPI / Card')
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='SUCCESS')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.amount} ({self.status})"


class NotificationLog(models.Model):
    CHANNEL_CHOICES = (
        ('EMAIL', 'Email'),
        ('SMS', 'SMS'),
        ('SYSTEM', 'System Alert'),
    )
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='SMS')
    status = models.CharField(max_length=20, default='SENT')
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.channel}] to {self.recipient.username}: {self.title}"

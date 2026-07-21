from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from hospital.models import Doctor, Patient, Appointment, Prescription, Payment, NotificationLog, UserRole

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds database with Indian doctors, patients, and rupee currency'

    def handle(self, *args, **options):
        self.stdout.write('Seeding Indian healthcare data...')

        # 1. Admin User
        admin_user, _ = User.objects.get_or_create(
            username='admin@medipulse.ai',
            defaults={
                'email': 'admin@medipulse.ai',
                'first_name': 'Super',
                'last_name': 'Admin',
                'role': UserRole.ADMIN,
                'is_staff': True,
                'is_superuser': True,
            }
        )
        admin_user.set_password('admin123')
        admin_user.save()

        # 2. Patient User
        patient_user, _ = User.objects.get_or_create(
            username='patient@medipulse.ai',
            defaults={
                'email': 'patient@medipulse.ai',
                'first_name': 'Rahul',
                'last_name': 'Verma',
                'role': UserRole.PATIENT,
            }
        )
        patient_user.set_password('patient123')
        patient_user.save()

        patient_profile, _ = Patient.objects.get_or_create(
            user=patient_user,
            defaults={
                'date_of_birth': '1995-05-14',
                'phone': '+91 98765 43210',
                'blood_group': 'O+',
                'address': 'Connaught Place, New Delhi',
            }
        )

        # 3. Doctor Users & Profiles
        doctor_data = [
            {
                'username': 'doctor@medipulse.ai',
                'name': 'Dr. Rajesh Sharma',
                'specialization': 'Cardiology & Heart Care',
                'dept': 'Cardiovascular Sciences',
                'fee': 800.00,
                'experience': 14,
                'rating': 4.9,
            },
            {
                'username': 'dr.ananya@medipulse.ai',
                'name': 'Dr. Ananya Gupta',
                'specialization': 'Neurology & Brain Care',
                'dept': 'Neurosciences',
                'fee': 1200.00,
                'experience': 11,
                'rating': 4.8,
            },
            {
                'username': 'dr.vikram@medipulse.ai',
                'name': 'Dr. Vikram Malhotra',
                'specialization': 'Orthopedics & Joint Care',
                'dept': 'Orthopedic Surgery',
                'fee': 950.00,
                'experience': 16,
                'rating': 4.9,
            },
            {
                'username': 'dr.priya@medipulse.ai',
                'name': 'Dr. Priya Verma',
                'specialization': 'Dermatology & Skin Science',
                'dept': 'Dermatology OPD',
                'fee': 750.00,
                'experience': 9,
                'rating': 4.7,
            },
        ]

        doctors = []
        for idx, doc in enumerate(doctor_data):
            u, _ = User.objects.get_or_create(
                username=doc['username'],
                defaults={
                    'email': doc['username'],
                    'first_name': doc['name'].split()[1],
                    'last_name': doc['name'].split()[2] if len(doc['name'].split()) > 2 else '',
                    'role': UserRole.DOCTOR,
                }
            )
            u.set_password('doctor123')
            u.save()

            dp, _ = Doctor.objects.get_or_create(
                user=u,
                defaults={
                    'specialization': doc['specialization'],
                    'department': doc['dept'],
                    'consultation_fee': doc['fee'],
                    'years_of_experience': doc['experience'],
                    'rating': doc['rating'],
                    'available_days': 'Mon, Tue, Wed, Thu, Fri',
                }
            )
            doctors.append(dp)

        # 4. Sample Appointments
        appt1, _ = Appointment.objects.get_or_create(
            id=1,
            defaults={
                'patient': patient_profile,
                'doctor': doctors[0],
                'appointment_date': '2026-07-22',
                'time_slot': '10:30 AM',
                'status': 'CONFIRMED',
                'reason': 'Annual cardiovascular checkup & blood pressure review.',
            }
        )

        appt2, _ = Appointment.objects.get_or_create(
            id=2,
            defaults={
                'patient': patient_profile,
                'doctor': doctors[1],
                'appointment_date': '2026-07-18',
                'time_slot': '02:15 PM',
                'status': 'COMPLETED',
                'reason': 'Recurring tension headaches & cervical strain consultation.',
            }
        )

        # 5. Sample Prescription
        Prescription.objects.get_or_create(
            id=1,
            defaults={
                'appointment': appt2,
                'patient': patient_profile,
                'doctor': doctors[1],
                'diagnosis': 'Cervical Strain & Tension Headaches',
                'medications': [
                    {'name': 'Naproxen', 'dosage': '500mg', 'frequency': 'Twice daily after meals', 'duration': '5 Days'},
                    {'name': 'Pantoprazole', 'dosage': '40mg', 'frequency': 'Once daily before breakfast', 'duration': '5 Days'}
                ],
                'notes': 'Take adequate rest and perform daily neck stretches.',
                'ai_summary': {
                    'summary': 'Diagnosed with cervical muscle strain. Prescribed Naproxen for pain relief along with Pantoprazole for acidity prevention.',
                    'urgency': 'LOW',
                    'audio_text': 'Your diagnosis is Cervical Strain. Take Naproxen twice daily after meals for 5 days.'
                }
            }
        )

        # 6. Sample Payment
        Payment.objects.get_or_create(
            id=1,
            defaults={
                'appointment': appt2,
                'patient': patient_profile,
                'amount': 1200.00,
                'payment_method': 'UPI (GPay / PhonePe)',
                'transaction_id': 'TXN_IND_894021',
                'status': 'COMPLETED',
            }
        )

        # 7. Notification Logs
        NotificationLog.objects.get_or_create(
            id=1,
            defaults={
                'user': patient_user,
                'title': 'Appointment Confirmed',
                'message': 'Your appointment with Dr. Rajesh Sharma for 2026-07-22 at 10:30 AM has been confirmed.',
                'channel': 'SMS',
            }
        )

        NotificationLog.objects.get_or_create(
            id=2,
            defaults={
                'user': patient_user,
                'title': 'Prescription Generated',
                'message': 'Dr. Ananya Gupta has generated your digital prescription with AI summary.',
                'channel': 'EMAIL',
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded Indian doctor names, rupees currency, and patients!'))

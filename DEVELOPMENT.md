# MediPulse AI Development Guide

Welcome to the development guide for MediPulse AI.

## System Architecture

The platform consists of a Django REST Framework backend and a Vite+React frontend.

### Frontend Stack
- React 18 with Vite
- Tailwind CSS v4
- Lucide Icons
- Canvas Confetti

### Backend Stack
- Django 5.x
- Django REST Framework
- SQLite3 for local dev

### Backend Requirements
- Python 3.12+
- pip dependencies in backend/requirements.txt

### Security & Auth
- CORS headers enabled for frontend access
- JWT-based auth via SimpleJWT

### Payments Integration
- UPI / Razorpay payment simulator in PaymentModal
- Handles success and confetti animations

### Tele-Consultation
- Simulated WebRTC connection inside TeleconsultationModal
- AI Clinical Scribe transcript generation

### ECG Visualization
- HTML5 Canvas-based live ECG wave renderer
- Updates dynamically to simulate active heartbeat (e.g. 72 BPM)

### AI Prescription Synthesizer
- Translates clinical terms to layperson-friendly layout
- Integrated SpeechSynthesis for text-to-speech reading

### Authentication Flow
- Tokens stored securely in localStorage/cookies
- Handled via AuthModal and state context

### Role-Based Access Control
- Navbar features a switcher to toggle Doctor, Patient, and Admin interfaces

### Admin Analytics Dashboard
- KPIs for total patients, active doctors, and AI prescriptions issued

### Doctor Onboarding
- Input validations for specialty, fees, department, and contact information

### Database Migrations
- Use `./manage.py makemigrations` and `migrate` inside backend directory

### Modal State Management
- Managed centrally at App.jsx level to prevent overlay conflicts

### Notifications Center
- Audit trail of critical system logs, emails, and SMS dispatches


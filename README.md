# 🏥 MediPulse AI — Smart Clinical & Tele-Health Cloud Platform

![MediPulse AI Banner](https://img.shields.io/badge/MediPulse-AI_Healthcare_Cloud-0284c7?style=for-the-badge&logo=heartpulse&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React_18_%7C_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Django](https://img.shields.io/badge/Backend-Django_5_%7C_DRF-092E20?style=for-the-badge&logo=django&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Python](https://img.shields.io/badge/Language-Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)

**MediPulse AI** is an enterprise-grade, AI-driven healthcare cloud platform designed to streamline doctor-patient interactions, automate medical prescription summarization with voice synthesis, facilitate WebRTC tele-consultations, and manage Indian UPI/Razorpay payment settlements.

---

## 📂 Project Directory Structure

```dir
medipulse-ai/
├── 📁 backend/                        # Django REST Framework Backend
│   ├── 📁 api_core/                   # Project Core Settings & URLs
│   │   ├── settings.py                # CORS, JWT, Installed Apps & Middleware
│   │   ├── urls.py                    # Root API Router
│   │   └── wsgi.py
│   ├── 📁 hospital/                   # Core Clinical Application App
│   │   ├── 📁 management/commands/    # Seed Database Scripts (seed_db.py)
│   │   ├── 📁 migrations/             # Database Schemas & Migrations
│   │   ├── models.py                  # User, Doctor, Patient, Appointment, Prescription, Payment Models
│   │   ├── serializers.py             # DRF Model Serializers & Validation
│   │   ├── views.py                   # API ViewSets & Action Handlers
│   │   └── urls.py                    # Hospital App Endpoint Routes
│   ├── manage.py                      # Django CLI Tool
│   └── requirements.txt               # Backend Python Dependencies
│
├── 📁 frontend/                       # Vite + React Frontend Application
│   ├── 📁 public/                     # Static Assets & Medical Background Wallpaper
│   │   └── medical_bg.png
│   ├── 📁 src/                        # React Source Code
│   │   ├── 📁 assets/                 # High-Res Imagery & Icons
│   │   ├── 📁 components/             # Modular React UI Components
│   │   │   ├── Navbar.jsx             # Top Bar with Dark/Light Theme & Role Switcher
│   │   │   ├── PatientDashboard.jsx   # Patient Vitals, Live ECG Canvas & Appointments
│   │   │   ├── DoctorDashboard.jsx    # Doctor OPD Queue & AI Prescription Synthesizer
│   │   │   ├── AdminDashboard.jsx     # Analytics KPIs, Doctor Onboarding & Audit Logs
│   │   │   ├── PaymentModal.jsx       # UPI/Razorpay Payment Gateway & Confetti Animation
│   │   │   ├── AIPrescriptionModal.jsx# AI Layman Speech Reader & Drug Breakdown
│   │   │   ├── TeleconsultationModal.jsx # WebRTC Video Suite & AI Scribe Transcript
│   │   │   ├── BookAppointmentModal.jsx # OPD Specialist Booking Dialog
│   │   │   ├── NotificationCenter.jsx # Slide-over Log Drawer
│   │   │   └── AuthModal.jsx          # JWT Authentication Dialog
│   │   ├── api.js                     # REST API Client & Indian Mock Fallbacks
│   │   ├── App.jsx                    # Root Workspace Container & Modal State
│   │   ├── index.css                  # Glassmorphism Tokens & Keyframe Animations
│   │   └── main.jsx                   # React DOM Entrypoint
│   ├── package.json                   # Frontend Dependencies
│   └── vite.config.js                 # Vite Bundler & Proxy Configuration
│
├── .gitignore                         # Version Control Exclusions
└── README.md                          # Production System Documentation
```

---

## 🌟 Key Features

### 👨‍⚕️ 1. Doctor OPD Workstation
- **Patient Management & Queue**: View upcoming scheduled appointments and patient vitals.
- **AI Prescription Generator**: Input diagnosis, dosages, and notes; automatically triggers Gemini AI layman summaries.
- **Status Updates**: One-click status transitions (`CONFIRMED`, `COMPLETED`, `CANCELLED`).

### 🧑‍🦱 2. Patient Health Workspace
- **Live Vitals & ECG Waveform**: Interactive HTML5 Canvas rendering a real-time animated ECG heartbeat graph (`72 BPM`).
- **Online OPD Booking**: Reserve consultation slots with Indian specialists (Cardiology, Neurology, Orthopedics, Dermatology).
- **AI Digital Prescriptions**: Read AI-generated layman summaries or listen to voice audio playback (`SpeechSynthesis`).

### 🛡️ 3. Admin Operations Console
- **Hospital Analytics Metrics**: Track total patients, active doctors, AI prescriptions issued, and total revenue.
- **Doctor Onboarding**: Register new medical specialists with department, specialization, and consultation fees.
- **System Notification Logs**: Audit trail of all SMS and Email alerts.

### 💳 4. Indian Payment Gateway & Tele-Consultation
- **UPI & Razorpay Checkout**: Pay OPD consultation fees (`₹800`, `₹1,200`) via GPay, PhonePe, Paytm, RuPay cards, or NetBanking with smooth success animations and confetti particle effects.
- **WebRTC Tele-Health Suite**: Simulated video stream with Doctor & Patient feeds, mute controls, and live AI Clinical Scribe transcript drawer.

---

## 🛠️ Tech Stack

| Tier | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & Theme** | Tailwind CSS v4, Glassmorphic Utility Classes, Dark Mode |
| **Icons & Visuals** | Lucide React, Canvas Confetti |
| **Backend Framework** | Python 3.12, Django 5.x, Django REST Framework (DRF) |
| **Authentication** | JWT (JSON Web Tokens) via `djangorestframework-simplejwt` |
| **Database** | SQLite3 (Development) / PostgreSQL (Production) |

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Sumit12312299/MediPluse-AI.git
cd MediPluse-AI
```

### 2. Backend Setup (Django REST API)
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed database with Indian doctors, patients & Rupees currency
python manage.py seed_db

# Start Django backend server on http://localhost:8000
python manage.py runserver
```

### 3. Frontend Setup (React + Vite)
```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server on http://localhost:3000
npm run dev
```

---

## 🔐 Demo Credentials

Use the following pre-seeded credentials to test different user roles:

| Role | Username / Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@medipulse.ai` | `patient123` | Book Appointments, View AI Prescriptions, UPI Payment |
| **Doctor** | `doctor@medipulse.ai` | `doctor123` | OPD Workstation, Generate AI Prescriptions |
| **Admin** | `admin@medipulse.ai` | `admin123` | Hospital Metrics, Doctor Onboarding, Logs |

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/token/` | Obtain JWT Access & Refresh Tokens |
| `GET` / `POST` | `/api/doctors/` | List or Onboard Doctors |
| `GET` / `POST` | `/api/appointments/` | List or Book Patient Appointments |
| `PATCH` | `/api/appointments/<id>/` | Update Appointment Status |
| `GET` / `POST` | `/api/prescriptions/` | List or Create AI Prescriptions |
| `GET` / `POST` | `/api/payments/` | Process UPI / Card Payment Settlements |
| `GET` | `/api/admin-metrics/` | Fetch Hospital KPIs & Revenue |

## 🌟 Key Highlights & Audio Synthesis

- 🎙️ **Gemini Clinical Speech Synthesis**: High-clarity Web Speech synthesis with automatic audio unmount cleanup.
- 🔔 **Web Audio API Chimes**: Native dual-frequency (E5/B5 sine wave) sound synthesizer for real-time notification alerts.
- 📄 **PDF Exporters**: One-Click Digital RX & Razorpay GST Tax Invoice generator with canvas printing.
- ⚡ **60fps Fluid UI**: Glassmorphism cards, spring modal pop transitions, and hardware-accelerated animations.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.

© 2026 MediPulse AI Health Systems Inc. All rights reserved.

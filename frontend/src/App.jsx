import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import NotificationCenter from './components/NotificationCenter';
import AIPrescriptionModal from './components/AIPrescriptionModal';
import PaymentModal from './components/PaymentModal';
import TeleconsultationModal from './components/TeleconsultationModal';
import BookAppointmentModal from './components/BookAppointmentModal';
import AuthModal from './components/AuthModal';

import { HeartPulse, ShieldCheck, Activity, PhoneCall, Mail, ExternalLink, Database, Sparkles, Brain, Lock } from 'lucide-react';
import { api, getCurrentUser, removeAuthToken } from './api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activeRole, setActiveRole] = useState(currentUser?.role || 'PATIENT');
  
  // Data States
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [metrics, setMetrics] = useState(null);

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [selectedPaymentAppt, setSelectedPaymentAppt] = useState(null);
  const [selectedTeleconsultAppt, setSelectedTeleconsultAppt] = useState(null);

  // Fetch data from Django REST Backend
  const loadData = async () => {
    try {
      const docs = await api.getDoctors();
      if (docs) setDoctors(docs);
    } catch (e) {
      console.log('Doctors fallback');
    }

    try {
      const appts = await api.getAppointments();
      if (appts) setAppointments(appts);
    } catch (e) {
      console.log('Appointments fallback');
    }

    try {
      const rxs = await api.getPrescriptions();
      if (rxs) setPrescriptions(rxs);
    } catch (e) {
      console.log('Prescriptions fallback');
    }

    try {
      const pays = await api.getPayments();
      if (pays) setPayments(pays);
    } catch (e) {
      console.log('Payments fallback');
    }

    try {
      const logs = await api.getNotifications();
      if (logs) setNotifications(logs);
    } catch (e) {
      console.log('Notifications fallback');
    }

    try {
      const pats = await api.getPatients();
      if (pats) setPatients(pats);
    } catch (e) {
      console.log('Patients fallback');
    }

    try {
      const m = await api.getAdminMetrics();
      if (m) setMetrics(m);
    } catch (e) {
      console.log('Metrics fallback');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleSwitch = async (role) => {
    setActiveRole(role);
    const demoAccounts = {
      'PATIENT': 'patient@medipulse.ai',
      'DOCTOR': 'doctor@medipulse.ai',
      'ADMIN': 'admin@medipulse.ai',
    };
    try {
      const auth = await api.login(demoAccounts[role], role.toLowerCase() + '123');
      if (auth.user) setCurrentUser(auth.user);
    } catch (e) {
      console.log('Role switch login error fallback');
    }
  };

  const handleAuthSuccess = async (type, payload) => {
    if (type === 'login') {
      const data = await api.login(payload.username, payload.password);
      setCurrentUser(data.user);
      if (data.user?.role) setActiveRole(data.user.role);
    } else {
      const data = await api.register(payload);
      setCurrentUser(data.user);
      if (data.user?.role) setActiveRole(data.user.role);
    }
    loadData();
  };

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    setActiveRole('PATIENT');
  };

  // Appointment Actions
  const handleBookAppointment = async (payload) => {
    await api.bookAppointment(payload);
    loadData();
  };

  const handleUpdateAppointmentStatus = async (id, status, notes) => {
    await api.updateAppointmentStatus(id, status, notes);
    loadData();
  };

  // Prescription Actions
  const handleCreatePrescription = async (payload) => {
    await api.createPrescription(payload);
    loadData();
  };

  // Payment Actions
  const handleProcessPayment = async (payload) => {
    const res = await api.processPayment(payload);
    loadData();
    return res;
  };

  // Add Doctor
  const handleAddDoctor = async (payload) => {
    await api.addDoctor(payload);
    loadData();
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        activeRole={activeRole}
        onSwitchRole={handleRoleSwitch}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        notificationCount={notifications?.length || 0}
        onOpenNotifications={() => setIsNotifOpen(true)}
      />

      {/* Main Workspace Body - Edge-to-Edge Fluid Screen Layout */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-6">
        
        {/* Render Dashboard based on Active Role */}
        {activeRole === 'PATIENT' && (
          <PatientDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            payments={payments}
            doctors={doctors}
            onOpenBooking={() => setIsBookOpen(true)}
            onOpenAIModal={(rx) => setSelectedRx(rx)}
            onOpenPayment={(appt) => setSelectedPaymentAppt(appt)}
            onOpenTeleconsult={(appt) => setSelectedTeleconsultAppt(appt)}
          />
        )}

        {activeRole === 'DOCTOR' && (
          <DoctorDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            patients={patients}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onCreatePrescription={handleCreatePrescription}
            onOpenTeleconsult={(appt) => setSelectedTeleconsultAppt(appt)}
          />
        )}

        {activeRole === 'ADMIN' && (
          <AdminDashboard
            metrics={metrics}
            doctors={doctors}
            notifications={notifications}
            onAddDoctor={handleAddDoctor}
          />
        )}

      </main>

      {/* Slide-over Notification Log Drawer */}
      <NotificationCenter
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onRefresh={loadData}
      />

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        doctors={doctors}
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
        onBookSuccess={handleBookAppointment}
      />

      {/* AI Prescription Breakdown & Speech Reader Modal */}
      <AIPrescriptionModal
        prescription={selectedRx}
        isOpen={!!selectedRx}
        onClose={() => setSelectedRx(null)}
      />

      {/* Payment Gateway Modal */}
      <PaymentModal
        appointment={selectedPaymentAppt}
        isOpen={!!selectedPaymentAppt}
        onClose={() => setSelectedPaymentAppt(null)}
        onPaymentSuccess={handleProcessPayment}
      />

      {/* Teleconsultation Video Room Modal */}
      <TeleconsultationModal
        appointment={selectedTeleconsultAppt}
        isOpen={!!selectedTeleconsultAppt}
        onClose={() => setSelectedTeleconsultAppt(null)}
      />

      {/* JWT Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Modern Aesthetic Minimalist Footer - Fluid Width */}
      <footer className="border-t border-slate-200/80 bg-white w-full mt-12 text-slate-600">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <HeartPulse className="w-4 h-4 text-sky-400" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  MediPulse <span className="text-sky-600">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Enterprise AI-driven clinical platform empowering patients and healthcare specialists with smart tele-health, automated digital prescriptions, and instant notification triggers.
              </p>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>All Systems Operational</span>
              </div>
            </div>

            {/* Column 2: Clinical Portals */}
            <div className="space-y-2.5 text-xs md:pl-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Clinical Portals</h4>
              <ul className="space-y-2 font-medium text-slate-500">
                <li>
                  <button onClick={() => handleRoleSwitch('PATIENT')} className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
                    <span>Patient Health Portal</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleRoleSwitch('DOCTOR')} className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
                    <span>Doctor OPD Workstation</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleRoleSwitch('ADMIN')} className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
                    <span>Admin Operations Console</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsBookOpen(true)} className="hover:text-sky-600 transition-colors flex items-center gap-1.5 font-semibold text-sky-700">
                    <span>Online Appointment Booking</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Helpline */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">24/7 Clinical Support</h4>
              <div className="space-y-2 font-medium text-slate-500">
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                  <span className="font-semibold text-slate-900">1-800-MEDIPULSE</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>support@medipulse.ai</span>
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  For emergency medical situations, please call 911 or visit your nearest emergency room immediately.
                </p>
              </div>
            </div>

          </div>

          {/* Sub-footer bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-3">
            <p>© 2026 MediPulse AI Health Systems Inc. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-600 cursor-pointer">HIPAA Compliance</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

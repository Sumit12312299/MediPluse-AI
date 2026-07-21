import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import BookAppointmentModal from './components/BookAppointmentModal';
import PaymentModal from './components/PaymentModal';
import AIPrescriptionModal from './components/AIPrescriptionModal';
import TeleconsultationModal from './components/TeleconsultationModal';
import NotificationCenter from './components/NotificationCenter';
import AuthModal from './components/AuthModal';
import { api, getCurrentUser, removeAuthToken } from './api';
import { ShieldAlert, HeartPulse, Sparkles, Activity } from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState('PATIENT');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [adminMetrics, setAdminMetrics] = useState({});

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [paymentAppointment, setPaymentAppointment] = useState(null);
  const [aiRxModalData, setAiRxModalData] = useState(null);
  const [teleconsultAppt, setTeleconsultAppt] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appts, rxs, pays, docs, pats, notifs, metrics] = await Promise.all([
        api.getAppointments(),
        api.getPrescriptions(),
        api.getPayments(),
        api.getDoctors(),
        api.getPatients(),
        api.getNotifications(),
        api.getAdminMetrics()
      ]);

      setAppointments(appts || []);
      setPrescriptions(rxs || []);
      setPayments(pays || []);
      setDoctors(docs || []);
      setPatients(pats || []);
      setNotifications(notifs || []);
      setAdminMetrics(metrics || {});
    } catch (err) {
      console.log('Error loading backend data:', err);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
  };

  const handleBookSuccess = async (payload) => {
    const newAppt = await api.bookAppointment(payload);
    setAppointments(prev => [newAppt, ...prev]);
  };

  const handlePaymentSuccess = async (payload) => {
    const newPayment = await api.processPayment(payload);
    setPayments(prev => [newPayment, ...prev]);
    return newPayment;
  };

  const handleCreatePrescription = async (payload) => {
    const newRx = await api.createPrescription(payload);
    setPrescriptions(prev => [newRx, ...prev]);
  };

  const handleUpdateStatus = async (id, status, notes) => {
    const updated = await api.updateAppointmentStatus(id, status, notes);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleAddDoctor = async (payload) => {
    const newDoc = await api.addDoctor(payload);
    setDoctors(prev => [...prev, newDoc]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Sticky Header Navbar */}
      <Navbar
        currentUser={currentUser}
        activeRole={activeRole}
        onSwitchRole={setActiveRole}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        notificationCount={notifications.length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Floating Clinical Alert Ticker Bar */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-teal-900 text-white py-2 px-4 text-xs font-semibold flex items-center justify-between border-b border-sky-800/40 shadow-2xs">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-sky-200 font-bold uppercase tracking-wider text-[11px]">Emergency OPD Active</span>
            <span className="hidden sm:inline text-slate-300">• Avg Wait Time: 4 Mins • 4 Cardiology Specialists Available</span>
          </div>

          <div className="flex items-center space-x-3 text-sky-300 text-[11px] font-bold">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-sky-400" /> Gemini AI Scribe v2.4</span>
            <span className="hidden md:inline">• 256-Bit SSL Secured</span>
          </div>
        </div>
      </div>

      {/* Main Full-Screen Fluid Container */}
      <main className="flex-1 w-full max-w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        
        {activeRole === 'PATIENT' && (
          <PatientDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            payments={payments}
            doctors={doctors}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenAIModal={(rx) => setAiRxModalData(rx)}
            onOpenPayment={(appt) => setPaymentAppointment(appt)}
            onOpenTeleconsult={(appt) => setTeleconsultAppt(appt)}
          />
        )}

        {activeRole === 'DOCTOR' && (
          <DoctorDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            patients={patients}
            onUpdateAppointmentStatus={handleUpdateStatus}
            onCreatePrescription={handleCreatePrescription}
            onOpenTeleconsult={(appt) => setTeleconsultAppt(appt)}
          />
        )}

        {activeRole === 'ADMIN' && (
          <AdminDashboard
            metrics={adminMetrics}
            doctors={doctors}
            notifications={notifications}
            onAddDoctor={handleAddDoctor}
          />
        )}

      </main>

      {/* Standard Medical Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-sky-600 text-white flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-sky-400 dark:text-white" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white">MediPulse AI Health Systems</p>
              <p className="text-[11px] font-medium text-slate-400">HIPAA & ISO 27001 Certified Clinical Architecture</p>
            </div>
          </div>

          <p className="text-[11px] font-medium text-center md:text-right">
            © 2026 MediPulse AI Health Inc. All rights reserved. • Powered by React 18, Vite & Django REST Framework
          </p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <BookAppointmentModal
        doctors={doctors}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookSuccess={handleBookSuccess}
      />

      <PaymentModal
        appointment={paymentAppointment}
        isOpen={!!paymentAppointment}
        onClose={() => setPaymentAppointment(null)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <AIPrescriptionModal
        prescription={aiRxModalData}
        isOpen={!!aiRxModalData}
        onClose={() => setAiRxModalData(null)}
      />

      <TeleconsultationModal
        appointment={teleconsultAppt}
        isOpen={!!teleconsultAppt}
        onClose={() => setTeleconsultAppt(null)}
      />

      <NotificationCenter
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

    </div>
  );
}

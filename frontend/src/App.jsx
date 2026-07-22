import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import TeleconsultationRoom from './components/TeleconsultationRoom';
import BookAppointmentModal from './components/BookAppointmentModal';
import PaymentModal from './components/PaymentModal';
import AIPrescriptionModal from './components/AIPrescriptionModal';
import NotificationCenter from './components/NotificationCenter';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { api, getCurrentUser, removeAuthToken } from './api';

export default function App() {
  const isTeleconsultRoute = window.location.pathname === '/teleconsult';
  const [activeRole, setActiveRole] = useState('PATIENT');
  const [activeView, setActiveView] = useState(isTeleconsultRoute ? 'teleconsult' : 'dashboard');
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

    const handlePopState = () => {
      if (window.location.pathname === '/teleconsult') {
        setActiveView('teleconsult');
      } else {
        setActiveView('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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

  const handleOpenTeleconsultRoom = (appt) => {
    setTeleconsultAppt(appt || { doctor_name: 'Dr. Rajesh Sharma', appointment_date: 'Today', time_slot: '10:30 AM' });
    
    // Open in a Brand New Browser Tab!
    window.open('/teleconsult', '_blank');
  };

  // If in Video Call Room mode (e.g. /teleconsult in new tab), render full page video room
  if (activeView === 'teleconsult') {
    return (
      <TeleconsultationRoom
        appointment={teleconsultAppt || { doctor_name: 'Dr. Rajesh Sharma', appointment_date: 'Today', time_slot: '10:30 AM' }}
        onBackToDashboard={() => {
          if (window.opener) {
            window.close();
          } else {
            window.history.pushState({}, '', '/');
            setActiveView('dashboard');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-transparent transition-colors duration-300">
      
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
            onOpenTeleconsult={handleOpenTeleconsultRoom}
          />
        )}

        {activeRole === 'DOCTOR' && (
          <DoctorDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            patients={patients}
            onUpdateAppointmentStatus={handleUpdateStatus}
            onCreatePrescription={handleCreatePrescription}
            onOpenTeleconsult={handleOpenTeleconsultRoom}
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

      {/* Rich Enterprise Multi-Column Footer */}
      <Footer />

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

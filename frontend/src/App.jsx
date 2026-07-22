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
import AIChatBot from './components/AIChatBot';
import { api, getCurrentUser, removeAuthToken } from './api';

export default function App() {
  const getInitialStateFromUrl = () => {
    const path = window.location.pathname;
    if (path === '/teleconsult') {
      return { role: 'PATIENT', view: 'teleconsult' };
    } else if (path === '/doctor') {
      return { role: 'DOCTOR', view: 'dashboard' };
    } else if (path === '/admin') {
      return { role: 'ADMIN', view: 'dashboard' };
    } else if (path === '/patient') {
      return { role: 'PATIENT', view: 'dashboard' };
    } else {
      if (path === '/') {
        window.history.replaceState({}, '', '/patient');
      }
      return { role: 'PATIENT', view: 'dashboard' };
    }
  };

  const initialState = getInitialStateFromUrl();
  const [activeRole, setActiveRole] = useState(initialState.role);
  const [activeView, setActiveView] = useState(initialState.view);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [adminMetrics, setAdminMetrics] = useState({});

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [paymentAppointment, setPaymentAppointment] = useState(null);
  const [aiRxModalData, setAiRxModalData] = useState(null);
  const [teleconsultAppt, setTeleconsultAppt] = useState(() => {
    const saved = localStorage.getItem('active_teleconsult_appt');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    const newPath = `/${role.toLowerCase()}`;
    window.history.pushState({}, '', newPath);
  };

  useEffect(() => {
    loadData();

    const handlePopState = () => {
      const state = getInitialStateFromUrl();
      setActiveRole(state.role);
      setActiveView(state.view);
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

  const handleAuthSuccess = async (action, credentials) => {
    if (action === 'login') {
      const res = await api.login(credentials.username, credentials.password);
      if (res && res.user) {
        setCurrentUser(res.user);
        handleRoleChange(res.user.role);
        loadData();
      }
    } else if (action === 'register') {
      const res = await api.register(credentials);
      if (res && res.user) {
        const loginRes = await api.login(credentials.username, credentials.password);
        if (loginRes && loginRes.user) {
          setCurrentUser(loginRes.user);
          handleRoleChange(loginRes.user.role);
          loadData();
        }
      }
    }
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
    const activeAppt = appt || { doctor_name: 'Dr. Rajesh Sharma', appointment_date: 'Today', time_slot: '10:30 AM' };
    localStorage.setItem('active_teleconsult_appt', JSON.stringify(activeAppt));
    setTeleconsultAppt(activeAppt);
    
    // Open in a Brand New Browser Tab!
    window.open('/teleconsult', '_blank');
  };

  // If in Video Call Room mode (e.g. /teleconsult in new tab), render full page video room
  if (activeView === 'teleconsult') {
    return (
      <TeleconsultationRoom
        appointment={teleconsultAppt || { doctor_name: 'Dr. Rajesh Sharma', appointment_date: 'Today', time_slot: '10:30 AM' }}
        onBackToDashboard={() => {
          localStorage.removeItem('active_teleconsult_appt');
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
        onSwitchRole={handleRoleChange}
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
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Floating Global RAG AI Chat Assistant */}
      <AIChatBot />

    </div>
  );
}

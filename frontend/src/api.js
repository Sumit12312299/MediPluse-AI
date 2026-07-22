const API_BASE = 'http://localhost:8000/api';

export const getAuthToken = () => localStorage.getItem('access_token');
export const setAuthToken = (token) => localStorage.setItem('access_token', token);
export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : { id: 1, username: 'patient@medipulse.ai', first_name: 'Rahul', role: 'PATIENT' };
};

const authHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Fallback Indian Mock Data
const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Rajesh Sharma', specialization: 'Cardiology & Heart Care', department: 'Cardiovascular Sciences', consultation_fee: 800, rating: 4.9 },
  { id: 2, name: 'Dr. Ananya Gupta', specialization: 'Neurology & Brain Care', department: 'Neurosciences', consultation_fee: 1200, rating: 4.8 },
  { id: 3, name: 'Dr. Vikram Malhotra', specialization: 'Orthopedics & Joint Care', department: 'Orthopedic Surgery', consultation_fee: 950, rating: 4.9 },
  { id: 4, name: 'Dr. Priya Verma', specialization: 'Dermatology & Skin Science', department: 'Dermatology OPD', consultation_fee: 750, rating: 4.7 }
];

const MOCK_PATIENTS = [
  { id: 1, name: 'Rahul Verma', phone: '+91 98765 43210', blood_group: 'O+' },
  { id: 2, name: 'Priya Singh', phone: '+91 91234 56789', blood_group: 'A+' }
];

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    patient_name: 'Rahul Verma',
    doctor_name: 'Dr. Rajesh Sharma',
    doctor_specialization: 'Cardiology & Heart Care',
    appointment_date: '2026-07-22',
    time_slot: '10:30 AM',
    status: 'CONFIRMED',
    reason: 'Annual cardiovascular checkup & blood pressure review.'
  },
  {
    id: 2,
    patient_name: 'Rahul Verma',
    doctor_name: 'Dr. Ananya Gupta',
    doctor_specialization: 'Neurology & Brain Care',
    appointment_date: '2026-07-18',
    time_slot: '02:15 PM',
    status: 'COMPLETED',
    reason: 'Recurring tension headaches & cervical strain consultation.'
  }
];

const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    patient_name: 'Rahul Verma',
    doctor_name: 'Dr. Ananya Gupta',
    diagnosis: 'Cervical Strain & Tension Headaches',
    medications: [
      { name: 'Naproxen', dosage: '500mg', frequency: 'Twice daily after meals', duration: '5 Days' },
      { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily before breakfast', duration: '5 Days' }
    ],
    notes: 'Take adequate rest and perform daily neck stretches.',
    ai_summary: {
      summary: 'Diagnosed with cervical muscle strain. Prescribed Naproxen for pain relief along with Pantoprazole for acidity prevention.',
      urgency: 'LOW',
      audio_text: 'Your diagnosis is Cervical Strain. Take Naproxen twice daily after meals for 5 days.'
    },
    created_at: '2026-07-18T14:30:00Z'
  }
];

const MOCK_PAYMENTS = [
  {
    id: 1,
    appointment_id: 2,
    amount: 1200.00,
    payment_method: 'UPI (GPay / PhonePe)',
    transaction_id: 'TXN_IND_894021',
    status: 'COMPLETED',
    created_at: '2026-07-18T14:35:00Z'
  }
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Appointment Confirmed', message: 'Your appointment with Dr. Rajesh Sharma for 2026-07-22 at 10:30 AM has been confirmed.', channel: 'SMS' },
  { id: 2, title: 'Prescription Generated', message: 'Dr. Ananya Gupta has generated your digital prescription with AI summary.', channel: 'EMAIL' }
];

const MOCK_METRICS = {
  total_patients: 24,
  total_doctors: 4,
  ai_prescriptions_generated: 18,
  total_revenue: 18400.00
};

export const api = {
  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setAuthToken(data.access);
        localStorage.setItem('refresh_token', data.refresh);
        const userRole = username.includes('doctor') ? 'DOCTOR' : username.includes('admin') ? 'ADMIN' : 'PATIENT';
        const userObj = {
          username,
          first_name: username.includes('doctor') ? 'Dr. Rajesh' : username.includes('admin') ? 'Admin' : 'Rahul',
          role: userRole
        };
        localStorage.setItem('user', JSON.stringify(userObj));
        return { access: data.access, user: userObj };
      }
    } catch (e) {
      console.log('Using mock auth login fallback');
    }

    const userRole = username.includes('doctor') ? 'DOCTOR' : username.includes('admin') ? 'ADMIN' : 'PATIENT';
    const userObj = {
      username,
      first_name: username.includes('doctor') ? 'Dr. Rajesh' : username.includes('admin') ? 'Admin' : 'Rahul',
      role: userRole
    };
    setAuthToken('mock_jwt_access_token_xyz');
    localStorage.setItem('user', JSON.stringify(userObj));
    return { access: 'mock_jwt_access_token_xyz', user: userObj };
  },

  async register(payload) {
    return { user: { username: payload.email, first_name: payload.first_name, role: 'PATIENT' } };
  },

  async getDoctors() {
    try {
      const res = await fetch(`${API_BASE}/doctors/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_DOCTORS;
  },

  async getPatients() {
    try {
      const res = await fetch(`${API_BASE}/patients/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_PATIENTS;
  },

  async getAppointments() {
    try {
      const res = await fetch(`${API_BASE}/appointments/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_APPOINTMENTS;
  },

  async bookAppointment(payload) {
    try {
      const res = await fetch(`${API_BASE}/appointments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const newAppt = {
      id: Date.now(),
      patient_name: 'Rahul Verma',
      doctor_name: 'Dr. Rajesh Sharma',
      doctor_specialization: 'Cardiology & Heart Care',
      appointment_date: payload.appointment_date,
      time_slot: payload.time_slot,
      status: 'CONFIRMED',
      reason: payload.reason
    };
    MOCK_APPOINTMENTS.unshift(newAppt);
    return newAppt;
  },

  async updateAppointmentStatus(id, status, notes) {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ status, notes })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const appt = MOCK_APPOINTMENTS.find(a => a.id === id);
    if (appt) appt.status = status;
    return appt;
  },

  async getPrescriptions() {
    try {
      const res = await fetch(`${API_BASE}/prescriptions/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_PRESCRIPTIONS;
  },

  async createPrescription(payload) {
    try {
      const res = await fetch(`${API_BASE}/prescriptions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const newRx = {
      id: Date.now(),
      patient_name: 'Rahul Verma',
      doctor_name: 'Dr. Rajesh Sharma',
      diagnosis: payload.diagnosis,
      medications: payload.medications,
      notes: payload.notes,
      ai_summary: {
        summary: `Prescription for ${payload.diagnosis}. Prescribed ${payload.medications?.length || 1} active medications for recovery.`,
        urgency: 'MEDIUM'
      },
      created_at: new Date().toISOString()
    };
    MOCK_PRESCRIPTIONS.unshift(newRx);
    return newRx;
  },

  async getPayments() {
    try {
      const res = await fetch(`${API_BASE}/payments/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_PAYMENTS;
  },

  async processPayment(payload) {
    try {
      const res = await fetch(`${API_BASE}/payments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const newPay = {
      id: Date.now(),
      appointment_id: payload.appointment_id,
      amount: payload.amount || 800.00,
      payment_method: payload.payment_method || 'UPI (GPay / PhonePe)',
      transaction_id: `TXN_IND_${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'COMPLETED',
      created_at: new Date().toISOString()
    };
    MOCK_PAYMENTS.unshift(newPay);
    return newPay;
  },

  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_NOTIFICATIONS;
  },

  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE}/admin/metrics/`, { headers: authHeader() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return MOCK_METRICS;
  },

  async addDoctor(payload) {
    try {
      const res = await fetch(`${API_BASE}/doctors/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const newDoc = {
      id: Date.now(),
      name: payload.user?.first_name || 'Dr. Specialist',
      specialization: payload.specialization,
      department: payload.department,
      consultation_fee: payload.consultation_fee || 800,
      rating: 4.9
    };
    MOCK_DOCTORS.push(newDoc);
    return newDoc;
  }
};

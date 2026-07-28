/**
 * Centralized UI Constants for MediPulse AI Application
 */

export const MEDICAL_DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'General Medicine',
  'Oncology',
  'ENT & Head-Neck',
];

export const APPOINTMENT_STATUSES = {
  CONFIRMED: { label: 'Confirmed', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  PENDING: { label: 'Pending Approval', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  COMPLETED: { label: 'Completed', badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  CANCELLED: { label: 'Cancelled', badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI (GPay / PhonePe / Paytm)', icon: 'Smartphone' },
  { id: 'card', name: 'Credit / Debit Card (RuPay / Visa / Mastercard)', icon: 'CreditCard' },
  { id: 'netbanking', name: 'Net Banking (SBI / HDFC / ICICI)', icon: 'Building' },
];

export const APP_CONFIG = {
  appName: 'MediPulse AI',
  tagline: 'Smart Clinical & Tele-Health Cloud Platform',
  version: '1.0.0',
  defaultConsultationFeeINR: 800,
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'medipulse_auth_token',
  USER_DATA: 'medipulse_user',
  THEME_MODE: 'medipulse_theme',
};

export const API_HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};



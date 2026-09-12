/**
 * Centralized constants for appointment and prescription statuses
 * used across Patient, Doctor, and Admin dashboards.
 */

export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const APPOINTMENT_STATUS_LABELS = {
  PENDING: 'Pending Approval',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const PAYMENT_STATUS_LABELS = {
  PENDING: 'Pending',
  SUCCESS: 'Paid',
  FAILED: 'Failed',
};

export const USER_ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
};

export const NOTIFICATION_CHANNELS = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  SYSTEM: 'SYSTEM',
};

/** Available blood group options for patient registration */
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/** Common medical specializations for doctor registration */
export const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic Surgeon',
  'Pediatrician',
  'Psychiatrist',
  'Radiologist',
  'Gynecologist',
  'Ophthalmologist',
];

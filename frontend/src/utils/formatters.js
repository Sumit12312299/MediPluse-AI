/**
 * Utility formatting functions for MediPulse AI UI
 */

/**
 * Formats a numeric amount to Indian Rupee (INR ₹) format.
 * @param {number|string} amount
 * @returns {string} Formatted currency string (e.g. ₹1,200)
 */
export const formatCurrencyINR = (amount) => {
  const numericVal = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericVal);
};

/**
 * Returns currency symbol for ISO code (defaults to ₹).
 * @param {string} code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (code = 'INR') => {
  switch ((code || '').toUpperCase()) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'INR':
    default:
      return '₹';
  }
};


/**
 * Formats an ISO date string or Date object to a readable Indian format.
 * @param {string|Date} dateInput
 * @returns {string} Formatted date (e.g., "25 Jul 2026")
 */
export const formatDateReadable = (dateInput) => {
  if (!dateInput) return 'N/A';
  const dateObj = new Date(dateInput);
  if (isNaN(dateObj.getTime())) return String(dateInput);

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(dateObj);
};

/**
 * Returns color badge styling classes for medical appointment & prescription statuses.
 * @param {string} status
 * @returns {string} Tailwind CSS class string
 */
export const getStatusBadgeStyle = (status) => {
  const normalized = (status || '').toUpperCase();
  switch (normalized) {
    case 'CONFIRMED':
    case 'COMPLETED':
    case 'PAID':
    case 'SUCCESS':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'PENDING':
    case 'SCHEDULED':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'CANCELLED':
    case 'FAILED':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
};

/**
 * Formats a 10-digit raw phone string to standardized Indian format (+91 XXXXX-XXXXX).
 * @param {string} phone
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return String(phone);
};

/**
 * Truncates text string to maximum length with ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string} Truncated string
 */
export const truncateText = (str, maxLength = 50) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Formats a transaction ID into a clean display format.
 * @param {string} txId
 * @returns {string} Masked or formatted transaction string
 */
/**
 * Formats a transaction ID into a clean display format.
 * @param {string} txId
 * @returns {string} Masked or formatted transaction string
 */
export const formatTransactionId = (txId) => {
  if (!txId) return 'N/A';
  if (txId.length > 12) {
    return `${txId.substring(0, 8)}...${txId.substring(txId.length - 4)}`;
  }
  return txId;
};

/**
 * Calculates a relative human-readable timestamp.
 * @param {string|Date} dateInput
 * @returns {string} Relative time string (e.g. "Just now", "5m ago", "2h ago")
 */
export const formatTimeAgo = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

/**
 * Formats a duration in minutes to a readable string (e.g., "1h 30m").
 * @param {number} minutes
 * @returns {string} Formatted duration string
 */
export const formatDurationInMinutes = (minutes = 0) => {
  const m = Number(minutes) || 0;
  if (m < 60) return `${m} mins`;
  const hrs = Math.floor(m / 60);
  const mins = m % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};

/**
 * Formats a decimal ratio as a percentage string (e.g. 0.85 -> "85%").
 * @param {number} ratio
 * @param {number} decimals
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (ratio = 0, decimals = 0) => {
  const val = Number(ratio) || 0;
  const percentage = val <= 1 ? val * 100 : val;
  return `${percentage.toFixed(decimals)}%`;
};






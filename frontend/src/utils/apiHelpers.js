/**
 * Helper utilities for handling API responses and error parsing in MediPulse AI
 */

/**
 * Safely parses HTTP response JSON, falling back to a structured default object on error.
 * @param {Response} response Fetch API response object
 * @returns {Promise<Object>}
 */
export const parseJsonResponse = async (response) => {
  try {
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.detail || data.message || 'An error occurred while communicating with the server.',
        errors: data,
      };
    }
    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      success: false,
      status: response.status || 500,
      message: 'Failed to parse API response.',
      error: err.message,
    };
  }
};

/**
 * Wraps a promise with a timeout limit.
 * @param {Promise} promise
 * @param {number} timeoutMs Milliseconds before timing out
 * @returns {Promise}
 */
export const withTimeout = (promise, timeoutMs = 10000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`API request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

/**
 * Extracts a user-friendly error string from unknown error objects or API exceptions.
 * @param {Error|Object|string} error
 * @returns {string} Clean human-readable error message
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred.';
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.detail) return error.detail;
  return 'Network or server error. Please try again.';
};

/**
 * Determines whether an error is caused by a network disconnection.
 * @param {Error|Object} error
 * @returns {boolean} True if network failure detected
 */
export const isNetworkError = (error) => {
  if (!error) return false;
  const msg = String(error.message || error).toLowerCase();
  return msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('timeout');
};

/**
 * Validates email format using regex pattern.
 * @param {string} email
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates 10-digit Indian mobile number format.
 * @param {string} phone
 * @returns {boolean} True if phone format is valid
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone) return false;
  const digitsOnly = String(phone).replace(/\D/g, '');
  return digitsOnly.length === 10;
};

/**
 * Validates password strength (min 8 characters, at least 1 letter, 1 number, and 1 special character).
 * @param {string} password
 * @returns {boolean} True if password meets strength requirements
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

/**
 * Converts arbitrary text into a URL-safe lowercase slug format.
 * @param {string} text Input text
 * @returns {string} URL-safe slug
 */
export const slugifyText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};





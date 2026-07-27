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


/**
 * Configuration options for WebRTC Tele-consultation & AI Clinical Scribe
 */

export const WEBRTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
  videoConstraints: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { ideal: 30, max: 60 },
  },
  audioConstraints: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
};

export const AI_SCRIBE_SETTINGS = {
  sampleRateHz: 16000,
  languageCode: 'en-IN',
  model: 'medipulse-clinical-scribe-v1',
  confidenceThreshold: 0.85,
};

export const TELEHEALTH_SESSION_STATUS = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  RECONNECTING: 'RECONNECTING',
  ENDED: 'ENDED',
  FAILED: 'FAILED',
};

export const WEBRTC_ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Camera or microphone access was denied. Please check your browser permissions.',
  DEVICE_NOT_FOUND: 'No camera or microphone input hardware was detected on this device.',
  PEER_DISCONNECTED: 'The remote participant disconnected from the tele-consultation room.',
  CONNECTION_TIMEOUT: 'WebRTC ICE connection timed out. Please check your internet connection.',
};

/**
 * Returns user-friendly error message for a given WebRTC error code.
 * @param {string} code
 * @returns {string} Human readable error message
 */
export const getWebRtcErrorMessage = (code) => {
  return WEBRTC_ERROR_MESSAGES[code] || 'An unexpected video consultation error occurred. Please try again.';
};



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

/**
 * Environment configuration constants for MediPulse AI frontend.
 * All values fall back to safe defaults for local development.
 */

/** Base URL of the Django REST API backend */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

/** WebSocket base URL for real-time signalling */
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:8000/ws';

/** Application display name */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MediPulse AI';

/** Application version (injected at build time) */
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

/** Whether the app is running in production mode */
export const IS_PRODUCTION = import.meta.env.PROD === true;

/** Default pagination page size for list endpoints */
export const DEFAULT_PAGE_SIZE = 10;

/** Maximum allowed file upload size in bytes (5 MB) */
export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

/** Supported image MIME types for avatar and document uploads */
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

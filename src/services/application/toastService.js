/**
 * Toast Notification Service
 * 
 * Centralized service for displaying toast notifications throughout the application.
 * Uses react-toastify for consistent messaging.
 */

import { toast } from 'react-toastify';

/**
 * Toast notification types
 */
export const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Default toast configuration
 */
const defaultConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {Object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    ...defaultConfig,
    ...options,
  });
};

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {Object} options - Additional toast options
 */
export const showError = (message, options = {}) => {
  toast.error(message, {
    ...defaultConfig,
    autoClose: 5000, // Errors stay longer
    ...options,
  });
};

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {Object} options - Additional toast options
 */
export const showWarning = (message, options = {}) => {
  toast.warning(message, {
    ...defaultConfig,
    ...options,
  });
};

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {Object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
  toast.info(message, {
    ...defaultConfig,
    ...options,
  });
};

/**
 * Show toast with custom type
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {string} message - Toast message
 * @param {Object} options - Additional toast options
 */
export const showToast = (type, message, options = {}) => {
  switch (type) {
    case ToastType.SUCCESS:
      showSuccess(message, options);
      break;
    case ToastType.ERROR:
      showError(message, options);
      break;
    case ToastType.WARNING:
      showWarning(message, options);
      break;
    case ToastType.INFO:
      showInfo(message, options);
      break;
    default:
      showInfo(message, options);
  }
};

/**
 * Dismiss all toasts
 */
export const dismissAll = () => {
  toast.dismiss();
};

export default {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showToast,
  dismissAll,
  ToastType,
};


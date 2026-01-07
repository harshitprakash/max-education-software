/**
 * API Utility - Centralized API request handler
 */
import { auth } from "../utils/auth";

const API_BASE_URL = 'https://www.maxeducation.co.in/api';

const getAuthToken = () => {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
};

const normalizeEndpoint = (endpoint) => {
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

const apiRequest = async (endpoint, options = {}) => {
  const normalizedEndpoint = normalizeEndpoint(endpoint);
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  const token = getAuthToken();
  const isFormData = options.body instanceof FormData;

  const isLoginRequest = normalizedEndpoint === '/Auth/login' && options.method === 'POST';

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204 || response.status === 205) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      if ((response.status === 401 || response.status === 403) && !isLoginRequest) {
        auth.logout(true);
        throw new Error('Your session has expired. Please login again.');
      }

      const errorMsg = typeof data === 'object' 
        ? data.message || data.error || data.detail 
        : data;
      throw new Error(errorMsg || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const get = async (endpoint, params = {}) => {
  const normalizedEndpoint = normalizeEndpoint(endpoint);
  const queryString = new URLSearchParams(params).toString();
  const fullEndpoint = queryString ? `${normalizedEndpoint}?${queryString}` : normalizedEndpoint;
  return apiRequest(fullEndpoint, { method: 'GET' });
};

export const post = async (endpoint, data) => {
  const isFormData = data instanceof FormData;
  return apiRequest(endpoint, {
    method: 'POST',
    body: isFormData ? data : JSON.stringify(data),
  });
};

export const put = async (endpoint, data) => {
  const isFormData = data instanceof FormData;
  return apiRequest(endpoint, {
    method: 'PUT',
    body: isFormData ? data : JSON.stringify(data),
  });
};

export const patch = async (endpoint, data) => {
  const isFormData = data instanceof FormData;
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: isFormData ? data : JSON.stringify(data),
  });
};

export const deleteRequest = async (endpoint) => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
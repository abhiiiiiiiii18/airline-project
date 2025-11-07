import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response logging for errors only
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, '- Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

// Flight APIs
export const flightAPI = {
  getAll: () => api.get('/flights'),
  search: (params) => api.get('/flights/search', { params }),
  getById: (id) => api.get(`/flights/${id}`),
  create: (flightData) => api.post('/flights', flightData),
  update: (id, flightData) => api.put(`/flights/${id}`, flightData),
  delete: (id) => api.delete(`/flights/${id}`),
};

// Booking APIs
export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getByReference: (reference) => api.get(`/bookings/reference/${reference}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  checkIn: (id) => api.patch(`/bookings/${id}/checkin`),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
};

// User APIs
export const userAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, userData) => api.put(`/users/${id}`, userData),
};

export default api;

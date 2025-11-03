const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const authToken = token || localStorage.getItem('token');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  return headers;
};

const api = {
  post: async (endpoint, data, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, data, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  delete: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
<<<<<<< HEAD
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
=======
// Small fetch wrapper for the frontend to talk to the backend.
// It reads base URL from Vite env: VITE_API_BASE (e.g. http://localhost:5000)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

async function request(path, opts = {}){
  const url = API_BASE.replace(/\/$/, '') + path
  const headers = Object.assign({'Content-Type':'application/json'}, opts.headers || {})

  try {
    const res = await fetch(url, Object.assign({
      credentials: 'include', // use cookies when backend sets them
      headers,
    }, opts))

    let body = null
    const contentType = res.headers.get('content-type') || ''
    if(contentType.includes('application/json')){
      body = await res.json()
    } else {
      body = await res.text()
    }

    if(!res.ok){
      // Extract error message from response
      const errorMessage = body?.message || body || `Request failed with status ${res.status}`
      const error = new Error(errorMessage)
      error.status = res.status
      error.data = body
      throw error
    }

    return body
  } catch (err) {
    // Handle network errors
    if (!err.status) {
      const networkError = new Error('Failed to connect to server. Please check if the backend is running.')
      networkError.isNetworkError = true
      throw networkError
    }
    throw err
  }
}

export async function post(path, data){
  return request(path, { method: 'POST', body: JSON.stringify(data) })
}

export async function get(path){
  return request(path, { method: 'GET' })
}

export default { post, get }
>>>>>>> Nippa

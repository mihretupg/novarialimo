const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/backend';
let csrfToken = '';

async function ensureCsrfToken() {
  if (csrfToken) {
    return csrfToken;
  }

  const response = await fetch(`${API_BASE}/api/session.php`, {
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));
  csrfToken = data.csrf_token || '';
  return csrfToken;
}

async function request(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    headers['X-CSRF-Token'] = await ensureCsrfToken();
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers,
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (data.csrf_token) {
    csrfToken = data.csrf_token;
  }
  if (!response.ok) {
    if (response.status === 419) {
      csrfToken = '';
    }
    throw new Error(data.errors?.join(' ') || data.message || 'Request failed');
  }

  return data;
}

export function socialLoginUrl(provider) {
  return `${API_BASE}/oauth/start.php?provider=${encodeURIComponent(provider)}`;
}

export const api = {
  session: () => request('/api/session.php'),
  login: (payload) => request('/api/login.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  register: (payload) => request('/api/register.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  adminLogin: (payload) => request('/api/admin_login.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  logout: () => request('/api/logout.php', { method: 'POST' }).then((data) => {
    csrfToken = '';
    return data;
  }),
  createBooking: (payload) => request('/api/bookings.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  bookings: () => request('/api/bookings.php'),
  adminStats: () => request('/api/admin_stats.php'),
  updateBooking: (payload) => request('/api/bookings.php', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
};

const API_PREFIX = `${import.meta.env.BASE_URL || '/'}api`.replace(/\/+$/, '');

function toApiPath(path) {
  return `${API_PREFIX}${path.startsWith('/') ? path : `/${path}`}`;
}

async function request(path, options = {}) {
  const response = await fetch(toApiPath(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {};
    }
  }

  if (!response.ok) {
    const error = new Error(payload.error || 'Request failed');
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function loginWithPassword(phone, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, password }),
  });
  return data.user;
}

export function logout() {
  return request('/auth/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  const data = await request('/auth/me', { method: 'GET' });
  return data.user;
}

export function getMemberSummary() {
  return request('/member/summary', { method: 'GET' });
}

export function claimBirthdayReward() {
  return request('/member/claim-birthday', { method: 'POST' });
}

export async function getCoupons() {
  const data = await request('/coupons', { method: 'GET' });
  return data.coupons || [];
}

export function useCoupon(couponId) {
  return request('/coupons/use', {
    method: 'POST',
    body: JSON.stringify({ couponId }),
  });
}

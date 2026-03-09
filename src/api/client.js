async function request(path, options = {}) {
  const response = await fetch(path, {
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
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, password }),
  });
  return data.user;
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  const data = await request('/api/auth/me', { method: 'GET' });
  return data.user;
}

export function getMemberSummary() {
  return request('/api/member/summary', { method: 'GET' });
}

export function claimBirthdayReward() {
  return request('/api/member/claim-birthday', { method: 'POST' });
}

export async function getCoupons() {
  const data = await request('/api/coupons', { method: 'GET' });
  return data.coupons || [];
}

export function useCoupon(couponId) {
  return request('/api/coupons/use', {
    method: 'POST',
    body: JSON.stringify({ couponId }),
  });
}


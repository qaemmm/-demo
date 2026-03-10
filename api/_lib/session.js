import crypto from 'node:crypto';

const COOKIE_NAME = 'suki_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const DEMO_USER_ID = 1;

function base64UrlEncode(text) {
  return Buffer.from(text, 'utf8').toString('base64url');
}

function base64UrlDecode(text) {
  return Buffer.from(text, 'base64url').toString('utf8');
}

function getSecret() {
  return process.env.SESSION_SECRET || 'dev-only-secret-change-me';
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function parseCookieHeader(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, part) => {
    const [key, ...valueParts] = part.trim().split('=');
    if (!key) return acc;
    acc[key] = valueParts.join('=');
    return acc;
  }, {});
}

function buildCookie(name, value, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
}

function isDemoAuthBypassEnabled() {
  return String(process.env.DEMO_AUTH_BYPASS || '')
    .trim()
    .toLowerCase() === 'true';
}

export function createSessionToken(userId) {
  const payload = JSON.stringify({
    uid: userId,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  const encodedPayload = base64UrlEncode(payload);
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function getUserIdFromRequest(req) {
  const cookies = parseCookieHeader(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }
  if (sign(encodedPayload) !== signature) {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload));
  } catch {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }

  if (!payload?.uid || !payload?.exp) {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return isDemoAuthBypassEnabled() ? DEMO_USER_ID : null;
  }
  return payload.uid;
}

export function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', buildCookie(COOKIE_NAME, token, SESSION_TTL_SECONDS));
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', buildCookie(COOKIE_NAME, '', 0));
}

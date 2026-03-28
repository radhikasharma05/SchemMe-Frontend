// ─── Auth API Service ──────────────────────────────────────────────────────────
// All auth-related API calls live here. Import these in your pages/context.

export const API_BASE = 'http://192.168.137.1:3000/api';

// ─── Response types ────────────────────────────────────────────────────────────

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string | number;
    name: string;
    email: string;
    [key: string]: unknown;
  };
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

// ─── Helper ────────────────────────────────────────────────────────────────────

async function extractError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body.message || body.error || body.msg || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

// ─── Signup ────────────────────────────────────────────────────────────────────
// POST /api/signup → triggers OTP email, expects 200/201 on success.

export async function apiSignup(payload: SignupPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
}

// ─── Verify OTP ────────────────────────────────────────────────────────────────
// POST /api/verify-otp → verifies the 6-digit code; creates the account.

export async function apiVerifyOtp(payload: VerifyOtpPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
}

// ─── Resend OTP ────────────────────────────────────────────────────────────────
// POST /api/resend-otp → sends a fresh OTP to the same email.

export async function apiResendOtp(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await extractError(res));
}

// ─── Login ─────────────────────────────────────────────────────────────────────
// POST /api/login → returns JWT token + user info on success.

export async function apiLogin(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

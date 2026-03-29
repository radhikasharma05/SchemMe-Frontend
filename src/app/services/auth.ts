// ─── Auth API Service ──────────────────────────────────────────────────────────
// All auth-related API calls live here. Import these in your pages/context.

export const API_BASE = 'http://192.168.137.1:3000/api';

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Full signup payload — matches every field in the Prisma User model */
export interface SignupPayload {
  email:               string;
  password:            string;

  // Personal
  gender:              string;   // MALE | FEMALE | NON_BINARY | PREFER_NOT_TO_SAY
  age:                 number;
  maritalStatus:       string;   // SINGLE | MARRIED | DIVORCED | WIDOWED

  // Location
  areaType:            string;   // URBAN | RURAL | SEMI_URBAN
  state:               string;

  // Category & Disability
  socialCategory:      string;   // GENERAL | OBC | SC | ST | OBC_NCL | EWS
  isPwD:               boolean;
  disabilityType?:     string | null;
  disabilityPercentage?: number | null;

  // Economic
  occupation:          string;   // STUDENT | FARMER | SALARIED_EMPLOYEE | …
  isBPL:               boolean;
  annualIncome:        string;   // BELOW_1_LAKH | BETWEEN_1_TO_3_LAKH | …
}

export interface VerifyOtpPayload {
  email: string;
  otp:   string;
}

/** Both /api/verify-otp and /api/login return this shape */
export interface AuthResponse {
  token:    string;
  user?: {
    id:    string | number;
    email: string;
    name?: string;
    [key: string]: unknown;
  };
  message?: string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

// ─── Error helper ──────────────────────────────────────────────────────────────

async function extractError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body.message || body.error || body.msg || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

// ─── Signup ────────────────────────────────────────────────────────────────────
// POST /api/signup → sends full profile, triggers OTP email

export async function apiSignup(payload: SignupPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/signup`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
}

// ─── Verify OTP ────────────────────────────────────────────────────────────────
// POST /api/verify-otp → verifies 6-digit code, returns JWT + user on success

export async function apiVerifyOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json() as Promise<AuthResponse>;
}

// ─── Resend OTP ────────────────────────────────────────────────────────────────
// POST /api/resend-otp → sends a fresh OTP to the same email

export async function apiResendOtp(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/resend-otp`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await extractError(res));
}

// ─── Login ─────────────────────────────────────────────────────────────────────
// POST /api/login → returns JWT token + user info on success

export async function apiLogin(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json() as Promise<AuthResponse>;
}

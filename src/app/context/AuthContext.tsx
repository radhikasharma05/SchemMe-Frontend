import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ─── Constants ─────────────────────────────────────────────────────────────────

const COOKIE_NAME  = 'schemme_token';       // JWT lives in a cookie
const USER_KEY     = 'schemme_auth_user';   // user object in localStorage
const EMAIL_KEY    = 'schemme_signup_email';// pending email across OTP refresh
const COOKIE_DAYS  = 7;                     // token cookie lifetime

// ─── Cookie helpers ────────────────────────────────────────────────────────────

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split('=').slice(1).join('='));
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string | number;
  email: string;
  name?: string;          // optional — API may not return name
  [key: string]: unknown;
}

interface AuthContextValue {
  /** JWT stored in cookie after successful login */
  token: string | null;
  /** User object from API response */
  user: AuthUser | null;
  /** True while we haven't yet read the cookie */
  initialising: boolean;
  /** Call after a successful login response */
  login: (token: string, user?: AuthUser) => void;
  /** Clears all auth state + cookie */
  logout: () => void;
  /** Email carried between Signup → OTP pages */
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  clearPendingEmail: () => void;
}

// ─── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token,        setToken]           = useState<string | null>(null);
  const [user,         setUser]            = useState<AuthUser | null>(null);
  const [initialising, setInitialising]    = useState(true);
  const [pendingEmail, setPendingEmailState] = useState<string>('');

  // ── Hydrate on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      // Token lives in cookie
      const cookieToken = getCookie(COOKIE_NAME);
      if (cookieToken) setToken(cookieToken);

      // User object lives in localStorage (not sensitive, just display data)
      const storedUser  = localStorage.getItem(USER_KEY);
      if (storedUser) setUser(JSON.parse(storedUser) as AuthUser);

      // Pending signup email
      const storedEmail = localStorage.getItem(EMAIL_KEY);
      if (storedEmail) setPendingEmailState(storedEmail);
    } catch {
      // Corrupt data — clear everything
      deleteCookie(COOKIE_NAME);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(EMAIL_KEY);
    } finally {
      setInitialising(false);
    }
  }, []);

  // ── Login: store token in cookie, user in localStorage ───────────────────────
  const login = useCallback((newToken: string, newUser?: AuthUser) => {
    setToken(newToken);
    setCookie(COOKIE_NAME, newToken, COOKIE_DAYS);

    if (newUser) {
      setUser(newUser);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }
  }, []);

  // ── Logout: delete cookie + localStorage ─────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    deleteCookie(COOKIE_NAME);
    deleteCookie('schemme_schemes');   // clear personalised scheme IDs
    localStorage.removeItem(USER_KEY);
  }, []);

  // ── Pending email helpers ─────────────────────────────────────────────────────
  const setPendingEmail = useCallback((email: string) => {
    setPendingEmailState(email);
    localStorage.setItem(EMAIL_KEY, email);
  }, []);

  const clearPendingEmail = useCallback(() => {
    setPendingEmailState('');
    localStorage.removeItem(EMAIL_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, initialising, login, logout, pendingEmail, setPendingEmail, clearPendingEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Helper — true when the user has a valid token cookie */
export function useIsAuthenticated(): boolean {
  return !!useAuth().token;
}

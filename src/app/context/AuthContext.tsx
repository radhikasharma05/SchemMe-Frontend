import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ─── Constants ─────────────────────────────────────────────────────────────────

const TOKEN_KEY  = 'schemme_auth_token';
const USER_KEY   = 'schemme_auth_user';
const EMAIL_KEY  = 'schemme_signup_email'; // persists signup email across refresh

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  /** JWT stored after successful login */
  token: string | null;
  /** Decoded / stored user object */
  user: AuthUser | null;
  /** True while we haven't yet checked localStorage */
  initialising: boolean;
  /** Call after a successful login response */
  login: (token: string, user?: AuthUser) => void;
  /** Clears all auth state */
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
  const [token,        setToken]        = useState<string | null>(null);
  const [user,         setUser]         = useState<AuthUser | null>(null);
  const [initialising, setInitialising] = useState(true);
  const [pendingEmail, setPendingEmailState] = useState<string>('');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser  = localStorage.getItem(USER_KEY);
      const storedEmail = localStorage.getItem(EMAIL_KEY);
      if (storedToken) setToken(storedToken);
      if (storedUser)  setUser(JSON.parse(storedUser) as AuthUser);
      if (storedEmail) setPendingEmailState(storedEmail);
    } catch {
      // corrupt data — clear it
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(EMAIL_KEY);
    } finally {
      setInitialising(false);
    }
  }, []);

  const login = useCallback((newToken: string, newUser?: AuthUser) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const setPendingEmail = useCallback((email: string) => {
    setPendingEmailState(email);
    localStorage.setItem(EMAIL_KEY, email); // survives page refresh
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

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Helper — true when the user is authenticated */
export function useIsAuthenticated(): boolean {
  return !!useAuth().token;
}

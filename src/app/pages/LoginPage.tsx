import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, LogIn, Mail, Lock, ShieldCheck, UserPlus } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import logoImg from '../../assets/logo.png';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
=======
import { apiLogin } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// ─── LoginPage ─────────────────────────────────────────────────────────────────

const LoginPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();
>>>>>>> 2d8ebbaf32670589fc178e4cd10a946d5f97ab6e

  const [showPassword, setShowPassword] = useState(false);
  const [form,   setForm]    = useState({ email: '', password: '' });
  const [errors, setErrors]  = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState('');
  const [success,  setSuccess]  = useState(false);

  // After login, go back to the page they tried to access or the dashboard
  const from = (location.state as { from?: string })?.from ?? '/dashboard';

  // ── Client-side validation ─────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters';
    return e;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError('');
    setLoading(true);
    try {
      const data = await apiLogin({ email: form.email.trim(), password: form.password });
      login(data.token, data.user);
      setSuccess(true);
      toast.success('Welcome back! 🎉', { description: `Logged in as ${form.email.trim()}` });
      setTimeout(() => navigate(from, { replace: true }), 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setApiError(msg);
      toast.error('Login failed', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  // ── Input class helper ─────────────────────────────────────────────────────
  const inputClass = (field: string) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl border font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-200 text-red-700'
        : 'border-gray-200 bg-white/80 focus:ring-[#2E9F75]/40 focus:border-[#2E9F75] text-[#111827]'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2]">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#2E9F75]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FFD166]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A45]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img src={logoImg} alt="SchemMe Logo" className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
            <span className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold tracking-tight">
              Schem<span className="text-[#D94F20]">Me</span>
            </span>
          </Link>
          <p className="font-['DM_Sans'] text-[#111827]/50 text-sm mt-2">
            {t.login_tagline}
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Success overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 rounded-3xl"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] flex items-center justify-center mb-3 shadow-lg">
                  <LogIn size={28} className="text-white" />
                </div>
                <p className="font-['Playfair_Display'] text-[#0B2545] text-xl font-bold">Welcome back!</p>
                <p className="font-['DM_Sans'] text-sm text-[#0B2545]/50 mt-1">Redirecting…</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-8">
            <h1 className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold mb-6">Sign in</h1>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Email */}
              <div>
                <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-2 uppercase tracking-wider">
                  {t.login_email_label}
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                    className={inputClass('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-['DM_Sans'] flex items-center gap-1">⚠ {errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-2 uppercase tracking-wider">
                  {t.login_password_label}
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: '' })); }}
                    className={`${inputClass('password')} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-['DM_Sans']">⚠ {errors.password}</p>
                )}
              </div>

              {/* Forgot */}
              <div className="text-right -mt-1">
                <button type="button" className="font-['DM_Sans'] text-xs text-[#2E9F75] hover:underline">
                  {t.login_forgot_password}
                </button>
              </div>

              {/* API Error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl font-['DM_Sans']"
                  >
                    ⚠ {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                id="login-submit-btn"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E9F75] to-[#1a7a52] text-white py-3.5 rounded-xl font-['DM_Sans'] font-bold text-sm hover:shadow-lg hover:shadow-[#2E9F75]/30 transition-all disabled:opacity-70 active:scale-[0.99]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={16} />
<<<<<<< HEAD
                    {t.login_submit}
=======
                    Sign In
>>>>>>> 2d8ebbaf32670589fc178e4cd10a946d5f97ab6e
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="font-['DM_Sans'] text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Create account */}
              <button
                type="button"
                id="login-create-account-btn"
                onClick={() => navigate('/signup')}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#0B2545]/20 hover:border-[#2E9F75] text-[#0B2545] hover:text-[#2E9F75] py-3.5 rounded-xl font-['DM_Sans'] font-bold text-sm transition-all hover:bg-[#2E9F75]/5"
              >
                <UserPlus size={16} />
                {t.login_create_account}
              </button>
            </form>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-['DM_Sans']">
              <ShieldCheck size={12} className="text-[#2E9F75]" />
              <span>{t.login_trust}</span>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <p className="text-center mt-6 font-['DM_Sans'] text-[#111827]/50 text-sm">
          <Link to="/" className="text-[#2E9F75] hover:text-[#1a7a52] font-medium transition-colors">
            {t.login_back_home}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

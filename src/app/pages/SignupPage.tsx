import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Lock, Eye, EyeOff, ShieldCheck, ChevronDown,
  UserPlus, LogIn, CheckCircle2, User, RefreshCw,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import logoImg from '../../assets/logo.png';
import { apiSignup, apiVerifyOtp, apiResendOtp } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// ─── Constants ────────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli',
  'Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry',
];

const CATEGORIES  = ['General','OBC','SC','ST','OBC (Non-Creamy Layer)','EWS'];
const ROLES       = ['Student','Farmer','Salaried Employee','Self-Employed','Business Owner','Daily Wage Worker','Homemaker','Senior Citizen','Unemployed','Other'];
const INCOME_RANGES = ['Below ₹1 Lakh','₹1 – 2.5 Lakh','₹2.5 – 5 Lakh','₹5 – 8 Lakh','₹8 – 12 Lakh','Above ₹12 Lakh'];

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = 'form' | 'otp' | 'done';

type Form = {
  name: string; email: string; password: string; confirmPassword: string;
  gender: string; age: string; maritalStatus: string; residenceType: string;
  state: string; category: string; disability: string; role: string;
  bpl: string; annualIncome: string;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeader = ({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] text-white flex items-center justify-center text-xs font-bold shadow-md">
      {step}
    </div>
    <div>
      <h3 className="font-['Playfair_Display'] text-[#0B2545] text-base font-bold leading-tight">{title}</h3>
      {subtitle && <p className="font-['DM_Sans'] text-[#0B2545]/50 text-xs mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/60 mb-1.5 uppercase tracking-wider">
    {children}
  </label>
);

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs text-red-500 font-['DM_Sans'] flex items-center gap-1">⚠ {msg}</p> : null;

// ─── OTP stage ────────────────────────────────────────────────────────────────

interface OtpStageProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

function OtpStage({ email, onVerified, onBack }: OtpStageProps) {
  const [otp, setOtp]         = useState(['', '', '', '', '', '']);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds
  const [resendMsg, setResendMsg] = useState('');
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[idx] = digit; setOtp(next);
    if (digit && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    if (!digits.length) return;
    e.preventDefault();
    const next = [...otp];
    digits.forEach((d, i) => { if (i < 6) next[i] = d; });
    setOtp(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits'); return; }
    setError('');
    setLoading(true);
    try {
      await apiVerifyOtp({ email, otp: code });
      toast.success('Email verified! 🎉', { description: 'Your account has been created.' });
      onVerified();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
      setError(msg);
      toast.error('Invalid OTP', { description: msg });
      setOtp(['', '', '', '', '', '']);
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendMsg('');
    setResendLoading(true);
    try {
      await apiResendOtp(email);
      setResendMsg('A new code has been sent!');
      toast.success('OTP resent', { description: `A new code was sent to ${email}` });
      setResendCooldown(60);
      setOtp(['', '', '', '', '', '']);
      refs.current[0]?.focus();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend. Try again.';
      setResendMsg(msg);
      toast.error('Resend failed', { description: msg });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2]">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8%] left-[-6%] w-[450px] h-[450px] bg-[#2E9F75]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-6%] w-[500px] h-[500px] bg-[#D94F20]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img src={logoImg} alt="SchemMe" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
            <span className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold tracking-tight">
              Schem<span className="text-[#D94F20]">Me</span>
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#0B2545]/10 border border-[#E8D5B7]/60 p-8"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2E9F75]/15 to-[#1a7a52]/10 border border-[#2E9F75]/20 flex items-center justify-center shadow-inner">
              <Mail size={36} className="text-[#2E9F75]" />
            </div>
          </div>

          <h2 className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold text-center mb-2">
            Verify Your Email
          </h2>
          <p className="font-['DM_Sans'] text-[#0B2545]/55 text-sm text-center mb-1">
            We've sent a 6‑digit code to
          </p>
          <p className="font-['DM_Sans'] text-[#2E9F75] text-sm font-bold text-center mb-7 truncate">{email}</p>

          {/* OTP boxes */}
          <div className="flex justify-center gap-3 mb-3" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { refs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKey(idx, e)}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 font-['DM_Sans'] focus:outline-none transition-all ${
                  error
                    ? 'border-red-400 bg-red-50 text-red-600'
                    : digit
                    ? 'border-[#2E9F75] bg-[#2E9F75]/5 text-[#0B2545]'
                    : 'border-[#E8D5B7] bg-white/80 text-[#0B2545] focus:border-[#2E9F75] focus:ring-2 focus:ring-[#2E9F75]/25'
                }`}
              />
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xs text-red-500 font-['DM_Sans'] mb-4"
              >
                ⚠ {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            id="otp-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D94F20] to-[#b83a15] text-white py-4 rounded-2xl font-['DM_Sans'] font-bold text-sm mt-5 hover:shadow-xl hover:shadow-[#D94F20]/30 transition-all disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 size={17} />
                Verify &amp; Create Account
              </>
            )}
          </button>

          {/* Resend */}
          <div className="mt-5 text-center space-y-1">
            <p className="font-['DM_Sans'] text-[#0B2545]/45 text-xs">
              {resendCooldown > 0
                ? `Resend available in ${resendCooldown}s`
                : "Didn't receive the code?"}
            </p>
            {resendCooldown === 0 && (
              <button
                id="otp-resend-btn"
                onClick={handleResend}
                disabled={resendLoading}
                className="inline-flex items-center gap-1.5 text-[#2E9F75] font-semibold text-xs hover:underline disabled:opacity-50 font-['DM_Sans']"
              >
                {resendLoading
                  ? <><RefreshCw size={12} className="animate-spin" /> Sending…</>
                  : <><RefreshCw size={12} /> Resend OTP</>}
              </button>
            )}
            <AnimatePresence>
              {resendMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs font-['DM_Sans'] ${resendMsg.includes('new') ? 'text-[#2E9F75]' : 'text-red-500'}`}
                >
                  {resendMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-[#0B2545]/40 font-['DM_Sans']">
            <ShieldCheck size={12} className="text-[#2E9F75]" />
            Your account is protected with email verification
          </div>
        </motion.div>

        <button
          id="otp-back-btn"
          onClick={onBack}
          className="mt-5 w-full text-center font-['DM_Sans'] text-sm text-[#0B2545]/45 hover:text-[#2E9F75] transition-colors"
        >
          ← Back to signup
        </button>
      </div>
    </div>
  );
}

// ─── Done stage ───────────────────────────────────────────────────────────────

function DoneStage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] flex items-center justify-center mx-auto mb-4 shadow-xl">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h2 className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold mb-2">Account Created!</h2>
        <p className="font-['DM_Sans'] text-[#0B2545]/50 text-sm">Redirecting you to login…</p>
      </motion.div>
    </div>
  );
}

// ─── Main SignupPage ───────────────────────────────────────────────────────────

const SignupPage = () => {
  const navigate = useNavigate();
  const { setPendingEmail, clearPendingEmail, pendingEmail } = useAuth();

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [stage,       setStage]       = useState<Stage>('form');
  const [apiError,    setApiError]    = useState('');

  const [form, setForm] = useState<Form>({
    name: '', email: pendingEmail, password: '', confirmPassword: '',
    gender: '', age: '', maritalStatus: '', residenceType: '', state: '',
    category: '', disability: '', role: '', bpl: '', annualIncome: '',
  });
  const [errors, setErrors] = useState<Partial<Form>>({});

  const set = (key: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const pick = (key: keyof Form, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): Partial<Form> => {
    const e: Partial<Form> = {};
    if (!form.name.trim())                                              e.name            = 'Enter your full name';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                                        e.email           = 'Enter a valid email address';
    if (form.password.length < 6)                                       e.password        = 'Minimum 6 characters';
    if (form.confirmPassword !== form.password)                         e.confirmPassword = 'Passwords do not match';
    if (!form.gender)                                                   e.gender          = 'Select gender';
    if (!form.age || isNaN(Number(form.age)) || +form.age < 1 || +form.age > 120)
                                                                        e.age             = 'Enter a valid age';
    if (!form.maritalStatus)  e.maritalStatus  = 'Select marital status';
    if (!form.residenceType)  e.residenceType  = 'Select area type';
    if (!form.state)          e.state          = 'Select your state';
    if (!form.category)       e.category       = 'Select a category';
    if (!form.disability)     e.disability     = 'Please select';
    if (!form.role)           e.role           = 'Select your role';
    if (!form.bpl)            e.bpl            = 'Please select';
    if (!form.annualIncome)   e.annualIncome   = 'Select income range';
    return e;
  };

  // ── POST /api/signup ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError('');
    setLoading(true);
    try {
      await apiSignup({
        name:     form.name.trim(),
        email:    form.email.trim(),
        password: form.password,
      });
      // Persist email so OTP stage has it even after a page refresh
      setPendingEmail(form.email.trim());
      toast.info('OTP sent! 📧', { description: `Check your inbox at ${form.email.trim()}` });
      setStage('otp');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setApiError(msg);
      toast.error('Signup failed', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  // ── After OTP verified ──────────────────────────────────────────────────────
  const handleVerified = () => {
    clearPendingEmail();
    setStage('done');
    setTimeout(() => navigate('/login'), 1800);
  };

  // ── Class helpers ───────────────────────────────────────────────────────────
  const inputCls = (field: keyof Form) =>
    `w-full px-4 py-3 rounded-xl border font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-200 text-red-700'
        : 'border-[#E8D5B7] bg-white/80 focus:ring-[#2E9F75]/30 focus:border-[#2E9F75] text-[#111827]'
    }`;

  const selectCls = (field: keyof Form) =>
    `w-full px-4 py-3 rounded-xl border font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 transition-all appearance-none bg-white/80 ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-200 text-red-700'
        : 'border-[#E8D5B7] focus:ring-[#2E9F75]/30 focus:border-[#2E9F75] text-[#111827]'
    }`;

  const chipCls = (active: boolean, err?: string) =>
    `cursor-pointer px-4 py-2 rounded-xl border text-sm font-['DM_Sans'] font-medium transition-all ${
      active
        ? 'bg-gradient-to-r from-[#2E9F75] to-[#1a7a52] text-white border-transparent shadow-md shadow-[#2E9F75]/20'
        : err
        ? 'border-red-300 bg-red-50 text-red-500 hover:border-red-400'
        : 'border-[#E8D5B7] bg-white/80 text-[#0B2545]/60 hover:border-[#2E9F75] hover:text-[#2E9F75]'
    }`;

  // ── Stage routing ───────────────────────────────────────────────────────────
  if (stage === 'done') return <DoneStage />;

  if (stage === 'otp') return (
    <OtpStage
      email={form.email.trim() || pendingEmail}
      onVerified={handleVerified}
      onBack={() => setStage('form')}
    />
  );

  // ── Form stage ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-16 relative bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2]">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8%] left-[-6%] w-[450px] h-[450px] bg-[#2E9F75]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-6%] w-[500px] h-[500px] bg-[#D94F20]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#FFD166]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img src={logoImg} alt="SchemMe Logo" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
            <span className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold tracking-tight">
              Schem<span className="text-[#D94F20]">Me</span>
            </span>
          </Link>
          <p className="font-['DM_Sans'] text-[#111827]/50 text-sm mt-1.5">
            Create your profile to discover schemes tailored for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* ── Block 1: Account Credentials ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg shadow-[#0B2545]/8 border border-[#E8D5B7]/60 p-7"
          >
            <SectionHeader step={1} title="Account Credentials" subtitle="Enter your email address and a strong password" />
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <Label>Full Name</Label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30" />
                  <input id="signup-name" type="text" placeholder="e.g. Rahul Sharma"
                    value={form.name} onChange={set('name')}
                    className={`${inputCls('name')} pl-10`} />
                </div>
                <ErrorMsg msg={errors.name} />
              </div>

              {/* Email */}
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30" />
                  <input id="signup-email" type="email" placeholder="e.g. rahul@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={e => { set('email')(e); setErrors(p => ({ ...p, email: '' })); }}
                    className={`${inputCls('email')} pl-10`} />
                </div>
                <ErrorMsg msg={errors.email} />
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30" />
                    <input id="signup-password" type={showPass ? 'text' : 'password'}
                      autoComplete="new-password" placeholder="••••••••"
                      value={form.password} onChange={set('password')}
                      className={`${inputCls('password')} pl-10 pr-10`} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30 hover:text-[#0B2545]/60 transition-colors">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <ErrorMsg msg={errors.password} />
                </div>
                <div>
                  <Label>Verify Password</Label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30" />
                    <input id="signup-confirm-password" type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password" placeholder="••••••••"
                      value={form.confirmPassword} onChange={set('confirmPassword')}
                      className={`${inputCls('confirmPassword')} pl-10 pr-10`} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/30 hover:text-[#0B2545]/60 transition-colors">
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <ErrorMsg msg={errors.confirmPassword} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Block 2: Personal Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg shadow-[#0B2545]/8 border border-[#E8D5B7]/60 p-7"
          >
            <SectionHeader step={2} title="Personal Details" subtitle="Tell us about yourself" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label>Gender</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Male','Female','Non-Binary','Prefer not to say'].map(g => (
                      <button key={g} type="button"
                        id={`gender-${g.toLowerCase().replace(/\s+/g,'-')}`}
                        onClick={() => pick('gender', g)}
                        className={chipCls(form.gender === g, errors.gender)}>
                        {g}
                      </button>
                    ))}
                  </div>
                  <ErrorMsg msg={errors.gender} />
                </div>
                <div>
                  <Label>Age</Label>
                  <input id="signup-age" type="number" min={1} max={120}
                    placeholder="e.g. 24" value={form.age} onChange={set('age')}
                    className={inputCls('age')} />
                  <ErrorMsg msg={errors.age} />
                </div>
              </div>

              <div>
                <Label>Marital Status</Label>
                <div className="flex flex-wrap gap-2">
                  {['Single','Married','Divorced','Widowed'].map(m => (
                    <button key={m} type="button"
                      id={`marital-${m.toLowerCase()}`}
                      onClick={() => pick('maritalStatus', m)}
                      className={chipCls(form.maritalStatus === m, errors.maritalStatus)}>
                      {m}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.maritalStatus} />
              </div>
            </div>
          </motion.div>

          {/* ── Block 3: Location ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg shadow-[#0B2545]/8 border border-[#E8D5B7]/60 p-7"
          >
            <SectionHeader step={3} title="Location" subtitle="Your state and area of residence" />
            <div className="space-y-5">
              <div>
                <Label>Area Type</Label>
                <div className="flex gap-3 flex-wrap">
                  {(['Urban','Rural','Semi-Urban'] as const).map(r => (
                    <button key={r} type="button"
                      id={`area-${r.toLowerCase()}`}
                      onClick={() => pick('residenceType', r)}
                      className={chipCls(form.residenceType === r, errors.residenceType)}>
                      {r === 'Urban' ? '🏙️' : r === 'Rural' ? '🌾' : '🏘️'} {r}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.residenceType} />
              </div>

              <div>
                <Label>State / UT of Residence</Label>
                <div className="relative">
                  <select id="signup-state" value={form.state} onChange={set('state')}
                    className={selectCls('state')}>
                    <option value="">— Select State / UT —</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/40 pointer-events-none" />
                </div>
                <ErrorMsg msg={errors.state} />
              </div>
            </div>
          </motion.div>

          {/* ── Block 4: Category & Disability ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg shadow-[#0B2545]/8 border border-[#E8D5B7]/60 p-7"
          >
            <SectionHeader step={4} title="Category & Disability" subtitle="Used to match relevant government schemes" />
            <div className="space-y-5">
              <div>
                <Label>Social Category</Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c} type="button"
                      id={`category-${c.toLowerCase().replace(/\s+/g,'-')}`}
                      onClick={() => pick('category', c)}
                      className={chipCls(form.category === c, errors.category)}>
                      {c}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.category} />
              </div>

              <div>
                <Label>Person with Disability (PwD)?</Label>
                <div className="flex gap-3">
                  {['Yes','No'].map(val => (
                    <button key={val} type="button"
                      id={`disability-${val.toLowerCase()}`}
                      onClick={() => pick('disability', val)}
                      className={chipCls(form.disability === val, errors.disability)}>
                      {val === 'Yes' ? '✓' : '✗'} {val}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.disability} />
              </div>
            </div>
          </motion.div>

          {/* ── Block 5: Economic Profile ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg shadow-[#0B2545]/8 border border-[#E8D5B7]/60 p-7"
          >
            <SectionHeader step={5} title="Economic Profile" subtitle="Helps us find financial assistance schemes" />
            <div className="space-y-5">
              <div>
                <Label>Your Role / Occupation</Label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map(r => (
                    <button key={r} type="button"
                      id={`role-${r.toLowerCase().replace(/\s+/g,'-')}`}
                      onClick={() => pick('role', r)}
                      className={chipCls(form.role === r, errors.role)}>
                      {r}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.role} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label>BPL (Below Poverty Line) Card?</Label>
                  <div className="flex gap-3">
                    {['Yes','No'].map(val => (
                      <button key={val} type="button"
                        id={`bpl-${val.toLowerCase()}`}
                        onClick={() => pick('bpl', val)}
                        className={chipCls(form.bpl === val, errors.bpl)}>
                        {val}
                      </button>
                    ))}
                  </div>
                  <ErrorMsg msg={errors.bpl} />
                </div>
                <div>
                  <Label>Annual Household Income</Label>
                  <div className="relative">
                    <select id="signup-annual-income" value={form.annualIncome} onChange={set('annualIncome')}
                      className={selectCls('annualIncome')}>
                      <option value="">— Select Range —</option>
                      {INCOME_RANGES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/40 pointer-events-none" />
                  </div>
                  <ErrorMsg msg={errors.annualIncome} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── API Error ── */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-2xl font-['DM_Sans']"
              >
                ⚠ {apiError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit row ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            <button type="submit" id="signup-submit-btn" disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D94F20] to-[#b83a15] text-white py-4 rounded-2xl font-['DM_Sans'] font-bold text-sm hover:shadow-xl hover:shadow-[#D94F20]/30 transition-all disabled:opacity-70 active:scale-[0.98]">
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><UserPlus size={17} /> Create My Account</>}
            </button>

            <button type="button" id="signup-login-btn" onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#0B2545]/15 hover:border-[#2E9F75] text-[#0B2545]/60 hover:text-[#2E9F75] py-3.5 rounded-2xl font-['DM_Sans'] font-semibold text-sm transition-all hover:bg-[#2E9F75]/5">
              <LogIn size={15} />
              Already have an account? Login
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-[#0B2545]/40 font-['DM_Sans']">
              <ShieldCheck size={12} className="text-[#2E9F75]" />
              Your data is encrypted &amp; used only to personalise scheme results
            </div>
          </motion.div>

        </form>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, LogIn, User, Mail, Lock, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (mode === 'signup' && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-200'
        : 'border-gray-200 bg-white/80 focus:ring-[#2E9F75]/40 focus:border-[#2E9F75]'
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 50%, #0d3d2e 100%)' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#2E9F75]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FFD166]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#1a5c42] flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="font-['Playfair_Display'] text-white text-2xl font-bold">
              Scheme<span className="text-[#FFD166]">Me</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Tab switcher */}
          <div className="flex border-b border-gray-100">
            {(['login', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setErrors({}); }}
                className={`flex-1 py-4 font-['DM_Sans'] text-sm font-semibold transition-all duration-200 ${
                  mode === tab
                    ? 'text-[#2E9F75] border-b-2 border-[#2E9F75] bg-[#2E9F75]/5'
                    : 'text-[#111827]/50 hover:text-[#111827]/80'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B2545]">
                {mode === 'login' ? 'Welcome back!' : 'Join SchemMe'}
              </h1>
              <p className="font-['DM_Sans'] text-[#111827]/55 text-sm mt-1">
                {mode === 'login'
                  ? 'Sign in to access your personalized scheme dashboard.'
                  : 'Create a free account to discover schemes you\'re eligible for.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (signup only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Aarav Sharma"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className={inputClass('name')}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-500 font-['DM_Sans']">{errors.name}</p>}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className={inputClass('email')}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 font-['DM_Sans']">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className={`${inputClass('password')} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 font-['DM_Sans']">{errors.password}</p>}
              </div>

              {/* Confirm password (signup only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block font-['DM_Sans'] text-xs font-semibold text-[#0B2545]/70 mb-1.5 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                      className={inputClass('confirm')}
                    />
                  </div>
                  {errors.confirm && <p className="mt-1 text-xs text-red-500 font-['DM_Sans']">{errors.confirm}</p>}
                </div>
              )}

              {/* Forgot password */}
              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="font-['DM_Sans'] text-xs text-[#2E9F75] hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E9F75] to-[#1a7a52] text-white py-3.5 rounded-xl font-['DM_Sans'] font-bold text-sm hover:shadow-lg transition-all mt-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? <LogIn size={16} /> : <ArrowRight size={16} />}
                    {mode === 'login' ? 'Sign In' : 'Create Free Account'}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-['DM_Sans'] text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Google', emoji: '🔵' },
                { label: 'DigiLocker', emoji: '🇮🇳' },
              ].map(social => (
                <button
                  key={social.label}
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl font-['DM_Sans'] text-sm font-medium text-[#0B2545] hover:bg-gray-50 transition-colors"
                >
                  <span>{social.emoji}</span> {social.label}
                </button>
              ))}
            </div>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-['DM_Sans']">
              <ShieldCheck size={12} className="text-[#2E9F75]" />
              <span>Your data is encrypted & never shared</span>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <p className="text-center mt-6 font-['DM_Sans'] text-white/60 text-sm">
          <Link to="/" className="text-[#4ecca3] hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

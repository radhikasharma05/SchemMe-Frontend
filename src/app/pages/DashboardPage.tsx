import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, LogOut, Search, ArrowRight,
  ShieldCheck, Star, BookOpen, Bell, User,
  Sprout, HeartPulse, GraduationCap, Briefcase,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// ─── Quick-access categories ─────────────────────────────────────────────────
const QUICK_CATS = [
  { label: 'Agriculture', icon: Sprout,        color: 'from-green-500 to-emerald-600',  tag: 'Agriculture' },
  { label: 'Healthcare',  icon: HeartPulse,    color: 'from-rose-500 to-pink-600',      tag: 'Health' },
  { label: 'Education',   icon: GraduationCap, color: 'from-blue-500 to-indigo-600',    tag: 'Education' },
  { label: 'Business',    icon: Briefcase,     color: 'from-amber-500 to-orange-600',   tag: 'Business' },
];

// ─── Stat cards ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Schemes Available', value: '4,000+', icon: BookOpen,    color: 'text-[#2E9F75]', bg: 'bg-[#2E9F75]/10' },
  { label: 'Categories',        value: '10',      icon: Star,        color: 'text-amber-500',  bg: 'bg-amber-500/10' },
  { label: 'Verified Sources',  value: '100%',    icon: ShieldCheck, color: 'text-blue-500',   bg: 'bg-blue-500/10'  },
  { label: 'Alerts Active',     value: '24/7',    icon: Bell,        color: 'text-purple-500', bg: 'bg-purple-500/10'},
];

// ─── DashboardPage ────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#2E9F75]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-8%] left-[-5%] w-[500px] h-[500px] bg-[#FFD166]/12 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">

        {/* ── Hero greeting card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-r from-[#0B2545] to-[#153764] rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative arcs */}
          <div className="absolute top-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full bg-white/5" />
          <div className="absolute bottom-[-60px] right-[60px] w-[180px] h-[180px] rounded-full bg-[#2E9F75]/15" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Left: greeting */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#2E9F75] to-[#FFD166] flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-['DM_Sans'] text-white/60 text-sm">Welcome back 👋</p>
                <h1 className="font-['Playfair_Display'] text-white text-2xl sm:text-3xl font-bold leading-tight">
                  {user?.name ?? 'User'}
                </h1>
                {user?.email && (
                  <p className="font-['DM_Sans'] text-white/40 text-xs mt-0.5 truncate max-w-[200px]">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex gap-3 flex-wrap">
              <Link
                to="/schemes"
                className="flex items-center gap-2 bg-[#2E9F75] hover:bg-[#259968] text-white px-5 py-2.5 rounded-xl font-['DM_Sans'] font-bold text-sm transition-all shadow-md"
              >
                <Search size={15} />
                Find Schemes
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl font-['DM_Sans'] font-semibold text-sm transition-all"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="font-['Playfair_Display'] text-[#0B2545] text-2xl font-bold">{s.value}</p>
              <p className="font-['DM_Sans'] text-[#111827]/55 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Quick explore ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm p-7"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} className="text-[#2E9F75]" />
              <h2 className="font-['Playfair_Display'] text-[#0B2545] text-lg font-bold">
                Quick Explore
              </h2>
            </div>
            <Link
              to="/categories"
              className="font-['DM_Sans'] text-xs text-[#2E9F75] hover:text-[#1a7a52] font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_CATS.map((cat) => (
              <Link
                key={cat.tag}
                to={`/schemes?category=${encodeURIComponent(cat.tag)}`}
                className="group flex flex-col items-center gap-3 bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#2E9F75]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <cat.icon size={20} className="text-white" />
                </div>
                <span className="font-['DM_Sans'] text-[#0B2545] text-sm font-semibold group-hover:text-[#2E9F75] transition-colors text-center">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm p-7"
        >
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-[#2E9F75]" />
            <h2 className="font-['Playfair_Display'] text-[#0B2545] text-lg font-bold">Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Name',  value: user?.name  ?? '—' },
              { label: 'Email', value: user?.email ?? '—' },
            ].map((row) => (
              <div key={row.label} className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <p className="font-['DM_Sans'] text-[#0B2545]/45 text-xs uppercase tracking-wider mb-1">
                  {row.label}
                </p>
                <p className="font-['DM_Sans'] text-[#0B2545] text-sm font-semibold truncate">
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#111827]/40 font-['DM_Sans']">
            <ShieldCheck size={12} className="text-[#2E9F75]" />
            Your data is encrypted &amp; never shared
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DashboardPage;

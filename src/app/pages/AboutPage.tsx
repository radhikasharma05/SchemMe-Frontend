import React from 'react';
import { motion } from 'motion/react';
import {
  Target, Users, Globe, Zap, Shield, Heart,
  ArrowRight, Mail, MapPin, Phone
} from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Sections';
import { useLanguage } from '../context/LanguageContext';

const TEAM = [
  { name: 'Aarav Sharma', role: 'Founder & CEO', emoji: '👨‍💼', bg: '#eff6ff' },
  { name: 'Priya Nair', role: 'Head of AI/ML', emoji: '👩‍💻', bg: '#f5f3ff' },
  { name: 'Rahul Patel', role: 'Gov. Relations Lead', emoji: '👨‍⚖️', bg: '#f0fdf4' },
  { name: 'Sneha Reddy', role: 'UI/UX Designer', emoji: '👩‍🎨', bg: '#fdf2f8' },
];

const VALUES = [
  { icon: Target, title: 'Accuracy First', desc: 'We only publish verified scheme data sourced from official government portals.', color: '#2E9F75' },
  { icon: Users, title: 'Inclusive by Design', desc: 'Built for every Indian — supporting 13 languages and accessible interfaces.', color: '#6366F1' },
  { icon: Globe, title: 'Transparency', desc: 'Open about how our AI works. No hidden algorithms, no commercial bias.', color: '#F59E0B' },
  { icon: Heart, title: 'Citizen First', desc: "Our mission is impact on Indian lives, not profit. SchemMe is free forever.", color: '#EC4899' },
  { icon: Zap, title: 'Speed Matters', desc: 'Bureaucracy is slow. Our platform is designed to cut through it instantly.', color: '#F97316' },
  { icon: Shield, title: 'Privacy by Default', desc: 'Your personal data stays yours. We use encryption and never sell data.', color: '#8B5CF6' },
];

const STATS = [
  { value: '4000+', label: 'Schemes Indexed' },
  { value: '2.8Cr+', label: 'Citizens Reached' },
  { value: '30+', label: 'Ministries Covered' },
  { value: '13', label: 'Languages Supported' },
];

const AboutPage = () => {
  const { t } = useLanguage();

  const VALUES = [
    { icon: Target, title: 'Accuracy First', desc: 'We only publish verified scheme data sourced from official government portals.', color: '#2E9F75' },
    { icon: Users, title: 'Inclusive by Design', desc: 'Built for every Indian — supporting 13 languages and accessible interfaces.', color: '#6366F1' },
    { icon: Globe, title: 'Transparency', desc: 'Open about how our AI works. No hidden algorithms, no commercial bias.', color: '#F59E0B' },
    { icon: Heart, title: 'Citizen First', desc: "Our mission is impact on Indian lives, not profit. SchemMe is free forever.", color: '#EC4899' },
    { icon: Zap, title: 'Speed Matters', desc: 'Bureaucracy is slow. Our platform is designed to cut through it instantly.', color: '#F97316' },
    { icon: Shield, title: 'Privacy by Default', desc: 'Your personal data stays yours. We use encryption and never sell data.', color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F0FDF4 50%, #F0F4FF 100%)' }}>
      {/* Hero */}
      <div
        className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 60%, #0d3d2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#2E9F75] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#FFD166] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-[#2E9F75]/20 border border-[#2E9F75]/30 rounded-full text-[#4ecca3] text-sm font-semibold mb-4">
              {t.about_our_mission}
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF7A45]">{t.about_heading}</span>
            </h1>
            <p className="text-white/70 text-lg font-['DM_Sans'] max-w-2xl mx-auto leading-relaxed">
              {t.about_subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="font-['Playfair_Display'] text-4xl font-black text-[#0B2545] mb-1">{stat.value}</div>
                <div className="font-['DM_Sans'] text-[#111827]/50 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-6">{t.about_our_story}</h2>
          <div className="prose prose-lg font-['DM_Sans'] text-[#111827]/70 space-y-4">
            <p>{t.about_story_p1}</p>
            <p>{t.about_story_p2}</p>
            <p>{t.about_story_p3}</p>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="bg-white/50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3">{t.about_values_heading}</h2>
            <p className="text-[#111827]/60 font-['DM_Sans']">{t.about_values_sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white/80 rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${val.color}15` }}>
                    <Icon size={22} style={{ color: val.color }} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#0B2545] mb-2">{val.title}</h3>
                  <p className="font-['DM_Sans'] text-sm text-[#111827]/60 leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3">{t.about_team_heading}</h2>
          <p className="text-[#111827]/60 font-['DM_Sans']">{t.about_team_sub}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 rounded-2xl p-6 text-center border border-white/60 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: member.bg }}
              >
                {member.emoji}
              </div>
              <h3 className="font-['DM_Sans'] font-bold text-[#0B2545] text-sm">{member.name}</h3>
              <p className="font-['DM_Sans'] text-[#111827]/50 text-xs mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0B2545, #1a3a6b)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">{t.about_contact_heading}</h2>
          <p className="text-white/70 font-['DM_Sans'] mb-10">{t.about_contact_sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@schemme.in' },
              { icon: Phone, label: 'Call Us', value: '1800-XXX-XXXX (Toll Free)' },
              { icon: MapPin, label: 'Office', value: 'New Delhi, India' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/10 rounded-2xl p-6 border border-white/15">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} className="text-[#4ecca3]" />
                  </div>
                  <div className="text-white/50 text-xs mb-1 font-['DM_Sans']">{item.label}</div>
                  <div className="text-white text-sm font-semibold font-['DM_Sans']">{item.value}</div>
                </div>
              );
            })}
          </div>
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all shadow-lg"
          >
            {t.about_cta} <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;

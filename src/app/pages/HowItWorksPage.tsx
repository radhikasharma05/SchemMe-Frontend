import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Cpu, Search, CheckCircle,
  ChevronDown, ArrowRight, Shield, Zap, Globe, Heart
} from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Sections';

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Create Your Profile',
    desc: 'Fill in your basic information — age, income, state, occupation and family details. Your data is encrypted and never shared with third parties.',
    color: '#2E9F75',
    details: ['Takes less than 2 minutes', 'Encrypted & secure', 'No Aadhaar required to start'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Matching Engine',
    desc: 'Our proprietary AI scans 4000+ government schemes across 30+ ministries in under 3 seconds to find your personalized matches.',
    color: '#6366F1',
    details: ['4000+ schemes analysed instantly', 'Updated monthly with new schemes', 'No human involvement — fast & unbiased'],
  },
  {
    number: '03',
    icon: Search,
    title: 'Review Your Matches',
    desc: 'See a ranked list of schemes you qualify for — with benefits, eligibility criteria, and required documents listed clearly.',
    color: '#F59E0B',
    details: ['Ranked by impact & relevance', 'Document checklist provided', 'Filter by category or benefit amount'],
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Apply in One Click',
    desc: 'We redirect you to the official government portal with pre-filled guidance, so you apply correctly the first time.',
    color: '#EC4899',
    details: ['Direct link to official portals', 'Step-by-step application guide', 'Track application status'],
  },
];

const FAQS = [
  {
    q: 'Is SchemMe a government website?',
    a: 'No, SchemMe is an independent civic-tech platform that aggregates and simplifies access to official government schemes. We link directly to official government portals for applications.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'Absolutely. We use bank-level AES-256 encryption. Your data is never sold or shared. You can delete your account and all associated data at any time.',
  },
  {
    q: 'How often is the scheme database updated?',
    a: 'Our team reviews and updates the scheme database every month, and critical changes are pushed within 48 hours of official announcements.',
  },
  {
    q: 'Does SchemMe charge any fees?',
    a: 'SchemMe is completely free for individual users. We are funded by grants from civic-tech organisations dedicated to improving government accessibility.',
  },
  {
    q: 'Can I apply for schemes directly on SchemMe?',
    a: 'Applications are handled on official government portals. SchemMe guides you there with the exact steps and documents needed, eliminating confusion.',
  },
  {
    q: 'What languages does SchemMe support?',
    a: 'SchemMe supports 13 Indian languages including English, Hindi, Bengali, Telugu, Marathi, Tamil, Kannada, Gujarati, Punjabi, Odia, Malayalam, Assamese, and Urdu.',
  },
];

const FEATURES = [
  { icon: Shield, title: 'Verified Data', desc: 'All 4000+ schemes sourced from official government portals.', color: '#2E9F75' },
  { icon: Zap, title: 'Instant Matching', desc: 'AI matches you to eligible schemes in under 3 seconds.', color: '#F59E0B' },
  { icon: Globe, title: '13 Languages', desc: 'Available in all major Indian regional languages.', color: '#6366F1' },
  { icon: Heart, title: 'Free Forever', desc: 'No charges, no subscriptions — always free for citizens.', color: '#EC4899' },
];

const HowItWorksPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F0FDF4 50%, #F0F4FF 100%)' }}>
      {/* Hero */}
      <div
        className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 50%, #0d3d2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2E9F75] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6366F1] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-[#2E9F75]/20 border border-[#2E9F75]/30 rounded-full text-[#4ecca3] text-sm font-semibold mb-4">
              Simple. Transparent. Free.
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-black text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF7A45]">SchemMe</span> Works
            </h1>
            <p className="text-white/70 text-lg font-['DM_Sans']">
              Discover every government benefit you're entitled to — in 4 simple steps.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="space-y-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-white/60 ${idx % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Step number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}99)` }}
                  >
                    <Icon size={36} className="text-white" />
                  </div>
                  <span className="font-['Playfair_Display'] text-4xl font-black" style={{ color: `${step.color}33` }}>
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2
                    className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold mb-3"
                    style={{ color: '#0B2545' }}
                  >
                    {step.title}
                  </h2>
                  <p className="font-['DM_Sans'] text-[#111827]/65 text-base leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-['DM_Sans']" style={{ color: step.color }}>
                        <CheckCircle size={16} className="flex-shrink-0" />
                        <span className="text-[#0B2545]/80">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/50 backdrop-blur-sm py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3">Why Choose SchemMe?</h2>
            <p className="text-[#111827]/60 font-['DM_Sans']">Built with India's 140 crore citizens in mind.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 rounded-2xl p-6 text-center border border-white/60 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${feat.color}15` }}>
                    <Icon size={26} style={{ color: feat.color }} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#0B2545] mb-2">{feat.title}</h3>
                  <p className="font-['DM_Sans'] text-sm text-[#111827]/60">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-white/80 rounded-2xl border border-white/60 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#2E9F75]/5 transition-colors"
              >
                <span className="font-['DM_Sans'] font-semibold text-[#0B2545] pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-[#2E9F75] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-['DM_Sans'] text-[#111827]/70 text-sm leading-relaxed px-5 sm:px-6 pb-5">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0B2545, #1a3a6b)' }}>
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">Ready to find your benefits?</h2>
        <p className="text-white/70 font-['DM_Sans'] mb-8">Join 2.8 crore Indians already using SchemMe.</p>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all shadow-lg"
        >
          Explore Schemes <ArrowRight size={20} />
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;

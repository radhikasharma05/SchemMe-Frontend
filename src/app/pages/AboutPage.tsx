import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Sections';

const STATS = [
  { value: '3400+', label: 'Schemes Available' },
  { value: '15+',   label: 'Categories Covered' },
  { value: '100%',  label: 'Free to Use' },
  { value: '24/7',  label: 'AI Assistance' },
];

const PARAGRAPHS = [
  {
    text: 'SchemMe is a platform designed to simplify how people discover government schemes that truly matter to them. With countless schemes available across different portals, finding the right one can often be confusing and time-consuming.',
  },
  {
    text: 'Our goal is to make this process effortless. By understanding basic details about you—such as your background, occupation, and eligibility—we provide personalized recommendations tailored to your needs.',
  },
  {
    text: 'Whether you\'re a student, job seeker, entrepreneur, or farmer, SchemMe helps you uncover opportunities you might otherwise miss.',
  },
  {
    text: 'We believe that access to government benefits should be simple, transparent, and inclusive. That\'s why we focus on delivering accurate, up-to-date information while respecting your privacy.',
  },
  {
    text: 'SchemMe is more than just a search tool—it\'s a step toward making public resources accessible to everyone.',
    highlight: true,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F0FDF4 50%, #F0F4FF 100%)' }}>

      {/* ── Hero banner ── */}
      <div
        className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 60%, #0d3d2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#2E9F75] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#FFD166] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-[#2E9F75]/20 border border-[#2E9F75]/30 rounded-full text-[#4ecca3] text-sm font-semibold mb-4">
              About SchemMe
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Making Government Schemes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF7A45]">
                Accessible to All
              </span>
            </h1>
            <p className="text-white/70 text-lg font-['DM_Sans'] max-w-2xl mx-auto leading-relaxed">
              Simplifying the way citizens discover the benefits they deserve — one scheme at a time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip ── */}
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

      {/* ── Main about content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative accent line */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#2E9F75] to-[#10B981]" />
            <span
              className="font-['DM_Sans'] text-sm font-bold uppercase tracking-widest"
              style={{ color: '#2E9F75' }}
            >
              Who We Are
            </span>
          </div>

          <div className="space-y-7">
            {PARAGRAPHS.map((para, idx) =>
              para.highlight ? (
                /* Last paragraph — highlighted callout box */
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(46,159,117,0.08) 0%, rgba(16,185,129,0.06) 100%)',
                    border: '1.5px solid rgba(46,159,117,0.25)',
                    borderLeft: '4px solid #2E9F75',
                    borderRadius: 16,
                    padding: '20px 24px',
                  }}
                >
                  <p
                    className="font-['DM_Sans'] text-base sm:text-lg leading-relaxed font-semibold"
                    style={{ color: '#0d4d35' }}
                  >
                    {para.text}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="font-['DM_Sans'] text-base sm:text-lg leading-relaxed"
                  style={{ color: 'rgba(17,24,39,0.72)' }}
                >
                  {para.text}
                </motion.p>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* ── CTA banner ── */}
      <div
        className="py-16 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #0B2545, #1a3a6b)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
              Ready to Find Your Scheme?
            </h2>
            <p className="text-white/65 font-['DM_Sans'] mb-8 max-w-lg mx-auto">
              Browse 3,400+ verified government schemes and discover the benefits you're eligible for — right now.
            </p>
            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all shadow-lg"
            >
              Start Exploring Schemes <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { motion } from 'motion/react';
import {
  Sprout, HeartPulse, GraduationCap, Briefcase, Home,
  Baby, Building, PiggyBank, Users, Bus, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Sections';

const CATEGORIES = [
  {
    name: 'Agriculture',
    count: 24,
    icon: Sprout,
    color: '#84CC16',
    bg: '#f7fee7',
    desc: 'Crop insurance, farm loans, irrigation subsidies and direct income support for farmers.',
    tag: 'Agriculture',
  },
  {
    name: 'Healthcare',
    count: 18,
    icon: HeartPulse,
    color: '#10B981',
    bg: '#f0fdf4',
    desc: 'Health insurance, free medicines, hospital schemes and community health programs.',
    tag: 'Healthcare',
  },
  {
    name: 'Education',
    count: 32,
    icon: GraduationCap,
    color: '#3B82F6',
    bg: '#eff6ff',
    desc: 'Scholarships, mid-day meals, skill development and higher education support.',
    tag: 'Education',
  },
  {
    name: 'Business',
    count: 15,
    icon: Briefcase,
    color: '#8B5CF6',
    bg: '#f5f3ff',
    desc: 'Startup loans, MSME grants, tax incentives and business development programs.',
    tag: 'Business',
  },
  {
    name: 'Housing',
    count: 8,
    icon: Home,
    color: '#6366F1',
    bg: '#eef2ff',
    desc: 'Affordable housing, home loans, interest subsidies and urban/rural housing missions.',
    tag: 'Housing',
  },
  {
    name: 'Women & Child',
    count: 12,
    icon: Baby,
    color: '#EC4899',
    bg: '#fdf2f8',
    desc: 'Maternity benefits, girl child savings, nutrition programs and women empowerment schemes.',
    tag: 'Women & Child',
  },
  {
    name: 'Infrastructure',
    count: 5,
    icon: Building,
    color: '#F97316',
    bg: '#fff7ed',
    desc: 'Rural roads, urban development, sanitation mission and smart city projects.',
    tag: 'Infrastructure',
  },
  {
    name: 'Pension',
    count: 10,
    icon: PiggyBank,
    color: '#64748B',
    bg: '#f8fafc',
    desc: 'Old age pension, disability pension, widow pension and retirement savings schemes.',
    tag: 'Pension',
  },
  {
    name: 'Minority',
    count: 9,
    icon: Users,
    color: '#F59E0B',
    bg: '#fffbeb',
    desc: 'Scholarships, skill training and economic development for minority communities.',
    tag: 'Minority',
  },
  {
    name: 'Transport',
    count: 4,
    icon: Bus,
    color: '#06B6D4',
    bg: '#ecfeff',
    desc: 'BSY concessions, public transport subsidies and rural connectivity programs.',
    tag: 'Transport',
  },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F0FDF4 50%, #F0F4FF 100%)' }}>
      {/* Hero */}
      <div
        className="relative pt-32 pb-16 px-4 sm:px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 60%, #0d3d2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-1/4 w-80 h-80 bg-[#FFD166] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2E9F75] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-[#FFD166]/20 border border-[#FFD166]/30 rounded-full text-[#FFD166] text-sm font-semibold mb-4">
              117 Schemes across 10 Categories
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-black text-white mb-4">
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF7A45]">Category</span>
            </h1>
            <p className="text-white/70 text-lg font-['DM_Sans']">
              Find the right government scheme based on your specific needs and situation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Link
                  to={`/schemes?category=${cat.tag}`}
                  className="block group bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                    style={{ background: cat.bg, border: `1.5px solid ${cat.color}22` }}
                  >
                    <Icon size={30} style={{ color: cat.color }} />
                  </div>

                  {/* Name & count */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0B2545] group-hover:text-[#2E9F75] transition-colors">
                      {cat.name}
                    </h3>
                    <span
                      className="ml-2 flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${cat.color}15`, color: cat.color }}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <p className="font-['DM_Sans'] text-[#111827]/60 text-sm leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: cat.color }}>
                    <span>Explore schemes</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0B2545, #1a3a6b)' }}>
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">Not sure which category fits you?</h2>
        <p className="text-white/70 font-['DM_Sans'] mb-8 max-w-lg mx-auto">
          Let our AI analyse your profile and recommend the most relevant schemes across all categories.
        </p>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all shadow-lg"
        >
          Find My Schemes <ArrowRight size={20} />
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;

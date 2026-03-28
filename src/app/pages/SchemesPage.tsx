import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, X, ArrowRight, ChevronDown,
  Sprout, HeartPulse, GraduationCap, Briefcase, Home,
  Baby, Building, PiggyBank, Users, Bus, Leaf, Wallet, Rocket
} from 'lucide-react';
import { Footer } from '../components/Sections';

const ALL_SCHEMES = [
  {
    id: 1,
    title: 'Ayushman Bharat PM-JAY',
    subtitle: 'Health insurance coverage up to ₹5 Lakhs per family per year for 50 crore beneficiaries.',
    tag: 'Healthcare',
    icon: HeartPulse,
    color: '#10B981',
    ministry: 'Ministry of Health',
    eligibility: 'BPL families & low-income households',
    benefit: '₹5 Lakhs/year',
  },
  {
    id: 2,
    title: 'PM Kisan Samman Nidhi',
    subtitle: 'Direct financial support of ₹6,000 per year to small & marginal farmers in 3 instalments.',
    tag: 'Agriculture',
    icon: Sprout,
    color: '#F59E0B',
    ministry: 'Ministry of Agriculture',
    eligibility: 'Small & marginal farmers',
    benefit: '₹6,000/year',
  },
  {
    id: 3,
    title: 'PM Awas Yojana (Urban)',
    subtitle: 'Affordable housing for all with interest subsidy of 3–6.5% on home loans.',
    tag: 'Housing',
    icon: Home,
    color: '#6366F1',
    ministry: 'Ministry of Housing',
    eligibility: 'EWS / LIG / MIG households',
    benefit: 'Up to ₹2.67 Lakh subsidy',
  },
  {
    id: 4,
    title: 'Startup India Initiative',
    subtitle: 'Empowering startups with 3-year tax exemption, fast-track patent & easy compliance.',
    tag: 'Business',
    icon: Rocket,
    color: '#EC4899',
    ministry: 'Ministry of Commerce',
    eligibility: 'Registered startups under 10 years old',
    benefit: 'Tax exemption + funding access',
  },
  {
    id: 5,
    title: 'PM MUDRA Yojana',
    subtitle: 'Micro-credit facility up to ₹10 Lakhs for non-corporate small business enterprises.',
    tag: 'Business',
    icon: Wallet,
    color: '#8B5CF6',
    ministry: 'Ministry of Finance',
    eligibility: 'Small entrepreneurs & self-employed',
    benefit: 'Loan up to ₹10 Lakhs',
  },
  {
    id: 6,
    title: 'Beti Bachao Beti Padhao',
    subtitle: "Ensuring the survival, protection & education of the girl child across India.",
    tag: 'Women & Child',
    icon: Baby,
    color: '#F472B6',
    ministry: 'Ministry of Women & Child',
    eligibility: 'Girl children aged 0–10 years',
    benefit: 'Savings + education support',
  },
  {
    id: 7,
    title: 'National Scholarship Portal',
    subtitle: 'Centralized scholarship platform providing financial aid to students from minority & SC/ST communities.',
    tag: 'Education',
    icon: GraduationCap,
    color: '#3B82F6',
    ministry: 'Ministry of Education',
    eligibility: 'Students from SC/ST/OBC/Minority',
    benefit: '₹1,000–₹25,000/year',
  },
  {
    id: 8,
    title: 'Pradhan Mantri Jan Dhan Yojana',
    subtitle: 'Universal banking access with zero-balance accounts, RuPay debit card & ₹2 Lakh accident cover.',
    tag: 'Finance',
    icon: PiggyBank,
    color: '#14B8A6',
    ministry: 'Ministry of Finance',
    eligibility: 'All Indian residents without bank accounts',
    benefit: 'Zero balance + ₹2L insurance',
  },
  {
    id: 9,
    title: 'Pradhan Mantri Gram Sadak Yojana',
    subtitle: 'Rural road connectivity programme connecting all-weather roads to unconnected villages.',
    tag: 'Infrastructure',
    icon: Building,
    color: '#F97316',
    ministry: 'Ministry of Rural Development',
    eligibility: 'Villages with population 250+ (hilly areas 100+)',
    benefit: 'Road connectivity to village',
  },
  {
    id: 10,
    title: 'Atal Pension Yojana',
    subtitle: 'Government-backed pension scheme for unorganized sector workers guaranteeing ₹1,000–₹5,000 monthly pension.',
    tag: 'Pension',
    icon: PiggyBank,
    color: '#64748B',
    ministry: 'Ministry of Finance',
    eligibility: 'Age 18–40, unorganized sector',
    benefit: '₹1,000–₹5,000/month pension',
  },
  {
    id: 11,
    title: 'PM Suraksha Bima Yojana',
    subtitle: 'Accidental death & disability insurance cover of ₹2 Lakhs at just ₹12/year premium.',
    tag: 'Finance',
    icon: Wallet,
    color: '#0EA5E9',
    ministry: 'Ministry of Finance',
    eligibility: 'Bank account holders aged 18–70',
    benefit: '₹2 Lakh cover @ ₹12/year',
  },
  {
    id: 12,
    title: 'Skill India Mission',
    subtitle: 'Training 40 crore Indians in industry-relevant skills by 2022 through 40+ sector skill councils.',
    tag: 'Education',
    icon: GraduationCap,
    color: '#22C55E',
    ministry: 'Ministry of Skill Development',
    eligibility: 'Youth aged 15–45 years',
    benefit: 'Free skill training + certification',
  },
  {
    id: 13,
    title: 'National Social Assistance Programme',
    subtitle: 'Monthly pension for old-age, widows & disabled persons from BPL households.',
    tag: 'Pension',
    icon: Users,
    color: '#A78BFA',
    ministry: 'Ministry of Rural Development',
    eligibility: 'BPL — elderly, widows, disabled',
    benefit: '₹200–₹500/month',
  },
  {
    id: 14,
    title: 'PM Kisan Mandhan Yojana',
    subtitle: 'Voluntary pension scheme for small & marginal farmers providing ₹3,000/month at age 60.',
    tag: 'Agriculture',
    icon: Leaf,
    color: '#84CC16',
    ministry: 'Ministry of Agriculture',
    eligibility: 'Farmers aged 18–40, land ≤2 hectares',
    benefit: '₹3,000/month pension',
  },
  {
    id: 15,
    title: 'Minority Scholarship (Maulana Azad)',
    subtitle: 'Pre-matric & post-matric scholarships for students from minority communities.',
    tag: 'Minority',
    icon: GraduationCap,
    color: '#FB923C',
    ministry: 'Ministry of Minority Affairs',
    eligibility: 'Minority community students, income < ₹1L/year',
    benefit: '₹1,000–₹12,000/year',
  },
  {
    id: 16,
    title: 'PM Ujjwala Yojana',
    subtitle: 'Free LPG connections to women from BPL households eliminating indoor air pollution.',
    tag: 'Women & Child',
    icon: Baby,
    color: '#EF4444',
    ministry: 'Ministry of Petroleum',
    eligibility: 'Women from BPL households',
    benefit: 'Free LPG connection + cylinder',
  },
  {
    id: 17,
    title: 'AMRUT Scheme',
    subtitle: 'Providing water supply, sewerage & urban transport in 500 mission cities across India.',
    tag: 'Infrastructure',
    icon: Bus,
    color: '#06B6D4',
    ministry: 'Ministry of Housing & Urban Affairs',
    eligibility: 'Urban local bodies in mission cities',
    benefit: 'Infrastructure development',
  },
  {
    id: 18,
    title: 'Sukanya Samriddhi Yojana',
    subtitle: 'High-interest savings account for girl child with 7.6% interest and tax benefits under Sec 80C.',
    tag: 'Women & Child',
    icon: Baby,
    color: '#DB2777',
    ministry: 'Ministry of Finance',
    eligibility: 'Girl children below 10 years',
    benefit: '7.6% interest + tax benefits',
  },
];

const TAGS = ['All', 'Agriculture', 'Healthcare', 'Education', 'Business', 'Housing', 'Finance', 'Infrastructure', 'Pension', 'Women & Child', 'Minority'];

const SchemesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return ALL_SCHEMES.filter((s) => {
      const matchTag = activeTag === 'All' || s.tag === activeTag;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q);
      return matchTag && matchSearch;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF9F0 50%, #F0F4FF 100%)' }}>
      {/* Hero banner */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 60%, #0d3d2e 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#2E9F75] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#FFD166] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-[#2E9F75]/20 border border-[#2E9F75]/30 rounded-full text-[#4ecca3] text-sm font-semibold mb-4">
              500+ Schemes Available
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Browse All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF7A45]">Government Schemes</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-['DM_Sans']">
              Discover schemes you're eligible for. Filter by category, search by name, and apply directly.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 relative max-w-2xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, category, or benefit..."
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#2E9F75]/60 focus:border-[#2E9F75]/40 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-[#2E9F75] text-white shadow-lg shadow-[#2E9F75]/30'
                  : 'bg-white/70 text-[#0B2545]/70 hover:bg-white hover:text-[#0B2545] border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-['DM_Sans'] text-[#0B2545]/60 text-sm">
            Showing <span className="font-bold text-[#0B2545]">{filtered.length}</span> schemes
            {activeTag !== 'All' && <> in <span className="font-bold text-[#2E9F75]">{activeTag}</span></>}
          </p>
        </div>

        {/* Schemes Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scheme, idx) => {
              const Icon = scheme.icon;
              const isExpanded = expandedId === scheme.id;
              return (
                <motion.div
                  key={scheme.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                >
                  {/* Card top accent */}
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${scheme.color}, ${scheme.color}88)` }} />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0" style={{ background: `${scheme.color}18` }}>
                        <Icon size={22} style={{ color: scheme.color }} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${scheme.color}15`, color: scheme.color }}>
                        {scheme.tag}
                      </span>
                    </div>

                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#0B2545] mb-2 group-hover:text-[#2E9F75] transition-colors">
                      {scheme.title}
                    </h3>
                    <p className="font-['DM_Sans'] text-[#111827]/60 text-sm leading-relaxed mb-4">
                      {scheme.subtitle}
                    </p>

                    {/* Benefit badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-[#F0FDF4] px-3 py-1.5 rounded-lg">
                        <span className="text-[#2E9F75] text-xs font-bold">Benefit:</span>
                        <span className="text-[#0B2545] text-xs font-semibold">{scheme.benefit}</span>
                      </div>
                      <ChevronDown size={16} className={`text-[#0B2545]/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                            <div>
                              <span className="text-xs font-bold text-[#0B2545]/50 uppercase tracking-wider">Ministry</span>
                              <p className="text-sm text-[#0B2545] font-medium mt-0.5">{scheme.ministry}</p>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#0B2545]/50 uppercase tracking-wider">Eligibility</span>
                              <p className="text-sm text-[#0B2545] font-medium mt-0.5">{scheme.eligibility}</p>
                            </div>
                            <a
                              href="https://www.india.gov.in/spotlight/schemes"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="mt-2 flex items-center gap-2 bg-[#2E9F75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a7a52] transition-colors w-full justify-center"
                            >
                              Apply Now <ArrowRight size={15} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B2545] mb-2">No schemes found</h3>
            <p className="text-[#0B2545]/60">Try a different search term or category.</p>
            <button onClick={() => { setSearchQuery(''); setActiveTag('All'); }} className="mt-4 px-6 py-2.5 bg-[#2E9F75] text-white rounded-full font-semibold hover:bg-[#1a7a52] transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SchemesPage;

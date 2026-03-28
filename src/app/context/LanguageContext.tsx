import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LangCode = 'EN' | 'HI' | 'BN' | 'TE' | 'MR' | 'TA' | 'KN' | 'GU' | 'PA' | 'OR' | 'ML' | 'AS' | 'UR';

export interface Language {
  code: LangCode;
  label: string;
  native: string;
}

export const LANGUAGES: Language[] = [
  { code: 'EN', label: 'English',   native: 'English'   },
  { code: 'HI', label: 'Hindi',     native: 'हिंदी'      },
  { code: 'BN', label: 'Bengali',   native: 'বাংলা'      },
  { code: 'TE', label: 'Telugu',    native: 'తెలుగు'     },
  { code: 'MR', label: 'Marathi',   native: 'मराठी'      },
  { code: 'TA', label: 'Tamil',     native: 'தமிழ்'      },
  { code: 'KN', label: 'Kannada',   native: 'ಕನ್ನಡ'      },
  { code: 'GU', label: 'Gujarati',  native: 'ગુજરાતી'    },
  { code: 'PA', label: 'Punjabi',   native: 'ਪੰਜਾਬੀ'     },
  { code: 'OR', label: 'Odia',      native: 'ଓଡ଼ିଆ'       },
  { code: 'ML', label: 'Malayalam', native: 'മലയാളം'     },
  { code: 'AS', label: 'Assamese',  native: 'অসমীয়া'    },
  { code: 'UR', label: 'Urdu',      native: 'اردو'       },
];

// ─── Translation Strings ───────────────────────────────────────────────────────
export interface Translations {
  // Navbar
  nav_search_placeholder: string;
  nav_login: string;
  nav_my_account: string;
  nav_select_language: string;
  nav_home: string;
  nav_schemes: string;
  nav_how_it_works: string;
  nav_categories: string;
  nav_about: string;

  // Hero
  hero_headline_1: string;
  hero_headline_highlight: string;
  hero_headline_sep: string;   // punctuation between highlight and headline_2 (e.g. ',')
  hero_headline_2: string;
  hero_subtitle: string;
  hero_cta_explore: string;
  hero_cta_learn: string;
  hero_tagline: string;

  // Scheme card labels in hero
  hero_card_pmkisan_title: string;
  hero_card_pmkisan_sub: string;
  hero_card_scholarship_title: string;
  hero_card_scholarship_sub: string;
  hero_card_ayushman_title: string;
  hero_card_ayushman_sub: string;
  hero_card_pmawas_title: string;
  hero_card_pmawas_sub: string;

  // SchemeCarousel
  carousel_heading: string;
  carousel_subheading: string;

  // Scheme titles & subtitles
  scheme_ayushman_title: string;
  scheme_ayushman_sub: string;
  scheme_ayushman_tag: string;
  scheme_pmkisan_title: string;
  scheme_pmkisan_sub: string;
  scheme_pmkisan_tag: string;
  scheme_pmawas_title: string;
  scheme_pmawas_sub: string;
  scheme_pmawas_tag: string;
  scheme_startup_title: string;
  scheme_startup_sub: string;
  scheme_startup_tag: string;
  scheme_mudra_title: string;
  scheme_mudra_sub: string;
  scheme_mudra_tag: string;
  scheme_beti_title: string;
  scheme_beti_sub: string;
  scheme_beti_tag: string;

  // Stats Strip
  stat_schemes_label: string;
  stat_beneficiaries_label: string;
  stat_verified_label: string;
  stat_ai_label: string;

  // How It Works
  hiw_heading: string;
  hiw_sub: string;
  hiw_step1_title: string;
  hiw_step1_desc: string;
  hiw_step2_title: string;
  hiw_step2_desc: string;
  hiw_step3_title: string;
  hiw_step3_desc: string;
  hiw_step4_title: string;
  hiw_step4_desc: string;

  // Categories Grid
  cat_heading: string;
  cat_sub: string;
  cat_view_all: string;
  cat_agriculture: string;
  cat_agriculture_count: string;
  cat_healthcare: string;
  cat_healthcare_count: string;
  cat_education: string;
  cat_education_count: string;
  cat_business: string;
  cat_business_count: string;
  cat_housing: string;
  cat_housing_count: string;
  cat_women_child: string;
  cat_women_child_count: string;
  cat_infrastructure: string;
  cat_infrastructure_count: string;
  cat_pension: string;
  cat_pension_count: string;
  cat_minority: string;
  cat_minority_count: string;
  cat_transport: string;
  cat_transport_count: string;

  // Footer
  footer_tagline: string;
  footer_nav_heading: string;
  footer_nav_home: string;
  footer_nav_how: string;
  footer_nav_all_schemes: string;
  footer_nav_about: string;
  footer_cat_heading: string;
  footer_legal_heading: string;
  footer_legal_privacy: string;
  footer_legal_terms: string;
  footer_legal_help: string;
  footer_legal_contact: string;
  footer_copyright: string;
  footer_made_in_india: string;
  footer_secure: string;
}

const EN: Translations = {
  // Navbar
  nav_search_placeholder: 'Search government schemes…',
  nav_login: 'Login',
  nav_my_account: 'My Account',
  nav_select_language: 'Select Language',
  nav_home: 'Home',
  nav_schemes: 'Schemes',
  nav_how_it_works: 'How It Works',
  nav_categories: 'Categories',
  nav_about: 'About',

  // Hero
  hero_headline_1: 'Find the',
  hero_headline_highlight: 'Right Scheme',
  hero_headline_sep: ',',
  hero_headline_2: 'Made for You',
  hero_subtitle: 'Personalized Government Schemes at Your Fingertips',
  hero_cta_explore: 'Explore Schemes',
  hero_cta_learn: 'Learn More',
  hero_tagline: 'Connecting You to Government Benefits That Matter',

  // Hero scheme cards
  hero_card_pmkisan_title: 'PM-KISAN',
  hero_card_pmkisan_sub: 'Support for Farmers',
  hero_card_scholarship_title: 'Scholarship',
  hero_card_scholarship_sub: 'Education Assistance',
  hero_card_ayushman_title: 'Ayushman Bharat',
  hero_card_ayushman_sub: 'Health Care for All',
  hero_card_pmawas_title: 'PM Awas Yojana',
  hero_card_pmawas_sub: 'Affordable Housing',

  // SchemeCarousel
  carousel_heading: 'Popular Schemes',
  carousel_subheading: 'Explore government programmes that could benefit you and your family.',

  // Scheme data
  scheme_ayushman_title: 'Ayushman Bharat',
  scheme_ayushman_sub: 'Health insurance coverage up to ₹5 Lakhs per family per year.',
  scheme_ayushman_tag: 'Healthcare',
  scheme_pmkisan_title: 'PM Kisan Samman Nidhi',
  scheme_pmkisan_sub: 'Direct financial support of ₹6,000 per year to farmers.',
  scheme_pmkisan_tag: 'Agriculture',
  scheme_pmawas_title: 'PM Awas Yojana',
  scheme_pmawas_sub: 'Affordable housing for all with subsidized interest rates.',
  scheme_pmawas_tag: 'Housing',
  scheme_startup_title: 'Startup India',
  scheme_startup_sub: 'Empowering startups with tax benefits and easy compliance.',
  scheme_startup_tag: 'Business',
  scheme_mudra_title: 'Mudra Yojana',
  scheme_mudra_sub: 'Micro-credit facility up to ₹10 Lakhs for small enterprises.',
  scheme_mudra_tag: 'Finance',
  scheme_beti_title: 'Beti Bachao Beti Padhao',
  scheme_beti_sub: 'Ensuring survival, protection, and education of the girl child.',
  scheme_beti_tag: 'Women & Child',

  // Stats Strip
  stat_schemes_label: 'Schemes Available',
  stat_beneficiaries_label: 'Beneficiaries',
  stat_verified_label: 'Verified Benefits',
  stat_ai_label: 'AI Support',

  // How It Works
  hiw_heading: 'How It Works',
  hiw_sub: 'Discovering your government benefits is now easier than ever.',
  hiw_step1_title: 'Enter Details',
  hiw_step1_desc: 'Fill in your basic profile info securely.',
  hiw_step2_title: 'AI Matching',
  hiw_step2_desc: 'Our engine scans 500+ schemes instantly.',
  hiw_step3_title: 'Review Schemes',
  hiw_step3_desc: "See exact benefits you're eligible for.",
  hiw_step4_title: 'Apply Easily',
  hiw_step4_desc: 'One-click guidance to official portals.',

  // Categories
  cat_heading: 'Browse by Category',
  cat_sub: 'Explore government initiatives segmented by your specific needs.',
  cat_view_all: 'View All',
  cat_agriculture: 'Agriculture',
  cat_agriculture_count: '24 Schemes',
  cat_healthcare: 'Healthcare',
  cat_healthcare_count: '18 Schemes',
  cat_education: 'Education',
  cat_education_count: '32 Schemes',
  cat_business: 'Business',
  cat_business_count: '15 Schemes',
  cat_housing: 'Housing',
  cat_housing_count: '8 Schemes',
  cat_women_child: 'Women & Child',
  cat_women_child_count: '12 Schemes',
  cat_infrastructure: 'Infrastructure',
  cat_infrastructure_count: '5 Schemes',
  cat_pension: 'Pension',
  cat_pension_count: '10 Schemes',
  cat_minority: 'Minority',
  cat_minority_count: '9 Schemes',
  cat_transport: 'Transport',
  cat_transport_count: '4 Schemes',

  // Footer
  footer_tagline: 'Connecting You to Government Benefits That Matter',
  footer_nav_heading: 'Navigation',
  footer_nav_home: 'Home',
  footer_nav_how: 'How it Works',
  footer_nav_all_schemes: 'All Schemes',
  footer_nav_about: 'About Us',
  footer_cat_heading: 'Categories',
  footer_legal_heading: 'Legal & Help',
  footer_legal_privacy: 'Privacy Policy',
  footer_legal_terms: 'Terms of Service',
  footer_legal_help: 'Help Center',
  footer_legal_contact: 'Contact Support',
  footer_copyright: '© 2026 Schemme Inc. All rights reserved.',
  footer_made_in_india: 'Made in India',
  footer_secure: 'Secure Platform',
};

const HI: Translations = {
  // Navbar
  nav_search_placeholder: 'सरकारी योजनाएँ खोजें…',
  nav_login: 'लॉगिन करें',
  nav_my_account: 'मेरा खाता',
  nav_select_language: 'भाषा चुनें',
  nav_home: 'होम',
  nav_schemes: 'योजनाएँ',
  nav_how_it_works: 'कैसे काम करता है',
  nav_categories: 'श्रेणियाँ',
  nav_about: 'हमारे बारे में',

  // Hero
  hero_headline_1: 'पाएँ अपनी',
  hero_headline_highlight: 'सही योजना',
  hero_headline_sep: ' —',
  hero_headline_2: 'सिर्फ आपके लिए',
  hero_subtitle: 'आपके लिए चुनी गई सरकारी योजनाएँ, एक ही जगह',
  hero_cta_explore: 'योजनाएँ देखें',
  hero_cta_learn: 'और जानें',
  hero_tagline: 'आपको सरकारी लाभों से जोड़ने की आपकी अपनी सेवा',

  // Hero scheme cards
  hero_card_pmkisan_title: 'पीएम-किसान',
  hero_card_pmkisan_sub: 'किसानों को आर्थिक सहायता',
  hero_card_scholarship_title: 'छात्रवृत्ति',
  hero_card_scholarship_sub: 'पढ़ाई के लिए मदद',
  hero_card_ayushman_title: 'आयुष्मान भारत',
  hero_card_ayushman_sub: 'सबके लिए मुफ़्त इलाज',
  hero_card_pmawas_title: 'पीएम आवास योजना',
  hero_card_pmawas_sub: 'सस्ते दाम पर अपना घर',

  // SchemeCarousel
  carousel_heading: 'लोकप्रिय योजनाएँ',
  carousel_subheading: 'जानें कि कौन सी सरकारी योजनाएँ आपको और आपके परिवार को फ़ायदा पहुँचा सकती हैं।',

  // Scheme data
  scheme_ayushman_title: 'आयुष्मान भारत',
  scheme_ayushman_sub: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ़्त स्वास्थ्य बीमा।',
  scheme_ayushman_tag: 'स्वास्थ्य',
  scheme_pmkisan_title: 'पीएम किसान सम्मान निधि',
  scheme_pmkisan_sub: 'किसानों को हर साल ₹6,000 सीधे बैंक खाते में।',
  scheme_pmkisan_tag: 'कृषि',
  scheme_pmawas_title: 'पीएम आवास योजना',
  scheme_pmawas_sub: 'कम ब्याज दर पर सबके लिए पक्का मकान बनाने की सुविधा।',
  scheme_pmawas_tag: 'आवास',
  scheme_startup_title: 'स्टार्टअप इंडिया',
  scheme_startup_sub: 'नए कारोबार शुरू करने वालों को टैक्स में छूट और आसान नियम।',
  scheme_startup_tag: 'व्यापार',
  scheme_mudra_title: 'मुद्रा योजना',
  scheme_mudra_sub: 'छोटे कारोबारियों को ₹10 लाख तक का आसान लोन।',
  scheme_mudra_tag: 'वित्त',
  scheme_beti_title: 'बेटी बचाओ, बेटी पढ़ाओ',
  scheme_beti_sub: 'बेटियों की सुरक्षा, पालन-पोषण और शिक्षा को बढ़ावा देना।',
  scheme_beti_tag: 'महिला एवं बाल',

  // Stats Strip
  stat_schemes_label: 'उपलब्ध योजनाएँ',
  stat_beneficiaries_label: 'लाभार्थी',
  stat_verified_label: 'सत्यापित लाभ',
  stat_ai_label: 'AI सहायता',

  // How It Works
  hiw_heading: 'यह कैसे काम करता है',
  hiw_sub: 'अपनी सरकारी योजनाएँ खोजना अब पहले से कहीं अधिक आसान हो गया है।',
  hiw_step1_title: 'जानकारी भरें',
  hiw_step1_desc: 'अपनी बुनियादी प्रोफाइल जानकारी सुरक्षित तरीके से दर्ज करें।',
  hiw_step2_title: 'AI से मिलान',
  hiw_step2_desc: 'हमारा सिस्टम तुरंत 500+ योजनाओं की जाँच करता है।',
  hiw_step3_title: 'योजनाएँ देखें',
  hiw_step3_desc: 'जानें कि आप किन-किन सरकारी लाभों के हकदार हैं।',
  hiw_step4_title: 'आसानी से आवेदन करें',
  hiw_step4_desc: 'एक क्लिक में सरकारी पोर्टल पर जाएँ और आवेदन करें।',

  // Categories
  cat_heading: 'श्रेणी के अनुसार खोजें',
  cat_sub: 'अपनी ज़रूरत के हिसाब से सरकारी योजनाएँ देखें।',
  cat_view_all: 'सभी देखें',
  cat_agriculture: 'कृषि',
  cat_agriculture_count: '24 योजनाएँ',
  cat_healthcare: 'स्वास्थ्य',
  cat_healthcare_count: '18 योजनाएँ',
  cat_education: 'शिक्षा',
  cat_education_count: '32 योजनाएँ',
  cat_business: 'व्यापार',
  cat_business_count: '15 योजनाएँ',
  cat_housing: 'आवास',
  cat_housing_count: '8 योजनाएँ',
  cat_women_child: 'महिला एवं बाल',
  cat_women_child_count: '12 योजनाएँ',
  cat_infrastructure: 'बुनियादी ढाँचा',
  cat_infrastructure_count: '5 योजनाएँ',
  cat_pension: 'पेंशन',
  cat_pension_count: '10 योजनाएँ',
  cat_minority: 'अल्पसंख्यक',
  cat_minority_count: '9 योजनाएँ',
  cat_transport: 'परिवहन',
  cat_transport_count: '4 योजनाएँ',

  // Footer
  footer_tagline: 'आपको सरकारी लाभों से जोड़ने की आपकी अपनी सेवा',
  footer_nav_heading: 'पेज',
  footer_nav_home: 'होम',
  footer_nav_how: 'कैसे काम करता है',
  footer_nav_all_schemes: 'सभी योजनाएँ',
  footer_nav_about: 'हमारे बारे में',
  footer_cat_heading: 'श्रेणियाँ',
  footer_legal_heading: 'नीति और सहायता',
  footer_legal_privacy: 'गोपनीयता नीति',
  footer_legal_terms: 'उपयोग की शर्तें',
  footer_legal_help: 'सहायता केंद्र',
  footer_legal_contact: 'हमसे संपर्क करें',
  footer_copyright: '© 2026 Schemme Inc. सर्वाधिकार सुरक्षित।',
  footer_made_in_india: '🇮🇳 भारत में बना',
  footer_secure: 'सुरक्षित प्लेटफ़ॉर्म',
};

// For languages without full translations, default to English.
const TRANSLATION_MAP: Partial<Record<LangCode, Translations>> = {
  EN,
  HI,
};

export function getTranslations(code: LangCode): Translations {
  return TRANSLATION_MAP[code] ?? EN;
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: LANGUAGES[0],
  setLanguage: () => {},
  t: EN,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);
  const [t, setT] = useState<Translations>(EN);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setT(getTranslations(lang.code));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

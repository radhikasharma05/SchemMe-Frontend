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

const BN: Translations = {
  // Navbar
  nav_search_placeholder: 'সরকারি প্রকল্প খুঁজুন…',
  nav_login: 'লগইন করুন',
  nav_my_account: 'আমার অ্যাকাউন্ট',
  nav_select_language: 'ভাষা বেছে নিন',
  nav_home: 'হোম',
  nav_schemes: 'প্রকল্প',
  nav_how_it_works: 'কীভাবে কাজ করে',
  nav_categories: 'বিভাগ',
  nav_about: 'আমাদের সম্পর্কে',

  // Hero
  hero_headline_1: 'খুঁজে নিন আপনার',
  hero_headline_highlight: 'সঠিক প্রকল্প',
  hero_headline_sep: ' —',
  hero_headline_2: 'শুধু আপনার জন্য',
  hero_subtitle: 'আপনার জন্য বাছাই করা সরকারি প্রকল্প, এক জায়গায়',
  hero_cta_explore: 'প্রকল্প দেখুন',
  hero_cta_learn: 'আরও জানুন',
  hero_tagline: 'সরকারি সুবিধার সঙ্গে আপনাকে সংযুক্ত করছি',

  // Hero scheme cards
  hero_card_pmkisan_title: 'পিএম-কিষান',
  hero_card_pmkisan_sub: 'কৃষকদের আর্থিক সহায়তা',
  hero_card_scholarship_title: 'বৃত্তি',
  hero_card_scholarship_sub: 'শিক্ষার জন্য সহায়তা',
  hero_card_ayushman_title: 'আয়ুষ্মান ভারত',
  hero_card_ayushman_sub: 'সবার জন্য স্বাস্থ্যসেবা',
  hero_card_pmawas_title: 'পিএম আবাস যোজনা',
  hero_card_pmawas_sub: 'সাশ্রয়ী মূল্যে বাড়ি',

  // SchemeCarousel
  carousel_heading: 'জনপ্রিয় প্রকল্প',
  carousel_subheading: 'কোন সরকারি প্রকল্পগুলো আপনার ও আপনার পরিবারের উপকারে আসতে পারে তা জানুন।',

  // Scheme data
  scheme_ayushman_title: 'আয়ুষ্মান ভারত',
  scheme_ayushman_sub: 'প্রতি পরিবারে প্রতি বছর ₹৫ লক্ষ পর্যন্ত বিনামূল্যে স্বাস্থ্যবিমা।',
  scheme_ayushman_tag: 'স্বাস্থ্য',
  scheme_pmkisan_title: 'পিএম কিষান সম্মান নিধি',
  scheme_pmkisan_sub: 'কৃষকদের প্রতি বছর ₹৬,০০০ সরাসরি ব্যাংক অ্যাকাউন্টে।',
  scheme_pmkisan_tag: 'কৃষি',
  scheme_pmawas_title: 'পিএম আবাস যোজনা',
  scheme_pmawas_sub: 'কম সুদে সবার জন্য পাকা বাড়ি নির্মাণের সুবিধা।',
  scheme_pmawas_tag: 'আবাসন',
  scheme_startup_title: 'স্টার্টআপ ইন্ডিয়া',
  scheme_startup_sub: 'নতুন ব্যবসা শুরু করতে কর ছাড় এবং সহজ নিয়ম।',
  scheme_startup_tag: 'ব্যবসা',
  scheme_mudra_title: 'মুদ্রা যোজনা',
  scheme_mudra_sub: 'ক্ষুদ্র উদ্যোক্তাদের জন্য ₹১০ লক্ষ পর্যন্ত সহজ ঋণ।',
  scheme_mudra_tag: 'অর্থ',
  scheme_beti_title: 'বেটি বাঁচাও বেটি পড়াও',
  scheme_beti_sub: 'কন্যাশিশুর বেঁচে থাকা, সুরক্ষা ও শিক্ষা নিশ্চিত করা।',
  scheme_beti_tag: 'নারী ও শিশু',

  // Stats Strip
  stat_schemes_label: 'প্রকল্প সমূহ',
  stat_beneficiaries_label: 'সুবিধাভোগী',
  stat_verified_label: 'যাচাইকৃত সুবিধা',
  stat_ai_label: 'AI সহায়তা',

  // How It Works
  hiw_heading: 'কীভাবে কাজ করে',
  hiw_sub: 'আপনার সরকারি সুবিধাগুলো খোঁজা এখন আগের চেয়ে অনেক সহজ।',
  hiw_step1_title: 'তথ্য দিন',
  hiw_step1_desc: 'আপনার মৌলিক প্রোফাইল তথ্য নিরাপদে পূরণ করুন।',
  hiw_step2_title: 'AI মিলিয়ে দেখুন',
  hiw_step2_desc: 'আমাদের সিস্টেম তাৎক্ষণিকভাবে ৫০০+ প্রকল্প স্ক্যান করে।',
  hiw_step3_title: 'প্রকল্প দেখুন',
  hiw_step3_desc: 'আপনি কোন কোন সরকারি সুবিধা পাবেন তা দেখুন।',
  hiw_step4_title: 'সহজে আবেদন করুন',
  hiw_step4_desc: 'এক ক্লিকে সরকারি পোর্টালে গিয়ে আবেদন করুন।',

  // Categories
  cat_heading: 'বিভাগ অনুযায়ী খুঁজুন',
  cat_sub: 'আপনার প্রয়োজন অনুযায়ী সরকারি উদ্যোগগুলো দেখুন।',
  cat_view_all: 'সব দেখুন',
  cat_agriculture: 'কৃষি',
  cat_agriculture_count: '২৪টি প্রকল্প',
  cat_healthcare: 'স্বাস্থ্য',
  cat_healthcare_count: '১৮টি প্রকল্প',
  cat_education: 'শিক্ষা',
  cat_education_count: '৩২টি প্রকল্প',
  cat_business: 'ব্যবসা',
  cat_business_count: '১৫টি প্রকল্প',
  cat_housing: 'আবাসন',
  cat_housing_count: '৮টি প্রকল্প',
  cat_women_child: 'নারী ও শিশু',
  cat_women_child_count: '১২টি প্রকল্প',
  cat_infrastructure: 'পরিকাঠামো',
  cat_infrastructure_count: '৫টি প্রকল্প',
  cat_pension: 'পেনশন',
  cat_pension_count: '১০টি প্রকল্প',
  cat_minority: 'সংখ্যালঘু',
  cat_minority_count: '৯টি প্রকল্প',
  cat_transport: 'পরিবহন',
  cat_transport_count: '৪টি প্রকল্প',

  // Footer
  footer_tagline: 'সরকারি সুবিধার সঙ্গে আপনাকে সংযুক্ত করছি',
  footer_nav_heading: 'পেজ',
  footer_nav_home: 'হোম',
  footer_nav_how: 'কীভাবে কাজ করে',
  footer_nav_all_schemes: 'সকল প্রকল্প',
  footer_nav_about: 'আমাদের সম্পর্কে',
  footer_cat_heading: 'বিভাগ',
  footer_legal_heading: 'নীতি ও সহায়তা',
  footer_legal_privacy: 'গোপনীয়তা নীতি',
  footer_legal_terms: 'ব্যবহারের শর্তাবলী',
  footer_legal_help: 'সহায়তা কেন্দ্র',
  footer_legal_contact: 'যোগাযোগ করুন',
  footer_copyright: '© ২০২৬ Schemme Inc. সর্বস্বত্ব সংরক্ষিত।',
  footer_made_in_india: '🇮🇳 ভারতে তৈরি',
  footer_secure: 'নিরাপদ প্ল্যাটফর্ম',
};

const TE: Translations = {
  // Navbar
  nav_search_placeholder: 'ప్రభుత్వ పథకాలు వెతకండి…',
  nav_login: 'లాగిన్ చేయండి',
  nav_my_account: 'నా ఖాతా',
  nav_select_language: 'భాష ఎంచుకోండి',
  nav_home: 'హోమ్',
  nav_schemes: 'పథకాలు',
  nav_how_it_works: 'ఇది ఎలా పని చేస్తుంది',
  nav_categories: 'వర్గాలు',
  nav_about: 'మా గురించి',

  // Hero
  hero_headline_1: 'మీకు తగిన',
  hero_headline_highlight: 'సరైన పథకం',
  hero_headline_sep: ' —',
  hero_headline_2: 'కనుగొనండి',
  hero_subtitle: 'మీ కోసం ఎంపిక చేసిన ప్రభుత్వ పథకాలు, ఒకే చోట',
  hero_cta_explore: 'పథకాలు చూడండి',
  hero_cta_learn: 'మరింత తెలుసుకోండి',
  hero_tagline: 'ప్రభుత్వ ప్రయోజనాలతో మిమ్మల్ని అనుసంధానం చేస్తున్నాం',

  // Hero scheme cards
  hero_card_pmkisan_title: 'పీఎం-కిసాన్',
  hero_card_pmkisan_sub: 'రైతులకు ఆర్థిక సహాయం',
  hero_card_scholarship_title: 'స్కాలర్‌షిప్',
  hero_card_scholarship_sub: 'విద్యా సహాయం',
  hero_card_ayushman_title: 'ఆయుష్మాన్ భారత్',
  hero_card_ayushman_sub: 'అందరికీ ఆరోగ్య సేవలు',
  hero_card_pmawas_title: 'పీఎం ఆవాస్ యోజన',
  hero_card_pmawas_sub: 'స్వంత ఇల్లు చౌకగా',

  // SchemeCarousel
  carousel_heading: 'జనాదరణ పొందిన పథకాలు',
  carousel_subheading: 'మీకు మరియు మీ కుటుంబానికి ఉపయోగపడే ప్రభుత్వ పథకాలు తెలుసుకోండి.',

  // Scheme data
  scheme_ayushman_title: 'ఆయుష్మాన్ భారత్',
  scheme_ayushman_sub: 'ప్రతి కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత ఆరోగ్య బీమా.',
  scheme_ayushman_tag: 'ఆరోగ్యం',
  scheme_pmkisan_title: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
  scheme_pmkisan_sub: 'రైతులకు సంవత్సరానికి ₹6,000 నేరుగా బ్యాంక్ ఖాతాకు.',
  scheme_pmkisan_tag: 'వ్యవసాయం',
  scheme_pmawas_title: 'పీఎం ఆవాస్ యోజన',
  scheme_pmawas_sub: 'తక్కువ వడ్డీకి అందరికీ స్వంత ఇల్లు నిర్మించుకోవడానికి సదుపాయం.',
  scheme_pmawas_tag: 'గృహవసతి',
  scheme_startup_title: 'స్టార్టప్ ఇండియా',
  scheme_startup_sub: 'కొత్త వ్యాపారాలకు పన్ను మినహాయింపులు మరియు సులభమైన నిబంధనలు.',
  scheme_startup_tag: 'వ్యాపారం',
  scheme_mudra_title: 'ముద్రా యోజన',
  scheme_mudra_sub: 'చిన్న వ్యాపారులకు ₹10 లక్షల వరకు సులభమైన రుణం.',
  scheme_mudra_tag: 'ఆర్థికం',
  scheme_beti_title: 'బేటీ బచావో బేటీ పఢావో',
  scheme_beti_sub: 'బాలికల మనుగడ, రక్షణ మరియు విద్యను నిర్ధారించడం.',
  scheme_beti_tag: 'మహిళలు & శిశువు',

  // Stats Strip
  stat_schemes_label: 'పథకాలు',
  stat_beneficiaries_label: 'లబ్ధిదారులు',
  stat_verified_label: 'ధృవీకరించిన ప్రయోజనాలు',
  stat_ai_label: 'AI సహాయం',

  // How It Works
  hiw_heading: 'ఇది ఎలా పని చేస్తుంది',
  hiw_sub: 'మీ ప్రభుత్వ ప్రయోజనాలు కనుగొనడం ఇప్పుడు మరింత సులభం.',
  hiw_step1_title: 'వివరాలు నమోదు చేయండి',
  hiw_step1_desc: 'మీ ప్రాథమిక ప్రొఫైల్ సమాచారాన్ని సురక్షితంగా నమోదు చేయండి.',
  hiw_step2_title: 'AI సరిపోలిక',
  hiw_step2_desc: 'మా సిస్టమ్ వెంటనే 500+ పథకాలను స్కాన్ చేస్తుంది.',
  hiw_step3_title: 'పథకాలు సమీక్షించండి',
  hiw_step3_desc: 'మీకు అర్హత ఉన్న ప్రయోజనాలు చూడండి.',
  hiw_step4_title: 'సులభంగా దరఖాస్తు చేయండి',
  hiw_step4_desc: 'ఒక్క క్లిక్‌లో అధికారిక పోర్టల్‌కు వెళ్ళండి.',

  // Categories
  cat_heading: 'వర్గం ప్రకారం చూడండి',
  cat_sub: 'మీ నిర్దిష్ట అవసరాలకు అనుగుణంగా ప్రభుత్వ పథకాలు అన్వేషించండి.',
  cat_view_all: 'అన్నీ చూడండి',
  cat_agriculture: 'వ్యవసాయం',
  cat_agriculture_count: '24 పథకాలు',
  cat_healthcare: 'ఆరోగ్యం',
  cat_healthcare_count: '18 పథకాలు',
  cat_education: 'విద్య',
  cat_education_count: '32 పథకాలు',
  cat_business: 'వ్యాపారం',
  cat_business_count: '15 పథకాలు',
  cat_housing: 'గృహవసతి',
  cat_housing_count: '8 పథకాలు',
  cat_women_child: 'మహిళలు & శిశువు',
  cat_women_child_count: '12 పథకాలు',
  cat_infrastructure: 'మౌలిక సదుపాయాలు',
  cat_infrastructure_count: '5 పథకాలు',
  cat_pension: 'పెన్షన్',
  cat_pension_count: '10 పథకాలు',
  cat_minority: 'మైనారిటీ',
  cat_minority_count: '9 పథకాలు',
  cat_transport: 'రవాణా',
  cat_transport_count: '4 పథకాలు',

  // Footer
  footer_tagline: 'ప్రభుత్వ ప్రయోజనాలతో మిమ్మల్ని అనుసంధానం చేస్తున్నాం',
  footer_nav_heading: 'నావిగేషన్',
  footer_nav_home: 'హోమ్',
  footer_nav_how: 'ఇది ఎలా పని చేస్తుంది',
  footer_nav_all_schemes: 'అన్ని పథకాలు',
  footer_nav_about: 'మా గురించి',
  footer_cat_heading: 'వర్గాలు',
  footer_legal_heading: 'చట్టపరమైన & సహాయం',
  footer_legal_privacy: 'గోప్యతా విధానం',
  footer_legal_terms: 'సేవా నిబంధనలు',
  footer_legal_help: 'సహాయ కేంద్రం',
  footer_legal_contact: 'సహాయం కోసం సంప్రదించండి',
  footer_copyright: '© 2026 Schemme Inc. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
  footer_made_in_india: '🇮🇳 భారతదేశంలో తయారైనది',
  footer_secure: 'సురక్షిత వేదిక',
};

const MR: Translations = {
  // Navbar
  nav_search_placeholder: 'सरकारी योजना शोधा…',
  nav_login: 'लॉगिन करा',
  nav_my_account: 'माझे खाते',
  nav_select_language: 'भाषा निवडा',
  nav_home: 'मुखपृष्ठ',
  nav_schemes: 'योजना',
  nav_how_it_works: 'हे कसे कार्य करते',
  nav_categories: 'श्रेणी',
  nav_about: 'आमच्याबद्दल',

  // Hero
  hero_headline_1: 'शोधा तुमची',
  hero_headline_highlight: 'योग्य योजना',
  hero_headline_sep: ' —',
  hero_headline_2: 'फक्त तुमच्यासाठी',
  hero_subtitle: 'तुमच्यासाठी निवडलेल्या सरकारी योजना, एकाच ठिकाणी',
  hero_cta_explore: 'योजना पाहा',
  hero_cta_learn: 'अधिक जाणून घ्या',
  hero_tagline: 'सरकारी लाभांशी तुम्हाला जोडतो',

  // Hero scheme cards
  hero_card_pmkisan_title: 'पीएम-किसान',
  hero_card_pmkisan_sub: 'शेतकऱ्यांना आर्थिक मदत',
  hero_card_scholarship_title: 'शिष्यवृत्ती',
  hero_card_scholarship_sub: 'शिक्षणासाठी सहाय्य',
  hero_card_ayushman_title: 'आयुष्मान भारत',
  hero_card_ayushman_sub: 'सर्वांसाठी आरोग्य सेवा',
  hero_card_pmawas_title: 'पीएम आवास योजना',
  hero_card_pmawas_sub: 'स्वस्त दरात स्वतःचे घर',

  // SchemeCarousel
  carousel_heading: 'लोकप्रिय योजना',
  carousel_subheading: 'तुम्हाला आणि तुमच्या कुटुंबाला फायदेशीर ठरणाऱ्या सरकारी योजना जाणून घ्या.',

  // Scheme data
  scheme_ayushman_title: 'आयुष्मान भारत',
  scheme_ayushman_sub: 'प्रति कुटुंब प्रति वर्ष ₹5 लाखांपर्यंत मोफत आरोग्य विमा.',
  scheme_ayushman_tag: 'आरोग्य',
  scheme_pmkisan_title: 'पीएम किसान सन्मान निधी',
  scheme_pmkisan_sub: 'शेतकऱ्यांना दरवर्षी ₹6,000 थेट बँक खात्यात.',
  scheme_pmkisan_tag: 'शेती',
  scheme_pmawas_title: 'पीएम आवास योजना',
  scheme_pmawas_sub: 'कमी व्याजदरात सर्वांसाठी पक्के घर बांधण्याची सुविधा.',
  scheme_pmawas_tag: 'गृहनिर्माण',
  scheme_startup_title: 'स्टार्टअप इंडिया',
  scheme_startup_sub: 'नवीन व्यवसायांसाठी कर सवलती आणि सोपे नियम.',
  scheme_startup_tag: 'व्यवसाय',
  scheme_mudra_title: 'मुद्रा योजना',
  scheme_mudra_sub: 'लघु उद्योजकांसाठी ₹10 लाखांपर्यंत सहज कर्ज.',
  scheme_mudra_tag: 'वित्त',
  scheme_beti_title: 'बेटी बचाओ, बेटी पढाओ',
  scheme_beti_sub: 'मुलींचे जगणे, संरक्षण आणि शिक्षण सुनिश्चित करणे.',
  scheme_beti_tag: 'महिला व बाल',

  // Stats Strip
  stat_schemes_label: 'उपलब्ध योजना',
  stat_beneficiaries_label: 'लाभार्थी',
  stat_verified_label: 'पडताळलेले लाभ',
  stat_ai_label: 'AI सहाय्य',

  // How It Works
  hiw_heading: 'हे कसे कार्य करते',
  hiw_sub: 'तुमच्या सरकारी योजना शोधणे आता पूर्वीपेक्षा अधिक सोपे झाले आहे.',
  hiw_step1_title: 'माहिती भरा',
  hiw_step1_desc: 'तुमची मूलभूत प्रोफाइल माहिती सुरक्षितपणे भरा.',
  hiw_step2_title: 'AI जुळवणी',
  hiw_step2_desc: 'आमची प्रणाली तात्काळ 500+ योजना तपासते.',
  hiw_step3_title: 'योजना पाहा',
  hiw_step3_desc: 'तुम्ही कोणत्या सरकारी लाभांसाठी पात्र आहात ते पाहा.',
  hiw_step4_title: 'सहज अर्ज करा',
  hiw_step4_desc: 'एका क्लिकमध्ये अधिकृत पोर्टलवर जा आणि अर्ज करा.',

  // Categories
  cat_heading: 'श्रेणीनुसार शोधा',
  cat_sub: 'तुमच्या विशिष्ट गरजांनुसार सरकारी उपक्रम पाहा.',
  cat_view_all: 'सर्व पाहा',
  cat_agriculture: 'शेती',
  cat_agriculture_count: '24 योजना',
  cat_healthcare: 'आरोग्य',
  cat_healthcare_count: '18 योजना',
  cat_education: 'शिक्षण',
  cat_education_count: '32 योजना',
  cat_business: 'व्यवसाय',
  cat_business_count: '15 योजना',
  cat_housing: 'गृहनिर्माण',
  cat_housing_count: '8 योजना',
  cat_women_child: 'महिला व बाल',
  cat_women_child_count: '12 योजना',
  cat_infrastructure: 'पायाभूत सुविधा',
  cat_infrastructure_count: '5 योजना',
  cat_pension: 'पेन्शन',
  cat_pension_count: '10 योजना',
  cat_minority: 'अल्पसंख्याक',
  cat_minority_count: '9 योजना',
  cat_transport: 'वाहतूक',
  cat_transport_count: '4 योजना',

  // Footer
  footer_tagline: 'सरकारी लाभांशी तुम्हाला जोडतो',
  footer_nav_heading: 'नेव्हिगेशन',
  footer_nav_home: 'मुखपृष्ठ',
  footer_nav_how: 'हे कसे कार्य करते',
  footer_nav_all_schemes: 'सर्व योजना',
  footer_nav_about: 'आमच्याबद्दल',
  footer_cat_heading: 'श्रेणी',
  footer_legal_heading: 'कायदेशीर व मदत',
  footer_legal_privacy: 'गोपनीयता धोरण',
  footer_legal_terms: 'सेवा अटी',
  footer_legal_help: 'मदत केंद्र',
  footer_legal_contact: 'संपर्क समर्थन',
  footer_copyright: '© 2026 Schemme Inc. सर्व हक्क राखीव.',
  footer_made_in_india: '🇮🇳 भारतात बनविलेले',
  footer_secure: 'सुरक्षित व्यासपीठ',
};

const TA: Translations = {
  // Navbar
  nav_search_placeholder: 'அரசு திட்டங்களை தேடுங்கள்…',
  nav_login: 'உள்நுழையவும்',
  nav_my_account: 'என் கணக்கு',
  nav_select_language: 'மொழியை தேர்ந்தெடுங்கள்',
  nav_home: 'இல்லம்',
  nav_schemes: 'திட்டங்கள்',
  nav_how_it_works: 'இது எவ்வாறு இயங்குகிறது',
  nav_categories: 'வகைகள்',
  nav_about: 'எங்கள் பற்றி',

  // Hero
  hero_headline_1: 'உங்களுக்கு சரியான',
  hero_headline_highlight: 'திட்டங்கள்',
  hero_headline_sep: ' —',
  hero_headline_2: 'கண்டறியுங்கள்',
  hero_subtitle: 'உங்களுக்காக தேர்ந்தெடுக்கப்பட்ட அரசு திட்டங்கள், ஒரே இடத்தில்',
  hero_cta_explore: 'திட்டங்களை காணுங்கள்',
  hero_cta_learn: 'மேலும் அறியுங்கள்',
  hero_tagline: 'அரசு பயன்களுடன் உங்களை இணைக்கிறோம்',

  // Hero scheme cards
  hero_card_pmkisan_title: 'பிஏம்-கிசான்',
  hero_card_pmkisan_sub: 'விவசாயிகளுக்கு நிதி உதவி',
  hero_card_scholarship_title: 'உத்தியோகப்பண்',
  hero_card_scholarship_sub: 'கல்வி உதவி',
  hero_card_ayushman_title: 'ஆயுஷ்மான் பாரத்',
  hero_card_ayushman_sub: 'அனைவருக்கும் சுகாதார சேவை',
  hero_card_pmawas_title: 'பிஏம் ஆவாஸ் யோஜனா',
  hero_card_pmawas_sub: 'குலைசான விலையில் சொந்த வீடு',

  // SchemeCarousel
  carousel_heading: 'பிரபலமான திட்டங்கள்',
  carousel_subheading: 'உஙகளுக்கும் உங்களுடைய குடும்பத்தினருக்கும் பயன்படகூடிய அரசு திட்டங்களை அறியுங்கள்.',

  // Scheme data
  scheme_ayushman_title: 'ஆயுஷ்மான் பாரத்',
  scheme_ayushman_sub: 'ஒவ்வோரு குடும்பத்திற்கும் ஆண்டுக்கு ₹5 லட்சம் வரை இலவச ஜீவ காப்பீடு.',
  scheme_ayushman_tag: 'சுகாதாரம்',
  scheme_pmkisan_title: 'பிஏம் கிசான் சம்மான் நிதி',
  scheme_pmkisan_sub: 'விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 நேரடியாக வங்கி கணக்குக்கு.',
  scheme_pmkisan_tag: 'வேளாண்மை',
  scheme_pmawas_title: 'பிஏம் ஆவாஸ் யோஜனா',
  scheme_pmawas_sub: 'குறைந்த வட்டியில் அனைவருக்கும் சொந்த வீடு கட்ட வசதி.',
  scheme_pmawas_tag: 'வீட்டுவஞ்சம்',
  scheme_startup_title: 'ஸ்டார்ட்அப் இந்தியா',
  scheme_startup_sub: 'புதிய தொழில்களுக்கு வரி விலக்கு மற்றும் எளிய விதிமுறைகள்.',
  scheme_startup_tag: 'தொழில்',
  scheme_mudra_title: 'முத்ரா யோஜனா',
  scheme_mudra_sub: 'சிறு தொழில்முனைவோர்க்கு ₹10 லட்சம் வரை எளிய கடன்.',
  scheme_mudra_tag: 'நிதியியல்',
  scheme_beti_title: 'பெண்பிள்ளையை காப்பாற்று, பண்பொருளை கலி',
  scheme_beti_sub: 'பெண் குழந்தையின் வாழ்வு, பாதுகாப்பு மற்றும் கல்வியை உறுதிப்படுத்துதல்.',
  scheme_beti_tag: 'மகளிர் மற்றும் சிறுவர்',

  // Stats Strip
  stat_schemes_label: 'திட்டங்கள்',
  stat_beneficiaries_label: 'பயனடைபோர்',
  stat_verified_label: 'சரிபார்த்தப்பட்ட பயன்கள்',
  stat_ai_label: 'AI உதவி',

  // How It Works
  hiw_heading: 'இது எவ்வாறு இயங்குகிறது',
  hiw_sub: 'உங்களுடைய அரசு சட்டப்பயன்களை கண்டறிவது எல்லாதிலும் எளிதாகிவிட்டது.',
  hiw_step1_title: 'விவரங்களை உள்ளிடுங்கள்',
  hiw_step1_desc: 'உங்களுடைய அடிப்படை விவரங்களை பஞ்சத்துடன் பதிவு செய்யுங்கள்.',
  hiw_step2_title: 'AI பொருத்தல்',
  hiw_step2_desc: 'எங்கள் அமைப்பு உடனடியாக 500+ திட்டங்களை ஸ்கான் செய்கிறது.',
  hiw_step3_title: 'திட்டங்களை மதிப்பிடுங்கள்',
  hiw_step3_desc: 'உங்களுக்கு தகுதியான பயன்களை காணுங்கள்.',
  hiw_step4_title: 'எளிதாக விண்ணப்பிக்குங்கள்',
  hiw_step4_desc: 'ஒரே கிளிக்கில் உத்தியோகப்பூர்வ தளத்திற்கு செல்லுங்கள்.',

  // Categories
  cat_heading: 'வகைப்படி தேடுங்கள்',
  cat_sub: 'உங்களுடைய தேவைகளுக்கு ஏற்ப அரசு திட்டங்களை ஆராயுங்கள்.',
  cat_view_all: 'அனைத்தையும் காணுங்கள்',
  cat_agriculture: 'வேளாண்மை',
  cat_agriculture_count: '24 திட்டங்கள்',
  cat_healthcare: 'சுகாதாரம்',
  cat_healthcare_count: '18 திட்டங்கள்',
  cat_education: 'கல்வி',
  cat_education_count: '32 திட்டங்கள்',
  cat_business: 'தொழில்',
  cat_business_count: '15 திட்டங்கள்',
  cat_housing: 'வீட்டுவஞ்சம்',
  cat_housing_count: '8 திட்டங்கள்',
  cat_women_child: 'மகளிர் மற்றும் சிறுவர்',
  cat_women_child_count: '12 திட்டங்கள்',
  cat_infrastructure: 'அடிப்படை கட்டமைப்பு',
  cat_infrastructure_count: '5 திட்டங்கள்',
  cat_pension: 'முதியோர் ஜீவனாஞ்சியம்',
  cat_pension_count: '10 திட்டங்கள்',
  cat_minority: 'சிறுஞர்கள்',
  cat_minority_count: '9 திட்டங்கள்',
  cat_transport: 'பயண்',
  cat_transport_count: '4 திட்டங்கள்',

  // Footer
  footer_tagline: 'அரசு பயன்களுடன் உங்களை இணைக்கிறோம்',
  footer_nav_heading: 'செலவியடல்',
  footer_nav_home: 'இல்லம்',
  footer_nav_how: 'இது எவ்வாறு இயங்குகிறது',
  footer_nav_all_schemes: 'அனைத்து திட்டங்கள்',
  footer_nav_about: 'எங்கள் பற்றி',
  footer_cat_heading: 'வகைகள்',
  footer_legal_heading: 'சட்ட மற்றும் உதவி',
  footer_legal_privacy: 'தனியுரிமை கொள்கை',
  footer_legal_terms: 'சேவை விதிமுறைகள்',
  footer_legal_help: 'உதவி மையம்',
  footer_legal_contact: 'தொடர்பு பெறுங்கள்',
  footer_copyright: '© 2026 Schemme Inc. அனைத்து உரிமைகளும் காப்பாற்றப்பட்டது.',
  footer_made_in_india: '🇮🇳 இந்தியாவில் உருவாக்கப்பட்டது',
  footer_secure: 'பஞ்சுகாப்பான தளம்',
};

// For languages without full translations, default to English.
const TRANSLATION_MAP: Partial<Record<LangCode, Translations>> = {
  EN,
  HI,
  BN,
  TE,
  MR,
  TA,
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

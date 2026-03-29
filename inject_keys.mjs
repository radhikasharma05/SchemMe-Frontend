import fs from 'fs';

const filePath = 'src/app/context/LanguageContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const interfaceKeys = `
  // About Page
  about_our_mission: string;
  about_heading: string;
  about_subtitle: string;
  about_our_story: string;
  about_story_p1: string;
  about_story_p2: string;
  about_story_p3: string;
  about_values_heading: string;
  about_values_sub: string;
  about_team_heading: string;
  about_team_sub: string;
  about_contact_heading: string;
  about_contact_sub: string;
  about_cta: string;

  // How It Works Page (standalone)
  hiw_page_badge: string;
  hiw_page_title: string;
  hiw_page_sub: string;
  hiw_why_heading: string;
  hiw_why_sub: string;
  hiw_faq_heading: string;
  hiw_cta_heading: string;
  hiw_cta_sub: string;
  hiw_cta_btn: string;

  // Categories Page
  cat_page_badge: string;
  cat_page_title: string;
  cat_page_sub: string;
  cat_cta_heading: string;
  cat_cta_sub: string;
  cat_cta_btn: string;

  // Schemes Page
  schemes_page_title: string;
  schemes_page_sub: string;
  schemes_search_placeholder: string;
  schemes_loading: string;
  schemes_error: string;
  schemes_explore_btn: string;
  schemes_no_results: string;
  schemes_no_results_sub: string;
  schemes_clear_search: string;
  schemes_retry: string;

  // Login Page
  login_tagline: string;
  login_email_label: string;
  login_password_label: string;
  login_forgot_password: string;
  login_submit: string;
  login_create_account: string;
  login_trust: string;
  login_back_home: string;

  // Signup Page
  signup_tagline: string;
  signup_create_btn: string;
  signup_login_btn: string;
  signup_trust: string;
  signup_verify_heading: string;
  signup_verify_sub: string;
  signup_verify_btn: string;
  signup_resend: string;
  signup_back: string;
  signup_success_heading: string;
  signup_success_sub: string;`;

const hiKeys = `
  // About Page
  about_our_mission: 'हमारा उद्देश्य',
  about_heading: '140 करोड़ भारतीयों को उनके हक का लाभ',
  about_subtitle: 'हर साल हजारों करोड़ के सरकारी लाभ बिना दावे के रह जाते हैं। SchemMe यही बदलने के लिए है।',
  about_our_story: 'हमारी कहानी',
  about_story_p1: 'SchemMe एक साधारण निराशा से पैदा हुई — राजस्थान के एक किसान जो PM-KISAN, आयुष्मान भारत और दो राज्य स्तरीय योजनाओं के हकदार थे, लेकिन किसी ने उन्हें बताया ही नहीं।',
  about_story_p2: 'हमने SchemMe को भारत की विशाल कल्याण संरचना और उन नागरिकों के बीच सेतु बनाने के लिए बनाया जिनके लिए यह बनी है।',
  about_story_p3: 'आज SchemMe 2.8 करोड़ भारतीयों को सरकारी लाभ खोजने और पाने में मदद करता है — और हम अभी शुरुआत में हैं।',
  about_values_heading: 'हम किसके लिए खड़े हैं',
  about_values_sub: 'हमारे मूल्य हर निर्णय में मार्गदर्शन करते हैं।',
  about_team_heading: 'टीम से मिलें',
  about_team_sub: 'उत्साही लोग जो सरकारी लाभों को सुलभ बनाने के लिए काम कर रहे हैं।',
  about_contact_heading: 'संपर्क करें',
  about_contact_sub: 'कोई सवाल है या साझेदारी चाहते हैं? हम आपसे सुनना चाहेंगे।',
  about_cta: 'योजनाएँ देखना शुरू करें',

  // How It Works Page
  hiw_page_badge: 'सरल। पारदर्शी। मुफ़्त।',
  hiw_page_title: 'SchemMe कैसे काम करता है',
  hiw_page_sub: 'जानें हर वो सरकारी लाभ जिसके आप हकदार हैं — 4 आसान चरणों में।',
  hiw_why_heading: 'SchemMe क्यों चुनें?',
  hiw_why_sub: 'भारत के 140 करोड़ नागरिकों को ध्यान में रखकर बनाया गया।',
  hiw_faq_heading: 'अक्सर पूछे जाने वाले सवाल',
  hiw_cta_heading: 'अपने लाभ खोजने के लिए तैयार हैं?',
  hiw_cta_sub: '2.8 करोड़ भारतीय पहले से SchemMe का उपयोग कर रहे हैं।',
  hiw_cta_btn: 'योजनाएँ देखें',

  // Categories Page
  cat_page_badge: 'श्रेणियों में योजनाएँ',
  cat_page_title: 'श्रेणी के अनुसार खोजें',
  cat_page_sub: 'अपनी विशेष जरूरत के हिसाब से सही सरकारी योजना खोजें।',
  cat_cta_heading: 'नहीं जानते कौन सी श्रेणी आपके लिए है?',
  cat_cta_sub: 'हमारा AI आपकी प्रोफाइल देखकर सबसे उपयुक्त योजनाएँ सुझाएगा।',
  cat_cta_btn: 'मेरी योजनाएँ खोजें',

  // Schemes Page
  schemes_page_title: 'सरकारी योजनाएँ',
  schemes_page_sub: 'श्रेणी चुनें और डेटाबेस से सीधे असली योजनाएँ देखें।',
  schemes_search_placeholder: 'नाम, लाभ या कीवर्ड से योजना खोजें…',
  schemes_loading: 'लोड हो रहा है…',
  schemes_error: 'योजनाएँ लोड नहीं हो सकीं',
  schemes_explore_btn: 'योजना देखें →',
  schemes_no_results: 'कोई योजना नहीं मिली',
  schemes_no_results_sub: 'इस श्रेणी में अभी API से कोई योजना उपलब्ध नहीं है।',
  schemes_clear_search: 'खोज साफ़ करें',
  schemes_retry: 'पुनः प्रयास करें',

  // Login Page
  login_tagline: 'आपके लिए चुनी गई सरकारी योजनाएँ खोजें',
  login_email_label: 'ईमेल पता',
  login_password_label: 'पासवर्ड',
  login_forgot_password: 'पासवर्ड भूल गए?',
  login_submit: 'लॉगिन करें',
  login_create_account: 'नया खाता बनाएं',
  login_trust: 'आपका डेटा एन्क्रिप्टेड है और कभी शेयर नहीं किया जाता',
  login_back_home: '← होम पर वापस जाएँ',

  // Signup Page
  signup_tagline: 'अपनी प्रोफाइल बनाएं और अपनी योजनाएँ खोजें',
  signup_create_btn: 'मेरा खाता बनाएं',
  signup_login_btn: 'पहले से खाता है? लॉगिन करें',
  signup_trust: 'आपका डेटा एन्क्रिप्टेड है और केवल योजनाएँ सुझाने के लिए उपयोग होता है',
  signup_verify_heading: 'अपना ईमेल सत्यापित करें',
  signup_verify_sub: 'हमने 6-अंकी कोड भेजा है',
  signup_verify_btn: 'सत्यापित करें और खाता बनाएं',
  signup_resend: 'OTP पुनः भेजें',
  signup_back: '← साइनअप पर वापस',
  signup_success_heading: 'खाता बना दिया गया!',
  signup_success_sub: 'लॉगिन पर ले जाया जा रहा है…',`;

const enKeys = `
  // About Page
  about_our_mission: 'Our Mission',
  about_heading: '140 Crore Indians to Benefits They Deserve',
  about_subtitle: 'Every year, thousands of crores in government benefits go unclaimed. SchemMe exists to change that.',
  about_our_story: 'Our Story',
  about_story_p1: 'SchemMe was born out of a simple frustration — a farmer in rural Rajasthan who was eligible for PM-KISAN, Ayushman Bharat, and two state-level schemes, but had claimed none of them because nobody told him they existed.',
  about_story_p2: 'We built SchemMe to be the bridge between India\\'s vast welfare architecture and the citizens it was designed to serve.',
  about_story_p3: 'Today, SchemMe helps 2.8 crore Indians discover and access government benefits — and we\\'re just getting started.',
  about_values_heading: 'What We Stand For',
  about_values_sub: 'Our values guide every decision we make.',
  about_team_heading: 'Meet the Team',
  about_team_sub: 'Passionate people working to make government benefits accessible.',
  about_contact_heading: 'Get in Touch',
  about_contact_sub: 'Have a question or want to partner with us? We\\'d love to hear from you.',
  about_cta: 'Start Exploring Schemes',

  // How It Works Page
  hiw_page_badge: 'Simple. Transparent. Free.',
  hiw_page_title: 'How SchemMe Works',
  hiw_page_sub: 'Discover every government benefit you\\'re entitled to — in 4 simple steps.',
  hiw_why_heading: 'Why Choose SchemMe?',
  hiw_why_sub: 'Built with India\\'s 140 crore citizens in mind.',
  hiw_faq_heading: 'Frequently Asked Questions',
  hiw_cta_heading: 'Ready to find your benefits?',
  hiw_cta_sub: 'Join 2.8 crore Indians already using SchemMe.',
  hiw_cta_btn: 'Explore Schemes',

  // Categories Page
  cat_page_badge: 'Schemes across Categories',
  cat_page_title: 'Browse by Category',
  cat_page_sub: 'Find the right government scheme based on your specific needs and situation.',
  cat_cta_heading: 'Not sure which category fits you?',
  cat_cta_sub: 'Let our AI analyse your profile and recommend the most relevant schemes across all categories.',
  cat_cta_btn: 'Find My Schemes',

  // Schemes Page
  schemes_page_title: 'Government Schemes',
  schemes_page_sub: 'Select a category and instantly see real schemes from the database.',
  schemes_search_placeholder: 'Search schemes by name, benefit or keyword...',
  schemes_loading: 'Loading...',
  schemes_error: 'Could not load schemes',
  schemes_explore_btn: 'Explore Scheme →',
  schemes_no_results: 'No schemes found',
  schemes_no_results_sub: 'This category has no schemes from the API yet.',
  schemes_clear_search: 'Clear Search',
  schemes_retry: 'Retry',

  // Login Page
  login_tagline: 'Discover government schemes tailored for you',
  login_email_label: 'Email Address',
  login_password_label: 'Password',
  login_forgot_password: 'Forgot password?',
  login_submit: 'Submit',
  login_create_account: 'Create Account',
  login_trust: 'Your data is encrypted & never shared',
  login_back_home: '← Back to Home',

  // Signup Page
  signup_tagline: 'Create your profile to discover schemes tailored for you',
  signup_create_btn: 'Create My Account',
  signup_login_btn: 'Already have an account? Login',
  signup_trust: 'Your data is encrypted & used only to personalise scheme results',
  signup_verify_heading: 'Verify Your Email',
  signup_verify_sub: 'We\\'ve sent a 6-digit code to',
  signup_verify_btn: 'Verify & Create Account',
  signup_resend: 'Resend OTP',
  signup_back: '← Back to signup',
  signup_success_heading: 'Account Created!',
  signup_success_sub: 'Redirecting you to login...',`;

const bnKeys = `
  // About Page
  about_our_mission: 'আমাদের লক্ষ্য',
  about_heading: '১৪০ কোটি ভারতীয়দের জন্য তাদের প্রাপ্য সুবিধা',
  about_subtitle: 'প্রতি বছর, হাজার হাজার কোটি টাকার সরকারি সুবিধা দাবিহীন থেকে যায়। SchemMe এটি পরিবর্তন করতে এসেছে।',
  about_our_story: 'আমাদের গল্প',
  about_story_p1: 'SchemMe একটি সাধারণ হতাশা থেকে জন্ম নিয়েছিল — রাজস্থানের একজন কৃষক যিনি পিএম-কিষান, আয়ুষ্মান ভারত এবং দুটি রাজ্য-স্তরের প্রকল্পের যোগ্য ছিলেন, কিন্তু কেউ তাকে না বলার কারণে তিনি কোনোটির জন্যই দাবি করেননি।',
  about_story_p2: 'আমরা SchemMe তৈরি করেছি ভারতের বিশাল কল্যাণ কাঠামো এবং নাগরিকদের মধ্যে একটি সেতু হতে।',
  about_story_p3: 'আজ, SchemMe ২.৮ কোটি ভারতীয়দের সরকারি সুবিধাগুলি আবিষ্কার এবং অ্যাক্সেস করতে সাহায্য করে — এবং আমরা মাত্র শুরু করেছি।',
  about_values_heading: 'আমাদের আদর্শ',
  about_values_sub: 'আমাদের প্রতিটি সিদ্ধান্তে আমাদের মূল্যবোধ আমাদের পথ দেখায়।',
  about_team_heading: 'দলের সাথে পরিচিত হন',
  about_team_sub: 'সরকারি সুবিধাগুলিকে সহজলভ্য করতে কর্মরত উৎসাহী মানুষ।',
  about_contact_heading: 'যোগাযোগ করুন',
  about_contact_sub: 'কোনো প্রশ্ন আছে বা আমাদের সাথে অংশীদার হতে চান? আমরা আপনার কথা শুনতে চাই।',
  about_cta: 'প্রকল্পগুলি অন্বেষণ শুরু করুন',

  // How It Works Page
  hiw_page_badge: 'সহজ। স্বচ্ছ। বিনামূল্যে।',
  hiw_page_title: 'SchemMe কীভাবে কাজ করে',
  hiw_page_sub: 'আপনার প্রাপ্য প্রতিটি সরকারি সুবিধা আবিষ্কার করুন — ৪টি সহজ পদক্ষেপে।',
  hiw_why_heading: 'কেন SchemMe বেছে নেবেন?',
  hiw_why_sub: 'ভারতের ১৪০ কোটি নাগরিকদের কথা মাথায় রেখে তৈরি।',
  hiw_faq_heading: 'সচরাচর জিজ্ঞাস্য প্রশ্ন',
  hiw_cta_heading: 'আপনার সুবিধাগুলি খুঁজতে প্রস্তুত?',
  hiw_cta_sub: '২.৮ কোটি ভারতীয়দের সাথে যোগ দিন যারা ইতিমধ্যেই SchemMe ব্যবহার করছেন।',
  hiw_cta_btn: 'প্রকল্পগুলি দেখুন',

  // Categories Page
  cat_page_badge: 'বিভাগ জুড়ে প্রকল্প',
  cat_page_title: 'বিভাগ অনুযায়ী ব্রাউজ করুন',
  cat_page_sub: 'আপনার নির্দিষ্ট প্রয়োজন এবং পরিস্থিতির উপর ভিত্তি করে সঠিক সরকারি প্রকল্প খুঁজুন।',
  cat_cta_heading: 'কোন বিভাগটি আপনার জন্য উপযুক্ত তা নিশ্চিত নন?',
  cat_cta_sub: 'আমাদের AI আপনার প্রোফাইল বিশ্লেষণ করুক এবং সমস্ত বিভাগ জুড়ে সবচেয়ে প্রাসঙ্গিক প্রকল্পগুলি সুপারিশ করুক।',
  cat_cta_btn: 'আমার প্রকল্প খুঁজুন',

  // Schemes Page
  schemes_page_title: 'সরকারি প্রকল্প',
  schemes_page_sub: 'একটি বিভাগ নির্বাচন করুন এবং তাৎক্ষণিকভাবে রিয়েল প্রকল্পগুলি দেখুন।',
  schemes_search_placeholder: 'নাম, সুবিধা বা কীওয়ার্ড দিয়ে খুঁজুন...',
  schemes_loading: 'লোড হচ্ছে...',
  schemes_error: 'প্রকল্প লোড করা যায়নি',
  schemes_explore_btn: 'প্রকল্প দেখুন →',
  schemes_no_results: 'কোনো প্রকল্প পাওয়া যায়নি',
  schemes_no_results_sub: 'এই বিভাগে এখনও API থেকে কোনো প্রকল্প নেই।',
  schemes_clear_search: 'অনুসন্ধান মুছুন',
  schemes_retry: 'পুনরায় চেষ্টা করুন',

  // Login Page
  login_tagline: 'আপনার জন্য কাস্টমাইজ করা সরকারি প্রকল্প খুঁজুন',
  login_email_label: 'ইমেল ঠিকানা',
  login_password_label: 'পাসওয়ার্ড',
  login_forgot_password: 'পাসওয়ার্ড ভুলে গেছেন?',
  login_submit: 'লগইন',
  login_create_account: 'অ্যাকাউন্ট তৈরি করুন',
  login_trust: 'আপনার ডেটা এনক্রিপ্ট করা হয় এবং কখনো শেয়ার করা হয় না',
  login_back_home: '← হোমে ফিরে যান',

  // Signup Page
  signup_tagline: 'আপনার জন্য প্রকল্প খুঁজতে আপনার প্রোফাইল তৈরি করুন',
  signup_create_btn: 'আমার অ্যাকাউন্ট তৈরি করুন',
  signup_login_btn: 'ইতিমধ্যেই একটি অ্যাকাউন্ট আছে? লগইন করুন',
  signup_trust: 'আপনার ডেটা এনক্রিপ্ট করা হয় এবং শুধুমাত্র প্রকল্পের ফলাফল ব্যক্তিগতকৃত করতে ব্যবহৃত হয়',
  signup_verify_heading: 'আপনার ইমেল যাচাই করুন',
  signup_verify_sub: 'আমরা একটি ৬-সংখ্যার কোড পাঠিয়েছি',
  signup_verify_btn: 'যাচাই করুন এবং অ্যাকাউন্ট তৈরি করুন',
  signup_resend: 'OTP পুনরায় পাঠান',
  signup_back: '← সাইনআপে ফিরে যান',
  signup_success_heading: 'অ্যাকাউন্ট তৈরি হয়েছে!',
  signup_success_sub: 'আপনাকে লগইনে পুনঃনির্দেশিত করা হচ্ছে...',`;

const teKeys = `
  // About Page
  about_our_mission: 'మా లక్ష్యం',
  about_heading: '140 కోట్ల భారతీయులకు వారు అర్హులైన ప్రయోజనాలు',
  about_subtitle: 'ప్రతి సంవత్సరం, వేల కోట్ల రూపాయల ప్రభుత్వ పథకాలు క్లెయిమ్ చేయబడకుండా పోతున్నాయి. SchemMe దాన్ని మార్చడానికి వచ్చింది.',
  about_our_story: 'మా కథ',
  about_story_p1: 'SchemMe అనేది ఒక సాధారణ నిరాశ నుండి పుట్టింది — రాజస్థాన్‌కు చెందిన ఒక రైతు పీఎం-కిసాన్, ఆయుష్మాన్ భారత్ మరియు రెండు రాష్ట్ర-స్థాయి పథకాలకు అర్హుడు, కానీ ఎవరూ అతనికి చెప్పనందున దేనినీ క్లెయిమ్ చేయలేదు.',
  about_story_p2: 'మేము భారతదేశం యొక్క విస్తారమైన సంక్షేమ నిర్మాణం మరియు పౌరుల మధ్య వారధిగా ఉండేలా SchemMe ని నిర్మించాము.',
  about_story_p3: 'ఈ రోజు, ప్రభుత్వ ప్రయోజనాలను కనుగొనడంలో 2.8 కోట్ల భారతీయులకు SchemMe సహాయం చేస్తోంది — మరియు మేము ఇప్పుడే ప్రారంభించాము.',
  about_values_heading: 'మా విలువలు',
  about_values_sub: 'మా విలువలే మా ప్రతి నిర్ణయానికి మార్గనిర్దేశం చేస్తాయి.',
  about_team_heading: 'మా బృందాన్ని కలవండి',
  about_team_sub: 'ప్రభుత్వ ప్రయోజనాలను అందరికీ అందుబాటులోకి తీసుకురావడానికి పనిచేస్తున్న ఉత్సాహవంతులైన వ్యక్తులు.',
  about_contact_heading: 'సంప్రదించండి',
  about_contact_sub: 'ఏదైనా ప్రశ్న ఉందా లేదా మాతో కలిసి పనిచేయాలనుకుంటున్నారా? మేము వినడానికి ఇష్టపడతాము.',
  about_cta: 'పథకాలను అన్వేషించండి',

  // How It Works Page
  hiw_page_badge: 'సులభం. పారదర్శకం. ఉచితం.',
  hiw_page_title: 'SchemMe ఎలా పనిచేస్తుంది',
  hiw_page_sub: 'మీరు అర్హులైన ప్రతి ప్రభుత్వ ప్రయోజనాన్ని కనుగొనండి — 4 సులభమైన దశల్లో.',
  hiw_why_heading: 'SchemMe ని ఎందుకు ఎంచుకోవాలి?',
  hiw_why_sub: '140 కోట్ల భారతీయులను దృష్టిలో ఉంచుకుని నిర్మించబడింది.',
  hiw_faq_heading: 'తరచుగా అడిగే ప్రశ్నలు',
  hiw_cta_heading: 'మీ ప్రయోజనాలను కనుగొనడానికి సిద్ధంగా ఉన్నారా?',
  hiw_cta_sub: 'ఇప్పటికే SchemMe ని ఉపయోగిస్తున్న 2.8 కోట్ల భారతీయులతో చేరండి.',
  hiw_cta_btn: 'పథకాలను అన్వేషించండి',

  // Categories Page
  cat_page_badge: 'కేటగిరీల వారీగా పథకాలు',
  cat_page_title: 'కేటగిరీల ద్వారా బ్రౌజ్ చేయండి',
  cat_page_sub: 'మీ నిర్దిష్ట అవసరాలు మరియు పరిస్థితి ఆధారంగా సరైన ప్రభుత్వ పథకాన్ని కనుగొనండి.',
  cat_cta_heading: 'మీకు ఏ కేటగిరీ సరిపోతుందో ఖచ్చితంగా తెలియదా?',
  cat_cta_sub: 'మా AI మీ ప్రొఫైల్‌ను విశ్లేషించి, అత్యంత సంబంధిత పథకాలను సిఫార్సు చేస్తుంది.',
  cat_cta_btn: 'నా పథకాలను కనుగొనండి',

  // Schemes Page
  schemes_page_title: 'ప్రభుత్వ పథకాలు',
  schemes_page_sub: 'ఒక కేటగిరీని ఎంచుకోండి మరియు డేటాబేస్ నుండి తక్షణమే నిజమైన పథకాలను చూడండి.',
  schemes_search_placeholder: 'పేరు, ప్రయోజనం లేదా కీవర్డ్ ద్వారా వెతకండి...',
  schemes_loading: 'లోడ్ అవుతోంది...',
  schemes_error: 'పథకాలను లోడ్ చేయడం సాధ్యపడలేదు',
  schemes_explore_btn: 'పథకాన్ని అన్వేషించండి →',
  schemes_no_results: 'ఎటువంటి పథకాలు కనుగొనబడలేదు',
  schemes_no_results_sub: 'ఈ కేటగిరీలో ఇంకా API నుండి ఎలాంటి పథకాలు లేవు.',
  schemes_clear_search: 'శోధనను క్లియర్ చేయండి',
  schemes_retry: 'మళ్లీ ప్రయత్నించండి',

  // Login Page
  login_tagline: 'మీకు సరిపోయే ప్రభుత్వ పథకాలను కనుగొనండి',
  login_email_label: 'ఈమెయిల్',
  login_password_label: 'పాస్‌వర్డ్',
  login_forgot_password: 'పాస్‌వర్డ్ మర్చిపోయారా?',
  login_submit: 'లాగిన్ చేయండి',
  login_create_account: 'ఖాతాను సృష్టించండి',
  login_trust: 'మీ డేటా ఎన్‌క్రిప్ట్ చేయబడింది మరియు ఎప్పుడూ షేర్ చేయబడదు',
  login_back_home: '← హోమ్‌కి తిరిగి వెళ్ళండి',

  // Signup Page
  signup_tagline: 'మీ కోసం పథకాలను కనుగొనడానికి మీ ప్రొఫైల్‌ను సృష్టించండి',
  signup_create_btn: 'నా ఖాతాను సృష్టించండి',
  signup_login_btn: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ చేయండి',
  signup_trust: 'మీ డేటా ఎన్‌క్రిప్ట్ చేయబడింది మరియు కేవలం పథకాలను వ్యక్తిగతీకరించడానికి మాత్రమే ఉపయోగించబడుతుంది',
  signup_verify_heading: 'మీ ఈమెయిల్‌ని ధృవీకరించండి',
  signup_verify_sub: 'మేము 6-అంకెల కోడ్‌ను పంపాము',
  signup_verify_btn: 'ధృవీకరించి ఖాతాను సృష్టించండి',
  signup_resend: 'OTPని మళ్లీ పంపండి',
  signup_back: '← సైన్అప్‌కి తిరిగి వెళ్ళండి',
  signup_success_heading: 'ఖాతా సృష్టించబడింది!',
  signup_success_sub: 'మిమ్మల్ని లాగిన్‌కి మళ్లిస్తున్నాము...',`;

// 1. Insert interface keys
content = content.replace(
  /  footer_secure: string;\n\}/g,
  \`  footer_secure: string;\n\${interfaceKeys}\n}\`
);

// 2. Insert into the language objects
const lines = content.split('\\n');
const newLines = [];
let contextLang = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);
  
  if (line.match(/^const ([A-Z]+): Translations = \\{/)) {
    contextLang = line.match(/^const ([A-Z]+): Translations = \\{/)[1];
  }
  
  // Exclude the interface's \`footer_secure: string;\`
  if (line.includes('footer_secure:') && line.includes("'")) {
    let appendStr = enKeys;
    if (contextLang === 'HI') appendStr = hiKeys;
    if (contextLang === 'BN') appendStr = bnKeys;
    if (contextLang === 'TE') appendStr = teKeys;
    
    newLines.push(appendStr);
    contextLang = '';
  }
}

fs.writeFileSync(filePath, newLines.join('\\n'), 'utf8');
console.log('Successfully injected keys and translations directly as UTF-8!');

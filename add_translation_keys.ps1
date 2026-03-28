# Script to insert new translation keys into each language object (after footer_secure line)
$filePath = "C:\Users\aarya\OneDrive\Desktop\Hackrust\SchemMe-Frontend\src\app\context\LanguageContext.tsx"
$content = [System.IO.File]::ReadAllLines($filePath)

# HI translations for new keys
$HI_KEYS = @"

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
  signup_success_sub: 'लॉगिन पर ले जाया जा रहा है…',
"@

# English/default translations for new keys (used for all other languages)
$EN_KEYS = @"

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
  schemes_search_placeholder: 'Search schemes by name, benefit or keyword\u2026',
  schemes_loading: 'Loading\u2026',
  schemes_error: 'Could not load schemes',
  schemes_explore_btn: 'Explore Scheme \u2192',
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
  login_back_home: '\u2190 Back to Home',

  // Signup Page
  signup_tagline: 'Create your profile to discover schemes tailored for you',
  signup_create_btn: 'Create My Account',
  signup_login_btn: 'Already have an account? Login',
  signup_trust: 'Your data is encrypted & used only to personalise scheme results',
  signup_verify_heading: 'Verify Your Email',
  signup_verify_sub: 'We\\'ve sent a 6-digit code to',
  signup_verify_btn: 'Verify & Create Account',
  signup_resend: 'Resend OTP',
  signup_back: '\u2190 Back to signup',
  signup_success_heading: 'Account Created!',
  signup_success_sub: 'Redirecting you to login\u2026',
"@

# Read the file
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)
$totalLines = $lines.Length

Write-Output "Total lines: $totalLines"

# Find all lines that have "  footer_secure:" (in a language object, not the interface)
# The interface is at line 156 and the EN object is at line 343 (already handled)
# We need to find the OTHER occurrences: HI=530, BN=647, TE=764, ...
$langFooterLines = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "^\s+footer_secure:") {
        $lineNum = $i + 1  # 1-indexed
        if ($lineNum -ne 156 -and $lineNum -ne 343) {  # Skip interface and EN
            $langFooterLines += $i  # 0-indexed for array
        }
    }
}

Write-Output "Found $($langFooterLines.Count) language objects to update"
Write-Output ($langFooterLines | ForEach-Object { $_ + 1 }) -join ", "

# Process in reverse so insertions don't shift line numbers
$langFooterLines = $langFooterLines | Sort-Object -Descending

# Figure out which language each one is (first language after HI which will get special treatment)
# HI is the first one after EN (line 530 = index 529), get all others
$hiIndex = $langFooterLines | Where-Object { ($_ + 1) -eq 530 }

# Build new content by inserting after each footer_secure line (before the closing bracket)
$newLines = [System.Collections.Generic.List[string]]::new($lines)

foreach ($idx in $langFooterLines) {
    $lineNum = $idx + 1
    # Determine if this is HI (line 530)
    if ($lineNum -eq 530) {
        $keysToInsert = $HI_KEYS.Split("`n")
    } else {
        $keysToInsert = $EN_KEYS.Split("`n")
    }
    # Insert after the footer_secure line (at idx+1)
    $insertAt = $idx + 1
    for ($k = $keysToInsert.Length - 1; $k -ge 0; $k--) {
        $newLines.Insert($insertAt, $keysToInsert[$k])
    }
}

Write-Output "Writing updated file..."
[System.IO.File]::WriteAllLines($filePath, $newLines.ToArray(), [System.Text.Encoding]::UTF8)
Write-Output "Done! New line count: $($newLines.Count)"

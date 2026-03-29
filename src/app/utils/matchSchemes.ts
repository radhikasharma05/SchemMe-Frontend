import localSchemes from '../../res/schemes.json';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Scheme {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  benefits?: string;
  eligibility?: string;
  category?: string;
  level?: string;
  stateName?: string;
  tags?: string[];
}

export interface UserProfile {
  email?: string;
  gender?: string;       // "MALE" | "FEMALE"
  age?: number;
  maritalStatus?: string;// "SINGLE" | "MARRIED"
  areaType?: string;     // "URBAN" | "RURAL" | "SEMI_URBAN"
  state?: string;        // "Haryana", etc.
  socialCategory?: string; // "GENERAL" | "OBC" | "SC" | "ST"
  isPwD?: boolean;
  disabilityType?: string | null;
  disabilityPercentage?: number | null;
  occupation?: string;   // "STUDENT" | "FARMER" | "SALARIED" | etc.
  isBPL?: boolean;
  annualIncome?: string; // "BELOW_1_LAKH" | "1_TO_2_5_LAKH" | etc.
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────
const SCHEMES_COOKIE = 'schemme_schemes';

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
}

export function deleteSchemeCookie() {
  document.cookie = `${SCHEMES_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

// ─── Read saved scheme IDs from cookie ───────────────────────────────────────
export function getSavedSchemeIds(): number[] {
  try {
    const raw = getCookie(SCHEMES_COOKIE);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

// ─── Get full scheme objects for saved IDs ────────────────────────────────────
export function getSavedSchemes(): Scheme[] {
  const ids = getSavedSchemeIds();
  if (!ids.length) return [];
  const idSet = new Set(ids);
  return (localSchemes as Scheme[]).filter(s => idSet.has(s.id));
}

// ─── Occupation → best-fit categories ────────────────────────────────────────
const OCCUPATION_CATEGORIES: Record<string, string[]> = {
  STUDENT:        ['Education', 'Scholarship'],
  FARMER:         ['Agriculture', 'Rural', 'Farmer'],
  SALARIED:       ['Social Welfare', 'Health'],
  SELF_EMPLOYED:  ['Business', 'MSME', 'Entrepreneur'],
  BUSINESS_OWNER: ['Business', 'MSME'],
  DAILY_WAGE:     ['Labour', 'Social Welfare', 'Construction'],
  HOMEMAKER:      ['Women', 'Social Welfare'],
  SENIOR_CITIZEN: ['Pension', 'Health', 'Social Welfare'],
  UNEMPLOYED:     ['Social Welfare', 'Skill Development'],
};

// ─── Income → low-income flag ─────────────────────────────────────────────────
const INCOME_LABELS: Record<string, string> = {
  BELOW_1_LAKH:        'Below ₹1 Lakh',
  BETWEEN_1_TO_3_LAKH: '₹1 – 3 Lakh',
  BETWEEN_3_TO_5_LAKH: '₹3 – 5 Lakh',
  BETWEEN_5_TO_10_LAKH:'₹5 – 10 Lakh',
  ABOVE_10_LAKH:       'Above ₹10 Lakh',
};

const LOW_INCOME = new Set(['BELOW_1_LAKH', 'BETWEEN_1_TO_3_LAKH', 'BETWEEN_3_TO_5_LAKH']);

// ─── Score a single scheme for a user ────────────────────────────────────────
function scoreScheme(scheme: Scheme, profile: UserProfile): number {
  let score = 0;
  const eligText  = (scheme.eligibility ?? '').toLowerCase();
  const tagsLower = (scheme.tags ?? []).map(t => t.toLowerCase());
  const stateLower = (scheme.stateName ?? '').toLowerCase();
  const catLower  = (scheme.category ?? '').toLowerCase();

  // 1. State match (high weight)
  if (profile.state) {
    const userState = profile.state.toLowerCase();
    if (stateLower === 'center' || stateLower === '' || stateLower.includes('center')) {
      score += 2; // Central schemes apply to everyone
    } else if (stateLower.includes(userState) || userState.includes(stateLower)) {
      score += 5; // Same state — strong match
    } else {
      return -1; // Different state — skip entirely
    }
  }

  // 2. Occupation → category match
  const preferredCats = OCCUPATION_CATEGORIES[profile.occupation ?? ''] ?? [];
  for (const pc of preferredCats) {
    if (catLower.includes(pc.toLowerCase()) || tagsLower.some(t => t.includes(pc.toLowerCase()))) {
      score += 4;
    }
  }

  // 3. Social category
  if (profile.socialCategory && profile.socialCategory !== 'GENERAL') {
    const cat = profile.socialCategory.toLowerCase();
    if (tagsLower.some(t => t === cat || t.includes(cat)) || eligText.includes(cat)) {
      score += 3;
    }
  }

  // 4. BPL / low income
  if (profile.isBPL || LOW_INCOME.has(profile.annualIncome ?? '')) {
    if (tagsLower.includes('bpl') || eligText.includes('bpl') || eligText.includes('below poverty') ||
        eligText.includes('income') || tagsLower.includes('ews')) {
      score += 2;
    }
  }

  // 5. Gender-specific schemes
  if (profile.gender === 'FEMALE') {
    if (catLower.includes('women') || tagsLower.some(t => t.includes('women') || t.includes('mahila'))) {
      score += 3;
    }
  }

  // 6. PwD schemes
  if (profile.isPwD) {
    if (tagsLower.some(t => t.includes('disab') || t.includes('pwd') || t.includes('divyang')) ||
        eligText.includes('disab')) {
      score += 4;
    }
  }

  // 7. Area type
  if (profile.areaType === 'RURAL') {
    if (tagsLower.includes('rural') || eligText.includes('rural')) score += 2;
  }

  // 8. Age: student schemes need young age
  if (profile.occupation === 'STUDENT' && profile.age && profile.age <= 30) {
    if (catLower === 'education' || tagsLower.some(t => ['education', 'scholarship', 'student'].includes(t))) {
      score += 2;
    }
  }

  return score;
}

// ─── Main entry point — run after login/signup ────────────────────────────────
export function computeAndSavePersonalisedSchemes(profile: UserProfile, limit = 20): number[] {
  const scored = (localSchemes as Scheme[])
    .map(scheme => ({ id: scheme.id, score: scoreScheme(scheme, profile) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.id);

  // Shuffle top results slightly to keep it feeling fresh
  const shuffled = scored.sort(() => Math.random() - 0.35);
  const topIds = shuffled.slice(0, limit);

  setCookie(SCHEMES_COOKIE, JSON.stringify(topIds), 7);
  return topIds;
}

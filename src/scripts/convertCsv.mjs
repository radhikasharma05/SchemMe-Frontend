/**
 * convertCsv.mjs
 * Parses src/res/schemes.csv → src/res/schemes.json
 * Run once: node src/scripts/convertCsv.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH   = path.resolve(__dirname, '../res/schemes.csv');
const JSON_PATH  = path.resolve(__dirname, '../res/schemes.json');

// ── Minimal CSV parser that handles RFC-4180 quoting ─────────────────────────
function parseCsv(text) {
  const rows = [];
  let col = '', row = [], inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuote) {
      if (ch === '"' && next === '"') { col += '"'; i++; }
      else if (ch === '"')            { inQuote = false; }
      else                            { col += ch; }
    } else {
      if      (ch === '"')  { inQuote = true; }
      else if (ch === ',')  { row.push(col); col = ''; }
      else if (ch === '\r' && next === '\n') { row.push(col); col = ''; rows.push(row); row = []; i++; }
      else if (ch === '\n') { row.push(col); col = ''; rows.push(row); row = []; }
      else                  { col += ch; }
    }
  }
  if (col || row.length) { row.push(col); rows.push(row); }
  return rows;
}

// Fix mojibake from windows-1252/latin-1 read as utf-8
function fix(s = '') {
  return s
    .replace(/â‚¹/g, '₹')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g,  '"')
    .replace(/â€"/g, '–')
    .replace(/â€"/g, '—')
    .replace(/ï»¿/g, '')
    .replace(/Ã©/g,  'é')
    .replace(/\u00e2\u0080\u0099/g, "'")
    .trim();
}

// ── Category normalisation ────────────────────────────────────────────────────
const CAT_MAP = {
  'education & learning':                       'Education',
  'health & wellness':                          'Health',
  'women and child':                            'Women',
  'social welfare & empowerment':               'Social Welfare',
  'agriculture,rural & environment':            'Agriculture',
  'agriculture, rural & environment':           'Agriculture',
  'business & entrepreneurship':                'Business',
  'banking,financial services and insurance':   'Finance',
  'banking, financial services and insurance':  'Finance',
  'skills & employment':                        'Employment',
  'utility & sanitation':                       'Utility',
  'housing & shelter':                          'Housing',
  'transport & infrastructure':                 'Transport',
  'science, it & communications':               'Science & Tech',
  'sports & culture':                           'Sports & Culture',
  'legal & justice':                            'Legal',
};

function normCat(raw = '') {
  const key = raw.trim().toLowerCase();
  for (const [k, v] of Object.entries(CAT_MAP)) {
    if (key.includes(k)) return v;
  }
  // fallback: title-case the first segment
  return raw.split(',')[0].trim() || 'Other';
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('Reading CSV …');
const raw  = readFileSync(CSV_PATH, 'utf8');
const rows = parseCsv(raw);

const [header, ...dataRows] = rows;
console.log('Columns detected:', header.length, header);

// Column indices  (adjust if CSV changes)
// scheme_name, slug, details, benefits, eligibility, application, documents, level, schemeCategory, (empty), tags, level name, search tags
const COL = {
  name:        0,
  slug:        1,
  details:     2,
  benefits:    3,
  eligibility: 4,
  application: 5,
  documents:   6,
  level:       7,
  category:    8,
  stateName:   11,
  searchTags:  12,
};

const schemes = [];
let id = 1;

for (const row of dataRows) {
  if (row.length < 9) continue;                     // skip incomplete rows
  const name = fix(row[COL.name]);
  if (!name) continue;

  const rawTags = fix(row[COL.searchTags] || '');
  const tags    = rawTags
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);

  schemes.push({
    id,
    name,
    slug:           fix(row[COL.slug]),
    description:    fix(row[COL.details]).slice(0, 300),     // truncated – card preview
    descriptionFull:fix(row[COL.details]),                   // full – modal
    benefits:       fix(row[COL.benefits]),                  // full benefits
    eligibility:    fix(row[COL.eligibility]),               // full eligibility
    application:    fix(row[COL.application]),               // how to apply steps
    documents:      fix(row[COL.documents]),                 // required documents
    level:          fix(row[COL.level]),                     // "Central" | "State"
    category:       normCat(row[COL.category] || ''),
    stateName:      fix(row[COL.stateName]),                 // e.g. "Rajasthan"
    tags,
  });
  id++;
}

console.log(`Parsed ${schemes.length} schemes.`);
writeFileSync(JSON_PATH, JSON.stringify(schemes, null, 2), 'utf8');
console.log(`Written to ${JSON_PATH}`);

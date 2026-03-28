const fs = require('fs');

const cp1252_to_byte = {
  '\u20AC': 0x80, '\u201A': 0x82, '\u0192': 0x83, '\u201E': 0x84,
  '\u2026': 0x85, '\u2020': 0x86, '\u2021': 0x87, '\u02C6': 0x88,
  '\u2030': 0x89, '\u0160': 0x8A, '\u2039': 0x8B, '\u0152': 0x8C,
  '\u017D': 0x8E, '\u2018': 0x91, '\u2019': 0x92, '\u201C': 0x93,
  '\u201D': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97,
  '\u02DC': 0x98, '\u2122': 0x99, '\u0161': 0x9A, '\u203A': 0x9B,
  '\u0153': 0x9C, '\u017E': 0x9E, '\u0178': 0x9F
};

function decodeCP1252(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (cp1252_to_byte[char] !== undefined) {
      bytes[i] = cp1252_to_byte[char];
    } else {
      const code = char.charCodeAt(0);
      if (code <= 0xFF) {
        bytes[i] = code;
      } else {
        return null; // Contains chars that couldn't possibly be CP1252 mojibake
      }
    }
  }
  return Buffer.from(bytes).toString('utf8');
}

const raw = fs.readFileSync('src/app/context/LanguageContext.tsx', 'utf8');
const lines = raw.split('\n');
const line = lines[532];
console.log('Original line 533:', line);

const match = line.match(/'(.*)'/);
if (match) {
  const inner = match[1];
  const decoded = decodeCP1252(inner);
  console.log('Decoded:', decoded);
}

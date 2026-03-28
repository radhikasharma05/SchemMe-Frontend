import { readFileSync, writeFileSync } from 'fs';

const filepath = 'C:\\Users\\aarya\\OneDrive\\Desktop\\Hackrust\\SchemMe-Frontend\\src\\app\\context\\LanguageContext.tsx';
let content = readFileSync(filepath, 'utf8');

// Problem lines contain —" inside a double-quoted string, which terminates the string
// The â€" garbled sequence was: â + € + "  (the " was part of the original garbled sequence)
// Fix: replace —" with — throughout (the " after em-dash is always spurious)
// But we need to be careful not to replace legitimate "  after em-dash

// The pattern in the broken lines:
// "...benefits —" and we're..." -> "...benefits — and we're..."
// "...entitled to —" in..." -> "...entitled to — in..."

// Safe replacement: —" followed by a SPACE or letter should just be — + space/letter
const before1 = content.split('—" ').join('— ');
const before2 = before1.split('—",').join('—",');  // keep —", (em-dash at end of value) - actually these are wrong too

// Better: just remove the spurious " wherever it follows — within a string context
// Since these "s were never in the original content, remove ALL —" sequences  
let fixed = content;
fixed = fixed.split('—" ').join('— ');
fixed = fixed.split('—",').join('—",');  // the em-dash at end in single-quoted strings is fine

// Check if there are any remaining —" 
const remaining = (fixed.match(/—"/g) || []).length;
console.log(`Remaining —" occurrences: ${remaining}`);

// Show the affected lines  
const lines = fixed.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('—"')) {
    console.log(`Line ${i+1}: ${lines[i].substring(0, 120)}`);
  }
}

// Also: check that line 724 (single-quoted) doesn't have issue
// 'SchemMe was born...frustration —" a farmer' - the " here is inside '' so it's fine actually!
// Only problem is in double-quoted strings

// Let me check: in double-quoted strings, find patterns like: "...—"..."
// These need the inner " removed
const doubleQuoteWithEmDash = /"([^"]*—")[^"]*"/;
const matches = fixed.match(/"[^"]*—"[^"]*"/g) || [];
console.log(`Double-quoted strings with —": ${matches.length}`);
matches.slice(0, 5).forEach(m => console.log(' ', m.substring(0, 100)));

writeFileSync(filepath, fixed, 'utf8');
console.log('File saved.');

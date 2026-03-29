const fs = require('fs');

const filepath = 'C:\\Users\\aarya\\OneDrive\\Desktop\\Hackrust\\SchemMe-Frontend\\src\\app\\context\\LanguageContext.tsx';

let content = fs.readFileSync(filepath, 'utf8');
console.log('File length:', content.length);

// The broken pattern is: \\' (backslash backslash apostrophe in the actual file)
// This needs to become just: ' (apostrophe)
const badPattern = "\\\\'";  // This represents the 2-char sequence: backslash + apostrophe
const count = (content.match(/\\'/g) || []).length;
console.log(`Occurrences of \\' to fix: ${count}`);

// Show a sample
const idx = content.indexOf("\\'");
if (idx >= 0) {
  console.log('Sample:', JSON.stringify(content.substring(Math.max(0, idx-30), idx+40)));
}

// Replace \\' with '  in the non-EN blocks
// The EN block has legitimate \' escapes inside strings which are VALID in TS single-quoted strings
// The other blocks have \' which IS the same - wait, let me think...
// In the actual file: EN has \' = backslash + quote (valid TS escape in single-quoted string)
// But OTHER blocks (BN, TE...) have the SAME \' pattern but it came from the PS script...
// The PS here-string @"..."@ treats \' as literal backslash + quote in the output
// So both EN and BN have the same \' in the file, but EN compiles fine?
// Actually NO - EN was written directly in the replace_file_content tool which properly handles escaping
// The PS here-string output \' became literal \' in the file, which is the SAME as EN's \'
// So why does BN break but not EN?

// Let me check the actual byte count around position 31830
console.log('\nChecking content around the reported error position...');
// If the error is at line 725 col 69, let's find that
const lines = content.split('\n');
if (lines.length > 724) {
  const line = lines[724];
  console.log('Line 725:', JSON.stringify(line));
  console.log('Length:', line.length);
  if (line.length > 60) {
    console.log('Char at 69:', JSON.stringify(line[69]));
    console.log('Around 69:', JSON.stringify(line.substring(65, 75)));
  }
}

fs.writeFileSync(filepath + '.bak', content, 'utf8');
console.log('Backup written');

import re

filepath = r'C:\Users\aarya\OneDrive\Desktop\Hackrust\SchemMe-Frontend\src\app\context\LanguageContext.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"File length: {len(content)}")

# Count occurrences of \\' (double backslash then single quote)
bad_pattern = "\\\\'"  # This is the 3-char sequence: backslash backslash apostrophe
good_pattern = "'"      # Just apostrophe

count_bad = content.count(bad_pattern)
print(f"Occurrences of \\\\' to fix: {count_bad}")

# Show sample context
idx = content.find(bad_pattern)
if idx >= 0:
    print(f"Sample: {repr(content[max(0,idx-30):idx+40])}")

# Fix 1: Replace \\' with '  (the broken escaped apostrophes)
content = content.replace(bad_pattern, good_pattern)

# Fix 2: Fix corrupted em-dash (UTF-8 mojibake for —)
content = content.replace('\u00c3\u00a2\u00c2\u0080\u00c2\u0094', '\u2014')  # â€" -> —  
content = content.replace('\u00e2\u0080\u0094', '\u2014')  # proper em dash if stored wrong
# The HTML entity version
content = content.replace('â€"', '—')

# Fix 3: Remaining \\u2026 \\u2192 (double backslash before unicode escapes)
content = content.replace('\\\\u2026', '…')
content = content.replace('\\\\u2192', '→')  
content = content.replace('\\\\u2190', '←')

# Verify
remaining_bad = content.count(bad_pattern)
print(f"Remaining \\\\' after fix: {remaining_bad}")

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Done! File written.")

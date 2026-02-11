#!/usr/bin/env python3
"""
Add the 3 missing keys to incomplete languages
"""

import re

# Missing keys with English fallback
MISSING_KEYS = {
    "active": "Active",
    "search_placeholder": "SEARCH PRODUCTS",
    "export_intelligence": "Export Intelligence",
}

# Languages that need these keys
LANGS_NEEDING_ALL_3 = ['KO', 'FA', 'UR', 'VI', 'TH', 'ID', 'NL', 'PL', 'SV', 'EL', 'MS', 'AF', 'AK']
LANGS_NEEDING_2 = ['TR']  # TR already has 'active'

def add_missing_keys():
    with open('./src/app/lib/translations.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add all 3 keys to languages missing all 3
    for lang in LANGS_NEEDING_ALL_3:
        print(f"Processing {lang}...")
        pattern = rf'(const {lang} = \{{.*?)\}};'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            old_block = match.group(0)
            new_block = old_block[:-2] + f'\n  active: "{MISSING_KEYS["active"]}",\n  search_placeholder: "{MISSING_KEYS["search_placeholder"]}",\n  export_intelligence: "{MISSING_KEYS["export_intelligence"]}",\n}};\n'
            content = content.replace(old_block, new_block, 1)
            print(f"  ✓ Added 3 keys to {lang}")
    
    # Add 2 keys to TR (already has 'active')
    for lang in LANGS_NEEDING_2:
        print(f"Processing {lang}...")
        pattern = rf'(const {lang} = \{{.*?)\}};'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            old_block = match.group(0)
            new_block = old_block[:-2] + f'\n  search_placeholder: "{MISSING_KEYS["search_placeholder"]}",\n  export_intelligence: "{MISSING_KEYS["export_intelligence"]}",\n}};\n'
            content = content.replace(old_block, new_block, 1)
            print(f"  ✓ Added 2 keys to {lang}")
    
    # Write back
    with open('./src/app/lib/translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\n✅ All missing keys added!")

if __name__ == "__main__":
    add_missing_keys()

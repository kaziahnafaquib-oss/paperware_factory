#!/usr/bin/env python3
"""
Script to add Batch 2 translation keys to all remaining languages in translations.ts
"""

import re

# Define all Batch 2 translations for remaining languages
BATCH2_TRANSLATIONS = {
    "DE": {  # German
        "industry_intelligence": "Industrielle Intelligenz",
        "footer_subscribe_title": "Abonnieren Sie unseren",
        "footer_subscribe_gradient": "Globalen Update-Stream",
        "footer_subscribe_desc": "Erhalten Sie direkten Zugang zu Fertigungsinformationen, Nachhaltigkeitsberichten und Produktinnovationswarnungen.",
        "footer_placeholder": "Geben Sie Ihre Firmen-E-Mail ein...",
        "footer_join": "Beitreten",
        "footer_quick_links": "Schnelllinks",
        "footer_our_products": "Unsere Produkte",
        "footer_get_in_touch": "Kontaktieren Sie Uns",
        "footer_desc": "Premium B2B-Fertigungsplattform für nachhaltige Papierverpackungslösungen.",
        "nav_home": "Startseite",
        "nav_about": "Über Uns",
        "nav_papercups": "Papierbecher",
        "nav_sustainability": "Nachhaltigkeit",
        "nav_erp": "Unser ERP",
        "nav_contact": "Kontakt",
        "nav_privacy": "Datenschutzrichtlinie",
        "nav_carry_bag": "Tragetasche",
        "nav_box": "Schachtel",
        "nav_hangtag": "Anhänger",
        "nav_brochure": "Broschüre",
        "nav_envelope": "Umschlag",
        "nav_paper_cup": "Papierbecher",
        "made_in_bangladesh": "Hergestellt in Bangladesch",
        "status_live": "LIVE",
        "admin_hq": "Verwaltungszentrale",
        "audio_muted": "Audio Stumm",
        "audio_active": "Audio Aktiv",
        "initializing_stream": "Stream wird initialisiert...",
        "industrial_stream_protocol": "Industrielles Stream-Protokoll",
        "direct_neural_link_interrupted": "Direkte neurale Verbindung unterbrochen. Wechsel zur lokalen Redundanz.",
        "external_protocol": "Externes Protokoll",
        "bypass_restrictions": "Einschränkungen Umgehen",
        "sustainability_ecofriendly": "100% UMWELTFREUNDLICH",
        "ready_worldwide": "WELTWEIT BEREIT",
        "origin": "HERKUNFT",
        "clients_start": "Start",
        "audio_unmuted": "Audio Wird Abgespielt",
        "core_v4": "CORE_v4.2.0",
        "next_gen_mfg_eco": "Ökosystem der Fertigung der nächsten Generation",
        "company_get_in_touch": "In Kontakt treten",
    },
    # Add more languages here...
}

def generate_ts_block(translations):
    """Generate TypeScript code block for translations"""
    lines = ["  // Footer & Navigation - Batch 2"]
    for key, value in translations.items():
        # Escape quotes in value
        escaped_value = value.replace('"', '\\"')
        lines.append(f'  {key}: "{escaped_value}",')
    return "\n".join(lines)

def main():
    # Read the file
    with open('./src/app/lib/translations.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Process each language
    for lang_code, translations in BATCH2_TRANSLATIONS.items():
        print(f"Processing {lang_code}...")
        
        # Find the language block
        pattern = rf'(const {lang_code} = \{{.*?)\}};'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            # Generate translation block
            ts_block = generate_ts_block(translations)
            
            # Insert before closing brace
            old_block = match.group(0)
            new_block = old_block[:-2] + "\n  \n" + ts_block + "\n};"
            
            content = content.replace(old_block, new_block)
            print(f"  ✓ Added {len(translations)} keys to {lang_code}")
        else:
            print(f"  ✗ Could not find {lang_code} block")
    
    # Write back
    with open('./src/app/lib/translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\n✓ All translations added!")

if __name__ == "__main__":
    main()


import re
import sys
import os

def propagate_translations(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Get EN object body
    en_match = re.search(r'const EN = \{(.*?)\};', content, re.DOTALL)
    if not en_match:
        print("Could not find EN object")
        return
    
    # 1. Identify all language objects
    pattern = re.compile(r'const ([A-Z]{2}) = \{(.*?)\};', re.DOTALL)
    
    # Specific translations to inject
    injections = {
        'ES': {
            'technical_specifications': '"Especificaciones Técnicas"',
            'physical_prototypes': '"Prototipos Físicos"',
            'request_dummy': '"Solicitar Unidad de Muestra"',
            'eco_impact_estimate': '"Estimación de Impacto Ecológico"',
            'environmental_roi': '"ROI Ambiental"',
            'suggested_solutions': '"Soluciones Sugeridas"',
            'live_status': '"Estado en Vivo"',
            'line_04_batch': '"Línea 04: Produciendo Lote"',
            'sample_policy': '"Política de Muestras"',
            'eco_friendly_tag': '"Ecológico"',
            'live_production': '"Producción en Vivo"',
            'preview': '"Vista Previa"',
            'reviews': '"Reseñas"',
            'hours': '"Horas"',
            'order_volume': '"Volumen de Pedido"',
            'units': '"Unidades"'
        },
        'BN': {
            'technical_specifications': '"প্রযুক্তিগত বৈশিষ্ট্য"',
            'physical_prototypes': '"শারীরিক প্রোটোটাইপ"',
            'request_dummy': '"ডামি ইউনিটের অনুরোধ করুন"',
            'eco_impact_estimate': '"পরিবেশগত প্রভাবের হিসাব"',
            'environmental_roi': '"পরিবেশগত আরআই"',
            'suggested_solutions': '"প্রস্তাবিত সমাধান"',
            'live_status': '"লাইভ স্ট্যাটাস"',
            'line_04_batch': '"লাইন ০৪: প্রোডাকশন ব্যাচ"',
            'sample_policy': '"স্যাম্পল পলিসি"',
            'eco_friendly_tag': '"পরিবেশ বান্ধব"',
            'live_production': '"লাইভ প্রোডাকশন"',
            'preview': '"প্রিভিউ"',
            'reviews': '"রিভিউ"',
            'hours': '"ঘণ্টা"',
            'order_volume': '"অর্ডারের পরিমাণ"',
            'units': '"ইউনিট"'
        }
    }

    def process_lang(match):
        lang = match.group(1)
        body = match.group(2)
        
        if lang == 'EN':
            return match.group(0)
            
        # Split into lines
        lines = body.split('\n')
        new_lines = []
        
        # Ensure ...EN is at the top
        has_spread = any('...EN' in l for l in lines)
        if not has_spread:
            new_lines.append('  ...EN,')
            
        seen_keys = {} # key -> line index in new_lines
        
        # Filter existing lines
        current_idx = len(new_lines)
        for line in lines:
            line_strip = line.strip()
            if not line_strip: continue
            
            # Key matching
            m = re.match(r'^\s*([a-zA-Z0-9_]+)\s*:', line_strip)
            if m:
                key = m.group(1)
                if key in seen_keys:
                    idx = seen_keys[key]
                    new_lines[idx] = None
                seen_keys[key] = len(new_lines)
                new_lines.append(line)
            elif '...EN' in line_strip:
                if '...EN' in "".join([l for l in new_lines if l]):
                     continue # already added at top or exists
                new_lines.append(line)
            else:
                new_lines.append(line)

        # Inject specific translations if not already specifically translated (or override)
        if lang in injections:
            for key, val in injections[lang].items():
                line = f'  {key}: {val},'
                if key in seen_keys:
                    idx = seen_keys[key]
                    new_lines[idx] = line
                else:
                    new_lines.append(line)
        
        cleaned_body = '\n'.join([l for l in new_lines if l is not None])
        return f'const {lang} = {{\n{cleaned_body}\n}};'

    new_content = pattern.sub(process_lang, content)

    # Final cleanup of any potential syntax issues
    with open(filename, 'w') as f:
        f.write(new_content)
    print(f"Propagated keys to all languages in {filename}")

if __name__ == "__main__":
    propagate_translations(sys.argv[1])

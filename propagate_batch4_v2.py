
import re
import os

translations_path = '/Users/kazi.ahnaf.aquib/Downloads/Paperware Factory24:01:2026/src/app/lib/translations.ts'

batch4_extra_keys = {
    # Clients Metrics
    "system_throughput": "SYSTEM THROUGHPUT",
    "units_day": "Units/Day",
    "eco_efficiency": "ECO EFFICIENCY",
    "percent_rating": "%Rating",
    "thermal_load": "THERMAL LOAD",
    "deg_c_avg": "°CAvg",
    "system_retention": "Retention",
    "system_total": "Total",
    "clients_start": "Start",
    
    # About Us Machines & Specs (missing ones)
    "about_unit_pcs_day": "PCS / DAY",
    "about_unit_1_label": "OFFSET PRINTING",
    "about_unit_1_detail": "State-of-the-art Heidelberg speedmaster multi-color offset printing.",
    "about_machine_1": "Heidelberg XL-106",
    "about_spec_1_1": "15,000 Sheets/Hour High Speed",
    "about_spec_1_2": "AI Color Calibration Neural Core",
    "about_spec_1_3": "Eco-Inking UV Hybrid System",
    
    "about_unit_2_label": "CARTOON FORMING",
    "about_machine_2": "NeuralForm Pro-X",
    "about_unit_2_detail": "High-speed automated box forming and structural assembly line.",
    "about_spec_2_1": "Zero-Defect Laser Alignment",
    "about_spec_2_2": "Heat Responsive Neural Seal",
    "about_spec_2_3": "Multi-Format Flex Modular",
    
    "about_unit_3_label": "DIE CUTTING",
    "about_machine_3": "PrecisionCut 900",
    "about_unit_3_detail": "High-precision micron-level die cutting for complex geometries.",
    "about_spec_3_1": "Hydraulic Neural Pressure Control",
    "about_spec_3_2": "Automatic Waste Stripping",
    "about_spec_3_3": "0.01mm Precision Tolerance",
    
    "about_unit_4_label": "FOIL STAMPING",
    "about_machine_4": "LuxuryFinish 400",
    "about_unit_4_detail": "Premium metallic and soft-touch finishing for luxury branding.",
    "about_spec_4_1": "Precision Heat Distribution",
    "about_spec_4_2": "Multi-Layer Foil Integration",
    "about_spec_4_3": "Matte UV & Gloss Compatible",
    
    "about_monitoring_label": "MONITORING",
    "about_downtime_label": "DOWNTIME",
}

def propagate():
    with open(translations_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sorted_keys = sorted(batch4_extra_keys.keys())
    langs = ["EN", "BN", "AR", "ES", "FR", "DE", "ZH", "JA", "HI", "RU", "PT", "IT", "TR", "KO", "FA", "UR", "VI", "TH", "ID", "NL", "PL", "SV", "EL", "MS", "AF", "AK"]
    
    def add_keys_to_object(obj_content, keys_dict):
        lines = obj_content.splitlines()
        existing_keys = set(re.findall(r'\b(\w+):', obj_content))
        
        insert_idx = -1
        for i in range(len(lines) - 1, -1, -1):
            if '}' in lines[i]:
                insert_idx = i
                break
        
        new_lines = []
        for key in sorted_keys:
            if key not in existing_keys:
                val = keys_dict[key].replace('"', '\\"')
                new_lines.append(f'    {key}: "{val}",')
        
        if new_lines:
            prev_line = lines[insert_idx-1]
            if not prev_line.strip().endswith(',') and not prev_line.strip().endswith('{'):
                lines[insert_idx-1] += ','
            
            for line in new_lines:
                lines.insert(insert_idx, line)
                insert_idx += 1
        
        return '\n'.join(lines)

    new_content = content
    for lang in langs:
        pattern = rf'({lang}:\s*{{)'
        match = re.search(pattern, new_content)
        if match:
            start_pos = match.end()
            bracket_count = 1
            end_pos = start_pos
            while bracket_count > 0 and end_pos < len(new_content):
                if new_content[end_pos] == '{':
                    bracket_count += 1
                elif new_content[end_pos] == '}':
                    bracket_count -= 1
                end_pos += 1
            
            obj_content = new_content[match.start():end_pos]
            updated_obj = add_keys_to_object(obj_content, batch4_extra_keys)
            new_content = new_content[:match.start()] + updated_obj + new_content[end_pos:]

    with open(translations_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    propagate()
    print("Propagated extra Batch 4 keys.")

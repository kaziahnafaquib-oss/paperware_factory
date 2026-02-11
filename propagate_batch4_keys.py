
import re
import os

translations_path = '/Users/kazi.ahnaf.aquib/Downloads/Paperware Factory24:01:2026/src/app/lib/translations.ts'

# Batch 4 Keys and English Translations
batch4_translations = {
    # Testimonials
    "testimonial_1_text": "You often live customer service and 'wow... high-quality paper cup, I highly recommend it.'",
    "testimonial_1_author": "ALICIA SANFORD",
    "testimonial_2_text": "Everything was perfect! From the order process, made easier with 30-day payment, to the delivery. Thank you so much.",
    "testimonial_2_author": "EVAN GAULTIER",
    "testimonial_3_text": "Fast results, and great quality! I recommend! <3",
    "testimonial_3_author": "JOCELYN MAUSET",
    "testimonial_4_text": "We've been working with Paperware for a few years now. We've consistently satisfied. The quality of the cups is great, service is fast, prices are fair, and our customers are very happy.",
    "testimonial_4_author": "CERTIFIED COFFEE",
    "testimonial_5_text": "I highly recommend Paperware! The print quality is excellent, and the team is attentive and responsive! In short, I'm very happy with my first cups :)",
    "testimonial_5_author": "JUSTINE BOUDARD",
    "testimonial_6_text": "I have had the chance to print several products with them and the quality has always been consistent. Special mention to the team and responsive team, especially Elsa. It is a pleasure working with them.",
    "testimonial_6_author": "AURÉLIEN TERRADE",
    "testimonial_7_text": "Great support and high quality products! It met our expectations. Thank you Paperware :)",
    "testimonial_7_author": "MARIE & MEESHA (ON MY DESK)",
    "testimonial_8_text": "Great communication and clarity at every stage: from ordering, designing, and delivery!",
    "testimonial_8_author": "RENEE DEEB",
    "testimonial_9_text": "A team that listens to our brand needs and gives good advice. Responsive and delivers quality products. I absolutely recommend working with them!",
    "testimonial_9_author": "N-D-VALLON",

    # Projects (All Products Page)
    "project_1_company": "TechFlow Systems",
    "project_1_title": "Neural Hardware Packaging",
    "project_1_desc": "Anti-static, high-density foam inserts for next-gen processors.",
    "project_2_company": "GreenLeaf Organics",
    "project_2_title": "Biodegradable Food Containers",
    "project_2_desc": "100% plant-based fiber composition with zero-plastic coating.",
    "project_3_company": "Urban Brew Co.",
    "project_3_title": "Thermal Insulation Cups",
    "project_3_desc": "Double-wall patented construction maintaining heat for 4+ hours.",
    "project_4_company": "MediSafe Pharma",
    "project_4_title": "Secure Sterility Boxes",
    "project_4_desc": "ISO certified medical grade cardstock with tamper-evident seals.",
    "project_5_company": "Velocity Logistics",
    "project_5_title": "Heavy-Duty Corrugated Units",
    "project_5_desc": "Reinforced structural integrity for international freight.",

    # Products (All Products Page)
    "product_1_desc": "Classic hot/cold beverage solution.",
    "product_2_desc": "Grease-proof ventilated design.",
    "product_3_desc": "Premium textured carry bag.",
    "product_4_desc": "High-finish brand literature.",
    "product_5_desc": "Sterile grade drug packaging.",
    "product_6_desc": "Moisture-locked retail box.",
    
    # Specs
    "spec_capacity": "Capacity",
    "spec_material": "Material",
    "spec_finish": "Finish",
    "spec_paper": "Paper",
    "spec_safety": "Safety",
    "spec_lock": "Lock",
    "spec_durability": "Durability",
    "spec_eco_rating": "Eco-Rating",
    "spec_print_quality": "Print Quality",
    "spec_dispatch": "Dispatch",
    
    # Section Headers
    "manufacturing_specialization": "Manufacturing Specialization",
    "precision_manufacturing": "Precision Manufacturing",
    "precision_mfg_desc": "Utilizing state-of-the-art neural-guided machinery to achieve micron-level cutting precision and foaming excellence.",
    "premium_print_finish": "Premium Print Finish",
    "offset_printing": "Offset Printing",
    "offset_printing_desc": "High-fidelity color reproduction and sustainable ink technologies for industry-leading packaging aesthetics.",
    "consultancy_services": "Consultancy Services",
    "expert_design_team": "Expert Design Team",
    "expert_design_desc": "Work with our award-winning designers to create sustainable packaging that defines your brand's future.",
    "book_session": "Book A Session",
    
    # AI Chip / Status
    "eco_friendly_materials": "Eco-friendly Materials",
    "custom_specs_guide": "Custom Specs Guide",
    "global_shipping_estimator": "Global Shipping Estimator",
    "request_3d_prototype": "Request 3D Prototype",
    
    # Product Details Page
    "back_to_catalog": "Back to Catalog",
    "share_label": "Share:",
    "launch_360_preview": "Launch 360° Preview",
    "live_status": "Live Status",
    "producing_batch": "Producing Batch",
    "technical_specifications": "Technical Specifications",
    "material_grade": "Material Grade",
    "thickness_gsm": "Thickness / GSM",
    "finish_type": "Finish Type",
    "phase_1": "Phase 1",
    "physical_prototypes": "Physical Prototypes",
    "sample_policy": "Sample Policy",
    "request_dummy_unit": "Request Dummy Unit",
    "eco_impact_estimate": "Eco-Impact Estimate",
    "environmental_roi": "Environmental ROI",
    "sustainability_metrics_displaced": "Plastic Displaced",
    "sustainability_metrics_offset": "Carbon Offset",
    "sustainability_metrics_water": "Water Saved",
    "quotation_mode": "Quotation Mode",
    "request_pricing": "Request Pricing",
    "response_time": "Response Time",
    "order_volume": "Order Volume",
    "units_label": "units",
    "add_to_basket": "Add to Basket",
    "executive_support": "Executive Support",
    "official_channel": "Official Channel",
    
    # Tabs
    "tab_description": "Description",
    "tab_additional_info": "Additional Info",
    "tab_manufacturing_process": "Manufacturing",
    "tab_material_matrix": "Material Matrix",
    
    # Description Long Texts
    "product_desc_intro": "is one of your most important office tools for your business. It makes a good first impression on new clients, and offered as a friendly reminder of past services to existing ones. We are the trusted {productName} printing service in Dhaka Bangladesh of hundreds of companies in Bangladesh to print qualityful eye-catching Customize Packaging.",
    "product_desc_publicity": "Whether you're running a startup or small & medium enterprises — those custom design {productName} is the perfect publicity material for Office. Available with full color print UV Print there's no handier way to make yourself memorable.",
    "product_desc_service": "Just tell us your expectation, our professional creative graphic designers will customize it with your own personalized text in your choice of fonts and colors, review and approve your the design, after placing your order. Your custom {productName} will be on their way to you in record time. Isn't that easy?",
    "product_desc_promise": "Paperware provides the best service provider in Dhaka Bangladesh, trusted by hundreds of businesses and organizations across the Bangladesh. Our Reasonable pricing and 100% customer satisfaction guarantee prove it. Paperware is more than just a name, it's our promise.",
    "in_dhaka_bangladesh": "printing service in Dhaka Bangladesh",
    
    # Material Matrix
    "grade_type": "Grade Type",
    "stiffness": "Stiffness",
    "printability": "Printability",
    "eco_score": "Eco-Score",
    "art_card": "Art Card",
    "kraft_paper_m": "Kraft Paper",
    "duplex_board": "Duplex Board",
    "recommended": "Recommended",
    
    # Manufacturing Steps
    "design_audit": "Design Audit",
    "plate_setting": "Plate Setting",
    "offset_printing_step": "Offset Printing",
    "finishing_qc": "Finishing & QC",
    "dispatch_step": "Dispatch",
    "standard_lead_time": "Standard Lead Time",
    "lead_time_calc": "Calculated from final artwork approval",
    
    # About Us
    "factory_background": "Factory Background",
    "production_line": "Production Line",
    "quality_control": "Quality Control",
    "assembly_section": "Assembly Section",
    "testing_facility": "Testing Facility",
    "cutting_process": "Cutting Process",
    "heidelberg_machine": "Heidelberg Machine",
    "about_gallery_overlay": "Production Unit",
    "about_method_badge": "Methodology",
    "about_efficiency_stat": "Efficiency increased by 40% using AI-driven neural path optimization.",
}

def propagate():
    with open(translations_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Sort keys to ensure consistent order
    sorted_keys = sorted(batch4_translations.keys())

    # Update EN object
    # We look for the EN object structure. 
    # Usually it's like `EN: { ... }`
    en_pattern = r'(EN:\s*{)'
    
    def add_keys_to_object(obj_content, keys_dict):
        lines = obj_content.splitlines()
        # Find where to insert (before the last closing brace)
        # But we need to make sure we don't duplicate
        new_lines = []
        existing_keys = set(re.findall(r'(\w+):', obj_content))
        
        insert_idx = -1
        for i in range(len(lines) - 1, -1, -1):
            if '}' in lines[i]:
                insert_idx = i
                break
        
        for key in sorted_keys:
            if key not in existing_keys:
                val = keys_dict[key].replace('"', '\\"')
                new_lines.append(f'    {key}: "{val}",')
        
        if new_lines:
            # Check if previous line needs a comma
            prev_line = lines[insert_idx-1]
            if not prev_line.strip().endswith(',') and not prev_line.strip().endswith('{'):
                lines[insert_idx-1] += ','
            
            for line in new_lines:
                lines.insert(insert_idx, line)
                insert_idx += 1
        
        return '\n'.join(lines)

    # Process each language object
    # Languages: EN, BN, AR, ES, FR, DE, ZH, JA, HI, RU, PT, IT, TR, KO, FA, UR, VI, TH, ID, NL, PL, SV, EL, MS, AF, AK
    langs = ["EN", "BN", "AR", "ES", "FR", "DE", "ZH", "JA", "HI", "RU", "PT", "IT", "TR", "KO", "FA", "UR", "VI", "TH", "ID", "NL", "PL", "SV", "EL", "MS", "AF", "AK"]
    
    new_content = content
    for lang in langs:
        pattern = rf'({lang}:\s*{{)'
        match = re.search(pattern, new_content)
        if match:
            # Find the end of this object
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
            updated_obj = add_keys_to_object(obj_content, batch4_translations)
            new_content = new_content[:match.start()] + updated_obj + new_content[end_pos:]

    with open(translations_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    propagate()
    print("Propagated Batch 4 keys to all languages in translations.ts.")

// Static data for the website to keep MainContent.tsx lean and fast

// Hero/Video Constants
export const DEFAULT_HERO_VIDEO = "https://www.youtube.com/embed/lyFix6BpGNI?autoplay=1&mute=1&loop=1&playlist=lyFix6BpGNI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";
export const DEFAULT_CLIENTS_VIDEO = "https://www.youtube.com/embed/lyFix6BpGNI?autoplay=1&mute=1&loop=1&playlist=lyFix6BpGNI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";
export const DEFAULT_SIGNING_IMAGE = "https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBidXNpbmVzcyUyMGRlYWwlMjBwYXJ0bmVyc2hpcHxlbnwxfHx8fDE3Njc2OTM3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Tone/Content Constants
export const DEFAULT_HERO_CONTENT = {
    title: "",
    subtitle1: "",
    subtitle2: "",
    titleSize: "",
    titleFont: "",
    subtitle1Size: "",
    subtitle1Font: "",
    subtitle2Size: "",
    subtitle2Font: ""
};

export const DEFAULT_TEAM_CONTENT = {
    titleTop: "team_title_top",
    titleBottom: "team_title_bottom",
    desc1: "team_desc_1",
    desc2: "team_desc_2",
    stat1Label: "team_stat_1_label",
    stat1Value: "5+",
    stat2Label: "team_stat_2_label",
    stat2Value: "100%",
    stat3Label: "team_stat_3_label",
    stat3Value: "100+"
};

export const DEFAULT_PRODUCTION_STATS = {
    totalCups: 69550257,
    wonderfulBusinesses: 5754
};

// Image Assets
export const imgAlArabian = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop";
export const imgBengalClassicTea = "https://images.unsplash.com/photo-1597318130878-5a2c275eb9e6?w=400&h=200&fit=crop";
export const imgCafeZ = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop";
export const imgCoffeeAvenue = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop";
export const imgCrimsoncup = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop";
export const imgDhakaiKhana = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop";
export const imgAbdulMonemLtd = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop";
export const imgWalton = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop";
export const imgNovatek = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop";
export const imgMgi = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop";
export const imgIcddrb = "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=200&fit=crop";
export const imgFresh = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop";

// Large Data Objects
export const DEFAULT_PRODUCTS = [
    // Restaurant Supplies
    { id: 1, name: "prod_food_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1567570671796-c8fed5eb1e7d", status: "Active" },
    { id: 2, name: "prod_chowmein_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1727021024931-90c226e8448d?q=80&w=800&auto=format", status: "Active" },
    { id: 3, name: "prod_meat_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1658418467495-134ce7d69430?q=80&w=800&auto=format", status: "Active" },
    { id: 4, name: "prod_sandwich_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1560340841-eefc7aa04432", status: "Active" },
    { id: 5, name: "prod_burger_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1744842854127-2d948d9ea673", status: "Active" },
    { id: 6, name: "prod_pizza_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1689793600363-31a3eb87b462", status: "Active" },
    { id: 7, name: "prod_cake_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format", status: "Active" },
    { id: 8, name: "prod_sweet_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1607940471713-a9376f150a0d", status: "Active" },
    { id: 9, name: "prod_fries_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f", status: "Active" },
    { id: 10, name: "prod_shawarma_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1529006557810-274bc9344389", status: "Active" },
    { id: 11, name: "prod_waffle_box", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1562519990-50eb51e28292", status: "Active" },
    { id: 12, name: "prod_wedges_cone", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1610444585193-470557e491c1", status: "Active" },
    { id: 13, name: "prod_ice_cream_cone", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780", status: "Active" },
    { id: 14, name: "prod_sugar_sachet", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1747006116196-fc20e136e4c0?q=80&w=800&auto=format", status: "Active" },
    { id: 15, name: "prod_table_mat", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1575424909138-70b05d80c092", status: "Active" },
    { id: 16, name: "prod_carry_bag", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1668012509229-782623ba3306", status: "Active" },
    { id: 17, name: "prod_food_menu", category: "cat_restaurant_supplies", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2", status: "Active" },

    // Office Stationary
    { id: 18, name: "prod_business_card", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1707589165239-10294fab6b13", status: "Active" },
    { id: 19, name: "prod_envelope", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c", status: "Active" },
    { id: 20, name: "prod_invoice_pad", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23", status: "Active" },
    { id: 21, name: "prod_letterhead_pad", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1522204538344-922f76cee07a", status: "Active" },
    { id: 22, name: "prod_money_receipt", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5", status: "Active" },
    { id: 23, name: "prod_delivery_note", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55", status: "Active" },
    { id: 24, name: "prod_note_book", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1517842645767-c639042777db", status: "Active" },
    { id: 25, name: "prod_diary", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1511108690759-009324a90311", status: "Active" },
    { id: 26, name: "prod_file_folder", category: "cat_office_stationary", image: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0", status: "Active" },

    // Paper Cup Supplies
    { id: 27, name: "prod_single_wall_cup", category: "cat_paper_cup", image: "https://images.unsplash.com/photo-1517031330214-9b0c33b8c73c", status: "Active" },
    { id: 28, name: "prod_ripple_wall_cup", category: "cat_paper_cup", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format", status: "Active" },
    { id: 29, name: "prod_double_wall_cup", category: "cat_paper_cup", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format", status: "Active" },

    // Marketing Materials
    { id: 30, name: "prod_paper_bag", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1668012509229-782623ba3306", status: "Active" },
    { id: 31, name: "prod_brochure_catalog", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1544816155-12df9643f363", status: "Active" },
    { id: 32, name: "prod_premium_magazine", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format", status: "Active" },
    { id: 33, name: "prod_flyer_leaflet", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format", status: "Active" },
    { id: 34, name: "prod_sticker", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format", status: "Active" },
    { id: 35, name: "prod_calendar", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format", status: "Active" },
    { id: 36, name: "prod_tissue_box", category: "cat_marketing_materials", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format", status: "Active" },

    // Pharma Supplies
    { id: 37, name: "prod_patient_file", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1584362923647-7847ad730b2c", status: "Active" },
    { id: 38, name: "prod_xray_file", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1584362923647-7847ad730b2c", status: "Active" },
    { id: 39, name: "prod_prescription_pad", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1505751172107-573225a96220", status: "Active" },
    { id: 40, name: "prod_report_envelope", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format", status: "Active" },
    { id: 41, name: "prod_medicine_box", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format", status: "Active" },
    { id: 42, name: "prod_medicine_literature", category: "cat_hospitals_pharma", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format", status: "Active" },
];

export const DEFAULT_CLIENT_PROJECTS = [
    { company: "TechFlow Systems", project: "proj_1_title", desc: "proj_1_desc", image: "https://images.unsplash.com/photo-1596489394863-14b35e0e148e?q=80&w=1000" },
    { company: "proj_2_company", project: "proj_2_title", desc: "proj_2_desc", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000" },
    { company: "proj_3_company", project: "proj_3_title", desc: "proj_3_desc", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000" },
    { company: "proj_4_company", project: "proj_4_title", desc: "proj_4_desc", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000" },
    { company: "proj_5_company", project: "proj_5_title", desc: "proj_5_desc", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000" }
];

export const DEFAULT_PARTNERS = [
    { id: "1", name: "EcoPulp Industries", category: "raw-material", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop", description: "Premium FSC-certified sustainable paper pulp from responsibly managed forests.", location: "Finland", since: "2020", certifications: ["FSC", "ISO 14001"], website: "https://example.com" },
    { id: "2", name: "Nordic Fiber Co.", category: "raw-material", logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop", description: "High-quality virgin and recycled fiber solutions.", location: "Sweden", since: "2019" },
    { id: "4", name: "ERPNext", category: "erp", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop", description: "Open-source ERP for complete business management and automation.", location: "Global", since: "2018", certifications: ["ISO 27001"] },
    { id: "5", name: "SAP Business One", category: "erp", logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop", description: "Enterprise resource planning for manufacturing excellence.", location: "Germany", since: "2019" },
    { id: "6", name: "DigitalCore Solutions", category: "digital", logo: "https://images.unsplash.com/photo-1572044162444-ad6021194360?w=300&h=300&fit=crop", description: "End-to-end digital transformation and cloud solutions.", location: "USA", since: "2020" },
    { id: "8", name: "Heidelberg Machinery", category: "machinery", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop", description: "German precision engineering for paper manufacturing.", location: "Germany", since: "2017", certifications: ["CE", "ISO 9001"] },
    { id: "9", name: "AutoPack Systems", category: "machinery", logo: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&h=300&fit=crop", description: "Automated packaging and quality control systems.", location: "Japan", since: "2019" },
    { id: "10", name: "FastTrack Logistics", category: "logistics", logo: "https://images.unsplash.com/photo-1626863905121-3b0c0ed5b92c?w=300&h=300&fit=crop", description: "Nationwide secure distribution and cold-chain network.", location: "Bangladesh", since: "2020" },
    { id: "11", name: "DHL Supply Chain", category: "logistics", logo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=300&fit=crop", description: "Global logistics and international shipping solutions.", location: "Global", since: "2021" },
    { id: "12", name: "AWS Cloud Services", category: "technology", logo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop", description: "Scalable cloud infrastructure and data analytics.", location: "Global", since: "2020" },
    { id: "14", name: "BrandForge Studio", category: "design", logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop", description: "Premium branding and packaging design services.", location: "UK", since: "2021" },
    { id: "15", name: "ConnectTel", category: "connectivity", logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop", description: "Enterprise-grade telecommunications infrastructure.", location: "Bangladesh", since: "2019" }
];

export const DEFAULT_CLIENTS = [
    { id: "1", name: "Al Arabian", category: "Client", logo: imgAlArabian, description: "Strategic Partner" },
    { id: "2", name: "Fresh", category: "FMCG", logo: imgFresh, description: "Major Supplier" },
    { id: "3", name: "Bengal Classic Tea", category: "Beverage", logo: imgBengalClassicTea, description: "Packaging Partner" },
    { id: "4", name: "Cafe Z", category: "Restaurant", logo: imgCafeZ, description: "Food Service" },
    { id: "5", name: "Coffee Avenue", category: "Cafe", logo: imgCoffeeAvenue, description: "Premium Cups" },
    { id: "6", name: "Crimson Cup", category: "Global Chain", logo: imgCrimsoncup, description: "International Partner" },
    { id: "7", name: "Dhakai Khana", category: "Catering", logo: imgDhakaiKhana, description: "Food Packaging" },
    { id: "8", name: "Abdul Monem Ltd", category: "Conglomerate", logo: imgAbdulMonemLtd, description: "Industrial Partner" },
    { id: "9", name: "Walton", category: "Electronics", logo: imgWalton, description: "Packaging Solutions" },
    { id: "10", name: "Novatek", category: "Pharmaceuticals", logo: imgNovatek, description: "Medical Grade" },
    { id: "11", name: "MGI", category: "Industrial", logo: imgMgi, description: "Large Scale Partner" },
    { id: "12", name: "ICDDR,B", category: "Research", logo: imgIcddrb, description: "Sterile Supplies" }
];

export const DEFAULT_UNIT_PHOTOS = [
    { id: "unit-1", name: "Production Unit 01", role: "Manufacturing Excellence & Automation", image: "https://images.unsplash.com/photo-1578988254148-9937ccb32ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd29ya2VycyUyMGdyb3VwfGVufDF8fHx8MTc2ODYyOTk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "unit-2", name: "Paper Processing Floor", role: "High-Speed Production Line", image: "https://images.unsplash.com/photo-1727517786578-ff2bb896b852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGZhY3RvcnklMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2ODYyOTk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "unit-3", name: "Quality Control Lab", role: "Precision Assurance & Testing", image: "https://images.unsplash.com/photo-1578988247876-ce2647da8195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwd29ya2VycyUyMHRlYW18ZW58MXx8fHwxNzY4NjI5OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "unit-4", name: "Packaging Division", role: "Industrial Grade Logistic Solutions", image: "https://images.unsplash.com/photo-1654703680115-4ab46aebebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMGZsb29yfGVufDF8fHx8MTc2ODYyOTk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "unit-5", name: "Warehouse Hub", role: "Global Distribution Center", image: "https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjB3b3JrZXJzfGVufDF8fHx8MTc2ODYyOTk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
];

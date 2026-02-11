// Navigation data for the Navbar to keep the component clean and fast

export interface NavLink {
    id: string;
    name: string;
    hasDropdown?: boolean;
    isMega?: boolean;
    items?: { name: string; id: string }[];
    categories?: { title: string; id: string; items: string[] }[];
}

export const getNavbarLinks = (t: (key: string) => string): NavLink[] => [
    { name: t('home') || "Home", id: "home" },
    {
        name: t('company') || "Company",
        id: "company",
        hasDropdown: true,
        items: [
            { name: t('about'), id: "about" },
            { name: t('clients'), id: "clients" },
            { name: t('sustainability'), id: "sustainability" },
            { name: t('compliance'), id: "compliance" },
            { name: t('our_partners') || "Our Partners", id: "partners" },
            { name: t('future_plan'), id: "future-plan" }
        ]
    },
    {
        name: t('all_products') || "All products",
        id: "products",
        isMega: true,
        categories: [
            {
                title: t('cat_office_stationary'),
                id: "office-stationary",
                items: ["Business Card", "Envelope", "Invoice Pad", "Letterhead Pad", "Money Receipt Book", "Delivery Note Book", "Note Book", "Diary", "File Folder"]
            },
            {
                title: t('cat_paper_cup'),
                id: "papercups",
                items: ["Paper Cup", "Paper Cup Holder", "Paper Cup Jacket/Sleeve", "Paper Cup Carrier"]
            },
            {
                title: t('cat_restaurant_supplies'),
                id: "restaurant-supplies",
                items: ["Food Box", "Chowmein Box", "Meat Box", "Sandwich Box", "Burger Box", "Pizza Box", "Cake Box", "Sweet Box", "Fries Box", "Shawarma Box", "Waffle Box & Tray", "Wedges Cone", "Ice Cream Cone", "Sugar Sachet", "Table Mat", "Carry Bag", "Food Menu"]
            },
            {
                title: t('cat_marketing_materials'),
                id: "marketing-materials",
                items: ["Paper Bag", "Brochure / Catalog", "Premium Magazine", "Flyer & Leaflet", "Sticker", "Calendar", "Tissue Box"]
            },
            {
                title: t('cat_hospitals_pharma'),
                id: "pharma-supplies",
                items: ["Patient File", "X-Ray File", "Doctor's Prescription Pad", "Report Envelope", "Medicine Box", "Medicine Literature"]
            },
            {
                title: t('cat_fmcg_supplies'),
                id: "fmcg-supplies",
                items: ["Food & Beverage Packaging", "Personal Care Product Packaging", "Home Care Product Packaging", "Confectionary Goods Packaging"]
            },
            {
                title: t('cat_garments_supplies'),
                id: "garments-supplies",
                items: ["Hangtag", "Label", "Sticker"]
            }
        ]
    },
    {
        name: t('solutions') || "Solutions",
        id: "solutions",
        hasDropdown: true,
        items: [
            { name: t('for_restaurants') || "For Restaurants", id: "restaurant-supplies" },
            { name: t('for_pharma') || "For Pharma", id: "pharma-supplies" },
            { name: t('for_fmcg') || "For FMCG", id: "fmcg-supplies" },
            { name: t('for_marketing') || "For Marketing", id: "marketing-materials" }
        ]
    },
    {
        name: t('business') || "Business",
        id: "business",
        hasDropdown: true,
        items: [
            { name: t('business_solutions') || "Business Solutions", id: "business" },
            { name: t('partner_program') || "Partner Program", id: "partner-program" },
            { name: t('investor_relations') || "Investor Relations", id: "investor" },
            { name: t('franchise') || "Franchise", id: "franchise" },
            { name: t('csr') || "CSR", id: "csr" }
        ]
    },
    {
        name: t('manufacturing') || "Manufacturing",
        id: "manufacturing",
        hasDropdown: true,
        items: [
            { name: t('factory_live') || "Factory Live", id: "factory-live" },
            { name: t('machinery') || "Machinery", id: "manufacturing" },
            { name: t('material_lab') || "Material Lab", id: "manufacturing" }
        ]
    },
    {
        name: t('export_intelligence') || "Export", id: "export"
    },
    { name: t('contact'), id: "contact" },
    {
        name: t('more'),
        id: "more",
        hasDropdown: true,
        items: [
            { name: t('erp_smart_factory'), id: "erp" },
            { name: t('impact_dashboard'), id: "impact-dashboard" },
            { name: t('studio_interactive'), id: "studio" },
            { name: t('track_order'), id: "tracking" },
            { name: t('product_gallery'), id: "gallery" },
            { name: t('social_hub'), id: "socials" },
            { name: t('career'), id: "career" },
            { name: t('faq'), id: "faq" },
            { name: t('csr') || "CSR", id: "csr" }
        ]
    }
];

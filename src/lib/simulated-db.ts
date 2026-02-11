
export interface Order {
    id: string;
    product: string;
    qty: string;
    date: string;
    specs?: string;
    status: string;
    progress: number;
    client: string;
    type: 'New Order' | 'Re-Order' | 'Sample' | 'Quote' | 'Support';
    priority?: string;
    subject?: string;
    message?: string;
    createdAt: number;
}

export interface ERPNextConfig {
    baseUrl: string;
    apiKey: string;
    secretKey: string;
    isConnected: boolean;
    mappings: { name: string; mapped: boolean }[];
}

export interface SEOPage {
    id: string;
    page: string;
    url: string;
    title: string;
    description: string;
    keywords: string;
    score: number;
    status: 'excellent' | 'good' | 'needs-work';
    issues: string[];
}

export interface KeywordRank {
    keyword: string;
    position: number;
    volume: number;
    difficulty: number;
    trend: number;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    status: 'Published' | 'Draft';
    date: string;
    views: number;
    image: string;
    author: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
}

export interface Announcement {
    id: string;
    title: string;
    message: string;
    type: 'Info' | 'Warning' | 'Promo';
    status: 'Active' | 'Inactive';
    startDate: string;
    endDate: string;
    displayStyle: 'Top Bar' | 'Popup' | 'Toast';
    priority: 'High' | 'Medium' | 'Low';
}

export interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'Active' | 'Unsubscribed';
}

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    type: 'Contact' | 'Quote' | 'Newsletter';
    message: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
    priority: 'High' | 'Medium' | 'Low';
    date: string;
    source: string;
    value?: number;
}

export interface Backlink {
    id: string;
    source: string;
    url: string;
    authority: number;
    status: 'Active' | 'Lost';
    date: string;
}

export interface Competitor {
    name: string;
    domain: string;
    avgPosition: number;
    keywordOverlap: number;
    visibilityScore: number;
}

export interface SocialPost {
    id: string;
    content: string;
    platforms: ('Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter')[];
    media?: string;
    scheduledDate: string;
    status: 'Scheduled' | 'Published' | 'Draft';
    likes?: number;
    shares?: number;
    comments?: number;
}

export interface SocialAnalytics {
    platform: 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter';
    followers: number;
    engagementRate: number;
    reach: number;
    trend: number;
}

const STORAGE_KEY_ORDERS = 'paperware_orders';
const STORAGE_KEY_CONFIG = 'paperware_erp_config';
const STORAGE_KEY_SEO = 'paperware_seo_pages';
const STORAGE_KEY_BLOGS = 'paperware_blogs';
const STORAGE_KEY_ANNOUNCEMENTS = 'paperware_announcements';
const STORAGE_KEY_NEWSLETTER = 'paperware_newsletter';
const STORAGE_KEY_LEADS = 'paperware_leads';
const STORAGE_KEY_BACKLINKS = 'paperware_backlinks';
const STORAGE_KEY_COMPETITORS = 'paperware_competitors';
const STORAGE_KEY_SOCIAL_POSTS = 'paperware_social_posts';


const INITIAL_ORDERS: Order[] = [
    { id: "ORD-9901", product: "8oz Double Wall", qty: "5000", date: "2024-11-20", status: "In Production", progress: 65, client: "Coffee World", type: 'New Order', createdAt: Date.now() - 10000000 },
    { id: "ORD-9902", product: "Eco-Liner Box", qty: "2000", date: "2024-11-25", status: "Quality Check", progress: 90, client: "Burger Point", type: 'New Order', createdAt: Date.now() - 5000000 },
    { id: "ORD-9903", product: "Custom Gift Bag", qty: "1000", date: "2024-12-01", status: "Material Sourcing", progress: 25, client: "Luxury Gifts", type: 'New Order', createdAt: Date.now() - 2000000 },
];

const INITIAL_SEO_PAGES: SEOPage[] = [
    { id: 'home', page: "Home", url: '/', title: "Paperware Factory - Premium Paper Products", description: "Leading manufacturer of eco-friendly paper cups, food packaging, and custom printing solutions.", keywords: "paper cups, food packaging", score: 92, status: "excellent", issues: [] },
    { id: 'products', page: "Products", url: '/products', title: "Paper Products Catalog | Paperware", description: "Browse our complete range of paper cups, boxes, bags and custom packaging solutions.", keywords: "paper products, packaging", score: 78, status: "good", issues: ['Missing H1 tag', 'Low text-to-html ratio'] },
    { id: 'about', page: "About", url: '/about', title: "About Paperware Factory", description: "Learn about our 15+ years of excellence.", keywords: "about us", score: 65, status: "needs-work", issues: ['Meta description too short', 'Missing alt tags'] },
    { id: 'contact', page: "Contact", url: '/contact', title: "Contact Us - Paperware Factory", description: "Get in touch for quotes, samples, and business inquiries. 24/7 support available.", keywords: "contact, inquiry, quote", score: 88, status: "excellent", issues: [] },
];

const INITIAL_BLOGS: BlogPost[] = [
    { id: '1', title: "The Future of Eco-Friendly Packaging", excerpt: "Exploring sustainable materials in 2024...", category: "Sustainability", status: 'Published', date: '2024-01-15', views: 1250, image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800", author: "Sarah Jenkins", tags: ["Eco", "Green", "Trend"], seoTitle: "Eco Packaging Future 2024", seoDescription: "Deep dive into sustainable packaging trends." },
    { id: '2', title: "New Production Line Launched", excerpt: "We have expanded our capacity with...", category: "Company News", status: 'Published', date: '2024-01-28', views: 850, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", author: "Admin", tags: ["Production", "News"], seoTitle: "Paperware Production Expansion", seoDescription: "Announcing our new high-capacity production line." },
    { id: '3', title: "Guide to Custom Branding", excerpt: "How to make your packaging stand out...", category: "Design", status: 'Draft', date: '2024-02-01', views: 0, image: "https://images.unsplash.com/photo-1632921043869-92b8d0027157?auto=format&fit=crop&q=80&w=800", author: "Emily Chen", tags: ["Design", "Branding"], seoTitle: "Custom Branding Guide", seoDescription: "Tips for branding your packaging effectively." },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
    { id: '1', title: "Spring Sale", message: "Get 10% off on all bulk orders this month!", type: 'Promo', status: 'Active', startDate: '2024-02-01', endDate: '2024-02-28', displayStyle: 'Top Bar', priority: 'Medium' },
    { id: '2', title: "System Maintenance", message: "Portal will be down for 2 hours on Sunday.", type: 'Warning', status: 'Inactive', startDate: '2024-01-20', endDate: '2024-01-21', displayStyle: 'Popup', priority: 'High' },
];

const INITIAL_SUBSCRIBERS: Subscriber[] = [
    { id: '1', email: 'john@example.com', subscribedAt: '2023-11-12', status: 'Active' },
    { id: '2', email: 'sarah@business.com', subscribedAt: '2023-12-05', status: 'Active' },
    { id: '3', email: 'info@startup.io', subscribedAt: '2024-01-02', status: 'Unsubscribed' },
];

const INITIAL_LEADS: Lead[] = [
    { id: '1', name: "Ahmed Khan", email: "ahmed@greenleaf.com", phone: "+880 1712-345678", company: "Green Leaf Restaurant", type: "Quote", message: "Need 50k paper cups with custom logo", status: "New", priority: "High", date: "2026-02-04", source: "Website Form", value: 5000 },
    { id: '2', name: "Sarah Johnson", email: "sarah@techflow.com", phone: "+1 555-0123", company: "TechFlow Inc", type: "Contact", message: "Interested in bulk packaging solutions", status: "Contacted", priority: "Medium", date: "2026-02-03", source: "Direct Email", value: 0 },
    { id: '3', name: "Rahul Sharma", email: "rahul@ecopack.in", phone: "+91 98765-43210", company: "EcoPack India", type: "Quote", message: "RFQ for biodegradable food containers", status: "Qualified", priority: "High", date: "2026-02-04", source: "Referral", value: 12500 },
];

const INITIAL_BACKLINKS: Backlink[] = [
    { id: '1', source: 'EcoPackaging News', url: 'https://ecopackaging.news/top-10-suppliers', authority: 85, status: 'Active', date: '2024-02-01' },
    { id: '2', source: 'Sustainable Business Weekly', url: 'https://sbw.com/features/paperware', authority: 72, status: 'Active', date: '2024-01-28' },
    { id: '3', source: 'Green Tech Blog', url: 'https://greentech.io/reviews', authority: 45, status: 'Lost', date: '2024-01-15' },
];

const INITIAL_COMPETITORS: Competitor[] = [
    { name: 'EcoPack Global', domain: 'ecopack.com', avgPosition: 4.2, keywordOverlap: 65, visibilityScore: 88 },
    { name: 'GreenBox Co', domain: 'greenbox.co', avgPosition: 5.8, keywordOverlap: 40, visibilityScore: 72 },
    { name: 'BioContainers', domain: 'biocontainers.net', avgPosition: 7.1, keywordOverlap: 25, visibilityScore: 60 },
];

const INITIAL_SOCIAL_POSTS: SocialPost[] = [
    { id: '1', content: "Excited to announce our new eco-friendly line! 🌱 #Sustainability #Paperware", platforms: ['LinkedIn', 'Twitter'], scheduledDate: '2024-02-10T10:00', status: 'Scheduled' },
    { id: '2', content: "Behind the scenes at our factory. Quality is our priority! 🏭", platforms: ['Instagram', 'Facebook'], media: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", scheduledDate: '2024-02-05T14:30', status: 'Published', likes: 124, shares: 15, comments: 8 },
    { id: '3', content: "Spring Sale starts next week! Don't miss out.", platforms: ['Facebook'], scheduledDate: '2024-02-15T09:00', status: 'Draft' },
];

const INITIAL_SOCIAL_ANALYTICS: SocialAnalytics[] = [
    { platform: 'LinkedIn', followers: 5200, engagementRate: 4.5, reach: 12500, trend: 12 },
    { platform: 'Instagram', followers: 8500, engagementRate: 3.2, reach: 45000, trend: 8 },
    { platform: 'Facebook', followers: 12000, engagementRate: 2.1, reach: 28000, trend: -2 },
    { platform: 'Twitter', followers: 3400, engagementRate: 1.8, reach: 8900, trend: 5 },
];


export const SimulatedDB = {
    getOrders: (): Order[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
            if (!stored) {
                // Initialize with default data if empty
                localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_ORDERS));
                return INITIAL_ORDERS;
            }
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse orders", e);
            return INITIAL_ORDERS;
        }
    },

    createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'progress' | 'client'>) => {
        const orders = SimulatedDB.getOrders();
        const newOrder: Order = {
            ...order,
            id: `ORD-${9900 + orders.length + 1}`,
            status: 'Pending Review',
            progress: 0,
            client: "Global Logistics", // The currently logged in mock user
            createdAt: Date.now()
        };
        orders.unshift(newOrder); // Add to top
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));

        // Dispatch event so other components can listen
        window.dispatchEvent(new Event('paperware-storage-update'));

        return newOrder;
    },

    updateOrder: (id: string, updates: Partial<Order>) => {
        const orders = SimulatedDB.getOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...updates };
            localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
            window.dispatchEvent(new Event('paperware-storage-update'));
        }
    },

    getERPConfig: (): ERPNextConfig | null => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    },

    saveERPConfig: (config: ERPNextConfig) => {
        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
        window.dispatchEvent(new Event('paperware-erp-update'));
    },

    // SEO Section
    getSEOPages: (): SEOPage[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_SEO);
            if (!stored) {
                localStorage.setItem(STORAGE_KEY_SEO, JSON.stringify(INITIAL_SEO_PAGES));
                return INITIAL_SEO_PAGES;
            }
            return JSON.parse(stored);
        } catch { return INITIAL_SEO_PAGES; }
    },

    updateSEOPage: (page: SEOPage) => {
        const pages = SimulatedDB.getSEOPages();
        const index = pages.findIndex(p => p.id === page.id);
        if (index !== -1) {
            pages[index] = page;
            localStorage.setItem(STORAGE_KEY_SEO, JSON.stringify(pages));
            window.dispatchEvent(new Event('paperware-seo-update'));
        }
    },

    getKeywords: (): KeywordRank[] => {
        return [
            { keyword: "custom paper cups", position: 3, volume: 1200, difficulty: 45, trend: 1 },
            { keyword: "food packaging wholesale", position: 7, volume: 850, difficulty: 60, trend: -2 },
            { keyword: "eco friendly boxes", position: 1, volume: 2400, difficulty: 30, trend: 0 },
            { keyword: "paperware factory", position: 1, volume: 500, difficulty: 10, trend: 0 },
            { keyword: "biodegradable plates", position: 12, volume: 3200, difficulty: 75, trend: 5 },
        ];
    },

    getBacklinks: (): Backlink[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_BACKLINKS);
            return stored ? JSON.parse(stored) : INITIAL_BACKLINKS;
        } catch { return INITIAL_BACKLINKS; }
    },

    getCompetitors: (): Competitor[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_COMPETITORS);
            return stored ? JSON.parse(stored) : INITIAL_COMPETITORS;
        } catch { return INITIAL_COMPETITORS; }
    },

    // Blog Methods
    getBlogs: (): BlogPost[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_BLOGS);
            return stored ? JSON.parse(stored) : INITIAL_BLOGS;
        } catch { return INITIAL_BLOGS; }
    },
    saveBlog: (blog: BlogPost) => {
        const blogs = SimulatedDB.getBlogs();
        const index = blogs.findIndex(b => b.id === blog.id);
        if (index > -1) blogs[index] = blog;
        else blogs.unshift(blog);
        localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
        window.dispatchEvent(new Event('paperware-blog-update'));
    },
    deleteBlog: (id: string) => {
        const blogs = SimulatedDB.getBlogs().filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
        window.dispatchEvent(new Event('paperware-blog-update'));
    },

    // Announcement Methods
    getAnnouncements: (): Announcement[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
            return stored ? JSON.parse(stored) : INITIAL_ANNOUNCEMENTS;
        } catch { return INITIAL_ANNOUNCEMENTS; }
    },
    saveAnnouncement: (ann: Announcement) => {
        const anns = SimulatedDB.getAnnouncements();
        const index = anns.findIndex(a => a.id === ann.id);
        if (index > -1) anns[index] = ann;
        else anns.unshift(ann);
        localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(anns));
        window.dispatchEvent(new Event('paperware-announcement-update'));
    },
    deleteAnnouncement: (id: string) => {
        const anns = SimulatedDB.getAnnouncements().filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(anns));
        window.dispatchEvent(new Event('paperware-announcement-update'));
    },

    // Newsletter Methods
    getSubscribers: (): Subscriber[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_NEWSLETTER);
            return stored ? JSON.parse(stored) : INITIAL_SUBSCRIBERS;
        } catch { return INITIAL_SUBSCRIBERS; }
    },
    addSubscriber: (email: string) => {
        const subs = SimulatedDB.getSubscribers();
        if (subs.find(s => s.email === email)) return;
        subs.unshift({ id: Date.now().toString(), email, subscribedAt: new Date().toISOString().split('T')[0], status: 'Active' });
        localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(subs));
        window.dispatchEvent(new Event('paperware-newsletter-update'));
    },

    // Lead Methods
    getLeads: (): Lead[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_LEADS);
            if (!stored) {
                localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(INITIAL_LEADS));
                return INITIAL_LEADS;
            }
            return JSON.parse(stored);
        } catch { return INITIAL_LEADS; }
    },
    updateLead: (lead: Lead) => {
        const leads = SimulatedDB.getLeads();
        const index = leads.findIndex(l => l.id === lead.id);
        if (index > -1) leads[index] = lead;
        else leads.unshift(lead); // Or separate create
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
        window.dispatchEvent(new Event('paperware-leads-update'));
    },

    // Social Media Methods
    getSocialPosts: (): SocialPost[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_SOCIAL_POSTS);
            return stored ? JSON.parse(stored) : INITIAL_SOCIAL_POSTS;
        } catch { return INITIAL_SOCIAL_POSTS; }
    },
    saveSocialPost: (post: SocialPost) => {
        const posts = SimulatedDB.getSocialPosts();
        const index = posts.findIndex(p => p.id === post.id);
        if (index > -1) posts[index] = post;
        else posts.unshift(post);
        localStorage.setItem(STORAGE_KEY_SOCIAL_POSTS, JSON.stringify(posts));
        window.dispatchEvent(new Event('paperware-social-update'));
    },
    deleteSocialPost: (id: string) => {
        const posts = SimulatedDB.getSocialPosts().filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY_SOCIAL_POSTS, JSON.stringify(posts));
        window.dispatchEvent(new Event('paperware-social-update'));
    },
    getSocialAnalytics: (): SocialAnalytics[] => {
        return INITIAL_SOCIAL_ANALYTICS;
    }
};

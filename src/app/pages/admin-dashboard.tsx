import React from "react";
import { 
  Bell, 
  Search, 
  Activity,
  FileText,
  Package,
  Users,
  Menu,
  X,
  Sparkles,
  Globe,
  Settings,
  Wifi,
  RefreshCw,
  Eye,
  EyeOff,
  MoreHorizontal
} from "lucide-react";
import { AdminSidebar } from "../components/admin/sidebar";
import { StatsCard } from "../components/admin/stats-card";

const ERPNextView = React.lazy(() => import("../components/admin/views/ERPNextView"));
const HostingView = React.lazy(() => import("../components/admin/views/HostingView"));
const CMSView = React.lazy(() => import("../components/admin/views/CMSView"));
const LanguageView = React.lazy(() => import("../components/admin/views/LanguageView"));
const ProductionInventoryView = React.lazy(() => import("../components/admin/views/ProductionInventoryView"));
const RFQPipelineView = React.lazy(() => import("../components/admin/views/RFQPipelineView"));
const ActiveOrdersView = React.lazy(() => import("../components/admin/views/ActiveOrdersView"));
const ClientCRMView = React.lazy(() => import("../components/admin/views/LeadManagementView").then(module => ({ default: module.LeadManagementView })));
const BrochureAnalyticsView = React.lazy(() => import("../components/admin/views/BrochureAnalyticsView").then(module => ({ default: module.BrochureAnalyticsView })));
const BrochureUploadView = React.lazy(() => import("../components/admin/views/BrochureUploadView").then(module => ({ default: module.BrochureUploadView })));
const NeuralCommLogView = React.lazy(() => import("../components/admin/views/NeuralCommLogView").then(module => ({ default: module.NeuralCommLogView })));
const SustainabilityView = React.lazy(() => import("../components/admin/views/SustainabilityView"));
const SecurityComplianceView = React.lazy(() => import("../components/admin/views/SecurityComplianceView"));
const AINeuralSyncView = React.lazy(() => import("../components/admin/views/AINeuralSyncView"));
const AttributesView = React.lazy(() => import("../components/admin/views/AttributesView"));
const JobsView = React.lazy(() => import("../components/admin/views/JobsView").then(module => ({ default: module.JobsView })));
const TrafficView = React.lazy(() => import("../components/admin/views/TrafficView").then(module => ({ default: module.TrafficView })));
const SocialMediaView = React.lazy(() => import("../components/admin/social-media-view").then(module => ({ default: module.SocialMediaView })));
const UserFeedbackView = React.lazy(() => import("../components/admin/views/UserFeedbackView").then(module => ({ default: module.UserFeedbackView })));
const ClientPortalView = React.lazy(() => import("../components/admin/views/ClientPortalView").then(module => ({ default: module.ClientPortalView })));
const MediaManagerView = React.lazy(() => import("../components/admin/views/MediaManagerView").then(module => ({ default: module.MediaManagerView })));
const ShareStatsView = React.lazy(() => import("../components/admin/views/ShareStatsView").then(module => ({ default: module.ShareStatsView })));
const UserEngagementView = React.lazy(() => import("../components/admin/views/UserEngagementView").then(module => ({ default: module.UserEngagementView })));
const AboutUsMediaView = React.lazy(() => import("../components/admin/views/AboutUsMediaView"));

import { 
  BarChart,
  Bar,
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageCode } from "../lib/translations";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Mon", revenue: 4000, rfq: 24, visitors: 1200 },
  { name: "Tue", revenue: 3000, rfq: 18, visitors: 1100 },
  { name: "Wed", revenue: 5000, rfq: 32, visitors: 1600 },
  { name: "Thu", revenue: 2780, rfq: 15, visitors: 900 },
  { name: "Fri", revenue: 6890, rfq: 45, visitors: 2100 },
  { name: "Sat", revenue: 2390, rfq: 12, visitors: 800 },
  { name: "Sun", revenue: 3490, rfq: 20, visitors: 950 },
];

const inventoryData = [
  { name: "Paper Cups (8oz)", stock: 85, color: "#10b981" },
  { name: "Kraft Boxes", stock: 45, color: "#fabf37" },
  { name: "Coffee Sleeves", stock: 15, color: "#ef4444" },
  { name: "Plastic Lids", stock: 92, color: "#10b981" },
];

const rfqs = [
  { id: "RFQ-10293", client: "Arabica Coffee Co.", product: "8oz Double Wall", quantity: "50,000 pcs", status: "pending", time: "2h ago" },
  { id: "RFQ-10294", client: "Green Leaf Cafe", product: "Eco-Friendly Tray", quantity: "10,000 pcs", status: "reviewing", time: "4h ago" },
  { id: "RFQ-10295", client: "Global Catering", product: "Single Wall (Custom)", quantity: "250,000 pcs", status: "quoted", time: "6h ago" },
];

export default function AdminDashboard({ 
  onLogout, 
  heroVideoUrl, 
  onUpdateHeroVideo,
  heroVideoMobileUrl,
  onUpdateHeroVideoMobile,
  clientsVideoUrl,
  onUpdateClientsVideo,
  heroContent,
  onUpdateHeroContent,
  products,
  onUpdateProducts,
  testimonials,
  onUpdateTestimonials,
  impactStats,
  onUpdateImpactStats,
  productionStats,
  onUpdateProductionStats,
  careers,
  onUpdateCareers,
  clientProjects,
  onUpdateClientProjects,
  partners,
  onUpdatePartners,
  brochureUrl,
  onUpdateBrochure,
  aboutUsVideos,
  onUpdateAboutUsVideos
}: { 
  onLogout: () => void, 
  heroVideoUrl?: string, 
  onUpdateHeroVideo?: (url: string) => void,
  heroVideoMobileUrl?: string,
  onUpdateHeroVideoMobile?: (url: string) => void,
  clientsVideoUrl?: string,
  onUpdateClientsVideo?: (url: string) => void,
  heroContent?: any,
  onUpdateHeroContent?: (content: any) => void,
  products?: any[],
  onUpdateProducts?: (products: any[]) => void,
  testimonials?: any[],
  onUpdateTestimonials?: (testimonials: any[]) => void,
  impactStats?: any[],
  onUpdateImpactStats?: (stats: any[]) => void,
  productionStats?: any,
  onUpdateProductionStats?: (stats: any) => void,
  careers?: any[],
  onUpdateCareers?: (careers: any[]) => void,
  clientProjects?: any[],
  onUpdateClientProjects?: (projects: any[]) => void,
  partners?: any[],
  onUpdatePartners?: (partners: any[]) => void,
  brochureUrl?: string,
  onUpdateBrochure?: (url: string) => void,
  aboutUsVideos?: any,
  onUpdateAboutUsVideos?: (videos: any) => void
}) {
  const { language, setLanguage, tone, setTone, t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState("visitors");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [viewingImage, setViewingImage] = React.useState<string | null>(null);
  const [viewingVideo, setViewingVideo] = React.useState<string | null>(null);
  const [isProductionExpanded, setIsProductionExpanded] = React.useState(false);
  const [foodBoxAttributes, setFoodBoxAttributes] = React.useState([
    { title: "Paper Material", options: ["Premium Swedish Pulp", "Recycled Kraft", "Luxury Art Paper"] },
    { title: "GSM", options: ["280 GSM", "300 GSM", "350 GSM", "400 GSM"] },
    { title: "Finish", options: ["Matte UV", "Gloss Laminated", "Soft Touch", "Metallic Foil"] }
  ]);
  const [addingOptionFor, setAddingOptionFor] = React.useState<string | null>(null);
  const [isAddingAttribute, setIsAddingAttribute] = React.useState(false);
  const [itemAttributes, setItemAttributes] = React.useState<Record<string, string[]>>({});
  const [productionFeed, setProductionFeed] = React.useState(
    Array.from({ length: 20 }).map((_, i) => {
      const clients = ["Greenleaf Organics", "Urban Brew Co.", "Medisafe Pharma", "Velocity Logistics", "EcoWare Solutions", "BioPack Industries", "PureFiber Tech", "NatureFirst Packaging"];
      const titles = [
        "Biodegradable Food Containers", 
        "Thermal Insulation Cups", 
        "Secure Sterility Boxes", 
        "Heavy-Duty Shipping Units",
        "Sustainable Coffee Sleeves",
        "Recycled Kraft Bags",
        "Compostable Cutlery Sets",
        "Bamboo Fiber Plates",
        "Corrugated Retail Displays",
        "Pharmaceutical Blister Packs"
      ];
      const statuses = ["production", "qc_check", "dispatched", "pending_material"];
      const images = [
        "https://images.unsplash.com/photo-1727021024931-90c226e8448d?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmR1c3RyaWFsJTIwcGFja2FnaW5nJTIwYmlvZGVncmFkYWJsZSUyMGZvb2QlMjBjb250YWluZXJzJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjcxODQ4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1658418467495-134ce7d69430?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwcGFwZXIlMjBjb2ZmZWUlMjBjdXAlMjBpbmR1c3RyaWFsJTIwc3R5bGV8ZW58MXx8fHwxNzY3MTg0ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1550572017-738a8a40f286?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGFja2FnaW5nJTIwYm94JTIwc3RlcmlsZSUyMGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MXx8fHwxNzY3MTg0ODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1747006116196-fc20e136e4c0?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNhcmRib2FyZCUyMGJveGVzJTIwd2FyZWhvdXNlJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjcxODQ4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ];
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: i + 1,
        client: clients[Math.floor(Math.random() * clients.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        desc: "Automated production line item with real-time quality monitoring and sustainability tracking.",
        image: images[Math.floor(Math.random() * images.length)],
        isVisible: true,
        status: i < 3 ? "production" : randomStatus,
        timestamp: i === 0 ? "Live" : `${Math.floor(Math.random() * 59) + 1}m ago`
      };
    })
  );
  const [productCategories, setProductCategories] = React.useState([
    { id: "01", name: "Office Stationary Supplies", items: ["Business Card", "Envelope", "Invoice Pad", "Letterhead Pad", "Money Receipt Book", "Delivery Note Book", "Note Book", "Diary", "File Folder"] },
    { id: "02", name: "Paper Cup Supplies", items: ["Paper Cup", "Paper Cup Holder", "Paper Cup Jacket/Sleeve", "Paper Cup Carrier"] },
    { id: "03", name: "Restaurant Supplies", items: ["FOOD BOX", "CHOWMEIN BOX", "MEAT BOX", "SANDWICH BOX", "BURGER BOX", "PIZZA BOX", "CAKE BOX", "SWEET BOX", "FRIES BOX", "SHAWARMA BOX", "WAFFLE BOX & TRAY", "WEDGES CONE", "ICE CREAM CONE", "SUGAR SACHET", "TABLE MAT", "CARRY BAG", "FOOD MENU"] },
    { id: "04", name: "Marketing Materials Supplies", items: ["Paper Bag", "Brochure / Catalog", "Premium Magazine", "Flyer & Leaflet", "Sticker", "Calendar", "Tissue Box"] },
    { id: "05", name: "Hospitals & Pharmaceuticals Supplies", items: ["Patient File", "X-Ray File", "Doctor's Prescription Pad", "Report Envelope", "Medicine Box", "Medicine Literature"] },
    { id: "06", name: "FMCG Products Supplies", items: ["Food & Beverage Packaging", "Personal Care Product Packaging", "Home Care Product Packaging", "Confectionary Goods Packaging"] },
    { id: "07", name: "Garments Accessories Supplies", items: ["Hangtag", "Label", "Sticker"] },
  ]);

  const renderView = () => {
    switch(activeTab) {
      case "overview":
        return (
          <div className="space-y-6 md:space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard label="Active Sessions" value="2,842" change="+12.5%" isPositive={true} icon={<Users className="size-6" />} />
              <StatsCard label="Lead Conversions" value="14.2%" change="+3.2%" isPositive={true} icon={<Sparkles className="size-6" />} />
              <StatsCard label="Website Uptime" value="99.99%" change="0.0%" isPositive={true} icon={<Globe className="size-6" />} />
              <StatsCard label="CMS Updates" value="128" change="+0.4%" isPositive={true} icon={<Settings className="size-6" />} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10">
              {/* Traffic Chart */}
              <div className="xl:col-span-2 bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 overflow-hidden">
                <div className="flex items-center justify-between mb-8 md:mb-10">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Traffic Analytics</h3>
                    <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">Global Reach vs User Conversion</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                        <div className="size-2 rounded-full bg-[#fabf37]" />
                        <span className="text-[9px] font-bold text-zinc-400">Revenue</span>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                        <div className="size-2 rounded-full bg-purple-500" />
                        <span className="text-[9px] font-bold text-zinc-400">Visitors</span>
                     </div>
                  </div>
                </div>
                <div className="h-[300px] md:h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#fabf37" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "12px" }}
                        itemStyle={{ color: "#fff", fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="visitors" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Inventory Health */}
              <div className="bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 flex flex-col">
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">Inventory Health</h3>
                 <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Stock Level Monitoring</p>
                
                <div className="h-[250px] w-full mb-6">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={inventoryData} layout="vertical" barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={100} tick={{fill: '#71717a', fontSize: 9, fontWeight: 700}} axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                          <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                            {inventoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>

                <div className="mt-auto space-y-4">
                   <h4 className="text-xs font-black text-white uppercase tracking-wider">Critical Alerts</h4>
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                         <Activity className="size-4 text-red-500 animate-pulse" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-red-400 uppercase tracking-wide">Low Stock Warning</p>
                         <p className="text-[10px] text-zinc-400 mt-1">Coffee Sleeves are below 20% threshold. Reorder recommended immediately.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Recent RFQs */}
            <div className="bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{t('incoming_rfqs')}</h3>
                  <button className="text-[10px] font-black uppercase text-[#fabf37] hover:underline">View All Requests</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rfqs.map((rfq) => (
                    <div key={rfq.id} className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl group hover:border-[#fabf37]/30 transition-all cursor-pointer hover:bg-zinc-900">
                      <div className="flex justify-between items-start mb-4">
                         <div className="px-2 py-1 bg-[#fabf37]/10 text-[#fabf37] text-[9px] font-black rounded uppercase">{rfq.status}</div>
                         <span className="text-[10px] text-zinc-500 font-mono">{rfq.time}</span>
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">{rfq.id}</p>
                      <h4 className="text-sm font-black text-white uppercase mb-2 line-clamp-1">{rfq.client}</h4>
                      <p className="text-[11px] font-bold text-zinc-500">{rfq.product}</p>
                      <p className="text-[11px] font-bold text-zinc-300">{rfq.quantity}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        );
      case "visitors": return <TrafficView />;
      case "shares": return <ShareStatsView />;
      case "engagement": return <UserEngagementView />;
      case "erpnext": return <ERPNextView />;
      case "neural-sync": return <AINeuralSyncView />;
      case "hosting": return <HostingView />;
      case "rfqs": return <RFQPipelineView />;
      case "inventory": return <ProductionInventoryView />;
      case "orders": return <ActiveOrdersView />;
      case "clients": return <ClientCRMView />;
      case "brochure-stats": return <BrochureAnalyticsView />;
      case "brochure-upload": return <BrochureUploadView />;
      case "comm-log": return <NeuralCommLogView />;
      case "sustainability": return <SustainabilityView />;
      case "compliance": return <SecurityComplianceView />;
      case "partners-cms": return (
        <CMSView 
          defaultCategory="Global Partners"
          heroVideoUrl={heroVideoUrl} 
          onUpdateHeroVideo={onUpdateHeroVideo} 
          heroVideoMobileUrl={heroVideoMobileUrl}
          onUpdateHeroVideoMobile={onUpdateHeroVideoMobile}
          clientsVideoUrl={clientsVideoUrl}
          onUpdateClientsVideo={onUpdateClientsVideo}
          heroContent={heroContent}
          onUpdateHeroContent={onUpdateHeroContent}
          products={products}
          onUpdateProducts={onUpdateProducts}
          testimonials={testimonials}
          onUpdateTestimonials={onUpdateTestimonials}
          impactStats={impactStats}
          onUpdateImpactStats={onUpdateImpactStats}
          productionStats={productionStats}
          onUpdateProductionStats={onUpdateProductionStats}
          careers={careers}
          onUpdateCareers={onUpdateCareers}
          clientProjects={clientProjects}
          onUpdateClientProjects={onUpdateClientProjects}
          partners={partners}
          onUpdatePartners={onUpdatePartners}
          brochureUrl={brochureUrl}
          onUpdateBrochure={onUpdateBrochure}
        />
      );
      case "cms": return (
        <CMSView 
          heroVideoUrl={heroVideoUrl} 
          onUpdateHeroVideo={onUpdateHeroVideo} 
          heroVideoMobileUrl={heroVideoMobileUrl}
          onUpdateHeroVideoMobile={onUpdateHeroVideoMobile}
          clientsVideoUrl={clientsVideoUrl}
          onUpdateClientsVideo={onUpdateClientsVideo}
          heroContent={heroContent}
          onUpdateHeroContent={onUpdateHeroContent}
          products={products}
          onUpdateProducts={onUpdateProducts}
          testimonials={testimonials}
          onUpdateTestimonials={onUpdateTestimonials}
          impactStats={impactStats}
          onUpdateImpactStats={onUpdateImpactStats}
          productionStats={productionStats}
          onUpdateProductionStats={onUpdateProductionStats}
          careers={careers}
          onUpdateCareers={onUpdateCareers}
          clientProjects={clientProjects}
          onUpdateClientProjects={onUpdateClientProjects}
          partners={partners}
          onUpdatePartners={onUpdatePartners}
          brochureUrl={brochureUrl}
          onUpdateBrochure={onUpdateBrochure}
        />
      );
      case "social-media": return <SocialMediaView />;
      case "languages": return <LanguageView />;
      case "attributes": return <AttributesView />;
      case "careers": return <JobsView />;
      case "feedback": return <UserFeedbackView />;
      case "portal": return <ClientPortalView />;
      case "media": return <MediaManagerView products={products} />;
      case "about-media": return <AboutUsMediaView aboutUsVideos={aboutUsVideos} onUpdateAboutUsVideos={onUpdateAboutUsVideos} />;
      default:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Product Command Center</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Connected to ERPNext v14.0 • Production DB</p>
                </div>
              </div>
              <div className="flex gap-3">
                 <button 
                   onClick={() => alert("ERPNext Connection Status:\n\n• API Gateway: Online\n• Webhook Latency: 14ms\n• Last Sync: Just now\n• Queue: Empty")}
                   className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2"
                 >
                   <Activity className="size-4 text-[#fabf37] animate-pulse" />
                   <span>Sync Status</span>
                 </button>
                 <button 
                   type="button"
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     
                     if (typeof onUpdateProducts !== 'function') {
                       alert("ACTION FAILED: 'onUpdateProducts' prop is missing. Please ensure the parent component passes this function.");
                       return;
                     }

                     const title = window.prompt("ENTER NEW SKU / PRODUCT NAME:");
                     if (title) {
                       const newItem = { 
                         id: `new-${Date.now()}`, 
                         title: title, 
                         category: "Manual Entry", 
                         image: "" 
                       };
                       const currentList = Array.isArray(products) ? products : [];
                       onUpdateProducts([newItem, ...currentList]);
                     }
                   }}
                   className="px-5 py-2.5 bg-[#fabf37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#fabf37]/90 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.2)] cursor-pointer relative z-10"
                 >
                   <Package className="size-4" />
                   <span>Add New SKU</span>
                 </button>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total SKU", value: products.length, trend: "+12%", color: "text-white" },
                { label: "Low Stock", value: "3", trend: "Urgent", color: "text-red-500" },
                { label: "Pending Sync", value: "0", trend: "All Good", color: "text-green-500" },
                { label: "ERP Status", value: "Online", trend: "14ms", color: "text-[#fabf37]" }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className={`text-2xl font-black uppercase tracking-tight ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] font-bold text-zinc-600 bg-white/5 px-2 py-1 rounded-md">{stat.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Split View: Recent Deployments + All Products */}
            <div className="space-y-12">
              
              {/* Part 1: Recent Deployments */}
              <div>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-[#fabf37] w-12" />
                  <h3 className="text-xs font-black text-black bg-[#fabf37] px-3 py-1 uppercase tracking-widest rounded-sm">Recent_Deployments</h3>
                  <div className="h-px bg-[#fabf37] w-12" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* ERP Status Header */}
                  <div className="col-span-full flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                             <Wifi className="size-3 text-green-500 animate-pulse" />
                             <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">ERP Live Sync</span>
                         </div>
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 rounded-full border border-white/5">
                             <RefreshCw className="size-3 text-zinc-400" />
                             <span className="text-[10px] font-medium text-zinc-400">Last updated: Just now</span>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <button 
                            onClick={() => setIsProductionExpanded(!isProductionExpanded)}
                            className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white group"
                         >
                             <span className="text-[9px] font-bold uppercase tracking-wider">{isProductionExpanded ? "Show Less" : "View All"}</span>
                             <ChevronDown className={`size-4 transition-transform duration-300 ${isProductionExpanded ? "rotate-180" : ""}`} />
                         </button>
                         <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white group relative">
                             <Settings className="size-4 group-hover:rotate-90 transition-transform duration-500" />
                             <span className="absolute -top-8 right-0 bg-black text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Configure Feed</span>
                         </button>
                     </div>
                  </div>

                  {productionFeed.slice(0, isProductionExpanded ? 20 : 4).map(item => (
                     <div key={item.id} className={`relative aspect-[3/4] rounded-[32px] overflow-hidden group border transition-all duration-300 ${item.isVisible ? 'border-white/10 hover:border-[#fabf37]/50 opacity-100' : 'border-red-500/30 opacity-40 grayscale'}`}>
                        {/* Controls Overlay */}
                        <div className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-transform duration-300 ${activeDropdown === `prod-${item.id}` ? 'translate-x-0' : 'translate-x-12 group-hover:translate-x-0'}`}>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newFeed = productionFeed.map(p => p.id === item.id ? {...p, isVisible: !p.isVisible} : p);
                                    setProductionFeed(newFeed);
                                }}
                                className="size-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
                                title={item.isVisible ? "Hide Item" : "Show Item"}
                            >
                                {item.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </button>
                            
                            <div className="relative">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(activeDropdown === `prod-${item.id}` ? null : `prod-${item.id}`);
                                    }}
                                    className={`size-8 rounded-full backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${activeDropdown === `prod-${item.id}` ? 'bg-white text-black' : 'bg-black/60 text-white hover:bg-white hover:text-black'}`}
                                >
                                    <MoreHorizontal className="size-4" />
                                </button>
                                
                                {activeDropdown === `prod-${item.id}` && (
                                    <div className="absolute right-full top-0 mr-2 w-32 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="py-1">
                                            <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }} className="w-full px-4 py-2 text-left text-[10px] font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-blue-500" /> View Details
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }} className="w-full px-4 py-2 text-left text-[10px] font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-yellow-500" /> Edit Status
                                            </button>
                                            <div className="h-px bg-white/5 my-1" />
                                            <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }} className="w-full px-4 py-2 text-left text-[10px] font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-red-500" /> Remove Item
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Live Badge */}
                        {item.timestamp === "Live" && item.isVisible && (
                            <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-red-600/90 text-white text-[9px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-lg shadow-red-600/20 backdrop-blur-md">
                                <span className="size-1.5 bg-white rounded-full animate-pulse" />
                                Live Production
                            </div>
                        )}

                        <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                          <div className="flex items-center justify-between mb-2">
                              <p className="text-[9px] font-black text-[#fabf37] uppercase flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-[#fabf37]" />
                                {item.client}
                              </p>
                              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/5">{item.timestamp}</span>
                          </div>
                          <h4 className="text-lg font-black text-white uppercase leading-none mb-3">{item.title}</h4>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded border backdrop-blur-sm ${
                                item.status === 'production' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                                item.status === 'qc_check' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
                                'bg-green-500/20 border-green-500/30 text-green-400'
                            }`}>
                                {item.status.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <p className="text-[10px] font-bold text-zinc-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">{item.desc}</p>
                        </div>
                     </div>
                  ))}
                </div>
              </div>

              {/* Part 2: All Products (Catalog) */}
              <div className="bg-[#f5f5f0] rounded-[40px] p-8 md:p-12 text-black relative overflow-hidden">
                 {/* Background Grid Pattern */}
                 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                 
                 <div className="relative z-10">
                   <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/5">
                      <div className="flex items-center gap-3">
                         <div className="size-3 rounded-full bg-[#fabf37] animate-pulse" />
                         <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Manufacturing_Active_044</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-black/5">
                          <div className="size-1.5 rounded-full bg-green-500" />
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Live Engine Active</span>
                        </div>
                        {/* Functionality: Import Button */}
                        <button 
                          onClick={() => {
                             const newItems = Array.from({ length: 3 }).map((_, i) => ({
                               id: `erp-imp-${Date.now()}-${i}`,
                               title: `ERP Component #${Math.floor(Math.random() * 9000) + 1000}`,
                               category: "Raw Material",
                               image: ""
                             }));
                             if (onUpdateProducts) {
                               onUpdateProducts([...newItems, ...products]);
                               alert("SYNC COMPLETE\n\nSuccessfully imported items from ERPNext.");
                             }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all"
                        >
                           <Package className="size-3" />
                           <span>Sync Catalog</span>
                        </button>
                      </div>
                   </div>
                   
                   <div className="space-y-8">
                      {/* ERPNext Sync Header */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-zinc-50/50 p-4 rounded-2xl border border-zinc-200/50 backdrop-blur-xl">
                         <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center shadow-lg shadow-black/10">
                               <Globe className="size-5 text-[#fabf37]" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-sm font-black uppercase tracking-wide text-zinc-900">Global Product Catalog</h3>
                                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-wider border border-green-200 flex items-center gap-1">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    ERPNext Live Sync
                                  </span>
                               </div>
                               <p className="text-[10px] font-medium text-zinc-500">
                                 Automatically synchronizing categories, items, and attributes with master database.
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 w-full md:w-auto">
                             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] font-bold text-zinc-600 hover:border-[#fabf37] hover:text-black transition-all shadow-sm">
                                <Activity className="size-3" />
                                <span>View Logs</span>
                             </button>
                             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-[10px] font-bold hover:bg-[#fabf37] hover:text-black transition-all shadow-lg shadow-black/10">
                                <Sparkles className="size-3" />
                                <span>Sync Changes</span>
                             </button>
                         </div>
                      </div>

                      {/* Editable Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
                      {productCategories.map(cat => (
                         <div key={cat.id} className="group relative">
                            {/* Editable Category Header */}
                            <div className="flex items-baseline justify-between border-b border-black/10 pb-2 mb-4 group-hover:border-[#fabf37] transition-colors">
                               <div className="flex items-center gap-2 w-full">
                                  <span className="text-sm font-black text-[#fabf37]">●</span>
                                  <input 
                                    type="text" 
                                    defaultValue={cat.name}
                                    className="w-full bg-transparent border-none p-0 text-sm font-black uppercase tracking-wide text-zinc-900 focus:ring-0 focus:text-[#fabf37] placeholder:text-zinc-300"
                                    placeholder="CATEGORY NAME"
                                  />
                               </div>
                               <span className="text-[9px] font-bold text-zinc-300 whitespace-nowrap">[{cat.id}]</span>
                            </div>
                            
                            <div className="space-y-2">
                               {cat.items.map((item, idx) => {
                                  const itemId = `${cat.id}-${idx}`;
                                  const isActive = activeDropdown === itemId;
                                  
                                  return (
                                    <div key={item} className="group/item">
                                       <div 
                                          onClick={() => setActiveDropdown(isActive ? null : itemId)}
                                          className={`
                                            flex items-center justify-between px-4 py-2.5 border rounded-xl text-[10px] font-bold uppercase tracking-wide cursor-pointer transition-all shadow-sm group/handle
                                            ${isActive 
                                              ? "bg-[#fabf37] border-[#fabf37] text-black rounded-b-none" 
                                              : "bg-white border-black/5 hover:border-[#fabf37] hover:bg-zinc-50"
                                            }
                                          `}
                                       >
                                          {/* Editable Item Name (simulated with click propagation stop) */}
                                          <span className={`block w-full text-[9px] font-bold uppercase tracking-wide ${isActive ? "text-black" : "text-zinc-900"}`}>
                                            {item}
                                          </span>
                                          <ChevronDown className={`size-3 transition-transform duration-300 ${isActive ? "rotate-180 text-black" : "-rotate-90 text-zinc-300 group-hover/handle:text-black"}`} />
                                       </div>
                                       
                                       {item === "Paper Cup" && !isActive && (
                                          <div className="mt-1 ml-6 space-y-1 border-l-2 border-black/5 pl-2">
                                              {["Single Wall", "Double Wall", "Ripple Wall"].map((sub) => (
                                                  <div 
                                                    key={sub} 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveDropdown(itemId);
                                                    }}
                                                    className="px-3 py-1.5 border border-black/5 bg-zinc-50 rounded-lg text-[8px] font-bold uppercase tracking-wide text-zinc-500 flex items-center gap-2 cursor-pointer hover:bg-white hover:border-[#fabf37] hover:text-black transition-all group/sub"
                                                  >
                                                      <div className="size-1 rounded-full bg-zinc-300 group-hover/sub:bg-[#fabf37] transition-colors" />
                                                      {sub}
                                                  </div>
                                              ))}
                                          </div>
                                       )}

                                       <AnimatePresence>
                                         {isActive && (
                                           <motion.div
                                             initial={{ height: 0, opacity: 0 }}
                                             animate={{ height: "auto", opacity: 1 }}
                                             exit={{ height: 0, opacity: 0 }}
                                             className="overflow-hidden bg-white border-x border-b border-black/5 rounded-b-xl shadow-xl relative z-20"
                                           >
                                             <div className="p-4 space-y-4">
                                               
                                               {/* Feature 0: Media Gallery */}
                                               <div className="mb-4">
                                                  <div className="flex items-center justify-between mb-2">
                                                     <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Media Gallery</span>
                                                     <span className="text-[8px] font-bold text-zinc-300">Image & Video</span>
                                                  </div>
                                                  <div className="grid grid-cols-4 gap-2 h-16">
                                                     {/* Add Button */}
                                                     <button 
                                                       onClick={(e) => { e.stopPropagation(); alert("Upload modal placeholder"); }}
                                                       className="col-span-1 border border-dashed border-zinc-300 bg-zinc-50 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-[#fabf37] hover:bg-[#fabf37]/10 transition-colors group/btn"
                                                     >
                                                         <div className="size-4 rounded-full border border-zinc-400 flex items-center justify-center group-hover/btn:border-[#fabf37]">
                                                            <span className="text-[10px] text-zinc-400 font-bold group-hover/btn:text-[#fabf37]">+</span>
                                                         </div>
                                                         <span className="text-[6px] font-bold text-zinc-400 uppercase group-hover/btn:text-[#fabf37]">Add New</span>
                                                     </button>
                                                     
                                                     {/* Placeholder Image 1 */}
                                                     <div className="col-span-1 bg-zinc-100 rounded-lg relative group/img overflow-hidden border border-zinc-100">
                                                        <img loading="lazy" decoding="async" 
                                                            src="https://images.unsplash.com/photo-1704324564365-3e0c351e5864?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGN1cCUyMHBhY2thZ2luZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzY3MTg4NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                                                            alt="IMG_01"
                                                            onClick={() => setViewingImage("https://images.unsplash.com/photo-1704324564365-3e0c351e5864?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGN1cCUyMHBhY2thZ2luZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzY3MTg4NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")}
                                                            className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                                         />
                                                        <button className="absolute top-1 right-1 bg-black/50 text-white p-0.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                           <X className="size-2" />
                                                        </button>
                                                     </div>

                                                      {/* Placeholder Video 1 */}
                                                     <div className="col-span-1 bg-black/5 rounded-lg relative group/img overflow-hidden border border-zinc-100">
                                                        <div 
                                                            className="absolute inset-0 w-full h-full cursor-pointer group/video"
                                                            onClick={() => setViewingVideo("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4")}
                                                        >
                                                            <img loading="lazy" decoding="async" 
                                                                src="https://images.unsplash.com/photo-1727857934741-93f20b9ffe71?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtZWV0aW5nJTIwdmlkZW8lMjB0aHVtYm5haWx8ZW58MXx8fHwxNzY3MTg4ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                                                alt="Video Thumbnail"
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/video:bg-black/40 transition-colors">
                                                                <div className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover/video:scale-110 transition-transform">
                                                                    <div className="ml-1 border-l-[6px] border-l-white border-y-[4px] border-y-transparent h-3"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-white flex items-center gap-1">
                                                                <div className="size-1.5 bg-red-500 rounded-full animate-pulse" />
                                                                VIDEO
                                                            </div>
                                                        </div>
                                                        <button className="absolute top-1 right-1 bg-black/50 text-white p-0.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                           <X className="size-2" />
                                                        </button>
                                                     </div>
                                                  </div>
                                               </div>

                                               {/* Feature 1: Attributes */}
                                               <div>
                                                 <div className="flex items-center justify-between mb-2">
                                                   <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Attributes</span>
                                                   <button 
                                                     onClick={(e) => {
                                                       e.stopPropagation();
                                                       const attr = prompt("Add new attribute (e.g. Size, Color):");
                                                       if(attr) {
                                                           setItemAttributes(prev => {
                                                               const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                                                               return { ...prev, [item]: [...current, attr] };
                                                           });
                                                       }
                                                     }}
                                                     className="text-[8px] font-bold text-[#fabf37] bg-black px-1.5 py-0.5 rounded hover:bg-zinc-800 transition-colors"
                                                   >
                                                     + ADD
                                                   </button>
                                                 </div>
                                                 <div className="flex flex-wrap gap-1.5">
                                                    {(itemAttributes[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly']).map((tag, idx) => (
                                                      <div key={`${tag}-${idx}`} className="flex items-center gap-1 px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-[9px] text-zinc-600 font-medium group/tag hover:border-red-200 hover:bg-red-50 cursor-pointer">
                                                        <span>{tag}</span>
                                                        <X 
                                                            className="size-2 text-zinc-300 group-hover/tag:text-red-400" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setItemAttributes(prev => {
                                                                    const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                                                                    return { ...prev, [item]: current.filter((_, i) => i !== idx) };
                                                                });
                                                            }}
                                                        />
                                                      </div>
                                                    ))}
                                                 </div>
                                               </div>

                                               {/* Feature 2: Offers */}
                                               <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-black/5">
                                                 <div className="flex items-center gap-2">
                                                   <Sparkles className="size-3 text-[#fabf37]" />
                                                   <span className="text-[9px] font-bold text-zinc-700">Seasonal Bundle Offer</span>
                                                 </div>
                                                 <label className="relative inline-flex items-center cursor-pointer">
                                                   <input type="checkbox" className="sr-only peer" />
                                                   <div className="w-6 h-3 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-[#fabf37]"></div>
                                                 </label>
                                               </div>

                                               {/* Feature 3: Section Builder */}
                                               <div>
                                                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Add Content Section</span>
                                                  <div className="flex flex-col gap-3">
                                                     {/* Main Content Blocks */}
                                                     <div className="grid grid-cols-2 gap-2 relative z-10">
                                                        {/* Description Editor */}
                                                        <details className="group w-full">
                                                           <summary className="list-none w-full h-full cursor-pointer [&::-webkit-details-marker]:hidden">
                                                              <div className="flex items-center justify-center gap-1.5 py-2 border border-dashed border-zinc-300 rounded-lg hover:bg-zinc-50 hover:border-[#fabf37] transition-colors bg-white h-full group-open:border-[#fabf37] group-open:bg-zinc-50">
                                                                 <FileText className="size-3 text-zinc-400 group-hover:text-[#fabf37] group-open:text-[#fabf37]" />
                                                                 <span className="text-[8px] font-bold text-zinc-500 group-hover:text-black group-open:text-black">Description</span>
                                                              </div>
                                                           </summary>
                                                           <div 
                                                              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4 animate-in fade-in duration-200"
                                                              onClick={(e) => {
                                                                  if(e.target === e.currentTarget) {
                                                                      e.currentTarget.closest('details')?.removeAttribute('open');
                                                                  }
                                                              }}
                                                           >
                                                              <div className="bg-white border border-zinc-200 rounded-2xl shadow-2xl w-full max-w-[320px] p-5 ring-1 ring-zinc-900/5 relative animate-in zoom-in-95 duration-200">
                                                                  <div className="flex items-center justify-between mb-3">
                                                                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Product Description</label>
                                                                      <button type="button" onClick={(e) => {
                                                                          e.preventDefault();
                                                                          e.currentTarget.closest('details')?.removeAttribute('open');
                                                                      }} className="text-zinc-400 hover:text-black transition-colors bg-zinc-100 p-1 rounded-full"><X className="size-3"/></button>
                                                                  </div>
                                                                  <div className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#fabf37]/20 focus-within:border-[#fabf37] transition-all">
                                                                      <textarea 
                                                                        className="w-full bg-transparent border-none text-[11px] text-zinc-700 focus:ring-0 resize-none font-medium leading-relaxed placeholder:text-zinc-400"
                                                                        rows={5}
                                                                        placeholder="Enter detailed description..."
                                                                        defaultValue="Premium double-wall cups made from sustainable bamboo fiber, designed for heat insulation and eco-conscious branding."
                                                                      />
                                                                  </div>
                                                                  <div className="mt-3 flex justify-end">
                                                                      <button type="button" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')} className="text-[9px] font-bold text-white bg-black px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">Save Changes</button>
                                                                  </div>
                                                              </div>
                                                           </div>
                                                        </details>

                                                        {/* Specs Viewer */}
                                                        <details className="group w-full">
                                                           <summary className="list-none w-full h-full cursor-pointer [&::-webkit-details-marker]:hidden">
                                                              <div className="flex items-center justify-center gap-1.5 py-2 border border-dashed border-zinc-300 rounded-lg hover:bg-zinc-50 hover:border-[#fabf37] transition-colors bg-white h-full group-open:border-[#fabf37] group-open:bg-zinc-50">
                                                                 <Package className="size-3 text-zinc-400 group-hover:text-[#fabf37] group-open:text-[#fabf37]" />
                                                                 <span className="text-[8px] font-bold text-zinc-500 group-hover:text-black group-open:text-black">Specs</span>
                                                              </div>
                                                           </summary>
                                                           <div 
                                                              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4 animate-in fade-in duration-200"
                                                              onClick={(e) => {
                                                                  if(e.target === e.currentTarget) {
                                                                      e.currentTarget.closest('details')?.removeAttribute('open');
                                                                  }
                                                              }}
                                                           >
                                                              <div className="bg-white border border-zinc-200 rounded-2xl shadow-2xl w-full max-w-[280px] p-0 ring-1 ring-zinc-900/5 overflow-hidden relative animate-in zoom-in-95 duration-200">
                                                                  <button type="button" onClick={(e) => {
                                                                      e.preventDefault();
                                                                      e.currentTarget.closest('details')?.removeAttribute('open');
                                                                  }} className="absolute top-2 right-2 text-zinc-400 hover:text-black transition-colors bg-zinc-100/50 p-1 rounded-full z-10"><X className="size-3"/></button>
                                                                  
                                                                  <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-zinc-50/50">
                                                                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Technical Specs</span>
                                                                     <span className="text-[8px] font-black text-[#fabf37] bg-black px-2 py-1 rounded-md tracking-wide shadow-sm mr-6">AUTO-GENERATED</span>
                                                                  </div>
                                                                  <div className="p-2 space-y-0.5">
                                                                     {[
                                                                       {k:"Material", v:"Bamboo Pulp"},
                                                                       {k:"Coating", v:"Water-based"},
                                                                       {k:"GSM", v:"320 + 18 PE"},
                                                                       {k:"Certification", v:"FSC Mixed"},
                                                                       {k:"Origin", v:"Indonesia"}
                                                                     ].map((s,i) => (
                                                                        <div key={i} className="flex justify-between items-center text-[10px] p-2 rounded-lg hover:bg-zinc-50 transition-colors group/row cursor-default">
                                                                           <span className="text-zinc-500 font-bold">{s.k}</span>
                                                                           <span className="font-bold text-zinc-900 group-hover/row:text-black">{s.v}</span>
                                                                        </div>
                                                                     ))}
                                                                  </div>
                                                              </div>
                                                           </div>
                                                        </details>
                                                     </div>

                                                     {/* Attribute Presets */}
                                                     <div className="bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                                                        <div className="flex items-center justify-between mb-2">
                                                           <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Select Attributes</span>
                                                           <span className="text-[7px] font-bold text-[#fabf37] bg-black px-1.5 rounded cursor-help" title="AI will auto-suggest attributes based on product category">AI-DETECT</span>
                                                        </div>
                                                        {item === "FOOD BOX" && (
                                                      <div className="mb-4 border-b border-black/5 pb-4 space-y-4">
                                                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                                                              <span className="text-[10px] font-black text-black uppercase tracking-widest">Food Parcel Box Configurations</span>
                                                          </div>
                                                          {foodBoxAttributes.map((section, sIdx) => (
                                                              <div key={section.title}>
                                                                  <div className="flex items-center gap-2 mb-2">
                                                                      <h4 className="text-[9px] font-bold text-orange-500">{section.title}</h4>
                                                                      <button 
                                                                         type="button"
                                                                         onClick={(e) => {
                                                                             e.preventDefault();
                                                                             e.stopPropagation();
                                                                             setAddingOptionFor(section.title);
                                                                         }}
                                                                         className="text-[8px] font-bold text-zinc-400 hover:text-black hover:bg-zinc-200 px-1 rounded transition-colors cursor-pointer relative z-50"
                                                                      >
                                                                         + ADD
                                                                      </button>
                                                                  </div>
                                                                  <div className="flex flex-wrap gap-2">
                                                                      {section.options.map(opt => {
                                                                          const isPaper = section.title === "Paper Option";
                                                                          const [main, sub] = isPaper && opt.includes(" - ") ? opt.split(" - ") : [opt, null];
                                                                          
                                                                          return (
                                                                              <button key={opt} className={`px-3 py-1.5 bg-white border border-zinc-200 rounded text-[9px] font-medium text-zinc-600 hover:border-orange-500 hover:text-black hover:bg-orange-50/50 transition-colors group ${sub ? 'flex flex-col items-start gap-1 min-w-[120px]' : ''}`}>
                                                                                  <span>{main}</span>
                                                                                  {sub && (
                                                                                      <span className="text-[7px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded-sm group-hover:bg-[#fabf37] group-hover:text-black transition-colors">
                                                                                          {sub}
                                                                                      </span>
                                                                                  )}
                                                                              </button>
                                                                          );
                                                                      })}
                                                                      {addingOptionFor === section.title && (
                                                                           <input
                                                                               autoFocus
                                                                               type="text"
                                                                               className="px-3 py-1.5 bg-white border border-orange-500 rounded text-[9px] font-medium text-zinc-900 outline-none min-w-[60px]"
                                                                               placeholder="Type..."
                                                                               onBlur={(e) => {
                                                                                   const val = e.target.value.trim();
                                                                                   if(val) {
                                                                                       setFoodBoxAttributes(prev => prev.map(attr => {
                                                                                           if (attr.title === section.title) {
                                                                                               if (attr.options.includes(val)) return attr;
                                                                                               return { ...attr, options: [...attr.options, val] };
                                                                                           }
                                                                                           return attr;
                                                                                       }));
                                                                                   }
                                                                                   setAddingOptionFor(null);
                                                                               }}
                                                                               onKeyDown={(e) => {
                                                                                   if(e.key === 'Enter') e.currentTarget.blur();
                                                                                   if(e.key === 'Escape') setAddingOptionFor(null);
                                                                               }}
                                                                           />
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          ))}
                                                      </div>
                                                  )}
                                                  <div className="flex flex-wrap gap-1.5">
                                                           {[
                                                             { label: "Dimensions", icon: "📏" },
                                                             { label: "Material", icon: "🧬" },
                                                             { label: "Weight", icon: "⚖️" },
                                                             { label: "Capacity", icon: "🧊" },
                                                             { label: "Color", icon: "🎨" }
                                                           ].map((attr) => (
                                                              <button 
                                                                key={attr.label}
                                                                onClick={(e) => { 
                                                                    e.stopPropagation(); 
                                                                    if (item === "FOOD BOX") {
                                                                        setFoodBoxAttributes(prev => {
                                                                            if (prev.find(p => p.title === attr.label)) return prev;
                                                                            return [...prev, { title: attr.label, options: ["Standard"] }];
                                                                        });
                                                                    } else {
                                                                        setItemAttributes(prev => {
                                                                            const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                                                                            if (current.includes(attr.label)) return prev;
                                                                            return { ...prev, [item]: [...current, attr.label] };
                                                                        });
                                                                    }
                                                                }}
                                                                className="flex items-center gap-1 px-2 py-1 bg-white border border-zinc-200 rounded text-[8px] font-bold text-zinc-600 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                                                              >
                                                                <span className="opacity-70 grayscale text-[10px]">{attr.icon}</span>
                                                                <span>{attr.label}</span>
                                                              </button>
                                                           ))}
                                                           {isAddingAttribute ? (
                                                               <input
                                                                   autoFocus
                                                                   type="text"
                                                                   className="px-2 py-1 bg-white border border-orange-500 rounded text-[8px] font-bold text-zinc-900 outline-none min-w-[80px]"
                                                                   placeholder="Attr Name..."
                                                                   onBlur={(e) => {
                                                                       const name = e.target.value.trim();
                                                                       if (name) {
                                                                           if (item === "FOOD BOX") {
                                                                               setFoodBoxAttributes(prev => [...prev, { title: name, options: ["Option 1"] }]);
                                                                           } else {
                                                                               setItemAttributes(prev => {
                                                                                   const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                                                                                   return { ...prev, [item]: [...current, name] };
                                                                               });
                                                                           }
                                                                       }
                                                                       setIsAddingAttribute(false);
                                                                   }}
                                                                   onKeyDown={(e) => {
                                                                       if(e.key === 'Enter') e.currentTarget.blur();
                                                                       if(e.key === 'Escape') setIsAddingAttribute(false);
                                                                   }}
                                                               />
                                                           ) : (
                                                               <button 
                                                                  onClick={(e) => { 
                                                                      e.stopPropagation(); 
                                                                      setIsAddingAttribute(true);
                                                                  }}
                                                                  className="px-2 py-1 bg-zinc-200 border border-transparent rounded text-[8px] font-bold text-zinc-500 hover:bg-[#fabf37] hover:text-black transition-colors"
                                                               >
                                                                  + Custom
                                                               </button>
                                                           )}
                                                        </div>
                                                     </div>
                                                  </div>
                                               </div>

                                               {/* Advanced Actions */}
                                               <button 
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      alert(`Opening Advanced SKU Configurator for: ${item}`);
                                                  }}
                                                  className="w-full py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#fabf37] hover:text-black transition-colors flex items-center justify-center gap-2 shadow-lg"
                                               >
                                                  <Settings className="size-3" />
                                                  <span>Configure Full SKU</span>
                                               </button>

                                             </div>
                                           </motion.div>
                                         )}
                                       </AnimatePresence>
                                    </div>
                                  );
                               })}
                               {/* Add New Item Button */}
                               <button 
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-zinc-200 rounded-xl text-[10px] font-bold text-zinc-400 uppercase tracking-wide hover:text-black hover:border-[#fabf37] hover:bg-zinc-50 transition-all"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      const name = prompt(`Add new item to ${cat.name}:`);
                                      if(name) {
                                          setProductCategories(prev => prev.map(c => 
                                              c.id === cat.id ? { ...c, items: [...c.items, name] } : c
                                          ));
                                      }
                                  }}
                               >
                                  <X className="size-3 rotate-45" />
                                  <span>Add Item</span>
                               </button>
                            </div>
                         </div>
                      ))}
                      
                      {/* Add New Section Card */}
                      <button 
                          onClick={() => {
                              const name = prompt("Enter new Category Name:");
                              if(name) {
                                  setProductCategories(prev => [
                                      ...prev,
                                      { 
                                          id: String(prev.length + 1).padStart(2, '0'), 
                                          name, 
                                          items: [] 
                                      }
                                  ]);
                              }
                          }}
                          className="group flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-zinc-200 rounded-2xl hover:border-[#fabf37] hover:bg-zinc-50 transition-all gap-4 animate-in fade-in"
                      >
                         <div className="size-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#fabf37] transition-colors shadow-sm">
                             <X className="size-5 text-zinc-400 group-hover:text-black rotate-45" />
                         </div>
                         <div className="text-center">
                             <span className="text-xs font-black text-zinc-400 group-hover:text-black uppercase tracking-wider block mb-1">Add New Section</span>
                             <span className="text-[9px] font-medium text-zinc-300 group-hover:text-zinc-500">Create a new product category</span>
                         </div>
                      </button>
                   </div>
                   </div>
                   
                   <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                         <div className="flex items-center gap-2">
                           <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                           <span>Global_Sync: Stable</span>
                         </div>
                         <span>7 Categories Active</span>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black/10 hover:border-[#fabf37] pb-1 transition-all">Explore Full Catalog</button>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] font-['Poppins',sans-serif] relative overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] lg:hidden"
            />
            <motion.div 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-[160] lg:hidden"
            >
              <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }} 
                onLogout={onLogout} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex flex-col min-w-0 w-full">
        <header className="h-16 md:h-20 bg-black/50 backdrop-blur-md border-b border-white/5 px-4 md:px-10 flex items-center justify-between sticky top-24 mt-24 z-[100]">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden size-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10"
            >
              <Menu className="size-6" />
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Language Toggle */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "lang" ? null : "lang")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#fabf37] transition-all group relative overflow-hidden"
              >
                <Globe className={`size-3 transition-colors ${activeDropdown === "lang" ? "text-[#fabf37]" : "text-white/50 group-hover:text-[#fabf37]"}`} />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[9px] font-black text-white">{language}</span>
                  <span className="text-[6px] font-bold text-[#fabf37] uppercase tracking-tighter">AI-{tone}</span>
                </div>
                <ChevronDown className={`size-2 text-white/30 transition-transform ${activeDropdown === "lang" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "lang" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 pt-2 min-w-[200px] z-[100]"
                  >
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
                      {/* AI Tone Switcher */}
                      <div className="px-2 py-1.5 border-b border-white/5 mb-1.5">
                        <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] mb-1.5 block">AI Intelligence Tone</span>
                        <div className="flex gap-1">
                          {(['formal', 'corporate', 'friendly'] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => setTone(t as Parameters<typeof setTone>[0])}
                              className={`flex-1 text-[7px] font-black py-1 rounded-md transition-all ${
                                tone === t 
                                  ? "bg-[#fabf37] text-black" 
                                  : "bg-white/5 text-white/40 hover:bg-white/10"
                              }`}
                            >
                              {t.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                        {[
                          { code: "EN", name: "English", flag: "🇺🇸" },
                          { code: "BN", name: "বাংলা", flag: "🇧🇩" },
                          { code: "AR", name: "العربية", flag: "🇸🇦" },
                          { code: "TR", name: "Türkçe", flag: "🇹🇷" }
                        ].map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as LanguageCode);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2 ${
                            language === lang.code 
                              ? "bg-[#fabf37] text-black" 
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          }`}
                          >
                            <span className="text-[12px] leading-none shrink-0">{lang.flag}</span>
                            <span className="flex-1">{lang.name}</span>
                            {language === lang.code && <div className="size-0.5 rounded-full bg-black shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] md:text-[11px] font-black text-white leading-none uppercase">JS Administrator</p>
                <p className="text-[8px] md:text-[9px] font-bold text-[#fabf37] uppercase tracking-widest mt-1">{t('status_master_access')}</p>
              </div>
              <div className="size-8 md:size-10 rounded-xl bg-[#fabf37] flex items-center justify-center text-black font-black text-sm md:text-base">JS</div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-10 custom-scrollbar relative">
          {/* Universal HUD Content Header with Pill-in-Pill Design */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 md:mb-12">
            <div className="flex items-center gap-4">
              {/* View Indicator Pill */}
              <div className="h-10 px-6 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 group">
                <div className="relative">
                  <div className="size-2 bg-[#fabf37] rounded-full animate-pulse shadow-[0_0_10px_#fabf37]" />
                  <div className="absolute inset-0 size-2 bg-[#fabf37] rounded-full animate-ping opacity-50" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    {activeTab === 'overview' ? t('control_center') : activeTab.replace('-', ' ')}
                  </span>
                  <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest leading-none">{t('terminal_mode_active')}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#fabf37] bg-[#fabf37]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#fabf37]/20">
                 <div className="size-1.5 md:size-2 bg-[#fabf37] rounded-full animate-pulse" /> {t('live_terminal')}
              </div>

              {/* Live Status Badge (Pill-in-Pill style) */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 gap-1.5">
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2">
                  <div className="size-1 bg-emerald-500 rounded-full" />
                  <span className="text-[7px] font-black text-emerald-500 uppercase tracking-tighter">{t('live_neural_sync')}</span>
                </div>
                <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-2">
                  <Activity className="size-2 text-blue-500" />
                  <span className="text-[7px] font-black text-blue-500 uppercase tracking-tighter">{t('latency')}: 12ms</span>
                </div>
              </div>
            </div>

            {/* Pill-in-Pill Language Engine with 46-Language Neural Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "content-lang" ? null : "content-lang")}
                className="h-10 px-6 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-4 group hover:border-[#fabf37] transition-all relative overflow-hidden shadow-2xl active:scale-95"
              >
                {/* HUD Scan Line on trigger */}
                <motion.div 
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-20 bg-white/5 skew-x-[45deg] blur-xl pointer-events-none"
                />

                <div className="flex items-center gap-2 relative z-10">
                  <Globe className={`size-4 transition-colors ${activeDropdown === "content-lang" ? "text-[#fabf37]" : "text-zinc-500 group-hover:text-[#fabf37]"}`} />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] hidden sm:block">{t('neural_engine')}</span>
                </div>
                <div className="h-4 w-px bg-white/10 relative z-10 hidden sm:block" />
                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-[12px] shrink-0">
                    {[
                      { code: "EN", flag: "🇺🇸" },
                      { code: "BN", flag: "🇧🇩" },
                      { code: "AR", flag: "🇸🇦" },
                      { code: "TR", flag: "🇹🇷" },
                      { code: "ES", flag: "🇪🇸" },
                      { code: "FR", flag: "🇫🇷" },
                      { code: "DE", flag: "🇩🇪" },
                      { code: "IT", flag: "🇮🇹" },
                      { code: "PT", flag: "🇵🇹" },
                      { code: "RU", flag: "🇷🇺" },
                      { code: "ZH", flag: "🇨🇳" },
                      { code: "JA", flag: "🇯🇵" },
                      { code: "KO", flag: "🇰🇷" },
                      { code: "HI", flag: "🇮🇳" }
                    ].find(l => l.code === language)?.flag || "🌐"}
                  </span>
                  <span className="text-[10px] font-black text-[#fabf37] tracking-widest uppercase">{language}</span>
                  <ChevronDown className={`size-3 text-zinc-500 transition-transform duration-500 ${activeDropdown === "content-lang" ? "rotate-180 text-[#fabf37]" : ""}`} />
                </div>
              </button>

              <AnimatePresence>
                {activeDropdown === "content-lang" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-80 z-[200] origin-top-right"
                  >
                    <div className="bg-[#0f0f0f]/95 border border-white/10 rounded-[32px] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative">
                      {/* Animated Border Glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fabf37]/10 to-transparent opacity-30 pointer-events-none" />
                      
                      <div className="px-2 pb-3 border-b border-white/5 mb-3 flex items-center justify-between relative z-10">
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">{t('neural_node_selection')}</span>
                        <div className="flex items-center gap-2">
                           <div className="size-1.5 bg-[#fabf37] rounded-full animate-pulse" />
                           <span className="text-[7px] font-bold text-[#fabf37] uppercase tracking-tighter">{t('os_v25_terminal')}</span>
                        </div>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar pr-1 grid grid-cols-2 gap-1.5 relative z-10">
                        {[
                          { code: "EN", flag: "🇺🇸", label: "English" },
                          { code: "BN", flag: "🇧🇩", label: "বাংলা" },
                          { code: "AR", flag: "🇸🇦", label: "العربية" },
                          { code: "TR", flag: "🇹🇷", label: "Türkçe" },
                          { code: "ES", flag: "🇪🇸", label: "Español" },
                          { code: "FR", flag: "🇫🇷", label: "Français" },
                          { code: "DE", flag: "🇩🇪", label: "Deutsch" },
                          { code: "IT", flag: "🇮🇹", label: "Italiano" },
                          { code: "PT", flag: "🇵🇹", label: "Português" },
                          { code: "RU", flag: "🇷🇺", label: "Русский" },
                          { code: "ZH", flag: "🇨🇳", label: "中文" },
                          { code: "JA", flag: "🇯🇵", label: "日本語" },
                          { code: "KO", flag: "🇰🇷", label: "한국어" },
                          { code: "HI", flag: "🇮🇳", label: "हिन्दी" },
                          { code: "ID", flag: "🇮🇩", label: "Indonesia" },
                          { code: "MS", flag: "🇲🇾", label: "Malay" },
                          { code: "VI", flag: "🇻🇳", label: "Tiếng Việt" },
                          { code: "TH", flag: "🇹🇭", label: "ไทย" },
                          { code: "NL", flag: "���🇱", label: "Nederlands" },
                          { code: "PL", flag: "🇵🇱", label: "Polski" },
                          { code: "SV", flag: "🇸🇪", label: "Svenska" },
                          { code: "FI", flag: "🇫🇮", label: "Suomi" },
                          { code: "DA", flag: "🇩🇰", label: "Dansk" },
                          { code: "NO", flag: "🇳🇴", label: "Norsk" },
                          { code: "RO", flag: "🇷🇴", label: "Română" },
                          { code: "HU", flag: "🇭🇺", label: "Magyar" },
                          { code: "CS", flag: "🇨🇿", label: "Čeština" },
                          { code: "EL", flag: "🇬🇷", label: "Ελληνικά" },
                          { code: "HE", flag: "🇮🇱", label: "עברית" },
                          { code: "UK", flag: "🇺🇦", label: "Українська" },
                          { code: "TA", flag: "🇮🇳", label: "���மிழ்" },
                          { code: "TE", flag: "🇮🇳", label: "తెలుగు" },
                          { code: "KN", flag: "🇮🇳", label: "ಕನ್ನಡ" },
                          { code: "ML", flag: "🇮🇳", label: "മലയാളം" },
                          { code: "MR", flag: "🇮🇳", label: "मराठी" },
                          { code: "GU", flag: "🇮🇳", label: "ગુજરાતી" },
                          { code: "PA", flag: "🇮🇳", label: "ਪੰਜਾਬੀ" },
                          { code: "UR", flag: "🇵🇰", label: "اردو" },
                          { code: "FA", flag: "🇮🇷", label: "فارسی" },
                          { code: "MY", flag: "🇲🇲", label: "မြန်မာ" },
                          { code: "KM", flag: "🇰🇭", label: "ខ្មែរ" },
                          { code: "LO", flag: "🇱🇦", label: "ລາວ" },
                          { code: "AM", flag: "🇪🇹", label: "አማርኛ" },
                          { code: "SW", flag: "🇰🇪", label: "Kiswahili" },
                          { code: "AF", flag: "🇿🇦", label: "Afrikaans" },
                          { code: "SK", flag: "🇸🇰", label: "Slovenčina" }
                        ].map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setLanguage(l.code as LanguageCode);
                              setActiveDropdown(null);
                            }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all group/item relative overflow-hidden ${
                              language === l.code 
                                ? "bg-[#fabf37] text-black shadow-[0_0_15px_rgba(250,191,55,0.3)]" 
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="text-[16px] leading-none shrink-0 relative z-10">{l.flag}</span>
                            <div className="flex flex-col items-start leading-none min-w-0 relative z-10">
                              <span className="text-[9px] font-black uppercase tracking-widest truncate w-full">{l.code}</span>
                              <span className={`text-[7px] font-bold uppercase truncate w-full transition-colors ${language === l.code ? "text-black/50" : "text-zinc-600 group-hover/item:text-zinc-400"}`}>
                                {l.label}
                              </span>
                            </div>
                            {language === l.code && (
                              <motion.div 
                                layoutId="active-dot-content"
                                className="ml-auto size-1 bg-black rounded-full relative z-10" 
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 relative z-10">
                         <div className="flex items-center justify-between px-2">
                           <p className="text-[6px] font-black text-zinc-600 uppercase tracking-[0.2em]">46 {t('neural_nodes_active')}</p>
                           <p className="text-[6px] font-black text-[#fabf37] uppercase tracking-[0.2em]">{t('sync_optimal')}</p>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <React.Suspense fallback={
                <div className="h-[60vh] flex flex-col items-center justify-center">
                  <RefreshCw className="size-10 text-[#fabf37] animate-spin mb-4" />
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Loading Module...</p>
                </div>
              }>
                {renderView()}
              </React.Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      {/* Image Viewer Modal */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-10"
            onClick={() => setViewingImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" decoding="async" src={viewingImage} alt="Full View" className="w-full h-full object-contain" />
              <button 
                onClick={() => setViewingImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X className="size-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Viewer Modal */}
      <AnimatePresence>
        {viewingVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-10"
            onClick={() => setViewingVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={viewingVideo} 
                className="w-full h-full object-contain" 
                controls 
                autoPlay
                suppressHydrationWarning
              />
              <button 
                onClick={() => setViewingVideo(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors z-10"
              >
                <X className="size-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
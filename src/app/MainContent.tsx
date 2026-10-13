import React, { Suspense } from "react";
import { useLocation, useNavigate, useNavigationType, Navigate } from "react-router";
import { pathFor, idForPath, redirectFor, routeFor } from "./routes/routeTable";
import { NotFoundPage } from "./pages/not-found";
import { useLanguage } from "./context/LanguageContext";
import { debounce, prefersReducedMotion, runWhenIdle, getDevicePerformanceTier } from "./lib/performance";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Zap, ArrowRight, ShoppingBasket as BasketIcon } from "lucide-react";

// CRITICAL FIX: Re-import all components with explicit paths - cache bust
import { Ticker } from "./components/paperware/ticker";
// Lazy load components for performance
const Industries = React.lazy(() => import("./components/paperware/industries").then(module => ({ default: module.Industries })));
// AboutUs is not used in home render, but referenced in imports. We can remove it or lazy load if used elsewhere.
// const AboutUs = React.lazy(() => import("./components/paperware/about-us").then(module => ({ default: module.AboutUs })));
import { ProductionTimeline } from "./components/paperware/production-timeline"; // Used in manufacturing page
import { Hero } from "./components/paperware/hero"; // Used as default
import { ImmersiveHero } from "./components/paperware/immersive-hero";
import { Navbar } from "./components/paperware/navbar";
import { Footer } from "./components/paperware/footer";
import { BackToTop } from "./components/paperware/back-to-top";
import { ContactMenu } from "./components/paperware/contact-menu";
import { BottomNav } from "./components/paperware/bottom-nav";
import { HUDOverlay as SharedHUDOverlay } from "./components/paperware/hud-overlay";
const WhoWeAreSection = React.lazy(() => import("./components/paperware/who-we-are").then(module => ({ default: module.WhoWeAreSection })));
const ImpactMetrics = React.lazy(() => import("./components/paperware/impact-metrics").then(module => ({ default: module.ImpactMetrics })));
const PageDiscovery = React.lazy(() => import("./components/paperware/page-discovery").then(module => ({ default: module.PageDiscovery })));
import { RealtimeOps } from "./components/paperware/realtime-ops"; // Manufacturing page
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
const FeaturedProductsSlider = React.lazy(() => import("./components/paperware/featured-products-slider").then(module => ({ default: module.FeaturedProductsSlider })));
const PremiumContact = React.lazy(() => import("./components/paperware/premium-contact").then(module => ({ default: module.PremiumContact })));
const PremiumClients = React.lazy(() => import("./components/paperware/premium-clients").then(module => ({ default: module.PremiumClients })));
const NationwideExportSection = React.lazy(() => import("./components/paperware/nationwide-export").then(module => ({ default: module.NationwideExportSection })));

// Advanced Performance Hook
const usePerformanceOptimization = () => {
  const [tier, setTier] = React.useState<'low' | 'medium' | 'high'>('high');

  React.useEffect(() => {
    // Check device tier and set optimizations
    const deviceTier = getDevicePerformanceTier();
    setTier(deviceTier);

    // Add hardware acceleration classes to body
    // document.body.classList.add('optimize-gpu'); // REMOVED: Breaks position:fixed
    if (deviceTier === 'low') {
      document.body.classList.add('reduce-effects');
    }
  }, []);

  return { tier, isLowEnd: tier === 'low' };
};

// A wrapper component to only render heavy sections when they enter viewport with content-visibility
const DeferredSection = React.memo(({ children, threshold = 0.1, className = "" }: { children: React.ReactNode, threshold?: number, className?: string }) => {
  const [hasEntered, setHasEntered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px', threshold } // Load even earlier for smoother transition
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}
      style={{ contentVisibility: 'auto' } as any}
    >
      {hasEntered ? (
        <React.Suspense fallback={<div className="h-64 animate-pulse bg-zinc-50 rounded-[40px] m-4" />}>
          {children}
        </React.Suspense>
      ) : (
        <div className="h-64" />
      )}
    </div>
  );
});

// Advanced Tone Switcher UI
const ToneTransitionOverlay = ({ tone }: { tone: string }) => (
  <motion.div
    key={tone}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 pointer-events-none z-[9999] border-[10px] border-[#fabf37]/20 mix-blend-overlay"
  />
);

// Advanced Immersive HUD Overlay (Local Component to resolve conflict and add premium layers)
const HUDOverlay = React.memo(() => {
  return (
    <>
      <SharedHUDOverlay />
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-20 select-none">
        {/* Additional Immersive Layers */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(214,200,169,0.05)_100%)]" />

        {/* Digital Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

        {/* HUD Frame Accents */}
        <div className="absolute inset-8 border border-[#d6c8a9]/10 rounded-[40px] pointer-events-none" />

        {/* Predictive Data Streams */}
        <div className="absolute bottom-24 left-12 hidden xl:block">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-black text-[#fabf37]/40 tracking-[0.3em] uppercase">Predictive_Cache</span>
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-[2px] bg-[#fabf37]/20 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// Use lazy loading for all non-essential pages to optimize initial bundle size
const AllProductsPage = React.lazy(() => import("./pages/all-products").then(module => ({ default: module.AllProductsPage })));
const PaperCupsPage = React.lazy(() => import("./pages/papercups").then(module => ({ default: module.PaperCupsPage })));
const AboutPage = React.lazy(() => import("./pages/about-us"));
const ClientsPage = React.lazy(() => import("./pages/clients").then(module => ({ default: module.ClientsPage })));
const ProductDetailsPage = React.lazy(() => import("./pages/product-details").then(module => ({ default: module.ProductDetailsPage })));
const OfficeStationaryPage = React.lazy(() => import("./pages/office-stationary").then(module => ({ default: module.OfficeStationaryPage })));
const RestaurantSuppliesPage = React.lazy(() => import("./pages/restaurant-supplies").then(module => ({ default: module.RestaurantSuppliesPage })));
const MarketingMaterialsPage = React.lazy(() => import("./pages/marketing-materials").then(module => ({ default: module.MarketingMaterialsPage })));
const PharmaSuppliesPage = React.lazy(() => import("./pages/pharma-supplies").then(module => ({ default: module.PharmaSuppliesPage })));
const FMCGSuppliesPage = React.lazy(() => import("./pages/fmcg-garments").then(module => ({ default: module.FMCGSuppliesPage })));
const GarmentSuppliesPage = React.lazy(() => import("./pages/garments").then(module => ({ default: module.GarmentSuppliesPage })));
const SustainabilityPage = React.lazy(() => import("./pages/sustainability").then(module => ({ default: module.SustainabilityPage })));
const ContactPage = React.lazy(() => import("./pages/contact").then(module => ({ default: module.ContactPage })));
const QuoteRequestPage = React.lazy(() => import("./pages/quote-request").then(module => ({ default: module.QuoteRequestPage })));
const FAQPage = React.lazy(() => import("./pages/faq").then(module => ({ default: module.FAQPage })));
const CareerPage = React.lazy(() => import("./pages/career").then(module => ({ default: module.CareerPage })));
const CompliancePage = React.lazy(() => import("./pages/compliance").then(module => ({ default: module.CompliancePage })));
const OrderTrackingPage = React.lazy(() => import("./pages/order-tracking").then(module => ({ default: module.OrderTrackingPage })));
const ProductJourneyPage = React.lazy(() => import("./pages/product-journey").then(module => ({ default: module.ProductJourneyPage })));
const GalleryPage = React.lazy(() => import("./pages/gallery").then(module => ({ default: module.GalleryPage })));
const ManufacturingPage = React.lazy(() => import("./pages/manufacturing").then(module => ({ default: module.ManufacturingPage })));
const StudioPage = React.lazy(() => import("./pages/studio").then(module => ({ default: module.StudioPage })));
const SocialsPage = React.lazy(() => import("./pages/socials").then(module => ({ default: module.SocialsPage })));
const MorePage = React.lazy(() => import("./pages/more").then(module => ({ default: module.MorePage })));
const Catalog3DPage = React.lazy(() => import("./pages/catalog-3d").then(module => ({ default: module.Catalog3DPage })));
const FactoryLivePage = React.lazy(() => import("./pages/factory-live").then(module => ({ default: module.FactoryLivePage })));
// Phase A0: the Impact Dashboard page (unverified EcoVadis / carbon-neutral claims, placeholder certificate code)
// is no longer shipped; its id now shows the Sustainability page (planned merge, see audit PAGE-030).
const BulkOrderPage = React.lazy(() => import("./pages/bulk-order").then(module => ({ default: module.default })));
const QuotationBasketPage = React.lazy(() => import("./pages/quotation-basket").then(module => ({ default: module.default })));
const ClientPortalPage = __PORTALS_ENABLED__ ? React.lazy(() => import("./pages/client-portal").then(module => ({ default: module.ClientPortalPage }))) : null;
const FuturePlanPage = React.lazy(() => import("./pages/future-plan").then(module => ({ default: module.FuturePlanPage })));
const ProductFeedbackPage = React.lazy(() => import("./pages/product-feedback").then(module => ({ default: module.ProductFeedbackPage })));
const OurERPPage = React.lazy(() => import("./pages/our-erp").then(module => ({ default: module.OurERPPage })));
const ExportPage = React.lazy(() => import("./pages/export").then(module => ({ default: module.ExportPage })));
const AdminDashboardPage = __PORTALS_ENABLED__ ? React.lazy(() => import("./pages/admin-dashboard")) : null;
const SolutionsPage = React.lazy(() => import("./pages/solutions").then(module => ({ default: module.SolutionsPage })));
const TechnicalManifestoPage = React.lazy(() => import("./pages/technical-manifesto").then(module => ({ default: module.TechnicalManifestoPage })));
const FranchisePage = React.lazy(() => import("./pages/franchise").then(module => ({ default: module.FranchisePage })));
const InvestorPage = React.lazy(() => import("./pages/investor").then(module => ({ default: module.InvestorPage })));
const PartnerProgramPage = React.lazy(() => import("./pages/PartnerProgram").then(module => ({ default: module.PartnerProgramPage })));
const PartnersPage = React.lazy(() => import("./pages/partners").then(module => ({ default: module.PartnersPage })));
const BusinessPage = React.lazy(() => import("./pages/business").then(module => ({ default: module.BusinessPage })));
const CompanyPage = React.lazy(() => import("./pages/company").then(module => ({ default: module.CompanyPage })));
const CSRPage = React.lazy(() => import("./pages/csr").then(module => ({ default: module.CSRPage })));
const PrivacyPolicyPage = React.lazy(() => import("./pages/privacy-policy").then(module => ({ default: module.PrivacyPolicy })));
const AdminPortalPage = __PORTALS_ENABLED__ ? React.lazy(() => import("./pages/admin-portal").then(module => ({ default: module.AdminPortal }))) : null;

// Preload critical pages for faster navigation
const preloadPage = (pageName: string) => {
  switch (pageName) {
    case 'client-portal':
      if (__PORTALS_ENABLED__) import("./pages/client-portal");
      break;
    case 'admin-portal':
      if (__PORTALS_ENABLED__) import("./pages/admin-portal");
      break;
    case 'products':
      import("./pages/all-products");
      break;
    case 'contact':
      import("./pages/contact");
      break;
    default:
      break;
  }
};

// Lazy load heavy components
const SearchOverlay = React.lazy(() => import("./components/paperware/search-overlay").then(module => ({ default: module.SearchOverlay })));
const EmailModal = React.lazy(() => import("./components/paperware/email-modal").then(module => ({ default: module.EmailModal })));
const AuthModal = __PORTALS_ENABLED__ ? React.lazy(() => import("./components/paperware/auth-modal").then(module => ({ default: module.AuthModal }))) : null;

// Assets from Figma Import
import imgWhoarewe from "figma:asset/6b92055ba5bbffc98cadd5ecc5acc306f29875e4.png";
import imgShoppingBag from "figma:asset/26c3dd878dc6b8092048a743d91266cdd41f2a79.png";
import imgMap from "figma:asset/7707e2384f799b3aeb1bc03a9a49cb7ef91b6772.png";
// Partner logos - Using placeholder images for reliability
const imgAlArabian = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop";
const imgBengalClassicTea = "https://images.unsplash.com/photo-1597318130878-5a2c275eb9e6?w=400&h=200&fit=crop";
const imgCafeZ = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop";
const imgCoffeeAvenue = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop";
const imgCrimsoncup = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop";
const imgDhakaiKhana = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop";
const imgAbdulMonemLtd = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop";
const imgWalton = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop";
const imgNovatek = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop";
const imgMgi = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop";
const imgIcddrb = "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=200&fit=crop";
const imgFresh = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop";
import imgCardBg1 from "figma:asset/deb0797add19956888ddfd67b88ff75ecb592792.png";
import imgCardBg2 from "figma:asset/047a125a2726498b23eb2e792cd9129a5e35bd9f.png";
import imgCardBg3 from "figma:asset/ecae8d654e0ece711f117e96df44a7742af71120.png";
import imgFactoryIllustration from "figma:asset/f509e99bb4cc15f45dbb0d895480da5f9027b46c.png";
import imgHeroMobile from "figma:asset/7355363d5bbe4910fbf181181e9702179c6c7d50.png";

// Neural Language Transition Effect
function NeuralTransition({ isVisible, language }: { isVisible: boolean, language: string }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="size-24 rounded-full border-2 border-[#fabf37] flex items-center justify-center"
            >
              <span className="text-3xl font-black text-[#fabf37]">{language}</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              className="h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent mt-8"
            />
            <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] mt-4">Calibrating Neural Hub...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Premium 3D Perspective Section Wrapper
function PerspectiveSection({ children }: { children: React.ReactNode }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative w-full"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity
        }}
        className="w-full h-full origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Loading component for Suspense
function PageLoader() {
  const reducedMotion = prefersReducedMotion();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative size-20">
        <motion.div
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={reducedMotion ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-4 border-[#fabf37] rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-10 bg-black rounded-xl flex items-center justify-center text-[#fabf37] font-black text-xl">P</div>
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 animate-pulse">Initializing Terminal...</p>
    </div>
  );
}

// Default values
// Use a reliable direct MP4 for background video (Paper/Factory theme)
const DEFAULT_HERO_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-manufacturing-mask-production-4113-large.mp4"; // Reliable Mixkit URL
// Backup: https://www.youtube-nocookie.com/embed/lyFix6BpGNI?autoplay=1&mute=1&loop=1&playlist=lyFix6BpGNI&controls=0
const DEFAULT_CLIENTS_VIDEO = "https://player.vimeo.com/external/370338531.sd.mp4?s=70d1d511efd500148283471491bb0ad8&profile_id=164&oauth2_token_id=57447761";
const DEFAULT_HERO_CONTENT = {
  title: "PREMIUM PAPER SOLUTIONS",
  subtitle1: "Global Standard. Sustainable Impact. Industrial Precision.",
  subtitle2: "YOUR PARTNER IN SUSTAINABLE MANUFACTURING EXCELLENCE."
};
const DEFAULT_PRODUCTS = [
  { id: 1, name: "Eco-Liner Food Box", category: "Food Packaging", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format", status: "Active" },
  { id: 2, name: "Double Wall Coffee Cup", category: "Beverage", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format", status: "Active" },
  { id: 3, name: "Industrial Kraft Bag", category: "Logistics", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format", status: "Active" },
  { id: 4, name: "Single Wall Cup (SW)", category: "Paper Cups", image: "https://images.unsplash.com/photo-1517031330214-9b0c33b8c73c?q=80&w=800&auto=format", status: "Active" },
  { id: 5, name: "Marketing Brochure", category: "Marketing", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format", status: "Active" },
  { id: 6, name: "Sterile Medicine Box", category: "Pharmaceutical", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format", status: "Active" },
  { id: 7, name: "Snack Retail Packaging", category: "FMCG", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format", status: "Active" },
  { id: 8, name: "Burger Ventilation Box", category: "Restaurant", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format", status: "Active" },
  { id: 9, name: "Premium Gift Bag", category: "Luxury", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format", status: "Active" },
  { id: 10, name: "Eco Tea Sleeves", category: "Beverage", image: "https://images.unsplash.com/photo-1556742049-02e1f740d0ff?q=80&w=800&auto=format", status: "Active" },
  { id: 11, name: "Industrial Tote", category: "Logistics", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format", status: "Active" },
  { id: 12, name: "Sustainable Mailer", category: "Logistics", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format", status: "Active" },
];

const DEFAULT_CLIENT_PROJECTS = [
  {
    company: "TechFlow Systems",
    project: "Neural Hardware Packaging",
    desc: "Anti-static, high-density foam inserts for next-gen processors.",
    image: "https://images.unsplash.com/photo-1596489394863-14b35e0e148e?q=80&w=1000"
  },
  {
    company: "GreenLeaf Organics",
    project: "Biodegradable Food Containers",
    desc: "100% plant-based fiber composition with zero-plastic coating.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000"
  },
  {
    company: "Urban Brew Co.",
    project: "Thermal Insulation Cups",
    desc: "Double-wall patented construction maintaining heat for 4+ hours.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000"
  },
  {
    company: "MediSafe Pharma",
    project: "Secure Sterility Boxes",
    desc: "ISO certified medical grade cardstock with tamper-evident seals.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000"
  },
  {
    company: "Velocity Logistics",
    project: "Heavy-Duty Corrugated Units",
    desc: "Reinforced structural integrity for international freight.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"
  }
];

const DEFAULT_SIGNING_IMAGE = "https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBidXNpbmVzcyUyMGRlYWwlMjBwYXJ0bmVyc2hpcHxlbnwxfHx8fDE3Njc2OTM3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const DEFAULT_PARTNERS = [
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

export function MainContent() {
  const { tier, isLowEnd } = usePerformanceOptimization();
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  // Phase A (TR-01): the current page now comes from the URL instead of in-memory state, so every page
  // has a real address, Back/Forward work, and links can be shared. Page ids are unchanged.
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const currentPage = idForPath(location.pathname);
  const legacyRedirect = redirectFor(location.pathname);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isEmailOpen, setIsEmailOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authType, setAuthType] = React.useState<'admin' | 'client'>('client');
  const [quoteBasket, setQuoteBasket] = React.useState<any[]>([]);
  const [isBasketOpen, setIsBasketOpen] = React.useState(false);
  const [performanceTier, setPerformanceTier] = React.useState<'low' | 'medium' | 'high'>('high');
  const [isLanguageTransitioning, setIsLanguageTransitioning] = React.useState(false);
  const [currentTone, setCurrentTone] = React.useState("Corporate");

  // Scroll to top when navigating to a new page; leave Back/Forward (POP) to the browser.
  React.useLayoutEffect(() => {
    if (navigationType !== "POP") window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [location.pathname, navigationType]);

  // Per-page title, canonical URL and robots directive (previously identical on every page).
  React.useEffect(() => {
    const route = routeFor(currentPage);
    if (route) document.title = route.title;
    const canonicalHref = `https://paperwarefactory.com${currentPage === "not-found" ? "/" : location.pathname === "/" ? "/" : location.pathname.replace(/\/+$/, "")}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalHref);
    document.querySelector('meta[name="robots"]')?.setAttribute(
      "content",
      route?.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
  }, [currentPage, location.pathname]);

  const [heroVideoUrl, setHeroVideoUrl] = React.useState(DEFAULT_HERO_VIDEO);
  const [brochureUrl, setBrochureUrl] = React.useState("");
  const [heroVideoMobileUrl, setHeroVideoMobileUrl] = React.useState("");
  const [clientsVideoUrl, setClientsVideoUrl] = React.useState(DEFAULT_CLIENTS_VIDEO);
  const [heroContent, setHeroContent] = React.useState(DEFAULT_HERO_CONTENT);
  const [productsData, setProductsData] = React.useState(DEFAULT_PRODUCTS);
  const [clientProjects, setClientProjects] = React.useState(DEFAULT_CLIENT_PROJECTS);
  const [productionStats, setProductionStats] = React.useState({
    totalCups: 69550257,
    wonderfulBusinesses: 5754,
    lastSync: new Date().toISOString()
  });

  const [factoryVideos, setFactoryVideos] = React.useState<any[]>([]);
  const [partnersData, setPartnersData] = React.useState<any[]>(DEFAULT_PARTNERS);
  const [signingImage, setSigningImage] = React.useState(DEFAULT_SIGNING_IMAGE);
  const [aboutUsVideos, setAboutUsVideos] = React.useState<any>({});
  const [uploadedLogos, setUploadedLogos] = React.useState<any[]>([]);
  const [uploadedTeamMembers, setUploadedTeamMembers] = React.useState<any[]>([]);

  // Unified useScroll at root level to ensure non-static container context
  // Remove container reference to let useScroll use window by default
  const { scrollYProgress: rootScrollProgress } = useScroll();

  React.useEffect(() => {
    const tier = getDevicePerformanceTier();
    setPerformanceTier(tier);

    try {
      const heroVideo = localStorage.getItem('paperware_hero_video');
      // if (heroVideo) setHeroVideoUrl(heroVideo); // Force new default video
      const brochure = localStorage.getItem('paperware_brochure');
      if (brochure) setBrochureUrl(brochure);
      const heroVideoMobile = localStorage.getItem('paperware_hero_video_mobile');
      if (heroVideoMobile) setHeroVideoMobileUrl(heroVideoMobile);
      const clientsVideo = localStorage.getItem('paperware_clients_video');
      if (clientsVideo) setClientsVideoUrl(clientsVideo);
      const heroContentStr = localStorage.getItem('paperware_hero_content');
      if (heroContentStr) setHeroContent(JSON.parse(heroContentStr));
      const productsStr = localStorage.getItem('paperware_products');
      if (productsStr) setProductsData(JSON.parse(productsStr));
      const clientProjectsStr = localStorage.getItem('paperware_client_projects');
      if (clientProjectsStr) setClientProjects(JSON.parse(clientProjectsStr));
      const partnersStr = localStorage.getItem('paperware_partners');
      if (partnersStr) setPartnersData(JSON.parse(partnersStr));
      const signingImageStr = localStorage.getItem('paperware_signing_image');
      if (signingImageStr) setSigningImage(signingImageStr);
      const aboutUsVideosStr = localStorage.getItem('paperware_about_us_videos');
      if (aboutUsVideosStr) setAboutUsVideos(JSON.parse(aboutUsVideosStr));
    } catch (e) {
      console.warn('Failed to load storage:', e);
    }

    // Fetch uploaded logos and team members from backend
    const fetchUploadedContent = async () => {
      try {
        // Fetch logos
        const logosResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/images/logo`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        });
        const logosData = await logosResponse.json();
        if (logosData.success && logosData.images.length > 0) {
          setUploadedLogos(logosData.images);
        }

        // Fetch team members
        const teamResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/images/team`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        });
        const teamData = await teamResponse.json();
        if (teamData.success && teamData.images.length > 0) {
          setUploadedTeamMembers(teamData.images);
        }
      } catch (error) {
        console.warn('Failed to fetch uploaded content:', error);
      }
    };

    fetchUploadedContent();
  }, []);

  // Persistence Effects
  React.useEffect(() => {
    localStorage.setItem('paperware_partners', JSON.stringify(partnersData));
  }, [partnersData]);

  React.useEffect(() => {
    localStorage.setItem('paperware_signing_image', signingImage);
  }, [signingImage]);

  // Phase A0: removed visitor tracking on brochure download. It sent the visitor's IP to ipapi.co and then
  // IP + city/country + user agent to a (now defunct) backend without consent. Re-add only with consent and a
  // working, disclosed analytics setup.
  const handleBrochureDownload = React.useCallback(() => {}, []);

  const handlePageChange = React.useCallback((page: string) => {
    if (import.meta.env.DEV && !routeFor(page)) console.warn(`[routes] unknown page id "${page}", sending to home`);
    const path = pathFor(page);
    React.startTransition(() => {
      navigate(path);
    });
  }, [navigate]);

  const handleProductClick = React.useCallback((product: any) => {
    React.startTransition(() => {
      setQuoteBasket(prev => [...prev, product]);
      setIsBasketOpen(true);
      navigate(pathFor("product-details"));
    });
  }, [navigate]);

  const addToQuoteBasket = React.useCallback((product: any) => {
    setQuoteBasket(prev => {
      if (!prev.find(p => p.name === product.name)) return [...prev, product];
      return prev;
    });
  }, []);

  const removeFromQuoteBasket = React.useCallback((name: string) => {
    setQuoteBasket(prev => prev.filter(p => p.name !== name));
  }, []);

  const { t, language } = useLanguage();

  // Watch for language changes to trigger effect
  const prevLang = React.useRef(language);
  React.useEffect(() => {
    if (prevLang.current !== language) {
      setIsLanguageTransitioning(true);
      const timer = setTimeout(() => setIsLanguageTransitioning(false), 1000);
      prevLang.current = language;
      return () => clearTimeout(timer);
    }
  }, [language]);

  const handleAuthOpen = React.useCallback((type: 'admin' | 'client') => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  }, []);

  const renderContent = React.useMemo(() => {
    if (legacyRedirect) return <Navigate to={legacyRedirect} replace />;
    switch (currentPage) {
      case "not-found": return <NotFoundPage onPageChange={handlePageChange} />;
      case "home":
        return (
          <div id="main-content" className="bg-white relative overflow-hidden font-['Poppins',sans-serif]">

            {/* 1. IMMERSIVE HERO WITH VIDEO */}
            <div className="relative">
              <ImmersiveHero
                key={heroVideoUrl} // Force remount on URL change
                videoUrl={heroVideoUrl}
                brochureUrl={brochureUrl}
                onExplore={handlePageChange}
                onDownload={handleBrochureDownload}
              />
            </div>

            {/* Phase A: removed a second, home-only Ticker. It is position:fixed, so it stacked on the global
                ticker and left an empty 24px band here. */}

            {/* 3. ABOUT US */}
            <React.Suspense fallback={<div className="h-96 bg-white" />}>
              <WhoWeAreSection onReadMore={() => handlePageChange("about")} />
            </React.Suspense>

            {/* 4. INDUSTRIES WE SERVE */}
            <DeferredSection>
              <Industries onExplore={() => handlePageChange("products")} />
            </DeferredSection>

            {/* 5. FEATURED PRODUCTS - PREMIUM SLIDER */}
            <DeferredSection>
              <FeaturedProductsSlider
                products={productsData.map(p => ({
                  ...p,
                  id: String(p.id),
                  description: "Premium eco-friendly packaging solution designed for modern businesses",
                  badge: p.status === "Active" ? "New Arrival" : undefined
                  // Phase A0: removed placeholder price ("From $29.99") and synthetic 5-star rating.
                }))}
                onViewProduct={(id) => {
                  const product = productsData.find(p => String(p.id) === id);
                  if (product) handleProductClick(product);
                }}
              />
            </DeferredSection>

            {/* IMPACT METRICS - SUSTAINABILITY STATS */}
            <DeferredSection>
              <ImpactMetrics />
            </DeferredSection>

            {/* 6. PREMIUM CLIENTS SHOWCASE */}
            <DeferredSection>
              <PremiumClients
                clients={
                  uploadedLogos.length > 0
                    ? uploadedLogos.map(logo => ({ id: logo.id, name: logo.name, image: logo.url }))
                    : partnersData.map(p => ({ id: p.id, name: p.name, image: p.logo }))
                }
                onPageChange={handlePageChange}
              />
            </DeferredSection>

            {/* NATIONWIDE & EXPORT SECTION */}
            <DeferredSection>
              <NationwideExportSection />
            </DeferredSection>

            {/* 7. PREMIUM CONTACT SECTION */}
            <DeferredSection>
              <PremiumContact onContact={() => handlePageChange("contact")} />
            </DeferredSection>

            {/* PAGE DISCOVERY - AUTO SCROLL */}
            <DeferredSection>
              <PageDiscovery onNavigate={handlePageChange} />
            </DeferredSection>

          </div>
        );
      case "about": return <AboutPage aboutUsVideos={aboutUsVideos} />;
      case "clients": return <ClientsPage videoUrl={clientsVideoUrl} productionStats={productionStats} onPageChange={handlePageChange} partnersData={partnersData} />;
      case "papercups": return <PaperCupsPage videoUrls={factoryVideos} onProductClick={handleProductClick} onPageChange={handlePageChange} />;
      case "products": return <AllProductsPage onProductClick={handleProductClick} onAddToQuote={addToQuoteBasket} onPageChange={handlePageChange} products={productsData} clientProjects={clientProjects} />;
      // Product details are chosen in-app; with no selection (e.g. a reload) go back to the catalogue.
      case "product-details": return quoteBasket.length === 0 ? <Navigate to={pathFor("products")} replace /> : <ProductDetailsPage product={quoteBasket[quoteBasket.length - 1]} onBack={() => handlePageChange("products")} onAddToQuote={addToQuoteBasket} onContactClick={() => handlePageChange("contact")} />;
      case "office-stationary": return <OfficeStationaryPage onProductClick={handleProductClick} />;
      case "restaurant-supplies": return <RestaurantSuppliesPage onProductClick={handleProductClick} />;
      case "marketing-materials": return <MarketingMaterialsPage onProductClick={handleProductClick} />;
      case "pharma-supplies": return <PharmaSuppliesPage onProductClick={handleProductClick} />;
      case "fmcg-supplies": return <FMCGSuppliesPage onProductClick={handleProductClick} />;
      case "garments": return <GarmentSuppliesPage onProductClick={handleProductClick} />;
      case "sustainability": return <SustainabilityPage />;
      case "solutions": return <SolutionsPage />;
      case "contact": return <ContactPage onFeedbackClick={() => handlePageChange("product-feedback")} />;
      case "more": return <MorePage onPageChange={handlePageChange} />;
      case "quote": return <QuoteRequestPage />;
      case "faq": return <FAQPage />;
      case "career": return <CareerPage />;
      case "compliance": return <CompliancePage />;
      case "tracking": return <OrderTrackingPage onViewJourney={() => handlePageChange("product-journey")} onFeedbackClick={() => handlePageChange("product-feedback")} />;
      case "product-journey": return <ProductJourneyPage onBack={() => handlePageChange("tracking")} />;
      case "gallery": return <GalleryPage />;
      case "manufacturing": return <><ManufacturingPage /><ProductionTimeline /><RealtimeOps /></>;
      case "studio": return <StudioPage />;
      case "socials": return <SocialsPage />;
      case "catalog-3d": return <Catalog3DPage />;
      case "factory-live": return <FactoryLivePage />;
      case "impact-dashboard": return <SustainabilityPage />;
      case "bulk-quotes": return <BulkOrderPage basket={quoteBasket} />;
      case "quotation-basket": return <QuotationBasketPage basket={quoteBasket} onRemove={removeFromQuoteBasket} onProceedToOrder={() => handlePageChange("bulk-quotes")} />;
      // Portal/admin pages are not part of the public build (Phase A0); fall back to Contact.
      case "client-portal": return __PORTALS_ENABLED__ && ClientPortalPage ? <ClientPortalPage /> : <ContactPage onFeedbackClick={() => handlePageChange("product-feedback")} />;
      case "future-plan": return <FuturePlanPage onPageChange={handlePageChange} />;
      case "product-feedback": return <ProductFeedbackPage onScanSuccess={() => handlePageChange("product-journey")} />;
      case "erp": return <OurERPPage />;
      case "export": return <ExportPage />;
      case "technical-manifesto": return <TechnicalManifestoPage />;
      case "franchise": return <FranchisePage />;
      case "investor": return <InvestorPage />;
      case "partner-program": return (
        <React.Suspense fallback={<PageLoader />}>
          <PartnerProgramPage />
        </React.Suspense>
      );
      case "partners": return <PartnersPage partners={partnersData} signingImage={signingImage} />;
      case "business": return <BusinessPage />;
      case "company": return <CompanyPage onPageChange={handlePageChange} />;
      case "csr": return <CSRPage />;
      case "privacy-policy": return <PrivacyPolicyPage />;
      case "admin-portal": return __PORTALS_ENABLED__ && AdminPortalPage ? <AdminPortalPage /> : <ContactPage onFeedbackClick={() => handlePageChange("product-feedback")} />;
      case "admin": return !(__PORTALS_ENABLED__ && AdminDashboardPage) ? <ContactPage onFeedbackClick={() => handlePageChange("product-feedback")} /> : (
        <AdminDashboardPage
          onLogout={() => handlePageChange("home")}
          heroVideoUrl={heroVideoUrl}
          onUpdateHeroVideo={(url) => {
            setHeroVideoUrl(url);
            localStorage.setItem('paperware_hero_video', url);
          }}
          brochureUrl={brochureUrl}
          onUpdateBrochure={(url) => {
            setBrochureUrl(url);
            localStorage.setItem('paperware_brochure', url);
          }}
          heroVideoMobileUrl={heroVideoMobileUrl}
          onUpdateHeroVideoMobile={(url) => {
            setHeroVideoMobileUrl(url);
            localStorage.setItem('paperware_hero_video_mobile', url);
          }}
          clientsVideoUrl={clientsVideoUrl}
          onUpdateClientsVideo={(url) => {
            setClientsVideoUrl(url);
            localStorage.setItem('paperware_clients_video', url);
          }}
          heroContent={heroContent}
          onUpdateHeroContent={(content) => {
            setHeroContent(content);
            localStorage.setItem('paperware_hero_content', JSON.stringify(content));
          }}
          products={productsData}
          onUpdateProducts={(products) => {
            setProductsData(products);
            localStorage.setItem('paperware_products', JSON.stringify(products));
          }}
          clientProjects={clientProjects}
          onUpdateClientProjects={(projects) => {
            setClientProjects(projects);
            localStorage.setItem('paperware_client_projects', JSON.stringify(projects));
          }}
          partners={partnersData}
          onUpdatePartners={setPartnersData}
          aboutUsVideos={aboutUsVideos}
          onUpdateAboutUsVideos={(videos) => {
            setAboutUsVideos(videos);
            localStorage.setItem('paperware_about_us_videos', JSON.stringify(videos));
          }}
        />
      );
      default: return <Hero onExplore={() => handlePageChange("products")} videoUrl={heroVideoUrl} title={heroContent.title} subtitle1={heroContent.subtitle1} subtitle2={heroContent.subtitle2} />;
    }
  }, [currentPage, legacyRedirect, heroVideoUrl, heroVideoMobileUrl, clientsVideoUrl, heroContent, productsData, quoteBasket, factoryVideos, handlePageChange, handleProductClick, addToQuoteBasket, removeFromQuoteBasket, productionStats, uploadedLogos, partnersData]);

  return (
    <div className={`relative min-h-screen ${['home', 'client-portal', 'contact', 'about', 'products', 'sustainability', 'company'].includes(currentPage) ? 'bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-white'} font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden transition-colors duration-500`}>
      <HUDOverlay />
      <AnimatePresence mode="wait">
        <ToneTransitionOverlay tone={currentTone} />
      </AnimatePresence>
      <div className="fixed inset-0 z-[0] pointer-events-none opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Ticker />
      <Navbar
        onPageChange={handlePageChange}
        onProductClick={handleProductClick}
        currentPage={currentPage}
        onSearchOpen={() => setIsSearchOpen(true)}
        onEmailOpen={() => setIsEmailOpen(true)}
        onAuthOpen={handleAuthOpen}
        quoteBasketCount={quoteBasket.length}
      />
      <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />

      <main className="relative z-10">
        <div className="relative w-full">
          <React.Suspense fallback={<PageLoader />}>
            {renderContent}
          </React.Suspense>
        </div>
      </main>

      <Footer onPageChange={handlePageChange} />

      {/* Floating Basket Removed */}

      <React.Suspense fallback={null}>
        {isEmailOpen && <EmailModal isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />}
        {isSearchOpen && (
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={handleProductClick}
            onPageChange={handlePageChange}
          />
        )}
        {__PORTALS_ENABLED__ && AuthModal && isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} type={authType} onLoginSuccess={() => handlePageChange(authType === 'admin' ? 'admin' : 'client-portal')} />}
      </React.Suspense>
      {/* Phase A: removed duplicate <HUDOverlay /> (it was rendered twice). */}
      <BackToTop />
      <ContactMenu />
    </div>
  );
}
import React, { Suspense } from "react";
import { useLocation, useNavigate, useNavigationType, Navigate } from "react-router";
import { pathFor, idForPath, redirectFor, routeFor, surfaceFor } from "./routes/routeTable";
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
const ProductionTimeline = React.lazy(() => import("./components/paperware/production-timeline").then(m => ({ default: m.ProductionTimeline }))); // Manufacturing page only
const MachineryGrid = React.lazy(() => import("./components/paperware/machinery-grid").then(m => ({ default: m.MachineryGrid }))); // Manufacturing page only
import { Hero } from "./components/paperware/hero"; // Used as default
import { ImmersiveHero } from "./components/paperware/immersive-hero";
import { Navbar } from "./components/paperware/navbar";
import { Footer } from "./components/paperware/footer";
import { BackToTop } from "./components/paperware/back-to-top";
import { ContactMenu } from "./components/paperware/contact-menu";
import { BottomNav } from "./components/paperware/bottom-nav";
import { HUDOverlay as SharedHUDOverlay } from "./components/paperware/hud-overlay";
const WhoWeAreSection = React.lazy(() => import("./components/paperware/who-we-are").then(module => ({ default: module.WhoWeAreSection })));
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
const FeaturedProductsSlider = React.lazy(() => import("./components/paperware/featured-products-slider").then(module => ({ default: module.FeaturedProductsSlider })));
const HomeBottom = React.lazy(() => import("./components/paperware/home-bottom").then(module => ({ default: module.HomeBottom })));
const PremiumClients = React.lazy(() => import("./components/paperware/premium-clients").then(module => ({ default: module.PremiumClients })));
const NationwideExportSection = React.lazy(() => import("./components/paperware/nationwide-export").then(module => ({ default: module.NationwideExportSection })));
/** Internal panels that render no marketing strip. */
const NO_SOCIAL_STRIP = new Set(["admin", "admin-portal", "client-portal"]);
const SocialStrip = React.lazy(() => import("./components/paperware/social-strip").then(module => ({ default: module.SocialStrip })));
const HomeFactoryClip = React.lazy(() => import("./components/paperware/home-factory-clip").then(module => ({ default: module.HomeFactoryClip })));

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
      // Phase D: no content-visibility here. Its paint containment clips descendants and stops
      // position:sticky from pinning (Industries / Who we are scrollytelling).
      className={`${className} transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}
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
  const { t } = useLanguage();
  return (
    <>
      <SharedHUDOverlay />
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-20 select-none">
        {/* Additional Immersive Layers */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(214,200,169,0.05)_100%)]" />

        {/* Digital Grain Texture Overlay */}
        <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" />

        {/* HUD Frame Accents */}
        <div className="absolute inset-8 border border-[#d6c8a9]/10 rounded-[40px] pointer-events-none" />

        {/* Predictive Data Streams */}
        <div className="absolute bottom-24 left-12 hidden xl:block">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-black text-[#fabf37]/40 tracking-[0.3em] uppercase">{t("maincontent_predictive_cache")}</span>
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
import imgWhoarewe from "figma:asset/6b92055ba5bbffc98cadd5ecc5acc306f29875e4.webp";
import imgShoppingBag from "figma:asset/26c3dd878dc6b8092048a743d91266cdd41f2a79.webp";
import dp_takeaway_food_box from "figma:asset/products/takeaway-food-box.webp";
import dp_chowmein_boxes from "figma:asset/products/chowmein-boxes.webp";
import dp_cookie_boxes from "figma:asset/products/cookie-boxes.webp";
import dp_confectionery_boxes from "figma:asset/products/confectionery-boxes.webp";
import dp_medicine_boxes from "figma:asset/products/medicine-boxes.webp";
import dp_prescription_pad from "figma:asset/products/prescription-pad.webp";
import dp_gift_bags from "figma:asset/products/gift-bags.webp";
import dp_carry_bag_pink from "figma:asset/products/carry-bag-pink.webp";
import dp_carry_bag_kraft from "figma:asset/cutouts/carry-bag-kraft.webp";
import dp_brochures from "figma:asset/products/brochures.webp";
import dp_flyers from "figma:asset/products/flyers.webp";
import dp_magazines from "figma:asset/products/magazines.webp";
import dp_desk_calendars from "figma:asset/products/desk-calendars.webp";
import dp_stickers from "figma:asset/products/stickers.webp";
import dp_tissue_boxes from "figma:asset/products/tissue-boxes.webp";
import dp_cup from "figma:asset/cutouts/cup.webp";
import dpTeam from "figma:asset/factory/team.webp";
import imgMap from "figma:asset/7707e2384f799b3aeb1bc03a9a49cb7ef91b6772.webp";
// Partner logos - Using placeholder images for reliability
import imgCardBg1 from "figma:asset/deb0797add19956888ddfd67b88ff75ecb592792.webp";
import imgCardBg2 from "figma:asset/047a125a2726498b23eb2e792cd9129a5e35bd9f.webp";
import imgCardBg3 from "figma:asset/ecae8d654e0ece711f117e96df44a7742af71120.webp";
import imgFactoryIllustration from "figma:asset/f509e99bb4cc15f45dbb0d895480da5f9027b46c.webp";
import imgHeroMobile from "figma:asset/7355363d5bbe4910fbf181181e9702179c6c7d50.webp";

// Neural Language Transition Effect
function NeuralTransition({ isVisible, language }: { isVisible: boolean, language: string }) {
  const { t } = useLanguage();
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
              <span className="text-3xl font-black text-[#fabf37]">{t(language)}</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              className="h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent mt-8"
            />
            <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] mt-4">{t("maincontent_calibrating_neural_hub")}</p>
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
  const { t } = useLanguage();
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
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 animate-pulse">{t("maincontent_initializing_terminal")}</p>
    </div>
  );
}

// Default values
// Use a reliable direct MP4 for background video (Paper/Factory theme)
const DEFAULT_HERO_VIDEO = "https://www.youtube.com/watch?v=_AvASsD4tQY"; // Paperware Factory channel: "3d video with Text & logo"
const DEFAULT_HERO_POSTER = "https://i.ytimg.com/vi/_AvASsD4tQY/maxresdefault.jpg";
// Backup: https://www.youtube-nocookie.com/embed/lyFix6BpGNI?autoplay=1&mute=1&loop=1&playlist=lyFix6BpGNI&controls=0
const DEFAULT_CLIENTS_VIDEO = "";
// Paper Cups page full-screen film. Owner-supplied 2026-11-01. Admin → CMS → Product Gallery can override it.
const DEFAULT_FACTORY_VIDEO = "https://www.youtube.com/watch?v=Acbb6Qm4oCM";
const DEFAULT_HERO_CONTENT = {
  title: "PREMIUM PAPER SOLUTIONS",
  subtitle1: "Global Standard. Sustainable Impact. Industrial Precision.",
  subtitle2: "YOUR PARTNER IN SUSTAINABLE MANUFACTURING EXCELLENCE."
};
const DEFAULT_PRODUCTS: any[] = [
  { id: 1, name: "Takeaway Food Box", category: "Food Packaging", image: dp_takeaway_food_box, status: "Active" },
  { id: 2, name: "Chowmein Box", category: "Food Packaging", image: dp_chowmein_boxes, status: "Active" },
  { id: 3, name: "Cookie Box", category: "Food Packaging", image: dp_cookie_boxes, status: "Active" },
  { id: 4, name: "Confectionery Box", category: "Food Packaging", image: dp_confectionery_boxes, status: "Active" },
  { id: 5, name: "Medicine Box", category: "Pharmaceutical", image: dp_medicine_boxes, status: "Active" },
  { id: 6, name: "Prescription Pad", category: "Pharmaceutical", image: dp_prescription_pad, status: "Active" },
  { id: 7, name: "Gift Bag", category: "Bags", image: dp_gift_bags, status: "Active" },
  { id: 8, name: "Carry Bag", category: "Bags", image: dp_carry_bag_pink, status: "Active" },
  { id: 9, name: "Kraft Carry Bag", category: "Bags", image: dp_carry_bag_kraft, status: "Active" },
  { id: 10, name: "Brochure", category: "Marketing Materials", image: dp_brochures, status: "Active" },
  { id: 11, name: "Flyer", category: "Marketing Materials", image: dp_flyers, status: "Active" },
  { id: 12, name: "Magazine", category: "Marketing Materials", image: dp_magazines, status: "Active" },
  { id: 13, name: "Desk Calendar", category: "Marketing Materials", image: dp_desk_calendars, status: "Active" },
  { id: 14, name: "Sticker", category: "Marketing Materials", image: dp_stickers, status: "Active" },
  { id: 15, name: "Tissue Box", category: "Tissue", image: dp_tissue_boxes, status: "Active" },
  { id: 16, name: "Paper Cup", category: "Paper Cups", image: dp_cup, status: "Active" },
];

const DEFAULT_CLIENT_PROJECTS: any[] = [];

const DEFAULT_SIGNING_IMAGE: string = dpTeam;

const DEFAULT_PARTNERS: any[] = [];

// Ignore saved values from older builds that still reference stock photos.
const readStored = (key: string): string | null => {
  const v = localStorage.getItem(key);
  return v && !v.includes("unsplash.com") ? v : null;
};

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

  const [factoryVideoUrl, setFactoryVideoUrl] = React.useState(DEFAULT_FACTORY_VIDEO);
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
      const clientsVideo = readStored('paperware_clients_video');
      if (clientsVideo) setClientsVideoUrl(clientsVideo);
      const factoryVideo = readStored('paperware_factory_video');
      if (factoryVideo) setFactoryVideoUrl(factoryVideo);
      const heroContentStr = localStorage.getItem('paperware_hero_content');
      if (heroContentStr) setHeroContent(JSON.parse(heroContentStr));
      const productsStr = readStored('paperware_products');
      if (productsStr) setProductsData(JSON.parse(productsStr));
      const clientProjectsStr = readStored('paperware_client_projects');
      if (clientProjectsStr) setClientProjects(JSON.parse(clientProjectsStr));
      const partnersStr = readStored('paperware_partners');
      if (partnersStr) setPartnersData(JSON.parse(partnersStr));
      const signingImageStr = readStored('paperware_signing_image');
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

    // The CMS image endpoint currently answers HTTP 402 on every public page load; opt in with VITE_CMS_IMAGES=true once the backend is live.
    if (import.meta.env.VITE_CMS_IMAGES === 'true') fetchUploadedContent();
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
          // Phase D: overflow-x-clip, not overflow-hidden. overflow:hidden makes this div the scrollport
          // for every position:sticky descendant, so the pinned sections never pin.
          <div id="main-content" className="bg-white relative overflow-x-clip font-['Poppins',sans-serif]">
            {/* Phase B a11y: the page had no <h1>. Visually hidden until the hero gets a real headline (Phase A-3). */}
            <h1 className="sr-only">{t("maincontent_paperware_factory_custom_printed_paper")}</h1>

            {/* 1. IMMERSIVE HERO WITH VIDEO */}
            <div className="relative">
              <ImmersiveHero
                key={heroVideoUrl} // Force remount on URL change
                videoUrl={heroVideoUrl}
                posterImage={DEFAULT_HERO_POSTER}
                brochureUrl={brochureUrl}
                onExplore={handlePageChange}
                onDownload={handleBrochureDownload}
              />
            </div>

            {/* Phase A: removed a second, home-only Ticker. It is position:fixed, so it stacked on the global
                ticker and left an empty 24px band here. */}

            {/* 3. ABOUT US */}
            <React.Suspense fallback={<div className="h-96 bg-white" />}>
              <WhoWeAreSection onQuote={() => handlePageChange("quote")} onProducts={() => handlePageChange("products")} />
            </React.Suspense>

            {/* 4. INDUSTRIES WE SERVE */}
            <DeferredSection>
              <Industries onExplore={() => handlePageChange("products")} />
            </DeferredSection>

            {/* 5. FEATURED PRODUCTS - PREMIUM SLIDER */}
            <DeferredSection>
              <FeaturedProductsSlider
                onProducts={() => handlePageChange("products")}
                onQuote={() => handlePageChange("quote")}
              />
            </DeferredSection>


            {/* 5b. FACTORY CLIP - one real Paperware clip (public/media/SOURCES.txt) */}
            <DeferredSection>
              <HomeFactoryClip />
            </DeferredSection>

            {/* 6. PREMIUM CLIENTS SHOWCASE */}
            <DeferredSection>
              <PremiumClients
                // Only real uploaded logos. The partner fallback uses stock photos, not client logos.
                clients={uploadedLogos.map(logo => ({ id: logo.id, name: logo.name, image: logo.url }))}
                onPageChange={handlePageChange}
              />
            </DeferredSection>

            {/* NATIONWIDE & EXPORT SECTION */}
            <DeferredSection>
              <NationwideExportSection />
            </DeferredSection>

            {/* 7. YELLOW CTA + CONTACT CARDS + DISCOVER MORE (the site footer follows) */}
            <DeferredSection>
              <HomeBottom onNavigate={handlePageChange} />
            </DeferredSection>

          </div>
        );
      case "about": return <AboutPage aboutUsVideos={aboutUsVideos} />;
      case "clients": return <ClientsPage videoUrl={clientsVideoUrl} productionStats={productionStats} onPageChange={handlePageChange} partnersData={partnersData} />;
      case "papercups": return <PaperCupsPage videoUrl={factoryVideoUrl} onProductClick={handleProductClick} onPageChange={handlePageChange} />;
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
      case "manufacturing": return <><ManufacturingPage /><MachineryGrid /><ProductionTimeline /></>;
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
          factoryVideoUrl={factoryVideoUrl}
          onUpdateFactoryVideo={(url) => {
            const next = url || DEFAULT_FACTORY_VIDEO;
            setFactoryVideoUrl(next);
            if (url) localStorage.setItem('paperware_factory_video', url);
            else localStorage.removeItem('paperware_factory_video');
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
      default: return <Hero onExplore={() => handlePageChange("products")} videoUrl={heroVideoUrl} title={t(heroContent.title)} subtitle1={heroContent.subtitle1} subtitle2={heroContent.subtitle2} />;
    }
  }, [currentPage, legacyRedirect, heroVideoUrl, heroVideoMobileUrl, clientsVideoUrl, heroContent, productsData, quoteBasket, factoryVideoUrl, handlePageChange, handleProductClick, addToQuoteBasket, removeFromQuoteBasket, productionStats, uploadedLogos, partnersData]);

    // Phase D: overflow-x-clip (not overflow-x-hidden). overflow-x:hidden turns this wrapper into a scroll
    // container, which stops every position:sticky descendant (pinned homepage sections) from pinning.
  return (
    <div className={`relative min-h-screen ${surfaceFor(currentPage) === 'light' ? 'bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-white'} font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-clip transition-colors duration-500`}>
      <HUDOverlay />
      <AnimatePresence mode="wait">
        <ToneTransitionOverlay tone={currentTone} />
      </AnimatePresence>
      <div className="fixed inset-0 z-[0] pointer-events-none opacity-[0.03] mix-blend-soft-light bg-noise" />

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

      {/* Owner (1 Nov 2026): the Facebook/Instagram post strip sits above the footer on every page except home. */}
      {currentPage !== "home" && !NO_SOCIAL_STRIP.has(currentPage) && (
        <React.Suspense fallback={null}>
          <SocialStrip />
        </React.Suspense>
      )}

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
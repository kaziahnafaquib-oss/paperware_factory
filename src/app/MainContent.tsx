import { Suspense, lazy, useState, useEffect, useRef, memo, useMemo, useCallback, useLayoutEffect, startTransition, type ReactNode } from "react";
import { useLanguage } from "./context/LanguageContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { updatePageSEO } from "./lib/seo-enhanced";
import { trackPageView } from "./lib/analytics";
import { debounce, prefersReducedMotion, runWhenIdle, getDevicePerformanceTier } from "./lib/performance";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Zap, ArrowRight, ShoppingBasket as BasketIcon } from "lucide-react";
import {
  DEFAULT_HERO_VIDEO,
  DEFAULT_CLIENTS_VIDEO,
  DEFAULT_HERO_CONTENT,
  DEFAULT_PRODUCTS,
  DEFAULT_CLIENT_PROJECTS,
  DEFAULT_SIGNING_IMAGE,
  DEFAULT_PARTNERS,
  DEFAULT_CLIENTS,
  DEFAULT_UNIT_PHOTOS,
  DEFAULT_TEAM_CONTENT,
  DEFAULT_PRODUCTION_STATS
} from "./lib/constants-data";

// CRITICAL FIX: Re-import all components with explicit paths - cache bust
// Lazy load components for performance
// Lazy load components for performance
const Ticker = lazy(() => import("./components/paperware/ticker").then(module => ({ default: module.Ticker })));
const Industries = lazy(() => import("./components/paperware/industries").then(module => ({ default: module.Industries })));
const AdminPanel = lazy(() => import("./components/paperware/admin-panel").then(module => ({ default: module.AdminPanel })));
const ProductionTimeline = lazy(() => import("./components/paperware/production-timeline").then(module => ({ default: module.ProductionTimeline })));
const RealtimeOps = lazy(() => import("./components/paperware/realtime-ops").then(module => ({ default: module.RealtimeOps })));
const Navbar = lazy(() => import("./components/paperware/navbar").then(module => ({ default: module.Navbar })));
const Footer = lazy(() => import("./components/paperware/footer").then(module => ({ default: module.Footer })));
const BackToTop = lazy(() => import("./components/paperware/back-to-top").then(module => ({ default: module.BackToTop })));
const ContactMenu = lazy(() => import("./components/paperware/contact-menu").then(module => ({ default: module.ContactMenu })));
const ChatWidget = lazy(() => import("./components/ChatWidget").then(module => ({ default: module.ChatWidget })));
const BottomNav = lazy(() => import("./components/paperware/bottom-nav").then(module => ({ default: module.BottomNav })));
const SharedHUDOverlay = lazy(() => import("./components/paperware/hud-overlay").then(module => ({ default: module.HUDOverlay })));

import { Hero } from "./components/paperware/hero"; // Used as default
import { ImmersiveHero } from "./components/paperware/immersive-hero";
const WhoWeAreSection = lazy(() => import("./components/paperware/who-we-are").then(module => ({ default: module.WhoWeAreSection })));
const ImpactMetrics = lazy(() => import("./components/paperware/impact-metrics").then(module => ({ default: module.ImpactMetrics })));
const PageDiscovery = lazy(() => import("./components/paperware/page-discovery").then(module => ({ default: module.PageDiscovery })));
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
const FeaturedProductsSlider = lazy(() => import("./components/paperware/featured-products-slider").then(module => ({ default: module.FeaturedProductsSlider })));
const PremiumContact = lazy(() => import("./components/paperware/premium-contact").then(module => ({ default: module.PremiumContact })));
const PremiumClients = lazy(() => import("./components/paperware/premium-clients").then(module => ({ default: module.PremiumClients })));
const NationwideExportSection = lazy(() => import("./components/paperware/nationwide-export").then(module => ({ default: module.NationwideExportSection })));

// Advanced Performance Hook
const usePerformanceOptimization = () => {
  const [tier, setTier] = useState<'low' | 'medium' | 'high'>('high');

  useEffect(() => {
    // Check device tier and set optimizations
    const deviceTier = getDevicePerformanceTier();
    setTier(deviceTier);

    // Add hardware acceleration classes to body
    if (deviceTier === 'high') {
      document.documentElement.classList.add('high-performance');
    }

    if (deviceTier === 'low') {
      document.body.classList.add('reduce-effects');
    }
  }, []);

  return { tier, isLowEnd: tier === 'low' };
};

// A wrapper component to only render heavy sections when they enter viewport with content-visibility
const DeferredSection = memo(({ children, threshold = 0.1, className = "" }: { children: ReactNode, threshold?: number, className?: string }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deviceTier = getDevicePerformanceTier();
    const isLowEnd = deviceTier === 'low';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: isLowEnd ? '400px' : '800px', // Increased margin to load earlier
        threshold
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-700 ease-in-out will-change-[opacity,transform] ${hasEntered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        contentVisibility: 'auto',
        contain: 'paint layout',
        containIntrinsicSize: '1px 500px'
      } as any}
    >
      {hasEntered ? (
        <Suspense fallback={<div className="h-64 animate-pulse bg-zinc-50 rounded-[40px] m-4" />}>
          {children}
        </Suspense>
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
const HUDOverlay = memo(() => {
  const isHighEnd = useMemo(() => getDevicePerformanceTier() === 'high', []);

  return (
    <>
      <SharedHUDOverlay />
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-10 select-none hardware-accelerated">
        {/* Additional Immersive Layers - Only on high-end */}
        {isHighEnd && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(214,200,169,0.03)_100%)]" />

            {/* Digital Grain Texture Overlay - Heavy GPU cost - Only if REALLY high end or specific check */}
            <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none will-change-transform"
              style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
          </>
        )}

        {/* HUD Frame Accents - Simplified */}
        <div className="absolute inset-4 md:inset-8 border border-[#d6c8a9]/5 rounded-[40px] pointer-events-none" />

        {/* Predictive Data Streams - Only on non-low tiers */}
        {!prefersReducedMotion() && getDevicePerformanceTier() !== 'low' && (
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
        )}
      </div>
    </>
  );
});

// Use lazy loading for all non-essential pages to optimize initial bundle size
const AllProductsPage = lazy(() => import("./pages/all-products").then(module => ({ default: module.AllProductsPage })));
const PaperCupsPage = lazy(() => import("./pages/papercups").then(module => ({ default: module.PaperCupsPage })));
const AboutPage = lazy(() => import("./pages/about-us"));
const ClientsPage = lazy(() => import("./pages/clients").then(module => ({ default: module.ClientsPage })));
const ProductDetailsPage = lazy(() => import("./pages/product-details").then(module => ({ default: module.ProductDetailsPage })));
const OfficeStationaryPage = lazy(() => import("./pages/office-stationary").then(module => ({ default: module.OfficeStationaryPage })));
const RestaurantSuppliesPage = lazy(() => import("./pages/restaurant-supplies").then(module => ({ default: module.RestaurantSuppliesPage })));
const MarketingMaterialsPage = lazy(() => import("./pages/marketing-materials").then(module => ({ default: module.MarketingMaterialsPage })));
const PharmaSuppliesPage = lazy(() => import("./pages/pharma-supplies").then(module => ({ default: module.PharmaSuppliesPage })));
const FMCGSuppliesPage = lazy(() => import("./pages/fmcg-garments").then(module => ({ default: module.FMCGSuppliesPage })));
const GarmentSuppliesPage = lazy(() => import("./pages/garments").then(module => ({ default: module.GarmentSuppliesPage })));
const SustainabilityPage = lazy(() => import("./pages/sustainability").then(module => ({ default: module.SustainabilityPage })));
const ContactPage = lazy(() => import("./pages/contact").then(module => ({ default: module.ContactPage })));
const QuoteRequestPage = lazy(() => import("./pages/quote-request").then(module => ({ default: module.QuoteRequestPage })));
const FAQPage = lazy(() => import("./pages/faq").then(module => ({ default: module.FAQPage })));
const CareerPage = lazy(() => import("./pages/career").then(module => ({ default: module.CareerPage })));
const CompliancePage = lazy(() => import("./pages/compliance").then(module => ({ default: module.CompliancePage })));
const OrderTrackingPage = lazy(() => import("./pages/order-tracking").then(module => ({ default: module.OrderTrackingPage })));
const ProductJourneyPage = lazy(() => import("./pages/product-journey").then(module => ({ default: module.ProductJourneyPage })));
const GalleryPage = lazy(() => import("./pages/gallery").then(module => ({ default: module.GalleryPage })));
const ManufacturingPage = lazy(() => import("./pages/manufacturing").then(module => ({ default: module.ManufacturingPage })));
const StudioPage = lazy(() => import("./pages/studio").then(module => ({ default: module.StudioPage })));
const SocialsPage = lazy(() => import("./pages/socials").then(module => ({ default: module.SocialsPage })));
const MorePage = lazy(() => import("./pages/more").then(module => ({ default: module.MorePage })));
const Catalog3DPage = lazy(() => import("./pages/catalog-3d").then(module => ({ default: module.Catalog3DPage })));
const FactoryLivePage = lazy(() => import("./pages/factory-live").then(module => ({ default: module.FactoryLivePage })));
const ImpactDashboardPage = lazy(() => import("./pages/impact-dashboard").then(module => ({ default: module.ImpactDashboardPage })));
const BulkOrderPage = lazy(() => import("./pages/bulk-order").then(module => ({ default: module.default })));
const QuotationBasketPage = lazy(() => import("./pages/quotation-basket").then(module => ({ default: module.default })));
const ClientPortalPage = lazy(() => import("./pages/client-portal").then(module => ({ default: module.ClientPortalPage })));
const FuturePlanPage = lazy(() => import("./pages/future-plan").then(module => ({ default: module.FuturePlanPage })));
const ProductFeedbackPage = lazy(() => import("./pages/product-feedback").then(module => ({ default: module.ProductFeedbackPage })));
const OurERPPage = lazy(() => import("./pages/our-erp").then(module => ({ default: module.OurERPPage })));
const ExportPage = lazy(() => import("./pages/export").then(module => ({ default: module.ExportPage })));
const AdminDashboardPage = lazy(() => import("./pages/admin-dashboard"));
const SolutionsPage = lazy(() => import("./pages/solutions").then(module => ({ default: module.SolutionsPage })));
const TechnicalManifestoPage = lazy(() => import("./pages/technical-manifesto").then(module => ({ default: module.TechnicalManifestoPage })));
const FranchisePage = lazy(() => import("./pages/franchise").then(module => ({ default: module.FranchisePage })));
const InvestorPage = lazy(() => import("./pages/investor").then(module => ({ default: module.InvestorPage })));
const PartnerProgramPage = lazy(() => import("./pages/PartnerProgram").then(module => ({ default: module.PartnerProgramPage })));
const PartnersPage = lazy(() => import("./pages/partners").then(module => ({ default: module.PartnersPage })));
const BusinessPage = lazy(() => import("./pages/business").then(module => ({ default: module.BusinessPage })));
const CompanyPage = lazy(() => import("./pages/company").then(module => ({ default: module.CompanyPage })));
const CSRPage = lazy(() => import("./pages/csr").then(module => ({ default: module.CSRPage })));
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy").then(module => ({ default: module.PrivacyPolicy })));
const AdminPortalPage = lazy(() => import("./pages/admin-portal").then(module => ({ default: module.AdminPortal })));

// Preload critical pages for faster navigation
const preloadPage = (pageName: string) => {
  switch (pageName) {
    case 'client-portal':
      import("./pages/client-portal");
      break;
    case 'admin-portal':
      import("./pages/admin-portal");
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
const SearchOverlay = lazy(() => import("./components/paperware/search-overlay").then(module => ({ default: module.SearchOverlay })));
const EmailModal = lazy(() => import("./components/paperware/email-modal").then(module => ({ default: module.EmailModal })));
const SupplierApplicationModal = lazy(() => import("./components/SupplierApplicationModal").then(module => ({ default: module.SupplierApplicationModal })));
const PartnerGuidelinesModal = lazy(() => import("./components/PartnerGuidelinesModal").then(module => ({ default: module.PartnerGuidelinesModal })));
const AuthModal = lazy(() => import("./components/paperware/auth-modal").then(module => ({ default: module.AuthModal })));

// Neural Language Transition Effect

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
function PerspectiveSection({ children }: { children: ReactNode }) {
  const isLowEnd = getDevicePerformanceTier() === 'low';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);

  if (isLowEnd) return <section ref={ref} className="w-full">{children}</section>;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden hardware-accelerated"
      style={{ contain: 'layout style', contentVisibility: 'auto' } as any}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          willChange: 'transform, opacity'
        }}
        className="w-full h-full origin-center"
      >
        {children}
      </motion.div>
    </section>
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


export function MainContent() {
  const { tier, isLowEnd } = usePerformanceOptimization();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup' | 'admin' | 'client'>('login');
  const [quoteBasket, setQuoteBasket] = useState<any[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [performanceTier, setPerformanceTier] = useState<'low' | 'medium' | 'high'>('high');
  const [isLanguageTransitioning, setIsLanguageTransitioning] = useState(false);
  const [currentTone, setCurrentTone] = useState("Corporate");

  // Reinforce scroll to top on page change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPage]);

  const [heroVideoUrl, setHeroVideoUrl] = useState(DEFAULT_HERO_VIDEO);
  const [brochureUrl, setBrochureUrl] = useState("");
  const [heroVideoMobileUrl, setHeroVideoMobileUrl] = useState(DEFAULT_HERO_VIDEO);
  const [clientsVideoUrl, setClientsVideoUrl] = useState(DEFAULT_CLIENTS_VIDEO);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO_CONTENT);
  const [productsData, setProductsData] = useState(DEFAULT_PRODUCTS);
  const [clientProjects, setClientProjects] = useState(DEFAULT_CLIENT_PROJECTS);
  const [productionStats, setProductionStats] = useState({
    ...DEFAULT_PRODUCTION_STATS,
    lastSync: new Date().toISOString()
  });

  const [factoryVideos, setFactoryVideos] = useState<any[]>([]);
  const [suppliersData, setSuppliersData] = useState<any[]>(DEFAULT_PARTNERS);
  const [clientsData, setClientsData] = useState<any[]>(DEFAULT_CLIENTS);
  const [signingImage, setSigningImage] = useState(DEFAULT_SIGNING_IMAGE);
  const [aboutUsVideos, setAboutUsVideos] = useState<any>({});
  const [uploadedLogos, setUploadedLogos] = useState<any[]>([]);
  const [uploadedTeamMembers, setUploadedTeamMembers] = useState<any[]>(DEFAULT_UNIT_PHOTOS);
  const [teamSectionContent, setTeamSectionContent] = useState(DEFAULT_TEAM_CONTENT);

  // Unified useScroll at root level to ensure non-static container context
  // Remove container reference to let useScroll use window by default
  const { scrollYProgress: rootScrollProgress } = useScroll();

  useEffect(() => {
    const tier = getDevicePerformanceTier();
    setPerformanceTier(tier);

    try {
      const teamContentStr = localStorage.getItem('paperware_team_content');
      if (teamContentStr) {
        const content = JSON.parse(teamContentStr);
        // Migration: If content uses old hardcoded strings, prefer the new keys
        if (content.titleTop === "WHO") {
          setTeamSectionContent(DEFAULT_TEAM_CONTENT);
        } else {
          setTeamSectionContent(content);
        }
      }

      // Migrate products if they contain hardcoded names
      const productsStr = localStorage.getItem('paperware_products');
      if (productsStr) {
        const prodData = JSON.parse(productsStr);
        if (prodData.length > 0 && prodData[0].name === "FOOD BOX") {
          setProductsData(DEFAULT_PRODUCTS);
          localStorage.removeItem('paperware_products'); // Reset to defaults to ensure localization
        } else {
          setProductsData(prodData);
        }
      }

      // Same for client projects
      const clientProjectsStr = localStorage.getItem('paperware_client_projects');
      if (clientProjectsStr) {
        const projData = JSON.parse(clientProjectsStr);
        if (projData.length > 0 && projData[0].company === "TechFlow Systems") {
          setClientProjects(DEFAULT_CLIENT_PROJECTS);
          localStorage.removeItem('paperware_client_projects');
        } else {
          setClientProjects(projData);
        }
      }

      const heroVideo = localStorage.getItem('paperware_hero_video');
      // if (heroVideo) setHeroVideoUrl(heroVideo); // Force new default video
      const brochure = localStorage.getItem('paperware_brochure');
      if (brochure) setBrochureUrl(brochure);
      const heroVideoMobile = localStorage.getItem('paperware_hero_video_mobile');
      // if (heroVideoMobile) setHeroVideoMobileUrl(heroVideoMobile); // Force new default mobile video
      const clientsVideo = localStorage.getItem('paperware_clients_video');
      if (clientsVideo) setClientsVideoUrl(clientsVideo);
      const heroContentStr = localStorage.getItem('paperware_hero_content');
      if (heroContentStr) setHeroContent(JSON.parse(heroContentStr));
      const suppliersStr = localStorage.getItem('paperware_suppliers');
      if (suppliersStr) setSuppliersData(JSON.parse(suppliersStr));
      const clientsStr = localStorage.getItem('paperware_clients');
      if (clientsStr) setClientsData(JSON.parse(clientsStr));
      const signingImageStr = localStorage.getItem('paperware_signing_image');
      if (signingImageStr) setSigningImage(signingImageStr);
      const aboutUsVideosStr = localStorage.getItem('paperware_about_us_videos');
      if (aboutUsVideosStr) setAboutUsVideos(JSON.parse(aboutUsVideosStr));
      const teamMembersStr = localStorage.getItem('paperware_team_members');
      if (teamMembersStr) setUploadedTeamMembers(JSON.parse(teamMembersStr));
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
  useEffect(() => {
    localStorage.setItem('paperware_suppliers', JSON.stringify(suppliersData));
  }, [suppliersData]);

  useEffect(() => {
    localStorage.setItem('paperware_clients', JSON.stringify(clientsData));
  }, [clientsData]);

  useEffect(() => {
    localStorage.setItem('paperware_signing_image', signingImage);
  }, [signingImage]);

  useEffect(() => {
    localStorage.setItem('paperware_team_content', JSON.stringify(teamSectionContent));
  }, [teamSectionContent]);

  useEffect(() => {
    localStorage.setItem('paperware_team_members', JSON.stringify(uploadedTeamMembers));
  }, [uploadedTeamMembers]);

  const handleBrochureDownload = useCallback(async () => {
    // Simulate getting location
    let location = "Unknown Location";
    let ip = "Anonymous";

    try {
      // Simple fetch to get public IP info (using free ipapi.co)
      // Note: In production, do this server-side to avoid CORS/limits
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      if (data.city && data.country_name) {
        location = `${data.city}, ${data.country_name}`;
        ip = data.ip;
      }
    } catch (e) {
      console.warn("Failed to fetch location", e);
    }

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/brochure/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          location,
          ip,
          device: navigator.userAgent,
          source: "Website Button"
        })
      });

      if (!response.ok) {
        console.error('Failed to log download:', await response.text());
      }
    } catch (e) {
      console.error("Failed to send log to server", e);
    }
  }, []);

  const handlePageChange = useCallback((page: string) => {
    startTransition(() => {
      setCurrentPage(page);
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleProductClick = useCallback((product: any) => {
    startTransition(() => {
      setQuoteBasket(prev => [...prev, product]);
      setIsBasketOpen(true);
      setCurrentPage("product-details");
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const addToQuoteBasket = useCallback((product: any) => {
    setQuoteBasket(prev => {
      if (!prev.find(p => p.name === product.name)) return [...prev, product];
      return prev;
    });
  }, []);

  const removeFromQuoteBasket = useCallback((name: string) => {
    setQuoteBasket(prev => prev.filter(p => p.name !== name));
  }, []);

  const { t, language } = useLanguage();

  // Watch for language changes to trigger effect
  const prevLang = useRef(language);
  useEffect(() => {
    if (prevLang.current !== language) {
      setIsLanguageTransitioning(true);
      const timer = setTimeout(() => setIsLanguageTransitioning(false), 1000);
      prevLang.current = language;
      return () => clearTimeout(timer);
    }
  }, [language]);

  // 🚀 Dynamic SEO & Analytics Tracking
  useEffect(() => {
    updatePageSEO(currentPage, language);
    trackPageView(currentPage);
  }, [currentPage, language]);

  const handleAuthOpen = useCallback((type: 'login' | 'signup' | 'admin' | 'client') => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  }, []);

  const renderContent = useMemo(() => {
    switch (currentPage) {
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
                posterImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop"
                content={heroContent}
              />
            </div>

            {/* 2. LIVE TRACKER (Ticker) - Lazy Loaded as well */}
            <div className="bg-white border-b border-zinc-100 py-3 overflow-hidden relative z-20">
              <Suspense fallback={<div className="h-10 bg-zinc-50" />}>
                <Ticker />
              </Suspense>
            </div>

            {/* 3. ABOUT US */}
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <WhoWeAreSection
                teamMembers={uploadedTeamMembers}
                content={{
                  ...teamSectionContent,
                  titleTop: t('who') || teamSectionContent.titleTop,
                  titleBottom: t('we_are') || teamSectionContent.titleBottom,
                  desc1: t('who_we_are_desc_1') || teamSectionContent.desc1,
                  desc2: t('who_we_are_desc_2') || teamSectionContent.desc2,
                  stat1Label: t('years_exp') || teamSectionContent.stat1Label,
                  stat2Label: t('eco_score_label') || teamSectionContent.stat2Label,
                  stat3Label: t('team_size') || teamSectionContent.stat3Label,
                }}
                onReadMore={() => handlePageChange("about")}
              />
            </Suspense>

            {/* 4. INDUSTRIES WE SERVE */}
            <DeferredSection>
              <Industries onExplore={() => handlePageChange("products")} />
            </DeferredSection>

            <DeferredSection>
              <FeaturedProductsSlider
                products={productsData.map(p => ({
                  ...p,
                  id: String(p.id),
                  description: "Premium eco-friendly packaging solution designed for modern businesses",
                  badge: p.status === "Active" ? "New Arrival" : undefined,
                  rating: 5,
                  price: "From $29.99"
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
                    : clientsData.map(p => ({ id: p.id, name: p.name, image: p.logo }))
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
              <PremiumContact onSubmit={(data) => console.log('Contact form:', data)} />
            </DeferredSection>

            {/* PAGE DISCOVERY - AUTO SCROLL */}
            <DeferredSection>
              <PageDiscovery onNavigate={handlePageChange} />
            </DeferredSection>

          </div>
        );
      case "about": return <AboutPage aboutUsVideos={aboutUsVideos} />;
      case "clients": return <ClientsPage videoUrl={clientsVideoUrl} productionStats={productionStats} onPageChange={handlePageChange} partnersData={clientsData} />;
      case "papercups": return <PaperCupsPage videoUrls={factoryVideos} onProductClick={handleProductClick} onPageChange={handlePageChange} />;
      case "products": return <AllProductsPage onProductClick={handleProductClick} onAddToQuote={addToQuoteBasket} onPageChange={handlePageChange} products={productsData} clientProjects={clientProjects} />;
      case "product-details": return <ProductDetailsPage product={quoteBasket[quoteBasket.length - 1]} onBack={() => setCurrentPage("products")} onAddToQuote={addToQuoteBasket} onContactClick={() => handlePageChange("contact")} />;
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
      case "impact-dashboard": return <ImpactDashboardPage />;
      case "bulk-quotes": return <BulkOrderPage basket={quoteBasket} />;
      case "quotation-basket": return <QuotationBasketPage basket={quoteBasket} onRemove={removeFromQuoteBasket} onProceedToOrder={() => handlePageChange("bulk-quotes")} />;
      case "client-portal": return <ClientPortalPage />;
      case "future-plan": return <FuturePlanPage onPageChange={handlePageChange} />;
      case "product-feedback": return <ProductFeedbackPage onScanSuccess={() => handlePageChange("product-journey")} />;
      case "erp": return <OurERPPage />;
      case "export": return <ExportPage />;
      case "technical-manifesto": return <TechnicalManifestoPage />;
      case "franchise": return <FranchisePage />;
      case "investor": return <InvestorPage />;
      case "partner-program": return (
        <Suspense fallback={<PageLoader />}>
          <PartnerProgramPage />
        </Suspense>
      );
      case "partners": return (
        <PartnersPage
          partners={suppliersData}
          signingImage={signingImage}
          onApplyNow={() => setIsSupplierModalOpen(true)}
          onReadGuidelines={() => setIsGuidelinesModalOpen(true)}
        />
      );
      case "business": return <BusinessPage />;
      case "company": return <CompanyPage onPageChange={handlePageChange} />;
      case "csr": return <CSRPage />;
      case "privacy-policy": return <PrivacyPolicyPage />;
      case "admin-portal": return <AdminPortalPage />;
      case "admin": return (
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
          partners={suppliersData}
          onUpdatePartners={setSuppliersData}
          clients={clientsData}
          onUpdateClients={setClientsData}
          teamMembers={uploadedTeamMembers}
          onUpdateTeamMembers={setUploadedTeamMembers}
          teamSectionContent={teamSectionContent}
          onUpdateTeamSectionContent={(content: any) => {
            setTeamSectionContent(content);
            localStorage.setItem('paperware_team_content', JSON.stringify(content));
          }}
          aboutUsVideos={aboutUsVideos}
          onUpdateAboutUsVideos={(videos) => {
            setAboutUsVideos(videos);
            localStorage.setItem('paperware_about_us_videos', JSON.stringify(videos));
          }}
        />
      );
      default: return <Hero onExplore={() => handlePageChange("products")} videoUrl={heroVideoUrl} title={heroContent.title} subtitle1={heroContent.subtitle1} subtitle2={heroContent.subtitle2} />;
    }
  }, [currentPage, heroVideoUrl, heroVideoMobileUrl, clientsVideoUrl, heroContent, productsData, quoteBasket, factoryVideos, handlePageChange, handleProductClick, addToQuoteBasket, removeFromQuoteBasket, productionStats, uploadedLogos, suppliersData, clientsData, uploadedTeamMembers, teamSectionContent]);

  return (
    <div className={`relative min-h-screen ${['home', 'client-portal', 'contact', 'about', 'products', 'sustainability', 'company'].includes(currentPage) ? 'bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-white'} font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden transition-colors duration-500`}>
      <Suspense fallback={null}>
        <HUDOverlay />
      </Suspense>
      <div className="fixed inset-0 z-[0] pointer-events-none opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Suspense fallback={null}>
        <Ticker />
      </Suspense>
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
          <Suspense fallback={<PageLoader />}>
            {renderContent}
          </Suspense>
        </div>
      </main>

      <Footer onPageChange={handlePageChange} />

      {/* Floating Basket Removed */}

      <Suspense fallback={null}>
        {isEmailOpen && <EmailModal isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />}
        {isSearchOpen && (
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={handleProductClick}
            onPageChange={handlePageChange}
          />
        )}
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} type={authType === 'admin' ? 'admin' : 'client'} onLoginSuccess={() => handlePageChange(authType === 'admin' ? 'admin' : 'client-portal')} />}
        {isSupplierModalOpen && <SupplierApplicationModal isOpen={isSupplierModalOpen} onClose={() => setIsSupplierModalOpen(false)} />}
        {isGuidelinesModalOpen && <PartnerGuidelinesModal isOpen={isGuidelinesModalOpen} onClose={() => setIsGuidelinesModalOpen(false)} />}
      </Suspense>
      <Suspense fallback={null}>
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          videoData={factoryVideos}
          onUpdateVideos={setFactoryVideos}
          heroVideoUrl={heroVideoUrl}
          onUpdateHeroVideo={setHeroVideoUrl}
          partnersData={suppliersData}
          onUpdatePartners={setSuppliersData}
          signingImage={signingImage}
          onUpdateSigningImage={setSigningImage}
        />
        <HUDOverlay />
      </Suspense>
      <BackToTop />
      <ContactMenu />
      <ChatWidget />
    </div >
  );
}
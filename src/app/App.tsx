import React from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import { ChatProvider } from "./context/ChatContext";
import { SocialMediaProvider } from "./context/SocialMediaContext";
import { ChatWidget } from "./components/ChatWidget";
import { Toaster } from "sonner";
import { MainContent } from "./MainContent";

// Fix Recharts dimension errors globally
// import "./lib/recharts-fix"; 

// Performance monitoring (dev only)
import "./lib/performance-check";

// 🚀 SEO and Analytics
import { initializeSEO } from "./lib/seo";
import { initializeAnalytics, trackWebVitals, setupInteractionTracking } from "./lib/analytics";
import { initPerformanceOptimizations } from "./lib/performance-optimizer";
import { optimizeAllImages } from "./lib/image-optimizer";
import { ScrollProgress } from "./components/enhanced/ScrollProgress";
import { SmoothScroll } from "./components/enhanced/SmoothScroll";
import { PerformanceReport } from "./components/PerformanceReport";

// ✨ NEW: Advanced Enhancements
const AdvancedLoader = React.lazy(() => import("./components/enhanced/AdvancedLoader").then(module => ({ default: module.AdvancedLoader })));
const AdvancedCursor = React.lazy(() => import("./components/enhanced/AdvancedCursor").then(module => ({ default: module.AdvancedCursor })));
const AmbientParticles = React.lazy(() => import("./components/enhanced/AmbientParticles").then(module => ({ default: module.AmbientParticles })));
const AccessibilityPanel = React.lazy(() => import("./components/enhanced/AccessibilityPanel").then(module => ({ default: module.AccessibilityPanel })));
const NotificationCenter = React.lazy(() => import("./components/enhanced/NotificationCenter").then(module => ({ default: module.NotificationCenter })));
const QuickSettings = React.lazy(() => import("./components/enhanced/QuickSettings").then(module => ({ default: module.QuickSettings })));


export default function App() {
  const [showParticles, setShowParticles] = React.useState(true);
  const [showCursor, setShowCursor] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(true);

  // Initialize SEO and Analytics on mount
  React.useEffect(() => {
    try {
      // Initialize SEO (meta tags, structured data)
      // initializeSEO();

      // Initialize Google Analytics (if not in dev mode)
      const isDev = import.meta.env.DEV;
      if (!isDev) {
        // initializeAnalytics('G-XXXXXXXXXX'); // Replace with actual GA ID
      }

      // Track Core Web Vitals
      // trackWebVitals();

      // Setup interaction tracking (scroll depth, clicks, time on page)
      // setupInteractionTracking();

      console.log('🚀 Paperware SEO & Analytics initialized');
    } catch (error) {
      console.warn('SEO/Analytics initialization error:', error);
    }

    try {
      // Initialize performance optimizations (resource hints, bundle monitoring)
      // initPerformanceOptimizations();
      console.log('⚡ Performance optimizations active');
    } catch (error) {
      console.warn('Performance optimization error:', error);
    }

    try {
      // Optimize all images on page
      setTimeout(() => {
        // optimizeAllImages();
      }, 1000);
    } catch (error) {
      console.warn('Image optimization error:', error);
    }
  }, []);

  return (
    // reducedMotion="user": transform/layout animations respect the OS setting (see lib/reducedMotion.ts for the rest).
    <MotionConfig reducedMotion="user">
    <LanguageProvider>
      <ChatProvider>
        <SocialMediaProvider>
          <SmoothScroll>
            {/* Skip to Main Content - Accessibility */}
            <a href="#main-content" className="skip-to-main">
              Skip to Main Content
            </a>

            <ScrollProgress />
            <MainContent />
            <ChatWidget />
            <Toaster position="top-right" richColors closeButton />
            {/* Phase A0: developer FPS widget was visible to all visitors; dev builds only. */}
            {import.meta.env.DEV && <PerformanceReport />}
            <React.Suspense fallback={null}>
              {/* <AdvancedLoader /> */}
              {/* {showCursor && <AdvancedCursor />} */}
              {/* {showParticles && <AmbientParticles />} */}
              {/* <AccessibilityPanel /> */}
              {/* {showNotifications && <NotificationCenter />} */}
              <QuickSettings
                onToggleParticles={setShowParticles}
                onToggleCursor={setShowCursor}
                onToggleNotifications={setShowNotifications}
              />
            </React.Suspense>
          </SmoothScroll>
        </SocialMediaProvider>
      </ChatProvider>
    </LanguageProvider>
    </MotionConfig>
  );
}
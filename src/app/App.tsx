import { Suspense, lazy, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ChatProvider } from "./context/ChatContext";
import { SocialMediaProvider } from "./context/SocialMediaContext";
import { Toaster } from "sonner";
import { MainContent } from "./MainContent";
import {
  initializeAnalytics,
  trackWebVitals,
  setupInteractionTracking,
  trackDeviceInfo
} from "./lib/analytics";

console.log('📦 App.tsx loaded');

export default function App() {
  console.log('🎨 App component rendering...');

  useEffect(() => {
    // 📊 Initialize Analytics & Tracking
    // Replace 'G-XXXXXXXXXX' with actual GA4 ID when available
    initializeAnalytics('G-XXXXXXXXXX');
    trackWebVitals();
    setupInteractionTracking();
    trackDeviceInfo();

    console.log('📊 Analytics systems initialized');
  }, []);

  return (
    <LanguageProvider>
      <ChatProvider>
        <SocialMediaProvider>
          {/* Skip to Main Content - Accessibility */}
          <a href="#main-content" className="skip-to-main">
            Skip to Main Content
          </a>

          <MainContent />
          <Toaster position="top-right" richColors closeButton />
        </SocialMediaProvider>
      </ChatProvider>
    </LanguageProvider>
  );
}
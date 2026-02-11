import { Suspense, lazy, useEffect, useState } from 'react';
import { ClientLogin } from "../components/paperware/ClientLogin";

const ClientDashboard = lazy(() => import('../components/paperware/ClientDashboard').then(module => ({ default: module.ClientDashboard })));

export function ClientPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Preload the ClientDashboard component
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      import('../components/paperware/ClientDashboard');
    }, 100);
    return () => clearTimeout(preloadTimer);
  }, []);

  if (!isLoggedIn) {
    return <ClientLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Suspense fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
                 <div className="size-12 border-4 border-[#fabf37]/30 border-t-[#fabf37] rounded-full animate-spin" />
                 <p className="text-xs font-black uppercase tracking-widest text-zinc-600 animate-pulse">Loading Portal...</p>
             </div>
        </div>
    }>
        <ClientDashboard onLogout={() => setIsLoggedIn(false)} />
    </Suspense>
  );
}
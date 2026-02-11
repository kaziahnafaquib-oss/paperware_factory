import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import { ErrorBoundary } from './ErrorBoundary'
import { initPerformanceOptimizations } from './app/lib/performance-optimizer'

// Initialize performance optimizations early
initPerformanceOptimizations();

console.log('🚀 Starting Paperware application...');

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found!');
  }

  console.log('✅ Root element found, creating React root...');

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );

  console.log('✅ React app mounted successfully!');

  // Remove loading screen
  setTimeout(() => {
    document.body.classList.add('app-ready');
  }, 500);

} catch (error) {
  console.error('❌ Failed to mount React app:', error);

  // Show error on page
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1a1a1a; color: white; font-family: monospace; padding: 20px;">
        <div style="max-width: 600px; text-align: center;">
          <h1 style="color: #ef4444; margin-bottom: 20px;">⚠️ Application Error</h1>
          <p style="margin-bottom: 20px;">Failed to load the application. Please check the console for details.</p>
          <pre style="background: #000; padding: 20px; border-radius: 8px; text-align: left; overflow: auto;">\${error}</pre>
          <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #fabf37; color: black; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Reload Page</button>
        </div>
      </div>
    `;
  }
}
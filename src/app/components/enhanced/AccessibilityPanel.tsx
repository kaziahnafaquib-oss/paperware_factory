import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Eye, Volume2, Zap, Moon, Sun } from "lucide-react";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100,
    contrast: false,
    darkMode: false,
    reduceMotion: false,
    soundEffects: false,
  });

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${settings.fontSize}%`;

    // Apply contrast mode
    if (settings.contrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }

    // Apply dark mode
    if (settings.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Apply reduced motion
    if (settings.reduceMotion) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  }, [settings]);

  return (
    <>
      {/* Button removed */}

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Panel Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-[9999] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-zinc-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-black text-zinc-900">Accessibility</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Settings */}
              <div className="p-6 space-y-6">
                {/* Font Size */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-[#fabf37]" />
                    <label className="font-bold text-zinc-900">Font Size</label>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="150"
                    step="10"
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-sm text-zinc-500 mt-1">{settings.fontSize}%</div>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#fabf37]" />
                    <label className="font-bold text-zinc-900">High Contrast</label>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, contrast: !settings.contrast })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.contrast ? "bg-[#fabf37]" : "bg-zinc-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.contrast ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow"
                    />
                  </button>
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.darkMode ? (
                      <Moon className="w-5 h-5 text-[#fabf37]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#fabf37]" />
                    )}
                    <label className="font-bold text-zinc-900">Dark Mode</label>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.darkMode ? "bg-[#fabf37]" : "bg-zinc-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.darkMode ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow"
                    />
                  </button>
                </div>

                {/* Reduce Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#fabf37]" />
                    <label className="font-bold text-zinc-900">Reduce Motion</label>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, reduceMotion: !settings.reduceMotion })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.reduceMotion ? "bg-[#fabf37]" : "bg-zinc-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.reduceMotion ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow"
                    />
                  </button>
                </div>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-[#fabf37]" />
                    <label className="font-bold text-zinc-900">Sound Effects</label>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, soundEffects: !settings.soundEffects })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.soundEffects ? "bg-[#fabf37]" : "bg-zinc-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.soundEffects ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow"
                    />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-zinc-50 border-t border-zinc-200">
                <p className="text-sm text-zinc-600">
                  These settings help make the website more accessible and comfortable to use.
                  Your preferences are saved locally.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
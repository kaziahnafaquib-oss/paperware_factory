import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, X, Sparkles, Eye, Mouse, Bell, Volume2 } from "lucide-react";

interface QuickSettingsProps {
  onToggleParticles?: (enabled: boolean) => void;
  onToggleCursor?: (enabled: boolean) => void;
  onToggleNotifications?: (enabled: boolean) => void;
  onToggleSound?: (enabled: boolean) => void;
}

export function QuickSettings({
  onToggleParticles,
  onToggleCursor,
  onToggleNotifications,
  onToggleSound,
}: QuickSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    particles: true,
    cursor: true,
    notifications: true,
    sound: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    // Callbacks
    if (key === "particles") onToggleParticles?.(newValue);
    if (key === "cursor") onToggleCursor?.(newValue);
    if (key === "notifications") onToggleNotifications?.(newValue);
    if (key === "sound") onToggleSound?.(newValue);
  };

  return (
    <>
      {/* Button removed */}

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-56 right-6 z-[9999] w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#fabf37]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#fabf37] to-yellow-600 p-4 flex justify-between items-center">
              <h3 className="font-black text-zinc-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Quick Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-900/20 hover:bg-zinc-900/40 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-zinc-900" />
              </button>
            </div>

            {/* Settings List */}
            <div className="p-4 space-y-3">
              {/* Particles */}
              <SettingToggle
                icon={<Sparkles className="w-5 h-5 text-[#fabf37]" />}
                label="Ambient Particles"
                description="Floating background effects"
                enabled={settings.particles}
                onToggle={() => handleToggle("particles")}
              />

              {/* Custom Cursor */}
              <SettingToggle
                icon={<Mouse className="w-5 h-5 text-[#fabf37]" />}
                label="Custom Cursor"
                description="Enhanced mouse pointer"
                enabled={settings.cursor}
                onToggle={() => handleToggle("cursor")}
              />

              {/* Notifications */}
              <SettingToggle
                icon={<Bell className="w-5 h-5 text-[#fabf37]" />}
                label="Notifications"
                description="System alerts & updates"
                enabled={settings.notifications}
                onToggle={() => handleToggle("notifications")}
              />

              {/* Sound Effects */}
              <SettingToggle
                icon={<Volume2 className="w-5 h-5 text-[#fabf37]" />}
                label="Sound Effects"
                description="Audio feedback"
                enabled={settings.sound}
                onToggle={() => handleToggle("sound")}
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-50 border-t border-zinc-200">
              <p className="text-xs text-zinc-500 text-center">
                Customize your experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Toggle Component
function SettingToggle({
  icon,
  label,
  description,
  enabled,
  onToggle,
}: {
  icon: ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-zinc-900 text-sm">{label}</div>
          <div className="text-xs text-zinc-500">{description}</div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
          enabled ? "bg-[#fabf37]" : "bg-zinc-300"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-6 h-6 bg-white rounded-full shadow-md"
        />
      </button>
    </div>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: Date;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Order Confirmed",
      message: "Your order #12345 has been confirmed and is being processed.",
      timestamp: new Date(),
    },
  ]);

  const unreadCount = notifications.length;

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <>
      {/* Button removed */}

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-[9999] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-zinc-900">Notifications</h2>
                  <p className="text-sm text-zinc-500">{unreadCount} unread</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notifications */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 hover:border-[#fabf37] transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 pt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-zinc-900 text-sm mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-zinc-600 mb-2">{notification.message}</p>
                          <p className="text-[10px] text-zinc-400">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-200 transition-colors"
                        >
                          <X className="w-4 h-4 text-zinc-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-4 border-t border-zinc-200">
                  <button
                    onClick={clearAll}
                    className="w-full py-2 bg-zinc-900 text-white rounded-lg hover:bg-[#fabf37] hover:text-zinc-900 transition-colors font-bold text-sm"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
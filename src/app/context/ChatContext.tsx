import React, { createContext, useContext, useState, ReactNode } from 'react';
import { openWhatsAppInquiry } from '../lib/inquiry';

interface ChatContextType {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // The on-site chat had no backend: it showed canned "AI" replies and messages
  // reached nobody. Until a real chat exists, every chat entry point opens WhatsApp,
  // which reaches the sales team. The widget panel therefore never opens.
  const openChat = () => openWhatsAppInquiry("Chat from the website");
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = openChat;

  return (
    <ChatContext.Provider value={{ isChatOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
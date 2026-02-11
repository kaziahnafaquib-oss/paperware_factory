import { ChangeEvent, FormEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, ShieldCheck, ChevronDown, Trash2, Paperclip, Smile, ThumbsUp, ThumbsDown, Maximize2, Minimize2, Mic, Image as ImageIcon, FileText, Loader2, Download } from "lucide-react";
import { useChat } from "../context/ChatContext";

export function ChatWidget() {
  const { isChatOpen, closeChat, toggleChat } = useChat();
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hello! I am Paperware AI. How can I assist you with your sustainable packaging needs today?', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -20;
    const rotateYValue = ((x - centerX) / centerX) * 20;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleDownloadChat = () => {
    const chatContent = chatMessages.map(msg => `[${new Date(msg.timestamp || Date.now()).toLocaleString()}] ${msg.role.toUpperCase()}: ${msg.text}`).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paperware-chat-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmojiClick = (emoji: string) => {
    setChatInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleClearChat = () => {
    setChatMessages([
      { role: 'ai', text: 'Chat history cleared. How can I help you now?', timestamp: Date.now() }
    ]);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload
      const userMsg = { 
        role: 'user' as const, 
        text: `Uploaded: ${file.name}`, 
        type: 'file',
        fileName: file.name,
        timestamp: Date.now() 
      };
      setChatMessages(prev => [...prev, userMsg]);
      setIsTyping(true);
      
      // Simulate AI response to file
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = { 
          role: 'ai' as const, 
          text: `I've received your file "${file.name}". Our team will review the specifications properly.`,
          timestamp: Date.now()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Mock listening state
      setTimeout(() => {
        setIsListening(false);
        setChatInput("I need help with bulk ordering custom boxes.");
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const newUserMessage = { role: 'user' as const, text: userMsg, timestamp: Date.now() };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput("");
    setIsTyping(true);

    // Save logic same as before...
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
         "I've analyzed your request. Based on our current production capacity, we can definitely accommodate this.",
         "Connecting you to our admin portal... A human agent has been notified of your priority status.",
         "That's a great question about our sustainable materials. Let me flag this for our technical director.",
         "I've logged your interest in our bulk manufacturing. Preparing a preliminary quote..."
      ];
      
      const aiResponse = { 
        role: 'ai' as const, 
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileUpload}
      />

      {/* Floating Toggle Button (This stays in the normal DOM flow) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="hidden" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
      >
        {isChatOpen ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </motion.button>

      {/* AI Live Chat Interface - Rendered via Portal to escape stacking contexts */}
      {createPortal(
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                x: 0
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              style={{ zIndex: 2147483647 }} // Maximum Z-Index to ensure it's on top of everything
              className={`fixed flex flex-col overflow-hidden bg-white shadow-2xl border border-black/5 ${
                isExpanded 
                  ? "inset-0 md:inset-10 rounded-none md:rounded-2xl border-0 md:border" 
                  : "bottom-24 right-6 w-[90vw] md:w-[380px] h-[550px] max-h-[70vh] rounded-[30px]"
              }`}
            >
              {/* Chat Header */}
              <div className="bg-black p-5 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-[#fabf37] flex items-center justify-center border-2 border-white/10 relative">
                       <Bot className="size-5 text-black" />
                       <div className="absolute -bottom-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-black" />
                    </div>
                    <div>
                       <h3 className="text-white font-black uppercase text-sm tracking-wide">Paperware AI</h3>
                       <div className="flex items-center gap-2">
                          <span className="text-[#fabf37] text-[9px] font-bold uppercase tracking-widest">Connected to Admin</span>
                          <div className="size-1.5 rounded-full bg-[#fabf37] animate-pulse" />
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setIsExpanded(!isExpanded)}
                     className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white group"
                     title={isExpanded ? "Minimize" : "Maximize"}
                   >
                     {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                   </button>

                   <button 
                     onClick={handleClearChat}
                     className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white group"
                     title="Clear Chat"
                   >
                     <Trash2 className="size-4 group-hover:text-red-400 transition-colors" />
                   </button>
                   <button 
                     onClick={closeChat}
                     className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                   >
                     <ChevronDown className="size-4" />
                   </button>
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/50 relative scroll-smooth" ref={scrollRef}>
                 {/* Enhanced Message List */}
                 {chatMessages.map((msg: any, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`group flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                   >
                      {/* Avatar */}
                      <div className={`size-8 rounded-full shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'ai' ? 'bg-[#fabf37] text-black' : 'bg-black text-white'}`}>
                         {msg.role === 'ai' ? <Sparkles className="size-3.5" /> : <span className="text-[9px] font-black">YOU</span>}
                      </div>

                      {/* Message Content */}
                      <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                         <div className={`p-3.5 rounded-[20px] text-[12px] font-medium leading-relaxed relative hover:shadow-md transition-shadow ${
                            msg.role === 'ai' 
                              ? 'bg-[#fabf37] rounded-tl-none text-black' 
                              : 'bg-white border border-zinc-200 text-zinc-800 rounded-tr-none'
                         }`}>
                            {msg.type === 'file' ? (
                              <div className="flex items-center gap-2">
                                <div className="size-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                                  <FileText className="size-4 text-white" />
                                </div>
                                <span className="underline decoration-zinc-500/50 underline-offset-4">{msg.fileName}</span>
                              </div>
                            ) : (
                              msg.text
                            )}
                            
                            {/* AI Actions (Copy/Rate) */}
                            {msg.role === 'ai' && (
                              <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 py-1">
                                 <button 
                                   type="button"
                                   onClick={() => navigator.clipboard.writeText(msg.text)}
                                   className="text-[10px] text-zinc-400 hover:text-zinc-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border shadow-sm cursor-pointer hover:bg-zinc-50"
                                 >
                                   Copy
                                 </button>
                                 <div className="flex gap-1">
                                   <button className="p-1 rounded-full bg-white border shadow-sm hover:text-emerald-500 hover:border-emerald-200 text-zinc-400">
                                      <ThumbsUp className="size-2.5" />
                                   </button>
                                   <button className="p-1 rounded-full bg-white border shadow-sm hover:text-red-500 hover:border-red-200 text-zinc-400">
                                      <ThumbsDown className="size-2.5" />
                                   </button>
                                 </div>
                              </div>
                            )}
                         </div>
                         
                         {/* Timestamp */}
                         <span className="text-[10px] text-zinc-300 mt-1 px-1 font-medium select-none">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                         </span>
                      </div>
                   </motion.div>
                 ))}
                 
                 {/* Typing Indicator */}
                 {isTyping && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex gap-3"
                   >
                      <div className="size-8 rounded-full bg-[#fabf37] shrink-0 flex items-center justify-center text-black shadow-sm">
                         <Sparkles className="size-3.5 animate-spin-slow" />
                      </div>
                      <div className="bg-white border border-zinc-100 rounded-[20px] rounded-tl-none p-4 shadow-sm flex items-center gap-1">
                         <div className="size-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                         <div className="size-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                         <div className="size-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                   </motion.div>
                 )}

                 {/* Quick Replies (if not typing and last msg is AI) */}
                 {!isTyping && chatMessages.length > 0 && chatMessages[chatMessages.length - 1].role === 'ai' && (
                   <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-wrap gap-2 pl-11 pb-2"
                   >
                      {['📦 Order Status', '💰 Pricing', '📞 Contact Support', '♻️ Sustainability', '🎨 Custom Design', '🚚 Shipping Info'].map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => setChatInput(chip)}
                          className="text-[10px] font-semibold bg-black border border-black text-white px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors shadow-sm"
                        >
                          {chip}
                        </button>
                      ))}
                   </motion.div>
                 )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-zinc-100">
                 <form onSubmit={handleSendMessage} className="relative">
                    {/* Emoji Picker */}
                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute bottom-16 left-0 bg-white border border-zinc-200 shadow-xl rounded-xl p-2 z-50 flex flex-wrap gap-1 w-[280px]"
                        >
                          {['👍', '👎', '👋', '📦', '🎉', '🤔', '🔥', '❤️', '😊', '😂', '🙏', '✅'].map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleEmojiClick(emoji)}
                              className="text-lg hover:bg-zinc-100 p-2 rounded-lg transition-colors size-9 flex items-center justify-center"
                            >
                              {emoji}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative flex items-center">
                      <button 
                        type="button" 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute left-3 text-zinc-400 hover:text-[#fabf37] transition-colors p-1"
                        title="Add Emoji"
                      >
                        <Smile className="size-4" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute left-10 text-zinc-400 hover:text-[#fabf37] transition-colors p-1"
                        title="Attach File"
                      >
                        <Paperclip className="size-4" />
                      </button>
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Type your message..."}
                        className={`w-full bg-zinc-50 border rounded-full py-3.5 pl-20 pr-20 text-sm font-bold focus:outline-none focus:border-[#fabf37] focus:bg-white transition-all placeholder:text-zinc-300 text-[rgb(0,0,0)] ${isListening ? 'border-red-400 bg-red-50 animate-pulse' : 'border-zinc-200'}`}
                      />
                      <div className="absolute right-12 flex items-center gap-1">
                         <button 
                           type="button"
                           onClick={handleVoiceInput}
                           className={`transition-colors p-1 ${isListening ? 'text-red-500 bg-red-100 rounded-full' : 'text-zinc-400 hover:text-[#fabf37]'}`}
                           title="Voice Input"
                         >
                           {isListening ? <Loader2 className="size-4 animate-spin" /> : <Mic className="size-4" />}
                         </button>
                      </div>
                      <button 
                        type="submit"
                        disabled={!chatInput.trim() || isTyping}
                        className="absolute right-1.5 size-9 rounded-full bg-black text-[#fabf37] flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="size-3.5" />
                      </button>
                    </div>
                 </form>
                 <div className="mt-2.5 flex justify-center items-center gap-2">
                    <ShieldCheck className="size-3 text-zinc-300" />
                    <p className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest">End-to-End Encrypted</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

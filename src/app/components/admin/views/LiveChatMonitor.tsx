import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, User, Clock, CheckCheck, AlertCircle, Sparkles, Send } from "lucide-react";

interface ChatSession {
  id: string;
  timestamp: number;
  messages: Array<{
    role: 'user' | 'ai';
    text: string;
    timestamp: number;
  }>;
  userInfo: {
    ip?: string;
    lastPage?: string;
  };
  status: 'active' | 'resolved' | 'waiting';
}

export function LiveChatMonitor() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // Load chat sessions from localStorage
    const loadSessions = () => {
      try {
        const stored = localStorage.getItem('paperware_chat_sessions');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSessions(parsed);
        }
      } catch (e) {
        console.error('Failed to load chat sessions:', e);
      }
    };

    loadSessions();

    // Poll for updates every 2 seconds
    const interval = setInterval(loadSessions, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReply = (sessionId: string) => {
    if (!replyText.trim()) return;

    // Add admin reply to session
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages: [
            ...session.messages,
            {
              role: 'ai' as const,
              text: `[ADMIN REPLY] ${replyText}`,
              timestamp: Date.now()
            }
          ]
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    localStorage.setItem('paperware_chat_sessions', JSON.stringify(updatedSessions));
    setReplyText("");
  };

  const markAsResolved = (sessionId: string) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return { ...session, status: 'resolved' as const };
      }
      return session;
    });

    setSessions(updatedSessions);
    localStorage.setItem('paperware_chat_sessions', JSON.stringify(updatedSessions));
  };

  const activeCount = sessions.filter(s => s.status === 'active').length;
  const waitingCount = sessions.filter(s => s.status === 'waiting').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">Live Chat Monitor</h2>
          <p className="text-zinc-400 font-semibold text-sm mt-2">Track and respond to customer inquiries in real-time</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl px-6 py-3">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Active</p>
            <p className="text-2xl font-black text-white">{activeCount}</p>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl px-6 py-3">
            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">Waiting</p>
            <p className="text-2xl font-black text-white">{waitingCount}</p>
          </div>
        </div>
      </div>

      {/* Chat Sessions Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Recent Sessions</h3>
          
          {sessions.length === 0 ? (
            <div className="bg-zinc-900/50 rounded-2xl p-8 text-center border border-white/5">
              <MessageSquare className="size-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 font-semibold text-sm">No chat sessions yet</p>
              <p className="text-zinc-600 text-xs mt-2">Users will appear here when they start chatting</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.sort((a, b) => b.timestamp - a.timestamp).map((session) => (
                <motion.button
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedSession(session.id)}
                  className={`w-full bg-zinc-900/50 rounded-2xl p-5 border transition-all text-left ${
                    selectedSession === session.id 
                      ? 'border-[#fabf37] shadow-lg shadow-[#fabf37]/10' 
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#fabf37]/20 flex items-center justify-center">
                        <User className="size-5 text-[#fabf37]" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Session #{session.id.slice(0, 8)}</p>
                        <p className="text-zinc-500 text-xs font-semibold">
                          {new Date(session.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      session.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                      session.status === 'waiting' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-zinc-500/20 text-zinc-400'
                    }`}>
                      {session.status}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs line-clamp-2 font-medium">
                    {session.messages[session.messages.length - 1]?.text || 'No messages'}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-zinc-500">
                    <MessageSquare className="size-3" />
                    <span className="text-[10px] font-bold">{session.messages.length} messages</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Chat Details */}
        <div className="lg:col-span-2">
          {selectedSession ? (
            <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-black p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-[#fabf37] flex items-center justify-center">
                    <User className="size-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase text-sm">
                      Session #{sessions.find(s => s.id === selectedSession)?.id.slice(0, 8)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="size-3 text-zinc-400" />
                      <span className="text-zinc-400 text-xs font-semibold">
                        {new Date(sessions.find(s => s.id === selectedSession)?.timestamp || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => markAsResolved(selectedSession)}
                  className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors"
                >
                  Mark Resolved
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950/50">
                {sessions.find(s => s.id === selectedSession)?.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`size-8 rounded-full shrink-0 flex items-center justify-center ${
                      msg.role === 'ai' ? 'bg-[#fabf37] text-black' : 'bg-white text-black'
                    }`}>
                      {msg.role === 'ai' ? <Sparkles className="size-4" /> : <User className="size-4" />}
                    </div>
                    <div className={`max-w-[70%] p-4 rounded-2xl ${
                      msg.role === 'ai'
                        ? 'bg-zinc-800 text-white rounded-tl-none'
                        : 'bg-white text-black rounded-tr-none'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                      <p className="text-[10px] font-semibold mt-2 opacity-50">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Admin Reply */}
              <div className="p-4 bg-black border-t border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="size-4 text-[#fabf37]" />
                  <p className="text-xs font-black uppercase tracking-widest text-[#fabf37]">Admin Reply Mode</p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleReply(selectedSession)}
                    placeholder="Type your response to the customer..."
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-zinc-600 focus:border-[#fabf37] focus:outline-none"
                  />
                  <button
                    onClick={() => handleReply(selectedSession)}
                    disabled={!replyText.trim()}
                    className="px-6 py-3 bg-[#fabf37] text-black rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="size-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/50 rounded-2xl border border-white/5 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="size-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 font-semibold">Select a chat session to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

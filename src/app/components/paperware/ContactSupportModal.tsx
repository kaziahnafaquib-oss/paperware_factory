import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MessageCircle, Video, Upload, AlertTriangle, Info, Headphones, Clock, Paperclip, FileText, Send } from "lucide-react";
import { toast } from "sonner";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFaq?: () => void;
}

export function ContactSupportModal({ isOpen, onClose, onViewFaq }: ContactSupportModalProps) {
  const [supportSubject, setSupportSubject] = useState("");
  const [supportCategory, setSupportCategory] = useState("General Inquiry");
  const [supportPriority, setSupportPriority] = useState("Medium");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportAttachment, setSupportAttachment] = useState<File | null>(null);
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);

  // User Details
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCompany, setUserCompany] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [hasWhatsApp, setHasWhatsApp] = useState(false);

  const handleContactSupport = () => {
    if (!supportSubject || !supportMessage) {
      toast.error("Please fill in subject and message");
      return;
    }

    if (!userName || !userEmail) {
      toast.error("Please fill in your name and email");
      return;
    }
    
    const ticketNumber = `PW-${Date.now().toString().slice(-8)}`;
    
    // Create ticket object for Admin Portal
    const newTicket = {
      id: Date.now().toString(),
      ticketNumber,
      subject: supportSubject,
      category: supportCategory,
      priority: supportPriority,
      message: supportMessage,
      phone: userPhone || undefined,
      hasWhatsApp: userPhone && hasWhatsApp ? hasWhatsApp : undefined,
      attachment: supportAttachment ? {
        name: supportAttachment.name,
        size: supportAttachment.size,
      } : undefined,
      status: "Open" as const,
      assignedTo: undefined,
      submittedBy: {
        name: userName,
        email: userEmail,
        company: userCompany,
      },
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      responses: [],
      tags: [supportCategory],
    };

    // Save to localStorage for Admin Portal
    try {
      const existingTickets = localStorage.getItem("supportTickets");
      const tickets = existingTickets ? JSON.parse(existingTickets) : [];
      tickets.unshift(newTicket); // Add new ticket at the beginning
      localStorage.setItem("supportTickets", JSON.stringify(tickets));
      console.log("Ticket saved to Admin Portal:", ticketNumber);
    } catch (error) {
      console.error("Failed to save ticket:", error);
    }
    
    toast.success(`Support ticket #${ticketNumber} created! Our team will respond within 24 hours.`);
    onClose();
    setSupportMessage("");
    setSupportSubject("");
    setSupportCategory("General Inquiry");
    setSupportPriority("Medium");
    setSupportAttachment(null);
    setUserName("");
    setUserEmail("");
    setUserCompany("");
    setUserPhone("");
    setHasWhatsApp(false);
  };

  const handleQuickTemplate = (template: string) => {
    setSupportMessage(template);
    setShowQuickTemplates(false);
  };

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent("Hello! I need support with my Paperware account.");
    window.open(`https://wa.me/8801234567890?text=${message}`, '_blank');
    toast.success("Opening WhatsApp...");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10001]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10002] p-4 md:p-5 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-[900] text-black uppercase">Contact Support</h3>
                <p className="text-[10px] text-zinc-500 mt-0.5 font-[800]">24/7 Professional Support</p>
              </div>
              <button
                onClick={onClose}
                className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-all flex items-center justify-center"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Support Agent Status */}
            <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
              <div className="size-8 rounded-full bg-green-500 flex items-center justify-center">
                <Headphones className="size-4 text-white stroke-[3]" />
              </div>
              <div>
                <p className="text-[9px] font-[900] text-green-800 uppercase tracking-wider">Support Available</p>
                <p className="text-[8px] font-[800] text-green-600 mt-0.5">Our team is online • Avg. response: 2 hours</p>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button className="p-2 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all group">
                <Mail className="size-4 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-[8px] font-[800] text-blue-700 uppercase tracking-wider text-center">Email</p>
              </button>
              <button className="p-2 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all group">
                <Phone className="size-4 text-green-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-[8px] font-[800] text-green-700 uppercase tracking-wider text-center">Call Us</p>
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Quick Templates Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[9px] font-[900] text-zinc-600 uppercase tracking-wider">Quick Templates</label>
                  <button
                    onClick={() => setShowQuickTemplates(!showQuickTemplates)}
                    className="text-[8px] font-[800] text-blue-600 hover:underline uppercase tracking-wider"
                  >
                    {showQuickTemplates ? 'Hide' : 'Show'} Templates
                  </button>
                </div>
                {showQuickTemplates && (
                  <div className="grid grid-cols-1 gap-1 p-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
                    <button
                      onClick={() => handleQuickTemplate("I'm having trouble with my account login. Can you help me reset my password?")}
                      className="px-1.5 py-1 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[8px] font-[800] text-zinc-700"
                    >
                      🔐 Account Login Issue
                    </button>
                    <button
                      onClick={() => handleQuickTemplate("I need to update my billing information. Can you guide me through the process?")}
                      className="px-1.5 py-1 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[8px] font-[800] text-zinc-700"
                    >
                      💳 Billing Information Update
                    </button>
                    <button
                      onClick={() => handleQuickTemplate("I'm experiencing issues with the order tracking system. Can you assist me?")}
                      className="px-1.5 py-1 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[8px] font-[800] text-zinc-700"
                    >
                      📦 Order Tracking Issue
                    </button>
                    <button
                      onClick={() => handleQuickTemplate("I have a question about product specifications and customization options.")}
                      className="px-1.5 py-1 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[8px] font-[800] text-zinc-700"
                    >
                      🎨 Product Customization
                    </button>
                    <button
                      onClick={() => handleQuickTemplate("I'd like to request a quote for bulk orders. Can you help me with pricing?")}
                      className="px-1.5 py-1 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[8px] font-[800] text-zinc-700"
                    >
                      💰 Bulk Order Quote
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[9px] font-[900] text-zinc-600 uppercase tracking-wider mb-1 block">Subject *</label>
                <input
                  type="text"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[10px] font-[700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="text-[9px] font-[900] text-zinc-600 uppercase tracking-wider mb-1 block">Category *</label>
                  <select
                    value={supportCategory}
                    onChange={(e) => setSupportCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[10px] font-[700]"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Issues</option>
                    <option>Account Management</option>
                    <option>Order Support</option>
                    <option>Product Questions</option>
                    <option>Delivery Issues</option>
                    <option>Refund Request</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Sales Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-[800] text-zinc-600 uppercase tracking-wider mb-1 block flex items-center gap-1">
                    Priority *
                    {supportPriority === 'High' && (
                      <AlertTriangle className="size-2.5 text-red-600" />
                    )}
                  </label>
                  <select
                    value={supportPriority}
                    onChange={(e) => setSupportPriority(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[10px] font-[700]"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              {/* User Details Section */}
              <div className="p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 border-2 border-blue-200 rounded-2xl space-y-3 shadow-sm">
                <p className="text-[11px] font-[900] text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="size-4 text-blue-700" />
                  Your Contact Information
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-[900] text-zinc-700 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 bg-white border-2 border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] font-[700]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-[900] text-zinc-700 uppercase tracking-wider mb-1.5 block">Company</label>
                    <input
                      type="text"
                      value={userCompany}
                      onChange={(e) => setUserCompany(e.target.value)}
                      placeholder="Company Inc."
                      className="w-full px-3 py-2.5 bg-white border-2 border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] font-[700]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-[900] text-zinc-700 uppercase tracking-wider mb-1.5 block">Email Address *</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-3 py-2.5 bg-white border-2 border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] font-[700]"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-[900] text-zinc-700 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+880 1234-567890"
                    className="w-full px-3 py-2.5 bg-white border-2 border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] font-[700]"
                  />
                  
                  {/* WhatsApp Checkbox */}
                  {userPhone && (
                    <label className="flex items-center gap-2.5 mt-2 p-2.5 bg-green-50 border-2 border-green-200 rounded-xl cursor-pointer hover:bg-green-100 transition-all group">
                      <input
                        type="checkbox"
                        checked={hasWhatsApp}
                        onChange={(e) => setHasWhatsApp(e.target.checked)}
                        className="size-4 rounded border-2 border-green-400 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <MessageCircle className={`size-4 transition-all ${hasWhatsApp ? 'text-green-600 scale-110' : 'text-green-500'}`} />
                        <div>
                          <p className={`text-[9px] font-[900] uppercase tracking-wider transition-all ${hasWhatsApp ? 'text-green-700' : 'text-green-600'}`}>
                            This number has WhatsApp
                          </p>
                          <p className="text-[8px] font-[700] text-green-600 mt-0.5">
                            We'll contact you via WhatsApp for faster support
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[9px] font-[900] text-zinc-600 uppercase tracking-wider mb-1 block flex items-center justify-between">
                  <span>Your Message *</span>
                  <span className="text-[8px] font-[800] text-zinc-400">
                    {supportMessage.length}/1000
                  </span>
                </label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  maxLength={1000}
                  placeholder="Describe your issue or question in detail..."
                  rows={3}
                  className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[10px] font-[700] resize-none"
                />
              </div>

              <div>
                <label className="text-[9px] font-[900] text-zinc-600 uppercase tracking-wider mb-1 block flex items-center gap-1.5">
                  <Paperclip className="size-2.5" />
                  Attachment (Optional)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="file"
                    onChange={(e) => setSupportAttachment(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                    id="supportAttachment"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />
                  <label
                    htmlFor="supportAttachment"
                    className="px-2.5 py-1.5 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-all text-[9px] font-[800] uppercase tracking-wider flex items-center gap-1"
                  >
                    <Upload className="size-3" />
                    Choose File
                  </label>
                  {supportAttachment && (
                    <div className="flex items-center gap-1.5 p-1 bg-zinc-50 rounded-lg border border-zinc-200">
                      <FileText className="size-3 text-zinc-500" />
                      <div>
                        <p className="text-[8px] font-[800] text-zinc-700">{supportAttachment.name}</p>
                        <p className="text-[7px] font-[700] text-zinc-500">{(supportAttachment.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button
                        onClick={() => setSupportAttachment(null)}
                        className="ml-0.5 size-3.5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all"
                      >
                        <X className="size-2 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[7px] font-[700] text-zinc-400 mt-0.5">
                  Accepted formats: PDF, DOC, DOCX, PNG, JPG (Max: 10MB)
                </p>
              </div>

              {/* Response Time Estimate */}
              <div className="p-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-1 mb-0.5">
                  <Clock className="size-3 text-blue-600" />
                  <p className="text-[9px] font-[800] text-blue-800 uppercase tracking-wider">Estimated Response Time</p>
                </div>
                <p className="text-[8px] font-[700] text-blue-600">
                  {supportPriority === 'Urgent' ? '1-2 hours' : supportPriority === 'High' ? '4-6 hours' : supportPriority === 'Medium' ? '12-24 hours' : '24-48 hours'}
                </p>
              </div>

              {/* Previous Tickets Info */}
              <div className="p-1.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <Info className="size-3 text-zinc-600" />
                  <p className="text-[9px] font-[800] text-zinc-700 uppercase tracking-wider">Need Help?</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-[700] text-zinc-600">Email Support</p>
                    <p className="text-[8px] font-[800] text-zinc-800">support@paperware.com</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-[700] text-zinc-600">Phone Support</p>
                    <p className="text-[8px] font-[800] text-zinc-800">+880 1234-567890</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-[700] text-zinc-600">Available</p>
                    <p className="text-[8px] font-[800] text-green-600">24/7</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContactSupport}
                className="w-full px-3 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-all text-[10px] font-[800] uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Send className="size-3" />
                Submit Ticket
              </button>

              {/* FAQ Suggestion */}
              <div className="text-center">
                <p className="text-[8px] font-[700] text-zinc-500 mb-0.5">
                  Before submitting, check our FAQ for quick answers
                </p>
                <button
                  onClick={onViewFaq}
                  className="text-[9px] font-[800] text-blue-600 hover:underline uppercase tracking-wider"
                >
                  View FAQ
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
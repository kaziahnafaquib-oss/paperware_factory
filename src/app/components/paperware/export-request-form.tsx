import React, { useState, useEffect } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import { openWhatsAppInquiry, collectFormFields, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from "../../lib/inquiry";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe, Ship, Plane, Box, ArrowRight, ShieldCheck, CircleCheck, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Twitter, Plus, Trash2, Upload } from "lucide-react";

interface ExportRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportRequestForm({ isOpen, onClose }: ExportRequestFormProps) {
  useEscapeKey(isOpen, onClose);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, isOpen);
  const [contactNumbers, setContactNumbers] = useState([{ number: '', apps: [] as string[] }]);
  const [emails, setEmails] = useState(['']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const addContactNumber = () => {
    if (contactNumbers.length < 3) {
      setContactNumbers([...contactNumbers, { number: '', apps: [] }]);
    }
  };

  const removeContactNumber = (index: number) => {
    const newNumbers = contactNumbers.filter((_, i) => i !== index);
    setContactNumbers(newNumbers);
  };

  const updateContactNumber = (index: number, value: string) => {
    const newNumbers = [...contactNumbers];
    newNumbers[index].number = value;
    setContactNumbers(newNumbers);
  };

  const toggleAppForContact = (index: number, app: string) => {
    const newNumbers = [...contactNumbers];
    const currentApps = newNumbers[index].apps;
    if (currentApps.includes(app)) {
      newNumbers[index].apps = currentApps.filter(a => a !== app);
    } else {
      newNumbers[index].apps = [...currentApps, app];
    }
    setContactNumbers(newNumbers);
  };

  const addEmail = () => {
    if (emails.length < 3) {
      setEmails([...emails, '']);
    }
  };

  const removeEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  // Phase A0: no backend yet; hand the request to WhatsApp instead of faking "received".
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = collectFormFields(e.currentTarget);
    if (attachment) fields["Attachment"] = `${attachment.name} (I will send this file in the chat)`;
    openWhatsAppInquiry("Export inquiry", fields);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        ref={dialogRef}
          role="dialog"
        aria-modal="true"
        aria-label="Export inquiry"
        className="fixed inset-0 z-[9999] flex justify-center items-start md:items-center bg-black/80 backdrop-blur-xl overflow-y-auto py-4 md:py-8"
        style={{ paddingTop: "max(env(safe-area-inset-top), 1rem)" }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#fdfaf3] w-full max-w-5xl rounded-[24px] md:rounded-[40px] shadow-2xl relative flex flex-col md:flex-row m-2 md:m-6 max-h-[85vh] md:max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-black text-white rounded-full hover:rotate-90 transition-transform"
          >
            <X className="size-4 md:size-5" />
          </button>

          {isSubmitted ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-4 md:space-y-6">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="size-24 bg-[#fabf37] rounded-full flex items-center justify-center"
              >
                <CircleCheck className="size-12 text-black" />
              </motion.div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">{INQUIRY_HANDOFF_TITLE}</h2>
              <p role="status" aria-live="polite" className="text-zinc-600 font-bold max-w-md text-sm">
                {INQUIRY_HANDOFF_BODY}
              </p>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Left Side: Info */}
              <div className="md:w-1/3 bg-black p-8 text-white flex flex-col justify-between">
                <div className="space-y-6">
                  <motion.div 
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#fabf37] rounded-full text-black"
                  >
                    <Globe className="size-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Global Export</span>
                  </motion.div>
                  <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
                    Initialize <br /> <span className="text-[#fabf37]">Cargo</span> Request
                  </h2>
                  <p className="text-zinc-400 text-[10px] font-bold leading-relaxed">
                    Connect with our logistics AI to optimize your international shipping route and compliance protocols.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CircleCheck className="text-[#fabf37] size-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">24h Quote Response</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheck className="text-[#fabf37] size-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Direct Port Access</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="space-y-3">
                    <a 
                      href="tel:+09638011101"
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:border-[#fabf37] transition-colors">
                        <Phone className="text-[#fabf37] size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">Executive Support</p>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-white group-hover:text-[#fabf37] transition-colors leading-none text-[10px]">+09638-011101</p>
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="text-[8px] font-black text-[#fabf37] bg-[#fabf37]/20 px-1.5 py-0.5 rounded-full"
                          >
                            24/7
                          </motion.span>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/8801901459110"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <MessageCircle className="text-black size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">WhatsApp</p>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-white group-hover:text-[#fabf37] transition-colors leading-none text-[10px]">+880 1901-459110</p>
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="text-[8px] font-black text-[#fabf37] bg-[#fabf37]/20 px-1.5 py-0.5 rounded-full"
                          >
                            24/7
                          </motion.span>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="mailto:paperwarefactory@gmail.com"
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Mail className="text-black size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">Formal Channel</p>
                        <p className="text-[8px] font-black text-white group-hover:text-[#fabf37] transition-colors break-all">paperwarefactory@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar relative">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Row 1: Company & Email */}
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Company Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Global Corp Inc."
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                    
                    {/* Emails Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</label>
                        {emails.length < 3 && (
                          <button type="button" onClick={addEmail} className="text-[8px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                            <Plus className="size-3" /> Add
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {emails.map((email, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input 
                              type="email" 
                              required={idx === 0}
                              value={email}
                              onChange={(e) => updateEmail(idx, e.target.value)}
                              placeholder={idx === 0 ? "Primary Email Address" : "Secondary Email Address"}
                              className="flex-1 bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black placeholder:text-zinc-300"
                            />
                            {idx > 0 && (
                              <button 
                                type="button" 
                                onClick={() => removeEmail(idx)} 
                                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Contact & Apps (Combined per number) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact Number(s)</label>
                      {contactNumbers.length < 3 && (
                        <button type="button" onClick={addContactNumber} className="text-[8px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                          <Plus className="size-3" /> Add
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {contactNumbers.map((contact, idx) => (
                        <div key={idx} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 relative group">
                          {idx > 0 && (
                            <button 
                              type="button" 
                              onClick={() => removeContactNumber(idx)}
                              className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                          <div className="space-y-3">
                            <input 
                              type="tel" 
                              value={contact.number}
                              required={idx === 0}
                              onChange={(e) => updateContactNumber(idx, e.target.value)}
                              placeholder={idx === 0 ? "Primary Contact Number" : "Alternative Number"}
                              className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black placeholder:text-zinc-300 pr-8"
                            />
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider mr-2">Available on:</span>
                              {['WhatsApp', 'Viber', 'IMO', 'Direct Call'].map((app) => (
                                <button
                                  key={app}
                                  type="button"
                                  onClick={() => toggleAppForContact(idx, app)}
                                  className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all ${
                                    contact.apps.includes(app) 
                                      ? 'bg-black text-white border-black' 
                                      : 'bg-white text-zinc-400 border-zinc-200 hover:border-black hover:text-black'
                                  }`}
                                >
                                  {app}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Socials - 2x2 Grid for multiple inputs */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Social Verification (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: Facebook, placeholder: "Facebook Profile URL", color: "hover:text-[#1877F2]" },
                        { icon: Instagram, placeholder: "Instagram Handle/URL", color: "hover:text-[#E4405F]" },
                        { icon: Linkedin, placeholder: "LinkedIn Company URL", color: "hover:text-[#0A66C2]" },
                        { icon: Twitter, placeholder: "X (Twitter) Handle", color: "hover:text-black" }
                      ].map((social, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-zinc-50 px-3 py-2.5 rounded-xl border border-zinc-100 focus-within:border-[#fabf37]/50 transition-colors">
                          <social.icon className={`size-3.5 text-zinc-400 ${social.color} transition-colors`} />
                          <div className="h-3 w-[1px] bg-zinc-200" />
                          <input 
                            type="text" 
                            placeholder={social.placeholder}
                            className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-black placeholder:text-zinc-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Destination Country</label>
                      <select className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors appearance-none text-black">
                        <option>United Kingdom</option>
                        <option>United Arab Emirates</option>
                        <option>Germany</option>
                        <option>United States</option>
                        <option>Australia</option>
                        <option>Saudi Arabia</option>
                        <option>Netherlands</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Destination City / Port</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. London Gateway / Jebel Ali"
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                  </div>

                  {/* Row 5: Area & Product */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Delivery Area / Zip Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. E1 6AN / Industrial Zone 2"
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Product Type</label>
                      <select className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors appearance-none text-black" defaultValue="" required>
                        <option value="" disabled>Select Product Type</option>
                        
                        <optgroup label="Paper Cups & Accessories">
                          <option>Paper Cup (All Sizes)</option>
                          <option>Paper Cup Holder</option>
                          <option>Paper Cup Jacket/Sleeve</option>
                          <option>Paper Cup Carrier</option>
                          <option>Ice Cream Cup & Bowl</option>
                        </optgroup>

                        <optgroup label="Restaurant & Food Service">
                          <option>Burger Box</option>
                          <option>Pizza Box</option>
                          <option>Food Box / Meal Box</option>
                          <option>Chowmein / Noodle Box</option>
                          <option>Meat Box</option>
                          <option>Sandwich Box</option>
                          <option>Fried Chicken/Fries Box</option>
                          <option>Cake & Sweet Box</option>
                          <option>Shawarma & Waffle Box</option>
                          <option>Ice Cream Cone & Wrapper</option>
                          <option>Sugar Sachet & Table Mat</option>
                          <option>Food Menu</option>
                          <option>Paper Straws & Cutlery</option>
                        </optgroup>

                        <optgroup label="Office Stationery">
                          <option>Business Card</option>
                          <option>Envelope (All Sizes)</option>
                          <option>Letterhead & Invoice Pad</option>
                          <option>Money Receipt & Delivery Book</option>
                          <option>Note Book & Diary</option>
                          <option>File Folder</option>
                        </optgroup>

                        <optgroup label="Marketing & Retail Packaging">
                          <option>Paper Carry Bag</option>
                          <option>Brochure / Catalog / Magazine</option>
                          <option>Flyer & Leaflet</option>
                          <option>Sticker & Label</option>
                          <option>Calendar</option>
                          <option>Tissue Box</option>
                          <option>Luxury Gift Box</option>
                        </optgroup>

                        <optgroup label="Pharmaceutical & Hospital">
                          <option>Medicine Box</option>
                          <option>Medicine Literature</option>
                          <option>Patient & X-Ray File</option>
                          <option>Prescription Pad</option>
                          <option>Report Envelope</option>
                        </optgroup>

                        <optgroup label="FMCG & Garments">
                          <option>Food & Beverage Packaging</option>
                          <option>Personal & Home Care Packaging</option>
                          <option>Confectionary Packaging</option>
                          <option>Garment Hangtag</option>
                          <option>Clothing Label</option>
                          <option>Apparel Box</option>
                        </optgroup>

                        <option value="custom">Other / Custom Request</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Quantity */}
                  <div className="space-y-1.5">
                     <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Est. Quantity (Units)</label>
                     <input 
                       type="number" 
                       placeholder="50,000"
                       className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                     />
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Required Certifications</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'fsc', label: 'FSC Certified' },
                        { id: 'fda', label: 'FDA Approved' },
                        { id: 'iso', label: 'ISO 9001/14001' },
                        { id: 'brc', label: 'BRCGS Food' },
                      ].map((cert) => (
                        <label key={cert.id} className="flex items-center gap-2 p-3 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white group">
                          <input type="checkbox" className="sr-only" />
                          <div className="size-3.5 border border-zinc-300 rounded flex items-center justify-center group-has-[:checked]:bg-[#fabf37] group-has-[:checked]:border-[#fabf37]">
                            <CircleCheck className="size-2.5 text-black opacity-0 group-has-[:checked]:opacity-100" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-tight text-black group-has-[:checked]:text-white">{cert.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Special Requirements / Compliance</label>
                    <textarea 
                      placeholder="Mention FDA/ISO specifics or branding needs..."
                      rows={2}
                      className="w-full bg-zinc-100/50 rounded-2xl p-4 font-bold text-[10px] outline-none focus:ring-1 ring-[#fabf37] transition-all text-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Product Sample / Design File</label>
                    <div className="relative group">
                      <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${attachment ? 'border-[#fabf37] bg-[#fabf37]/5' : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachment(e.target.files[0]);
                            }
                          }}
                          aria-label="Attach a reference image"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {attachment ? (
                          <div className="flex flex-col items-center">
                            <div className="size-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-2 overflow-hidden">
                              <img loading="lazy" decoding="async" src={URL.createObjectURL(attachment)} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[10px] font-black text-black">{attachment.name}</p>
                            <p className="text-[8px] font-bold text-zinc-400">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setAttachment(null);
                              }}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors z-10"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="size-8 bg-zinc-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <Upload className="size-4 text-zinc-400" />
                            </div>
                            <p className="text-[10px] font-bold text-zinc-500">Click to upload or drag and drop</p>
                            <p className="text-[8px] font-bold text-zinc-400 mt-1">SVG, PNG, JPG (Max 10MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    Send Export Intent <ArrowRight className="size-4 text-[#fabf37]" />
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
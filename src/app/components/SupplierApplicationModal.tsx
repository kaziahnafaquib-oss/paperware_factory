import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Building2, MapPin, Globe, Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface SupplierApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TABS = ["Details", "Address & Contact"];

export function SupplierApplicationModal({ isOpen, onClose }: SupplierApplicationModalProps) {
    const [activeTab, setActiveTab] = useState("Details");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Application submitted successfully!");
        setIsSubmitting(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-sans">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-100"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-white">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">New Supplier Application</h2>
                                <p className="text-sm text-zinc-500 font-medium">Join our global sustainable manufacturing network</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                                >
                                    <X className="size-6" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-8 px-8 border-b border-zinc-100 bg-white">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab
                                        ? "text-black border-[#fabf37]"
                                        : "text-zinc-400 border-transparent hover:text-zinc-600"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
                            <form id="supplier-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto">

                                {activeTab === "Details" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-8"
                                    >
                                        {/* Section 1: Core Info */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Supplier Name *</label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <input
                                                            required
                                                            placeholder="e.g. Acme Industries Ltd."
                                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Business Type</label>
                                                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer font-medium">
                                                        <option>Company</option>
                                                        <option>Individual / Sole Proprietor</option>
                                                        <option>Partnership</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Country *</label>
                                                    <div className="relative">
                                                        <Globe className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer font-medium">
                                                            <option>Bangladesh</option>
                                                            <option>India</option>
                                                            <option>China</option>
                                                            <option>Vietnam</option>
                                                            <option>USA</option>
                                                            <option>United Kingdom</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Industry Category</label>
                                                    <input
                                                        placeholder="e.g. Raw Materials, Logistics"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-6 pt-2">
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="checkbox" className="w-5 h-5 rounded-md border-zinc-300 bg-white checked:bg-black checked:border-black focus:ring-0 transition-all" />
                                                    <span className="text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">Is Transporter</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Section 2: Details */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Company Description</label>
                                                <textarea
                                                    placeholder="Tell us about your company, products, and specialties..."
                                                    className="w-full min-h-[100px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none placeholder:text-zinc-400 font-medium"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Website</label>
                                                    <input
                                                        placeholder="https://"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Established Year</label>
                                                    <input
                                                        placeholder="YYYY"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "Address & Contact" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-8"
                                    >
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="col-span-1 md:col-span-2 space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Address Line 1 *</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <input
                                                            required
                                                            placeholder="Street address, P.O. box"
                                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">City *</label>
                                                    <input
                                                        required
                                                        placeholder="City"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">State / Province</label>
                                                    <input
                                                        placeholder="State"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Postal Code</label>
                                                    <input
                                                        placeholder="ZIP / Postal Code"
                                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
                                            <h3 className="text-sm font-black uppercase tracking-wide text-zinc-900">Primary Contact Person</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Full Name *</label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <input
                                                            required
                                                            placeholder="Contact person name"
                                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Phone Number *</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <input
                                                            required
                                                            placeholder="+880..."
                                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-1 md:col-span-2 space-y-2">
                                                    <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Email Address *</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 size-4 text-zinc-400" />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="email@company.com"
                                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-zinc-100 bg-white flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-50 hover:text-black transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-[#fabf37] text-black text-sm font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-[#fabf37]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <Save className="size-4" /> Submit Application
                                    </>
                                )}
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Leaf, Award, Scale, FileText, Info } from "lucide-react";

interface PartnerGuidelinesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GUIDELINES = [
    {
        icon: Leaf,
        title: "Sustainability First",
        desc: "All partners must adhere to our zero-waste initiative. Materials must be ethically sourced and where possible, recycled or biodegradable.",
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        icon: Award,
        title: "Quality Standards",
        desc: "Strict adherence to ISO 9001 or equivalent quality management systems is required for all manufacturing and raw material partners.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: Scale,
        title: "Ethical Compliance",
        desc: "Fair labor practices are non-negotiable. We maintain a zero-tolerance policy towards child labor and unfair working conditions.",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        icon: ShieldCheck,
        title: "Security & Data",
        desc: "Partners must ensure robust data protection and intellectual property security, especially for custom design and tech collaborations.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    }
];

export function PartnerGuidelinesModal({ isOpen, onClose }: PartnerGuidelinesModalProps) {
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
                        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-100"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-8 border-b border-zinc-100 bg-white">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black shadow-lg shadow-[#fabf37]/20">
                                    <FileText className="size-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none mb-1">Partner Guidelines</h2>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Global Vendor Standards & Compliance</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-zinc-50/30">
                            <div className="max-w-2xl mx-auto space-y-10">
                                {/* Intro */}
                                <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                                    <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                                        <Info className="size-5 text-zinc-900" />
                                    </div>
                                    <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                                        At Paperware Factory, we believe our success is built on the strength of our partnerships. These guidelines ensure that we maintain the highest standards of quality, ethics, and sustainability across our global supply chain.
                                    </p>
                                </div>

                                {/* Main Guidelines Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {GUIDELINES.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className={`size-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4`}>
                                                <item.icon className="size-5" />
                                            </div>
                                            <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight mb-2">{item.title}</h3>
                                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="p-8 bg-zinc-900 rounded-[2rem] text-white">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#fabf37] mb-4">Verification Process</h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Submission of legal documentation & certifications.",
                                            "Environmental impact assessment & audit.",
                                            "On-site or virtual facility verification.",
                                            "Final vendor agreement signature."
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-xs font-medium text-zinc-400">
                                                <div className="size-1.5 rounded-full bg-[#fabf37]" />
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-zinc-100 bg-white flex justify-center">
                            <button
                                onClick={onClose}
                                className="px-12 py-4 bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#fabf37] hover:text-black transition-all shadow-xl"
                            >
                                I Understand
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

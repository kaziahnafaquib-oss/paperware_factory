import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Upload, Printer, HelpCircle, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SimulatedDB } from "../../../lib/simulated-db";

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'order' | 'reorder' | 'quote' | 'support' | 'sample' | null;
}

export function ActionModal({ isOpen, onClose, type }: ActionModalProps) {
    const [step, setStep] = useState(1);
    // Form states
    const [orderData, setOrderData] = useState({ product: 'Custom Kraft Boxes', qty: '', date: '', specs: '' });
    const [reorderData, setReorderData] = useState({ qty: '25000', date: '' });
    const [quoteData, setQuoteData] = useState({ product: 'Custom Kraft Boxes', qty: '', date: '', specs: '' });
    const [supportData, setSupportData] = useState({ priority: 'Medium', subject: '', message: '' });

    if (!isOpen || !type) return null;

    const getTitle = () => {
        switch (type) {
            case 'order': return 'New Custom Order';
            case 'reorder': return 'Repeat Previous Order';
            case 'quote': return 'Request Production Quote';
            case 'support': return 'Priority Support Ticket';
            default: return '';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'order': return <div className="size-3 rounded-full bg-black" />;
            case 'reorder': return <div className="size-3 rounded-full bg-[#fabf37]" />;
            case 'quote': return <div className="size-3 rounded-full bg-zinc-200" />;
            case 'support': return <div className="size-3 rounded-full bg-red-500" />;
            case 'sample': return <div className="size-3 rounded-full bg-purple-500" />;
        }
    }

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
    };

    const formItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newOrder = SimulatedDB.createOrder({
            product: orderData.product,
            qty: orderData.qty || '1000',
            date: orderData.date || new Date().toISOString().split('T')[0],
            specs: orderData.specs,
            type: 'New Order'
        });
        toast.success("Order Sent to Admin Portal", { description: `Order #${newOrder.id} has been created and synced.` });
        onClose();
    };

    const handleReorderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newOrder = SimulatedDB.createOrder({
            product: 'Custom Kraft Boxes (Re-Order)',
            qty: reorderData.qty,
            date: reorderData.date || new Date().toISOString().split('T')[0],
            type: 'Re-Order'
        });
        toast.success("Re-Order Request Sent", { description: `Order #${newOrder.id} - Production queued.` });
        onClose();
    };

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Quotes can also simply be orders with a "Quote" type or status for this demo
        const newOrder = SimulatedDB.createOrder({
            product: quoteData.product,
            qty: quoteData.qty,
            date: quoteData.date,
            specs: quoteData.specs,
            type: 'Quote'
        });
        toast.success("Quote Request Sent", { description: "Sales team notified via Admin Portal." });
        onClose();
    };

    const handleSupportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket = SimulatedDB.createOrder({
            product: `Support: ${supportData.subject}`,
            qty: '1',
            date: new Date().toISOString().split('T')[0],
            specs: supportData.message,
            type: 'Support'
        });
        toast.success("Support Ticket Created", { description: `Ticket #${newTicket.id} logged in Admin System.` });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[150] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-8 md:p-12 space-y-8">
                            <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-4 border-b border-transparent">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {getIcon()}
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Action Required</p>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{getTitle()}</h2>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                >
                                    <X className="size-6" />
                                </motion.button>
                            </div>

                            {type === 'order' && (
                                <motion.form
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.1 } }
                                    }}
                                    className="space-y-6"
                                    onSubmit={handleOrderSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Product Type</label>
                                            <select
                                                value={orderData.product}
                                                onChange={(e) => setOrderData({ ...orderData, product: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Custom Kraft Boxes</option>
                                                <option>Premium Coffee Cups</option>
                                                <option>Shopping Bags</option>
                                                <option>Corrugated Cartons</option>
                                                <option>Food Wrappers</option>
                                            </select>
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Quantity</label>
                                            <input
                                                type="number"
                                                placeholder="5000"
                                                value={orderData.qty}
                                                onChange={(e) => setOrderData({ ...orderData, qty: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                            />
                                        </motion.div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Material</label>
                                            <select
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Recycled Kraft</option>
                                                <option>Virgin Pulp</option>
                                                <option>Bamboo Fiber</option>
                                            </select>
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Finish</label>
                                            <select
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Matte Lamination</option>
                                                <option>Glossy Lamination</option>
                                                <option>Uncoated</option>
                                                <option>Soft Touch</option>
                                            </select>
                                        </motion.div>
                                    </div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Required Delivery Date</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-400 group-focus-within:text-[#fabf37] transition-colors" />
                                            <input
                                                type="date"
                                                value={orderData.date}
                                                onChange={(e) => setOrderData({ ...orderData, date: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-14 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                            />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Specifications & Attributes</label>
                                        <textarea
                                            rows={4}
                                            value={orderData.specs}
                                            onChange={(e) => setOrderData({ ...orderData, specs: e.target.value })}
                                            placeholder="Describe dimensions, materials, finish (Matte/Gloss), and printing requirements..."
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>
                                    <motion.div variants={formItemVariants} className="flex items-center justify-between pt-4">
                                        <button type="button" className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors group">
                                            <Upload className="size-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Design Files</span>
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg"
                                        >
                                            Submit Order
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            )}

                            {type === 'reorder' && (
                                <motion.form
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                                    className="space-y-6"
                                    onSubmit={handleReorderSubmit}
                                >
                                    <motion.div variants={formItemVariants} className="p-6 bg-zinc-50 rounded-3xl border border-black/5 space-y-4 hover:shadow-md transition-all">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-black">Last Order: #PW-8821</p>
                                            <span className="text-[10px] font-bold text-zinc-400">Oct 24, 2024</span>
                                        </div>
                                        <p className="text-zinc-600 text-sm">Custom Kraft Boxes - Standard Finish</p>
                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Quantity</label>
                                            <input
                                                type="number"
                                                value={reorderData.qty}
                                                onChange={(e) => setReorderData({ ...reorderData, qty: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                            />
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Delivery Date</label>
                                            <input
                                                type="date"
                                                value={reorderData.date}
                                                onChange={(e) => setReorderData({ ...reorderData, date: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-4 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(250,191,55,0.3)] hover:shadow-xl transition-all"
                                    >
                                        Confirm Re-Order
                                    </motion.button>
                                </motion.form>
                            )}

                            {type === 'quote' && (
                                <motion.form
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                                    className="space-y-6"
                                    onSubmit={handleQuoteSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Product Interest</label>
                                            <select
                                                value={quoteData.product}
                                                onChange={(e) => setQuoteData({ ...quoteData, product: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Custom Kraft Boxes</option>
                                                <option>Premium Coffee Cups</option>
                                                <option>Shopping Bags</option>
                                                <option>Corrugated Cartons</option>
                                                <option>Other</option>
                                            </select>
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Target Quantity</label>
                                            <input
                                                type="number"
                                                placeholder="e.g. 10000"
                                                value={quoteData.qty}
                                                onChange={(e) => setQuoteData({ ...quoteData, qty: e.target.value })}
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                            />
                                        </motion.div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Material Preference</label>
                                            <select
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Recycled Kraft</option>
                                                <option>Virgin Pulp</option>
                                                <option>Bamboo Fiber</option>
                                                <option>Food Grade Cardboard</option>
                                            </select>
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Finish Type</label>
                                            <select
                                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                            >
                                                <option>Standard</option>
                                                <option>Matte</option>
                                                <option>Glossy</option>
                                                <option>Embossed</option>
                                            </select>
                                        </motion.div>
                                    </div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Project Specifications</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tell us about dimensions, material preference, print colors..."
                                            value={quoteData.specs}
                                            onChange={(e) => setQuoteData({ ...quoteData, specs: e.target.value })}
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Desired Delivery</label>
                                        <input
                                            type="date"
                                            value={quoteData.date}
                                            onChange={(e) => setQuoteData({ ...quoteData, date: e.target.value })}
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-5 bg-black text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg"
                                    >
                                        Request Custom Quote
                                    </motion.button>
                                </motion.form>
                            )}

                            {type === 'support' && (
                                <motion.form
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                                    className="space-y-6"
                                    onSubmit={handleSupportSubmit}
                                >
                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Priority Level</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setSupportData({ ...supportData, priority: p })}
                                                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${supportData.priority === p ? 'bg-black text-white border-black shadow-md' : 'bg-zinc-50 text-zinc-400 border-transparent hover:bg-zinc-100'}`}
                                                >
                                                    {p}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="Brief description of the issue"
                                            value={supportData.subject}
                                            onChange={(e) => setSupportData({ ...supportData, subject: e.target.value })}
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Describe your issue in detail..."
                                            value={supportData.message}
                                            onChange={(e) => setSupportData({ ...supportData, message: e.target.value })}
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-5 bg-red-500 text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[0_10px_20px_-5px_rgba(239,68,68,0.3)] hover:shadow-xl"
                                    >
                                        Submit Priority Ticket
                                    </motion.button>
                                </motion.form>
                            )}

                            {type === 'sample' && (
                                <motion.form
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                                    className="space-y-6"
                                    onSubmit={(e) => { e.preventDefault(); toast.success("Sample Request Submitted", { description: "We will ship your samples within 24 hours." }); onClose(); }}
                                >
                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Sample Product</label>
                                        <select className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100">
                                            <option>New Eco-Friendly Cups</option>
                                            <option>Textured Kraft Box Series</option>
                                            <option>Biodegradable Cutlery Set</option>
                                        </select>
                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Quantity</label>
                                            <select className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100">
                                                <option>1 Unit (Free)</option>
                                                <option>Set of 3 (Free)</option>
                                                <option>Box of 10 ($15)</option>
                                            </select>
                                        </motion.div>
                                        <motion.div variants={formItemVariants} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Shipping Priority</label>
                                            <select className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100">
                                                <option>Express (1-2 Days)</option>
                                                <option>Standard (3-5 Days)</option>
                                            </select>
                                        </motion.div>
                                    </div>

                                    <motion.div variants={formItemVariants} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Delivery Address</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Confirm your shipping address..."
                                            defaultValue="123 Corporate Blvd, Suite 400, Dhaka"
                                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100"
                                        />
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-5 bg-purple-600 text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-[0_10px_20px_-5px_rgba(147,51,234,0.3)] hover:shadow-xl"
                                    >
                                        Request Samples
                                    </motion.button>
                                </motion.form>
                            )}

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
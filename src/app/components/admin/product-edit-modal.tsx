import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Save, Tag, FileText, ImageIcon, Plus, Trash2, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { toast } from "sonner";

interface Product {
    id?: string;
    title: string;
    category: string;
    desc?: string;
    image?: string;
    status: string;
    images?: string[];
    moq?: string; // Minimum Order Quantity
    // attributes: key is attribute name (e.g., "GSM"), value is array of options (e.g., ["200", "300"])
    attributes?: Record<string, string[]>;
}

interface ProductEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null;
    onSave: (product: Product) => void;
    categories?: string[];
}

export function ProductEditModal({ isOpen, onClose, product, onSave, categories = [] }: ProductEditModalProps) {
    const [formData, setFormData] = useState<Product>({
        title: "",
        category: "",
        desc: "",
        image: "",
        status: "draft",
        images: [],
        attributes: {},
        moq: ""
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                status: product.status || "draft",
                images: product.images || (product.image ? [product.image] : []),
                attributes: product.attributes || {}
            });
        } else {
            setFormData({
                title: "",
                category: categories[0] || "",
                desc: "",
                image: "",
                status: "draft",
                images: [],
                attributes: {},
                moq: ""
            });
        }
    }, [product, isOpen, categories]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            const file = e.target.files[0];
            // Simulate upload
            setTimeout(() => {
                const fakeUrl = URL.createObjectURL(file);
                setFormData(prev => ({
                    ...prev,
                    image: prev.image || fakeUrl, // Set main image if empty
                    images: [...(prev.images || []), fakeUrl]
                }));
                setUploading(false);
                toast.success("Image uploaded successfully");
            }, 1000);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => {
            const newImages = [...(prev.images || [])];
            newImages.splice(index, 1);
            return {
                ...prev,
                images: newImages,
                image: newImages.length > 0 ? newImages[0] : "" // Update main image if needed
            };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category) {
            toast.error("Please fill in required fields");
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 text-white p-0 overflow-hidden gap-0 rounded-3xl max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b border-white/10 flex flex-row justify-between items-center bg-zinc-900/50 space-y-0 text-left shrink-0">
                    <div className="space-y-1">
                        <DialogTitle className="text-lg font-black uppercase tracking-tight">
                            {product ? "Edit Product" : "Add New Product"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-zinc-400 font-bold">
                            {product ? "Update product details and media" : "Create a new entry in the global catalog"}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-6 space-y-8">

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2 mb-4">
                                Basic Information
                            </h4>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Product Title <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 8oz Double Wall Cup"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Category <span className="text-red-500">*</span></label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] appearance-none"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                        <option value="Uncategorized">Uncategorized</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Description</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Product description and key features..."
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37] resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Status</label>
                                <div className="flex bg-black rounded-xl p-1 border border-white/10 w-fit">
                                    {['draft', 'active', 'archived'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, status }))}
                                            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${formData.status === status
                                                ? 'bg-zinc-800 text-white shadow-sm'
                                                : 'text-zinc-500 hover:text-zinc-300'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Minimum Order Quantity */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Minimum Order Quantity (MOQ)</label>
                                <input
                                    type="text"
                                    name="moq"
                                    value={formData.moq}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 1000 pieces, 500 units"
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                                />
                            </div>
                        </div>

                        {/* Media Gallery */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2 mb-4 flex justify-between items-center">
                                <span>Media Gallery</span>
                                <span className="text-[9px] text-zinc-600">{formData.images?.length || 0} Images</span>
                            </h4>

                            <div className="grid grid-cols-4 gap-4">
                                <label className="aspect-square border-2 border-dashed border-zinc-800 hover:border-[#fabf37] hover:bg-[#fabf37]/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                    <div className="size-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center group-hover:border-[#fabf37] group-hover:text-[#fabf37] transition-colors">
                                        {uploading ? (
                                            <div className="size-4 border-2 border-[#fabf37] border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Plus className="size-4" />
                                        )}
                                    </div>
                                    <span className="mt-2 text-[10px] font-bold text-zinc-500 group-hover:text-[#fabf37] uppercase tracking-wide">Upload</span>
                                </label>

                                {formData.images?.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10 bg-black">
                                        <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, image: img }))}
                                                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white"
                                                title="Set as Main Image"
                                            >
                                                <Check className="size-3" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                                            >
                                                <Trash2 className="size-3" />
                                            </button>
                                        </div>
                                        {formData.image === img && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#fabf37] text-black text-[8px] font-black uppercase rounded-full">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                                    Technical Specifications
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const name = window.prompt("Enter Attribute Name (e.g., Material, GSM):");
                                        if (name && !formData.attributes?.[name]) {
                                            setFormData(prev => ({
                                                ...prev,
                                                attributes: {
                                                    ...prev.attributes,
                                                    [name]: []
                                                }
                                            }));
                                        }
                                    }}
                                    className="text-[9px] font-bold text-[#fabf37] hover:underline uppercase tracking-wide flex items-center gap-1"
                                >
                                    <Plus className="size-3" /> Add Spec
                                </button>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(formData.attributes || {}).map(([key, values]) => (
                                    <div key={key} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black text-white uppercase tracking-wider bg-zinc-900 px-3 py-1 rounded-full border border-white/10">
                                                {key}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (window.confirm(`Delete "${key}" specification?`)) {
                                                        const newAttrs = { ...formData.attributes };
                                                        delete newAttrs[key];
                                                        setFormData(prev => ({ ...prev, attributes: newAttrs }));
                                                    }
                                                }}
                                                className="text-zinc-600 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="size-3" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(values) && values.map((val, idx) => (
                                                <div key={idx} className="group relative">
                                                    <div className="px-4 py-2 rounded-full border border-white/10 bg-black text-[10px] font-bold text-zinc-300 uppercase tracking-wide hover:border-[#fabf37] transition-colors cursor-default">
                                                        {val}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newValues = values.filter((_, i) => i !== idx);
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                attributes: {
                                                                    ...prev.attributes,
                                                                    [key]: newValues
                                                                }
                                                            }));
                                                        }}
                                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="size-2" />
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const val = window.prompt(`Add option for ${key}:`);
                                                    if (val) {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            attributes: {
                                                                ...prev.attributes,
                                                                [key]: [...(prev.attributes?.[key] || []), val]
                                                            }
                                                        }));
                                                    }
                                                }}
                                                className="px-3 py-2 rounded-full border border-dashed border-zinc-700 text-zinc-500 text-[10px] font-bold uppercase hover:text-[#fabf37] hover:border-[#fabf37] transition-colors flex items-center gap-1"
                                            >
                                                <Plus className="size-3" /> Add Option
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {Object.keys(formData.attributes || {}).length === 0 && (
                                    <div className="text-center py-8 border border-dashed border-zinc-800 rounded-xl">
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">No technical specifications added</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/10 bg-zinc-900/30 flex justify-end gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.2)]"
                        >
                            <Save className="size-4" />
                            <span>Save Product</span>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    );
}

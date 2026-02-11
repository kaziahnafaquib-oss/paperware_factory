import { ChangeEvent, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, FileText, Package, Truck, Sparkles, Upload, Globe, 
  CheckCircle2, Building2, User, Calendar, MapPin, DollarSign,
  Palette, Calculator, TrendingDown, Clock, MessageSquare,
  FileCheck, Layers, Ship, CreditCard, Save, Plus, Trash2, Eye,
  AlertCircle, Coins, ArrowRight
} from "lucide-react";

export function QuoteRequestPage() {
  const [certifications, setCertifications] = useState({
    fsc: false,
    fda: false,
    iso: false,
    brcgs: false
  });

  const [productLines, setProductLines] = useState([
    { id: 1, productType: "", quantity: "", unitPrice: 0, customization: "" }
  ]);

  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "Corporate",
    tin: "",
    contactPerson: "",
    email: "",
    phone: "",
    destinationCountry: "",
    destinationCity: "",
    zipCode: "",
    productType: "",
    quantity: "",
    expectedDate: "",
    requirements: "",
    incoterms: "FOB",
    paymentTerms: "30% Advance, 70% Before Shipment",
    currency: "USD",
    shippingMethod: "Sea Freight",
    sampleRequest: false,
    brandingRequired: false,
    preferredContact: "Email",
    pastOrderRef: "",
    volumeDiscount: false
  });

  const [estimatedCost, setEstimatedCost] = useState({
    subtotal: 0,
    shipping: 0,
    customs: 0,
    total: 0
  });

  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductLineChange = (id: number, field: string, value: string | number) => {
    setProductLines(productLines.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const addProductLine = () => {
    const newId = productLines.length > 0 ? productLines[productLines.length - 1].id + 1 : 1;
    setProductLines([...productLines, { id: newId, productType: "", quantity: "", unitPrice: 0, customization: "" }]);
  };

  const removeProductLine = (id: number) => {
    setProductLines(productLines.filter(line => line.id !== id));
  };

  const calculateEstimatedCost = () => {
    const subtotal = productLines.reduce((acc, line) => acc + (line.unitPrice * parseFloat(line.quantity as string)), 0);
    const shipping = 500; // Example shipping cost
    const customs = 100; // Example customs cost
    const total = subtotal + shipping + customs;
    setEstimatedCost({ subtotal, shipping, customs, total });
  };

  const toggleCostBreakdown = () => {
    setShowCostBreakdown(!showCostBreakdown);
  };

  const saveDraft = () => {
    setSavedDraft(true);
    // Save draft logic here
  };

  return (
    <div className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 size-96 rounded-full bg-[#fabf37]/5 blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-10 size-96 rounded-full bg-[#fabf37]/3 blur-3xl pointer-events-none"
      />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Export & Bulk Orders</span>
          <h1 className="text-[48px] md:text-[72px] font-black uppercase tracking-tighter leading-none text-white mt-4 mb-6">
            Request a Quotation
          </h1>
          <p className="text-zinc-400 font-bold text-lg max-w-2xl mx-auto">
            Complete export request form for international and bulk domestic orders with full certification support.
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/40 backdrop-blur-2xl p-10 md:p-16 rounded-[60px] border border-white/5 space-y-16 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Business Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-[#fabf37]">
                <Building2 className="size-6" />
                <h4 className="text-lg font-black uppercase tracking-widest">Business Info</h4>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Company Name</label>
                  <input 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corporation"
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Business Category</label>
                  <select 
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option>Corporate</option>
                    <option>FMCG Brand</option>
                    <option>Pharmaceutical</option>
                    <option>Restaurant Chain</option>
                    <option>Garments Accessories</option>
                    <option>Export Business</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Trade / TIN Number</label>
                  <input 
                    name="tin"
                    value={formData.tin}
                    onChange={handleInputChange}
                    placeholder="Business Registration Number"
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
            </div>

            {/* Contact Point */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-[#fabf37]">
                <User className="size-6" />
                <h4 className="text-lg font-black uppercase tracking-widest">Contact Point</h4>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Liaison Name</label>
                  <input 
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Procurement Manager"
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="manager@company.com"
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Phone</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+880 XXXX-XXXXXX"
                    className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Product Details */}
          <div className="pt-12 border-t border-white/5 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-[#fabf37]">
                <Globe className="size-6" />
                <h4 className="text-lg font-black uppercase tracking-widest">Shipping & Product Details</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Destination Country</label>
                    <input 
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleInputChange}
                      placeholder="e.g. United Kingdom"
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Destination City / Port</label>
                    <input 
                      name="destinationCity"
                      value={formData.destinationCity}
                      onChange={handleInputChange}
                      placeholder="e.g. London Gateway / Jebel Ali"
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Delivery Area / Zip Code</label>
                    <input 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="e.g. E1 6AN / Industrial Zone 2"
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Product Type</label>
                    <select 
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Product Type</option>
                      <option>Paper Cups</option>
                      <option>Paper Bags</option>
                      <option>Food Boxes</option>
                      <option>Pharma Packaging</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Est. Quantity (Units)</label>
                    <input 
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="50,000"
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Expected Timeline</label>
                    <div className="relative">
                      <input 
                        type="date"
                        name="expectedDate"
                        value={formData.expectedDate}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all cursor-pointer"
                      />
                      <Calendar className="absolute right-8 top-1/2 -translate-y-1/2 size-5 text-zinc-600 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-[#fabf37]">
              <FileText className="size-6" />
              <h4 className="text-lg font-black uppercase tracking-widest">Special Requirements / Compliance</h4>
            </div>
            <textarea 
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={5}
              placeholder="Mention FDA/ISO specifics, branding needs, or special packaging requirements..."
              className="w-full bg-black/60 border border-white/10 rounded-[40px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700 resize-none"
            />
          </div>

          {/* Required Certifications */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-[#fabf37]">
              <CheckCircle2 className="size-6" />
              <h4 className="text-lg font-black uppercase tracking-widest">Required Certifications</h4>
            </div>
            <div className="bg-black/40 rounded-[40px] p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { id: 'fsc', label: 'FSC Certified' },
                  { id: 'fda', label: 'FDA Approved' },
                  { id: 'iso', label: 'ISO 9001/14001' },
                  { id: 'brcgs', label: 'BRCGS Food' }
                ].map((cert) => (
                  <label key={cert.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={certifications[cert.id as keyof typeof certifications]}
                      onChange={(e) => setCertifications({...certifications, [cert.id]: e.target.checked})}
                      className="size-5 rounded border-2 border-zinc-600 bg-black/60 text-[#fabf37] focus:ring-[#fabf37] cursor-pointer"
                    />
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">{cert.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-Product Lines */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#fabf37]">
                <Layers className="size-6" />
                <h4 className="text-lg font-black uppercase tracking-widest">Product Lines</h4>
              </div>
              <button 
                onClick={addProductLine}
                className="flex items-center gap-2 bg-[#fabf37]/10 border border-[#fabf37]/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-[#fabf37] hover:bg-[#fabf37] hover:text-black transition-all"
              >
                <Plus className="size-4" />
                Add Product
              </button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {productLines.map((line, index) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-black/40 rounded-[40px] p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Product #{index + 1}</span>
                      {productLines.length > 1 && (
                        <button 
                          onClick={() => removeProductLine(line.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-wider text-zinc-600 px-4">Product Type</label>
                        <select 
                          value={line.productType}
                          onChange={(e) => handleProductLineChange(line.id, 'productType', e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-[24px] px-6 py-4 text-xs font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select</option>
                          <option>Paper Cups - 8oz</option>
                          <option>Paper Cups - 12oz</option>
                          <option>Paper Bags - Small</option>
                          <option>Paper Bags - Large</option>
                          <option>Food Boxes - 500ml</option>
                          <option>Food Boxes - 1L</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-wider text-zinc-600 px-4">Quantity</label>
                        <input 
                          type="number"
                          value={line.quantity}
                          onChange={(e) => handleProductLineChange(line.id, 'quantity', e.target.value)}
                          placeholder="10,000"
                          className="w-full bg-black/60 border border-white/10 rounded-[24px] px-6 py-4 text-xs font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-wider text-zinc-600 px-4">Customization</label>
                        <input 
                          value={line.customization}
                          onChange={(e) => handleProductLineChange(line.id, 'customization', e.target.value)}
                          placeholder="Logo print, colors..."
                          className="w-full bg-black/60 border border-white/10 rounded-[24px] px-6 py-4 text-xs font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Trade & Payment Terms */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-[#fabf37]">
              <Ship className="size-6" />
              <h4 className="text-lg font-black uppercase tracking-widest">Trade & Payment Terms</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Incoterms</label>
                <select 
                  name="incoterms"
                  value={formData.incoterms}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>FOB (Free On Board)</option>
                  <option>CIF (Cost, Insurance & Freight)</option>
                  <option>DDP (Delivered Duty Paid)</option>
                  <option>EXW (Ex Works)</option>
                  <option>FCA (Free Carrier)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Payment Terms</label>
                <select 
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>30% Advance, 70% Before Shipment</option>
                  <option>50% Advance, 50% Before Shipment</option>
                  <option>100% LC at Sight</option>
                  <option>Net 30 Days</option>
                  <option>Net 60 Days</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Currency</label>
                <select 
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>USD 🇺🇸</option>
                  <option>EUR 🇪🇺</option>
                  <option>GBP 🇬🇧</option>
                  <option>BDT 🇧🇩</option>
                  <option>AED 🇦🇪</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-[#fabf37]">
              <Package className="size-6" />
              <h4 className="text-lg font-black uppercase tracking-widest">Additional Options</h4>
            </div>
            <div className="bg-black/40 rounded-[40px] p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.sampleRequest}
                      onChange={(e) => setFormData({...formData, sampleRequest: e.target.checked})}
                      className="size-6 rounded border-2 border-zinc-600 bg-black/60 text-[#fabf37] focus:ring-[#fabf37] cursor-pointer"
                    />
                    <div className="flex items-center gap-3">
                      <Eye className="size-5 text-[#fabf37]" />
                      <div>
                        <span className="text-sm font-bold text-white block">Request Physical Sample</span>
                        <span className="text-xs text-zinc-500">Before bulk order confirmation</span>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.brandingRequired}
                      onChange={(e) => setFormData({...formData, brandingRequired: e.target.checked})}
                      className="size-6 rounded border-2 border-zinc-600 bg-black/60 text-[#fabf37] focus:ring-[#fabf37] cursor-pointer"
                    />
                    <div className="flex items-center gap-3">
                      <Palette className="size-5 text-[#fabf37]" />
                      <div>
                        <span className="text-sm font-bold text-white block">Custom Branding & Print</span>
                        <span className="text-xs text-zinc-500">Logo, colors, design elements</span>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.volumeDiscount}
                      onChange={(e) => setFormData({...formData, volumeDiscount: e.target.checked})}
                      className="size-6 rounded border-2 border-zinc-600 bg-black/60 text-[#fabf37] focus:ring-[#fabf37] cursor-pointer"
                    />
                    <div className="flex items-center gap-3">
                      <TrendingDown className="size-5 text-[#fabf37]" />
                      <div>
                        <span className="text-sm font-bold text-white block">Volume Discount Request</span>
                        <span className="text-xs text-zinc-500">For bulk orders above 100K units</span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Shipping Method</label>
                    <select 
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Sea Freight (20-40 days)</option>
                      <option>Air Freight (5-7 days)</option>
                      <option>Express Courier (2-3 days)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Preferred Contact Method</label>
                    <select 
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Email</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Video Meeting</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">Past Order Reference (Optional)</label>
                    <input 
                      name="pastOrderRef"
                      value={formData.pastOrderRef}
                      onChange={handleInputChange}
                      placeholder="#ORD-2025-XXXX"
                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Estimator */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#fabf37]">
                <Calculator className="size-6" />
                <h4 className="text-lg font-black uppercase tracking-widest">Cost Estimator</h4>
              </div>
              <button 
                onClick={toggleCostBreakdown}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#fabf37] hover:text-white transition-colors"
              >
                <Eye className="size-4" />
                {showCostBreakdown ? 'Hide' : 'Show'} Breakdown
              </button>
            </div>
            <div className="bg-gradient-to-br from-[#fabf37]/10 to-[#fabf37]/5 rounded-[40px] p-8 border border-[#fabf37]/20">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-black/60 rounded-[24px] p-6 text-center">
                  <DollarSign className="size-6 text-[#fabf37] mx-auto mb-2" />
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-1">Subtotal</p>
                  <p className="text-2xl font-black text-white">${estimatedCost.subtotal.toLocaleString()}</p>
                </div>
                <div className="bg-black/60 rounded-[24px] p-6 text-center">
                  <Truck className="size-6 text-[#fabf37] mx-auto mb-2" />
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-1">Shipping</p>
                  <p className="text-2xl font-black text-white">${estimatedCost.shipping.toLocaleString()}</p>
                </div>
                <div className="bg-black/60 rounded-[24px] p-6 text-center">
                  <FileCheck className="size-6 text-[#fabf37] mx-auto mb-2" />
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-1">Customs</p>
                  <p className="text-2xl font-black text-white">${estimatedCost.customs.toLocaleString()}</p>
                </div>
                <div className="bg-[#fabf37] rounded-[24px] p-6 text-center">
                  <Coins className="size-6 text-black mx-auto mb-2" />
                  <p className="text-[9px] font-black uppercase tracking-wider text-black/60 mb-1">Est. Total</p>
                  <p className="text-2xl font-black text-black">${estimatedCost.total.toLocaleString()}</p>
                </div>
              </div>
              <AnimatePresence>
                {showCostBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/40 rounded-[24px] p-6 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <AlertCircle className="size-4 text-[#fabf37]" />
                      <span className="font-bold">This is a preliminary estimate. Final pricing will be confirmed after review.</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Base Unit Price:</span>
                          <span className="text-white font-black">$0.15/unit</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Customization Fee:</span>
                          <span className="text-white font-black">$200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Certification Docs:</span>
                          <span className="text-white font-black">$50</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Sea Freight (20ft):</span>
                          <span className="text-white font-black">$450</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Insurance:</span>
                          <span className="text-white font-black">$50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Customs Clearance:</span>
                          <span className="text-white font-black">$100</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={calculateEstimatedCost}
                className="w-full mt-6 bg-black border border-[#fabf37]/30 text-[#fabf37] py-4 rounded-[24px] font-black uppercase tracking-wider text-xs hover:bg-[#fabf37] hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="size-4" />
                Calculate Estimate
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-[#fabf37]">
              <Upload className="size-6" />
              <h4 className="text-lg font-black uppercase tracking-widest">Product Sample / Design File</h4>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-[40px] p-12 text-center hover:border-[#fabf37] transition-colors cursor-pointer group">
              <input type="file" id="file-upload" className="hidden" accept=".svg,.png,.jpg,.jpeg,.pdf" multiple />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="size-16 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#fabf37]/20 transition-colors">
                  <Upload className="size-8 text-zinc-500 group-hover:text-[#fabf37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-black text-white">Click to upload or drag and drop</p>
                  <p className="text-xs font-semibold text-zinc-500">SVG, PNG, JPG, PDF (Max 10MB per file, Multiple files allowed)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Save Draft */}
          <div className="pt-8">
            <motion.button 
              onClick={saveDraft}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-zinc-800 border border-white/10 text-white py-6 rounded-[40px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-zinc-700 transition-all"
            >
              <Save className="size-5" />
              {savedDraft ? 'Draft Saved ✓' : 'Save as Draft'}
            </motion.button>
          </div>

          {/* Info Banner */}
          <div className="bg-[#fabf37] p-8 rounded-[40px] text-black flex gap-4">
            <Sparkles className="size-6 shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-xs font-black uppercase">Export Documentation Support</p>
              <p className="text-[10px] font-bold opacity-70 leading-tight">
                By submitting this form, you will be assigned a dedicated Export Specialist who will handle all documentation including commercial invoices, packing lists, certificates of origin, and customs clearance support.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#fabf37] text-black py-8 rounded-[40px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-white transition-all shadow-2xl group"
          >
            Send Export Intent
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Send className="size-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
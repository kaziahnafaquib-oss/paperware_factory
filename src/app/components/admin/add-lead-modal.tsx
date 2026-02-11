import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon, Camera, Building2, Mail, Phone, MapPin, Globe, ChevronDown, Flag, ShoppingBag, Calendar, Users } from "lucide-react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Holy See", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

export function AddLeadModal({ isOpen, onClose, initialData }: AddLeadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-[130px] inset-x-0 bottom-0 z-[70] flex items-start justify-center p-4">
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-2xl max-h-[85vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#fabf37] px-8 py-6 relative flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-black">Add New Lead</h3>
                  <p className="text-xs font-bold text-black/70 mt-1">Fill in lead information</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-full text-black transition-colors"
                >
                  <X className="size-5" />
                </button>
            </div>

            {/* Form Content */}
            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
               {/* Contact Info */}
               <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                    <Users className="size-3" /> Contact Information
                  </h4>
                  
                  <div>
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Profile Photo (Optional)</label>
                     <div className="flex items-center gap-4">
                        <div className="size-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-zinc-600 bg-white/5">
                           <ImageIcon className="size-6" />
                        </div>
                        <div className="flex gap-2">
                           <button 
                              type="button"
                              onClick={() => {
                                 // Create a hidden file input for gallery selection
                                 const input = document.createElement('input');
                                 input.type = 'file';
                                 input.accept = 'image/*';
                                 input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                       // In a real app, this would upload the file
                                       console.log("Gallery image selected:", file.name);
                                    }
                                 };
                                 input.click();
                              }}
                              className="px-4 py-2 bg-[#fabf37] text-black rounded-lg text-xs font-bold hover:bg-[#fabf37]/90 flex items-center gap-2"
                           >
                              <ImageIcon className="size-3" /> Gallery
                           </button>
                           <button 
                              type="button"
                              onClick={() => {
                                 // Check if camera API is supported
                                 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                    // In a real app, this would open a camera modal
                                    console.log("Camera requested");
                                 } else {
                                    alert("Camera not supported on this device");
                                 }
                              }}
                              className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-xs font-bold hover:bg-zinc-700 flex items-center gap-2"
                           >
                              <Camera className="size-3" /> Camera
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Lead Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          defaultValue={initialData?.name || ""}
                          placeholder="Enter lead name"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                          <input 
                              type="text" 
                              placeholder="Company name"
                              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                          <input 
                              type="email" 
                              defaultValue={initialData?.email || ""}
                              placeholder="email@example.com"
                              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                          <input 
                              type="text" 
                              defaultValue={initialData?.mobile || ""}
                              placeholder="+880 1XXX-XXXXXX"
                              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Address */}
               <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="size-3" /> Address
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Area</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Dhanmondi"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">City</label>
                        <input 
                          type="text" 
                          defaultValue={initialData?.city || "New York"}
                          placeholder="e.g. Dhaka"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Country</label>
                        <div className="relative">
                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                           <select 
                             className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer custom-scrollbar"
                             defaultValue="Bangladesh"
                           >
                              {COUNTRIES.map((country) => (
                                <option key={country} value={country} className="bg-zinc-900 text-white">
                                  {country}
                                </option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 pointer-events-none" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Lead Details */}
               <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                    <Flag className="size-3" /> Lead Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Lead Source <span className="text-red-500">*</span></label>
                        <div className="relative">
                           <select className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer">
                              <option>Select source</option>
                              <option>Website Visitor</option>
                              <option>Social Media</option>
                              <option>Referral</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 pointer-events-none" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Product Interest</label>
                        <div className="relative">
                           <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                           <select className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer">
                              <option>Select product</option>
                              <option>iPhone 15 Pro</option>
                              <option>MacBook Air</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 pointer-events-none" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Estimated Budget</label>
                        <div className="relative">
                           <select className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer">
                              <option>Select budget range</option>
                              <option>$1,000 - $5,000</option>
                              <option>$5,000 - $10,000</option>
                              <option>$10,000+</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 pointer-events-none" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Expected Timeline</label>
                        <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                           <select className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer">
                              <option>Immediate</option>
                              <option>1-3 Months</option>
                              <option>3-6 Months</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 pointer-events-none" />
                        </div>
                     </div>
                  </div>
               </div>

               <button className="w-full py-4 bg-[#fabf37] hover:bg-[#fabf37]/90 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(250,191,55,0.2)]">
                  Create Lead
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
import { useState } from 'react';
import { Download, Layers, Plus, MoreVertical, Pencil as Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";

export default function AttributesView() {
  const [attributes, setAttributes] = useState([
    { id: 1, name: "Size", type: "Select", values: ["Small", "Medium", "Large"], linked: 14 },
    { id: 2, name: "Color", type: "Color Swatch", values: ["White", "Kraft", "Black"], linked: 22 },
    { id: 3, name: "Material", type: "Text", values: ["Bamboo", "Recycled Paper"], linked: 8 },
  ]);
  const [rowCount, setRowCount] = useState(5);

  const handleFileUpload = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Parsing Attribute Data...',
      success: 'Imported 15 new attributes',
      error: 'Upload Failed'
    });
  };

  return (
    <ViewContainer title="Digital Attributes" subtitle="Manage Product Specifications & Metadata">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 text-center">
                <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-10 hover:border-[#fabf37] transition-colors cursor-pointer group" onClick={handleFileUpload}>
                   <div className="relative size-16 rounded-full bg-zinc-800 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Download className="size-6 text-zinc-400 group-hover:text-[#fabf37]" />
                      <input 
                          type="file" 
                          accept=".csv,.json,.xml"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onClick={(e) => e.stopPropagation()} 
                          onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                  toast.promise(new Promise(r => setTimeout(r, 2000)), {
                                      loading: `Parsing ${file.name}...`,
                                      success: `Imported attributes from ${file.name}`,
                                      error: 'Upload Failed'
                                  });
                              }
                          }}
                      />
                   </div>
                   <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Bulk Upload</h4>
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                      Drag CSV or JSON file here <br/> to import attributes
                   </p>
                </div>
                <div className="mt-6 flex justify-between items-center px-4">
                   <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Supported: .csv, .json, .xml</span>
                   <button className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest hover:underline">Download Template</button>
                </div>
             </div>

             <div className="bg-[#fabf37] rounded-[40px] p-8 text-black">
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">Auto-Link Engine</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-relaxed mb-6">
                   Automatically associate imported attributes with products based on SKU naming conventions.
                </p>
                <div className="flex items-center justify-between bg-black/10 rounded-xl p-4">
                   <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                   <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-black animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                   </div>
                </div>
             </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
             <div className="bg-black border border-white/5 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Attribute Sets</h3>
                   
                  {/* Redesigned Create New Dropdown (Table Layout) */}
                  <details className="relative group">
                     <summary className="list-none bg-[#fabf37] text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_4px_10px_rgba(250,191,55,0.2)] cursor-pointer">
                         <Plus className="size-3" /> Create New
                     </summary>
                     
                     <div className="absolute right-0 top-full mt-4 w-[650px] bg-[#1a1a1a] border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-white/5">
                         {/* Header */}
                         <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/80 backdrop-blur-sm">
                             <div className="flex items-center gap-3">
                                 <div className="text-zinc-400"><Layers className="size-4" /></div>
                                 <h4 className="text-white text-sm font-bold tracking-tight">New Item Attribute</h4>
                                 <span className="bg-orange-500/20 text-orange-500 border border-orange-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Not Saved</span>
                             </div>
                             <button type="submit" form="attr-form" className="bg-white text-black px-5 py-1.5 rounded-md text-xs font-bold hover:bg-zinc-200 transition-colors">Save</button>
                         </div>

                         <form 
                             id="attr-form" 
                             className="p-6 space-y-6"
                             onSubmit={(e) => {
                                 e.preventDefault();
                                 const formData = new FormData(e.currentTarget);
                                 
                                 // Collect values from the dynamic rows
                                 const collectedValues: string[] = [];
                                 for(let i=1; i<=rowCount; i++) {
                                     const val = formData.get(`val_${i}`) as string;
                                     if(val && val.trim()) {
                                         collectedValues.push(val.trim());
                                     }
                                 }

                                 if(!formData.get('name')) {
                                     toast.error("Attribute Name is required");
                                     return;
                                 }
                                 if(collectedValues.length === 0) {
                                     toast.error("At least one value is required");
                                     return;
                                 }

                                 setAttributes(prev => [...prev, {
                                     id: Date.now(),
                                     name: formData.get('name') as string,
                                     type: formData.get('numeric') ? 'Numeric' : 'Text',
                                     values: collectedValues,
                                     linked: 0
                                 }]);
                                 
                                 e.currentTarget.reset();
                                 setRowCount(5);
                                 e.currentTarget.closest('details')?.removeAttribute('open');
                                 toast.success("Attribute Schema Saved");
                             }}
                         >
                             {/* Top Controls */}
                             <div className="flex items-start justify-between gap-8">
                                 <div className="flex-1 space-y-3">
                                     <label className="text-[11px] text-zinc-400 font-bold block">Attribute Name <span className="text-red-500">*</span></label>
                                     <input name="name" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2.5 text-xs text-white focus:border-[#fabf37] outline-none transition-colors placeholder:text-zinc-600" placeholder="e.g. Material Composition" />
                                     <label className="flex items-center gap-2 mt-3 cursor-pointer group/check">
                                         <input type="checkbox" name="numeric" className="rounded bg-zinc-800 border-zinc-700 text-[#fabf37] focus:ring-0 cursor-pointer" />
                                         <span className="text-[11px] text-white font-bold group-hover/check:text-[#fabf37] transition-colors">Numeric Values</span>
                                     </label>
                                 </div>
                                 <div className="pt-8">
                                     <label className="flex items-center gap-2 cursor-pointer group/check">
                                         <input type="checkbox" name="disabled" className="rounded bg-zinc-800 border-zinc-700 text-[#fabf37] focus:ring-0 cursor-pointer" />
                                         <span className="text-[11px] text-white font-bold group-hover/check:text-[#fabf37] transition-colors">Disabled</span>
                                     </label>
                                 </div>
                             </div>

                             {/* Table Section */}
                             <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
                                 <div className="flex items-center justify-between p-2 px-3 bg-zinc-900/80 border-b border-zinc-800">
                                     <span className="text-[11px] text-zinc-400 font-bold">Item Attribute Values</span>
                                     <div className="flex gap-2">
                                         <span className="size-2 rounded-full bg-zinc-700"></span>
                                         <span className="size-2 rounded-full bg-zinc-700"></span>
                                     </div>
                                 </div>
                                 
                                 {/* Table Header */}
                                 <div className="grid grid-cols-12 gap-0 border-b border-zinc-800 bg-black/40 text-[10px] font-bold text-zinc-500 p-2.5 uppercase tracking-wider">
                                     <div className="col-span-1 text-center"></div>
                                     <div className="col-span-1 text-center">No.</div>
                                     <div className="col-span-6 px-2">Attribute Value <span className="text-red-500">*</span></div>
                                     <div className="col-span-3 px-2">Abbreviation</div>
                                     <div className="col-span-1 text-center"><MoreVertical className="size-3 mx-auto opacity-50"/></div>
                                 </div>

                                 {/* Dynamic Rows */}
                                 {Array.from({length: rowCount}).map((_, idx) => {
                                     const i = idx + 1;
                                     return (
                                     <div key={i} className="grid grid-cols-12 gap-0 border-b border-zinc-800 last:border-0 items-center p-0 group/row hover:bg-white/[0.02] transition-colors">
                                         <div className="col-span-1 text-center flex justify-center py-3">
                                             <div className="size-3 rounded border border-zinc-700 group-hover/row:border-zinc-500"></div>
                                         </div>
                                         <div className="col-span-1 text-center text-zinc-500 text-[10px] font-mono">{i}</div>
                                         <div className="col-span-6 px-2 py-2 border-l border-zinc-800/50">
                                             <input name={`val_${i}`} className="w-full bg-transparent border-none text-white focus:ring-0 p-1 text-xs placeholder-zinc-800 font-medium" placeholder="Value..." />
                                         </div>
                                         <div className="col-span-3 px-2 py-2 border-l border-zinc-800/50">
                                             <input name={`abbr_${i}`} className="w-full bg-transparent border-none text-zinc-400 focus:ring-0 p-1 text-xs px-2 placeholder-zinc-800" placeholder="Abbr" />
                                         </div>
                                         <div className="col-span-1 text-center text-zinc-700 cursor-pointer hover:text-white py-3 flex justify-center">
                                             <Edit className="size-3 opacity-0 group-hover/row:opacity-100 transition-opacity" />
                                         </div>
                                     </div>
                                     );
                                 })}
                             </div>
                             
                             <button type="button" onClick={() => setRowCount(p => p + 1)} className="bg-zinc-800 text-white px-4 py-2 rounded-md text-[10px] font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2">
                                 <Plus className="size-3" /> Add Row
                             </button>
                         </form>
                     </div>
                  </details>
                </div>
                
                <div className="space-y-4">
                   {attributes.map((attr) => (
                      <div key={attr.id} className="p-6 bg-zinc-900/30 rounded-3xl border border-white/5 flex flex-col gap-4 group hover:border-[#fabf37]/50 transition-all">
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-6 flex-1">
                                <div className="size-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#fabf37] transition-colors shrink-0">
                                   <Layers className="size-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                   {/* Editable Name Field */}
                                   <input 
                                      value={attr.name}
                                      onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, name: e.target.value } : a))}
                                      className="w-full bg-transparent text-lg font-black text-white uppercase tracking-tight outline-none border-b border-transparent focus:border-[#fabf37]/50 transition-all placeholder-zinc-700 hover:border-white/10"
                                   />
                                   <div className="flex items-center gap-3">
                                      {/* Editable Type Selector */}
                                      <select 
                                          value={attr.type}
                                          onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, type: e.target.value } : a))}
                                          className="bg-white/5 text-[8px] font-black text-zinc-500 uppercase tracking-widest rounded px-2 py-0.5 outline-none focus:text-[#fabf37] hover:bg-white/10 cursor-pointer"
                                      >
                                          <option value="Select">Select</option>
                                          <option value="Color Swatch">Color</option>
                                          <option value="Text">Text</option>
                                      </select>
                                      
                                      {/* Editable Values Field */}
                                      <input 
                                          value={attr.values.join(", ")}
                                          onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, values: e.target.value.split(',').map(s=>s.trim()) } : a))}
                                          className="flex-1 bg-transparent text-[9px] font-bold text-zinc-600 uppercase tracking-widest outline-none border-b border-transparent focus:border-[#fabf37]/50 focus:text-white transition-all hover:border-white/10 truncate"
                                      />
                                   </div>
                                </div>
                             </div>
                             <div className="text-right pl-4 border-l border-white/5">
                                <p className="text-[20px] font-black text-white">{attr.linked}</p>
                                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Linked</p>
                             </div>
                         </div>
                         {/* Delete Action Bar */}
                         <div className="flex justify-end pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => {
                                     if(confirm('Delete attribute set?')) {
                                         setAttributes(attributes.filter(a => a.id !== attr.id));
                                         toast.error("Attribute Deleted");
                                     }
                                }}
                                className="text-[8px] font-bold text-red-500 uppercase tracking-widest hover:text-red-400 flex items-center gap-1"
                            >
                                <Trash2 className="size-3" /> Remove Schema
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </ViewContainer>
  );
}

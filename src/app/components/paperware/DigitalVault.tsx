import { useState, type MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, FileText, Lock, Download, Eye, Trash2, Upload, Search, Filter, Calendar, File, FileCheck, FileLock, Award, CheckCircle2, Clock, Share2, Copy, Mail, MessageCircle, Link } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

interface DigitalVaultProps {
  onClose: () => void;
}

export function DigitalVault({ onClose }: DigitalVaultProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
  const [previewDocument, setPreviewDocument] = useState<any>(null);

  const categories = [
    { id: "all", label: t('portal_all_documents'), count: 24 },
    { id: "contracts", label: "Contracts", count: 8 },
    { id: "invoices", label: "Invoices", count: 12 },
    { id: "certificates", label: "Certificates", count: 4 },
  ];

  const documents = [
    {
      id: "DOC-001",
      name: "Master Service Agreement 2024",
      type: "Contract",
      date: "Jan 15, 2024",
      size: "2.4 MB",
      status: "Active",
      icon: FileCheck,
      category: "contracts",
      locked: false,
    },
    {
      id: "DOC-002",
      name: "Invoice #PW-2024-0156",
      type: "Invoice",
      date: "Jan 20, 2024",
      size: "456 KB",
      status: "Paid",
      icon: FileText,
      category: "invoices",
      locked: false,
    },
    {
      id: "DOC-003",
      name: "FSC Certification",
      type: "Certificate",
      date: "Dec 1, 2023",
      size: "1.1 MB",
      status: "Valid",
      icon: Award,
      category: "certificates",
      locked: true,
    },
    {
      id: "DOC-004",
      name: "NDA Agreement - Project Alpha",
      type: "Contract",
      date: "Jan 10, 2024",
      size: "890 KB",
      status: "Active",
      icon: FileLock,
      category: "contracts",
      locked: true,
    },
    {
      id: "DOC-005",
      name: "Quality Inspection Report Q4",
      type: "Report",
      date: "Dec 28, 2023",
      size: "3.2 MB",
      status: "Final",
      icon: FileCheck,
      category: "certificates",
      locked: false,
    },
    {
      id: "DOC-006",
      name: "Invoice #PW-2024-0148",
      type: "Invoice",
      date: "Jan 18, 2024",
      size: "512 KB",
      status: "Pending",
      icon: FileText,
      category: "invoices",
      locked: false,
    },
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (docName: string) => {
    // Create a dummy file download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDU1Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihIZWxsbyBQYXBlcndhcmUhKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMjM4IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA3NCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNS9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjI5NQolJUVPRgo=';
    link.download = `${docName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Download Started!`, {
      description: `${docName}.pdf is being downloaded`,
    });
  };

  const handleShareViaEmail = (docName: string, docId: string) => {
    setShareMenuOpen(null);
    toast.success(`Share via Email`, {
      description: `Preparing to share "${docName}" via email`,
    });
  };

  const handleShareViaWhatsApp = (docName: string, docId: string) => {
    setShareMenuOpen(null);
    const message = `Check out this document: ${docName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success(`Opening WhatsApp`, {
      description: `Share "${docName}" with your contacts`,
    });
  };

  const handleCopyShareLink = (docName: string, docId: string) => {
    setShareMenuOpen(null);
    const shareLink = `https://paperware.com/vault/share/${docId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success(`Link Copied!`, {
      description: `Secure share link for "${docName}" copied to clipboard`,
    });
  };

  const modalContent = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-[9999]"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-2 md:inset-4 lg:inset-8 bg-white rounded-2xl shadow-2xl z-[10000] overflow-hidden flex flex-col"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 md:px-5 py-3 border-b border-black/5 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Shield className="size-2.5 text-blue-600" />
              <p className="text-[6px] font-[900] uppercase tracking-[0.3em] text-zinc-400">Secure Document Storage</p>
            </div>
            <h2 className="text-base md:text-lg font-[900] uppercase tracking-tight text-black">{t('portal_digital_vault')}</h2>
          </div>
          <button
            onClick={onClose}
            className="size-7 rounded-lg bg-[rgb(0,0,0)] border border-black/5 shadow-sm hover:bg-black hover:text-white transition-all flex items-center justify-center shrink-0"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 md:px-5 py-3 border-b border-black/5 bg-zinc-50">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('portal_search_docs')}
                className="w-full pl-9 pr-3 py-2 bg-white border border-black/5 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-[rgb(0,0,0)]"
              />
            </div>

            {/* Upload Button */}
            <button className="px-4 py-2 bg-black text-white text-[9px] font-semibold uppercase tracking-wider rounded-xl hover:bg-[#fabf37] hover:text-black transition-all flex items-center gap-1.5">
              <Upload className="size-3" />
              {t('portal_upload_document')}
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-wider transition-all ${selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-zinc-600 border border-black/5 hover:bg-zinc-100"
                  }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white border border-black/5 rounded-2xl hover:shadow-xl transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    onClick={() => setPreviewDocument(doc)}
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                  >
                    <div className="size-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <doc.icon className="size-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-[11px] font-semibold text-black truncate">{doc.name}</h3>
                        {doc.locked && <Lock className="size-3 text-amber-600 shrink-0" />}
                      </div>
                      <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider">{doc.type} • {doc.id}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="space-y-0.5">
                    <p className="text-[7px] font-semibold uppercase tracking-widest text-zinc-400">Date</p>
                    <p className="text-[10px] font-medium text-black">{doc.date}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[7px] font-semibold uppercase tracking-widest text-zinc-400">Size</p>
                    <p className="text-[10px] font-medium text-black">{doc.size}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${doc.status === "Active" || doc.status === "Valid" || doc.status === "Paid"
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : doc.status === "Pending"
                          ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                          : "bg-blue-50 text-blue-600 border border-blue-200"
                      }`}
                  >
                    <CheckCircle2 className="size-2.5" />
                    {doc.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 relative">
                  <button
                    onClick={() => handleDownload(doc.name)}
                    className="flex-1 px-3 py-1.5 bg-[rgb(0,0,0)] border border-black/5 text-[9px] font-semibold uppercase tracking-wider rounded-lg hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="size-3" />
                    Download
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShareMenuOpen(shareMenuOpen === doc.id ? null : doc.id)}
                      className="px-3 py-1.5 bg-[rgb(0,0,0)] border border-black/5 text-[9px] font-semibold uppercase tracking-wider rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Share2 className="size-3" />
                    </button>

                    {/* Share Dropdown Menu */}
                    <AnimatePresence>
                      {shareMenuOpen === doc.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-white border border-black/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-1.5 space-y-0.5">
                            <button
                              onClick={() => handleShareViaEmail(doc.name, doc.id)}
                              className="w-full px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-black hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2.5"
                            >
                              <Mail className="size-3.5 text-blue-600" />
                              <span>Share via Email</span>
                            </button>
                            <button
                              onClick={() => handleShareViaWhatsApp(doc.name, doc.id)}
                              className="w-full px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-black hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2.5"
                            >
                              <MessageCircle className="size-3.5 text-green-600" />
                              <span>Share via WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleCopyShareLink(doc.name, doc.id)}
                              className="w-full px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-black hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-2.5"
                            >
                              <Copy className="size-3.5 text-amber-600" />
                              <span>Copy Share Link</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-12">
              <File className="size-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-zinc-400 uppercase">No documents found</p>
              <p className="text-[10px] text-zinc-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 md:px-5 py-3 border-t border-black/5 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <Shield className="size-3 text-green-600" />
            <span className="font-medium">256-bit encrypted • SOC 2 compliant</span>
          </div>
          <p className="text-[10px] font-medium text-zinc-400">{filteredDocs.length} of {documents.length} documents</p>
        </div>
      </motion.div>
    </>
  );

  return ReactDOM.createPortal(
    <>
      {modalContent}

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDocument && (
          <>
            {/* Preview Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewDocument(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[10100]"
            />

            {/* Preview Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 20, stiffness: 500 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              className="fixed inset-0 bg-white z-[10200] overflow-hidden flex flex-col"
            >
              {/* Preview Header */}
              <div className="px-4 py-3 border-b border-black/5 bg-gradient-to-r from-blue-50 to-white shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="size-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <previewDocument.icon className="size-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-sm font-bold text-black">{previewDocument.name}</h2>
                        {previewDocument.locked && <Lock className="size-3.5 text-amber-600" />}
                      </div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">{previewDocument.type} • {previewDocument.id}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${previewDocument.status === "Active" || previewDocument.status === "Valid" || previewDocument.status === "Paid"
                              ? "bg-green-50 text-green-600 border border-green-200"
                              : previewDocument.status === "Pending"
                                ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                : "bg-blue-50 text-blue-600 border border-blue-200"
                            }`}
                        >
                          <CheckCircle2 className="size-2.5" />
                          {previewDocument.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewDocument(null)}
                    className="size-7 rounded-lg bg-zinc-100 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shrink-0"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {/* Document Preview Area */}
                <div className="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200 p-4 mb-3 flex flex-col items-center justify-center min-h-[120px]">
                  <previewDocument.icon className="size-12 text-zinc-300 mb-2" />
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-0.5">Document Preview</p>
                  <p className="text-[9px] text-zinc-400">Preview functionality coming soon</p>
                </div>

                {/* Document Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="p-2.5 bg-white border border-black/5 rounded-lg">
                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Document Type</p>
                    <p className="text-[10px] font-semibold text-black">{previewDocument.type}</p>
                  </div>
                  <div className="p-2.5 bg-white border border-black/5 rounded-lg">
                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Date Created</p>
                    <p className="text-[10px] font-semibold text-black">{previewDocument.date}</p>
                  </div>
                  <div className="p-2.5 bg-white border border-black/5 rounded-lg">
                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">File Size</p>
                    <p className="text-[10px] font-semibold text-black">{previewDocument.size}</p>
                  </div>
                  <div className="p-2.5 bg-white border border-black/5 rounded-lg">
                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Category</p>
                    <p className="text-[10px] font-semibold text-black capitalize">{previewDocument.category}</p>
                  </div>
                </div>

                {/* Security Info */}
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
                  <Shield className="size-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-blue-900 mb-0.5">Secure Document</p>
                    <p className="text-[8px] text-blue-700 leading-relaxed">
                      This document is encrypted with 256-bit AES encryption and stored securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Footer - Action Buttons */}
              <div className="px-4 py-3 border-t border-black/5 bg-zinc-50 shrink-0">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      handleDownload(previewDocument.name);
                      setPreviewDocument(null);
                    }}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-black text-white text-[10px] font-semibold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="size-4" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      toast.info("Opening document...");
                      setPreviewDocument(null);
                    }}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="size-4" />
                    Open Document
                  </button>
                  <button
                    onClick={() => {
                      handleCopyShareLink(previewDocument.name, previewDocument.id);
                    }}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-white border border-black/10 text-black text-[10px] font-semibold uppercase tracking-wider rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="size-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
import React from "react";
import { openWhatsAppInquiry, collectFormFields, INQUIRY_HANDOFF_BODY } from "../lib/inquiry";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, Star, Send, ChartBar, 
  Smile, Meh, Frown, CircleCheck, 
  Sparkles, Lightbulb, TrendingUp, AlertCircle,
  ScanQrCode, X, ChevronRight, Layers2, Ruler, Award,
  Camera, Upload, Image as ImageIcon, Mic, Package, Truck,
  Leaf, ThumbsUp, ThumbsDown, Clock, DollarSign, ShieldCheck,
  CheckCircle2, AlertTriangle, XCircle, Target, Zap, RefreshCw,
  Instagram, Linkedin, Facebook, Heart, MessageCircle, Share2, Recycle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Scanner } from "@yudiel/react-qr-scanner";

interface ProductFeedbackPageProps {
  onScanSuccess?: () => void;
}

export function ProductFeedbackPage({ onScanSuccess }: ProductFeedbackPageProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanError, setScanError] = React.useState<string | null>(null);
  const [manualId, setManualId] = React.useState("");
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [hasCheckedCamera, setHasCheckedCamera] = React.useState(false);
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [cameraStream, setCameraStream] = React.useState<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // New states for additional features
  const [qualityMetrics, setQualityMetrics] = React.useState({
    durability: 0,
    printQuality: 0,
    materialQuality: 0,
    design: 0
  });
  const [selectedIssues, setSelectedIssues] = React.useState<string[]>([]);
  const [comparisonRating, setComparisonRating] = React.useState<'better' | 'same' | 'worse' | null>(null);
  const [deliveryRating, setDeliveryRating] = React.useState(0);
  const [packagingRating, setPackagingRating] = React.useState(0);
  const [sustainabilityRating, setSustainabilityRating] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedImprovements, setSelectedImprovements] = React.useState<string[]>([]);
  const [feedbackCategory, setFeedbackCategory] = React.useState<string>("quality");

  React.useEffect(() => {
    // Check if camera is even available to prevent unnecessary errors
    if (isScanning && !hasCheckedCamera) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setScanError("NO_CAMERA");
        setHasCheckedCamera(true);
      }
    }
  }, [isScanning, hasCheckedCamera]);

  // Cleanup camera stream on unmount
  React.useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setIsCameraOpen(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      
      // Handle specific error cases
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert('📷 Camera Permission Denied\n\nPlease allow camera access in your browser settings to use live capture.\n\nAlternatively, you can use the "Upload Files" button to select photos from your device.');
      } else if (err.name === 'NotFoundError') {
        alert('📷 No Camera Found\n\nYour device doesn\'t have a camera or it\'s not accessible.\n\nPlease use the "Upload Files" button to select photos from your device.');
      } else if (err.name === 'NotReadableError') {
        alert('📷 Camera Already in Use\n\nThe camera is being used by another application.\n\nPlease close other apps using the camera or use "Upload Files" instead.');
      } else {
        alert('📷 Camera Access Error\n\nUnable to access camera. Please use the "Upload Files" button to select photos from your device.');
      }
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/png');
    setUploadedImages(prev => [...prev, imageData]);
    handleCloseCamera();
  };

  const handleCloseCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Phase A0: no backend yet; hand the feedback to WhatsApp instead of faking "submitted".
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = collectFormFields(e.currentTarget);
    if (rating) fields["Rating"] = `${rating} / 5`;
    if (comment) fields["Comment"] = comment;
    if (uploadedImages.length) fields["Photos"] = `${uploadedImages.length} photo(s); I will send them in the chat`;
    openWhatsAppInquiry("Product feedback", fields);
    setSubmitted(true);
  };

  const sentiment = comment.length > 20 ? (comment.toLowerCase().includes("good") || comment.toLowerCase().includes("great") ? "positive" : "neutral") : "awaiting";

  const handleScan = (data: any) => {
    if (data) {
      console.log("QR Data:", data);
      setIsScanning(false);
      setScanError(null);
      onScanSuccess?.();
    }
  };

  const handleSimulateScan = () => {
    setIsSimulating(true);
    setScanError(null);
    setTimeout(() => {
      setIsSimulating(false);
      setIsScanning(false);
      onScanSuccess?.();
    }, 2500);
  };

  const handleError = (err: any) => {
    // Categorize errors for better user guidance
    const errorType = err?.name || "UnknownError";
    const errorMessage = typeof err === 'string' ? err : (err?.message || "");

    // Suppress console errors for known permission issues
    if (errorType === "NotAllowedError" || errorMessage.includes("Permission denied") || errorMessage.includes("denied")) {
      // Silently handle permission denied - show UI fallback
      setScanError("CAMERA_BLOCKED");
      return; // Don't log to console
    } 
    
    if (errorType === "NotFoundError" || errorMessage.includes("not found")) {
      setScanError("NO_CAMERA");
      return; // Don't log to console
    }
    
    // Only log unexpected errors
    console.warn("Scanner error (non-critical):", errorType);
    setScanError("CAMERA_BLOCKED");
  };

  const renderScannerContent = () => {
    if (isSimulating) {
      return (
        <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-[40px] bg-zinc-900 border-2 border-[#fabf37]/30 flex flex-col items-center justify-center space-y-6">
           <div className="relative">
              <div className="size-32 border-4 border-[#fabf37]/20 border-t-[#fabf37] rounded-full animate-spin" />
              <ScanQrCode className="size-12 text-[#fabf37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
           </div>
           <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">AI Pattern Recognition</p>
              <p className="text-white font-bold text-sm">Analyzing Batch Cryptography...</p>
           </div>
           <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-[#fabf37] shadow-[0_0_40px_#fabf37] z-10 opacity-60"
          />
        </div>
      );
    }

    if (scanError === "CAMERA_BLOCKED" || scanError === "NO_CAMERA") {
      return (
        <div className="bg-zinc-900 border-2 border-[#fabf37]/50 rounded-[60px] p-8 space-y-6 shadow-[0_0_100px_rgba(250,191,55,0.2)]">
          <div className="size-20 bg-[#fabf37] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#fabf37]/10 animate-pulse">
            <AlertCircle className="size-10 text-black" />
          </div>
          <div className="space-y-3">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Access Restricted</h4>
            <p className="text-zinc-400 font-bold text-sm leading-snug max-w-xs mx-auto">
              {scanError === "CAMERA_BLOCKED" 
                ? "Camera permission was denied. Use manual entry or bypass to continue the traceability audit."
                : "No camera detected on this device. Manual verification required."}
            </p>
          </div>
          
          <div className="pt-2 flex flex-col gap-3">
             <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  placeholder="BATCH ID: #PW-88291-EXP"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-3xl py-5 px-8 text-white font-bold uppercase tracking-wide text-base focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-500 text-[11px]"
                />
                <button 
                  onClick={() => onScanSuccess?.()}
                  disabled={!manualId}
                  className="w-full bg-[#fabf37] text-black py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale"
                >
                  Verify
                </button>
             </div>

             <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-white/5 flex-1" />
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">or use</span>
                <div className="h-px bg-white/5 flex-1" />
             </div>

             <button 
                onClick={handleSimulateScan}
                className="w-full bg-zinc-800 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-[9px] hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 border border-white/5 group"
              >
                <Sparkles className="size-4 text-[#fabf37] group-hover:rotate-12 transition-transform" /> 
                Simulate AI Scan (Demo Mode)
              </button>
              
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Traceability Protocol v4.0.1</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-square w-full max-w-sm mx-auto">
        <div className="absolute -inset-4 border-2 border-white/10 rounded-[60px] pointer-events-none" />
        <div className="absolute top-0 left-0 size-12 border-t-4 border-l-4 border-[#fabf37] rounded-tl-[40px]" />
        <div className="absolute top-0 right-0 size-12 border-t-4 border-r-4 border-[#fabf37] rounded-tr-[40px]" />
        <div className="absolute bottom-0 left-0 size-12 border-b-4 border-l-4 border-[#fabf37] rounded-bl-[40px]" />
        <div className="absolute bottom-0 right-0 size-12 border-b-4 border-r-4 border-[#fabf37] rounded-br-[40px]" />

        <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_0_80px_rgba(250,191,55,0.15)] flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            {!scanError && (
              <Scanner
                onScan={(result) => {
                  if (result && result.length > 0) {
                    handleScan({ text: result[0].rawValue });
                  }
                }}
                onError={(error) => handleError(error)}
                styles={{
                  container: { width: '100%', height: '100%' },
                  video: { width: '100%', height: '100%', objectFit: 'cover' }
                }}
              />
            )}
          </div>
          
          {/* Fallback UI that appears if the scanner is struggling or blocked */}
          <div className="relative z-10 p-8 text-center space-y-6">
             <div className="size-20 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto border border-white/10">
                <ScanQrCode className="size-8 text-[#fabf37] animate-pulse" />
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">System Initializing</p>
                <button 
                  onClick={handleSimulateScan}
                  className="bg-[#fabf37] text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl"
                >
                  Bypass & Simulate Scan
                </button>
             </div>
          </div>

          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-[#fabf37] shadow-[0_0_30px_#fabf37] z-20 opacity-50"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-20 font-['Poppins',sans-serif]">
      {/* Live Camera Capture Overlay */}
      <AnimatePresence>
        {isCameraOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={handleCloseCamera}
              className="absolute top-8 right-8 text-white/40 hover:text-white hover:rotate-90 transition-all z-50"
            >
              <X className="size-10" />
            </button>
            
            <div className="max-w-2xl w-full space-y-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabf37]/10 rounded-full border border-[#fabf37]/20">
                  <Camera className="size-4 text-[#fabf37] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Live Camera</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Capture Photo Evidence</h3>
              </div>

              <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto overflow-hidden rounded-[40px] bg-zinc-900 border-2 border-[#fabf37]/30 shadow-[0_0_100px_rgba(250,191,55,0.2)]">
                <video 
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  suppressHydrationWarning
                />
                
                {/* Camera overlay corners */}
                <div className="absolute top-4 left-4 size-12 border-t-4 border-l-4 border-[#fabf37] rounded-tl-3xl pointer-events-none" />
                <div className="absolute top-4 right-4 size-12 border-t-4 border-r-4 border-[#fabf37] rounded-tr-3xl pointer-events-none" />
                <div className="absolute bottom-4 left-4 size-12 border-b-4 border-l-4 border-[#fabf37] rounded-bl-3xl pointer-events-none" />
                <div className="absolute bottom-4 right-4 size-12 border-b-4 border-r-4 border-[#fabf37] rounded-br-3xl pointer-events-none" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCapture}
                className="bg-[#fabf37] text-black px-12 py-6 rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 shadow-2xl hover:shadow-[#fabf37]/50 transition-all mx-auto"
              >
                <Camera className="size-6" />
                Capture Photo
              </motion.button>

              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Photo will be added to your feedback</p>
            </div>

            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Scanner Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:p-12"
          >
            <button 
              onClick={() => { setIsScanning(false); setScanError(null); }}
              className="absolute top-8 right-8 text-white/40 hover:text-white hover:rotate-90 transition-all z-50"
            >
              <X className="size-10" />
            </button>
            
            <div className="max-w-xl w-full space-y-12 text-center">
              {!scanError && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabf37]/10 rounded-full border border-[#fabf37]/20">
                    <Sparkles className="size-4 text-[#fabf37]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">AI Vision System</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Point & Scan</h3>
                </div>
              )}

              {renderScannerContent()}

              {!scanError && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-4 text-[#fabf37]">
                    <div className="size-2 rounded-full bg-[#fabf37] animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Ready for Batch Input</span>
                  </div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Supports all Paperware Batch QR Codes</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container mx-auto px-4 pb-24 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-7xl mx-auto">
          
          {/* Feedback Form - Now Full Width on Mobile, Expanded on Desktop */}
          <div className="lg:col-span-7 flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 relative overflow-hidden"
            >
              {/* Decorative Background Mesh */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#fabf37]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100 shadow-sm"
                  >
                    <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Product Feedback</span>
                  </motion.div>
                  <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900">
                    Tell us your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] to-amber-600">Experience</span>
                  </h1>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsScanning(true)}
                  className="w-full md:w-auto bg-black text-[#fabf37] px-8 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all group border border-white/10"
                >
                  <ScanQrCode className="size-5 group-hover:rotate-90 transition-transform duration-500" />
                  Scan Product QR
                </motion.button>
              </div>

              <p className="text-zinc-600 font-bold text-base md:text-lg max-w-xl mb-12 leading-relaxed">
                Your direct feedback powers our continuous improvement protocols. Each submission is analyzed by our quality assurance team to optimize production standards.
              </p>

              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                      <Layers2 className="size-3" /> Product Category
                    </label>
                    <div className="relative">
                      <select className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[24px] py-5 px-8 font-bold text-sm md:text-base text-zinc-900 focus:border-[#fabf37] focus:bg-white focus:shadow-xl focus:shadow-[#fabf37]/10 outline-none transition-all appearance-none cursor-pointer">
                        <option>Office Stationery</option>
                        <option>Paper Cups & Beverages</option>
                        <option>Restaurant Supplies</option>
                        <option>Marketing Materials</option>
                        <option>Industrial Packaging</option>
                        <option>Pharmaceutical Boxes</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-black transition-colors">
                        <ChevronRight className="size-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                      <Ruler className="size-3" /> Spec / Size / Batch ID
                    </label>
                    <input 
                      className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[24px] py-5 px-8 font-bold text-sm md:text-base text-zinc-900 focus:border-[#fabf37] focus:bg-white focus:shadow-xl focus:shadow-[#fabf37]/10 outline-none transition-all placeholder:text-zinc-400" 
                      placeholder="e.g. 14in X 22in (Optional)" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                      <ScanQrCode className="size-3" /> Order / Invoice #
                    </label>
                    <input 
                      className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[24px] py-5 px-8 font-bold text-sm md:text-base text-zinc-900 focus:border-[#fabf37] focus:bg-white focus:shadow-xl focus:shadow-[#fabf37]/10 outline-none transition-all placeholder:text-zinc-400" 
                      placeholder="e.g. INV-2024-882" 
                    />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                       <MessageSquare className="size-3" /> Contact Email (Optional)
                     </label>
                     <input 
                       type="email"
                       className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[24px] py-5 px-8 font-bold text-sm md:text-base text-zinc-900 focus:border-[#fabf37] focus:bg-white focus:shadow-xl focus:shadow-[#fabf37]/10 outline-none transition-all placeholder:text-zinc-400" 
                       placeholder="For resolution updates..." 
                     />
                  </div>
                </div>

                <div className="space-y-6 bg-zinc-50/50 p-8 rounded-[40px] border border-zinc-100/50">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                       <Award className="size-3" /> Quality Rating
                     </p>
                     <span className="text-xs font-bold text-[#fabf37]">{rating > 0 ? `${rating}/5 Stars` : 'Select Rating'}</span>
                  </div>
                  <div className="flex justify-between gap-2 md:gap-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <motion.button 
                        key={s} 
                        type="button"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(s)}
                        aria-label={`${s} star${s === 1 ? "" : "s"}`}
                        aria-pressed={rating === s}
                        className={`flex-1 h-16 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-300 border-2 ${
                          rating >= s 
                            ? 'bg-[#fabf37] text-black border-[#fabf37] shadow-lg shadow-[#fabf37]/30' 
                            : 'bg-white text-zinc-300 border-zinc-200 hover:border-zinc-400 hover:text-zinc-400'
                        }`}
                      >
                        <Star className={`size-6 md:size-8 ${rating >= s ? 'fill-current' : ''}`} />
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="h-px bg-zinc-200" />

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                       <Sparkles className="size-3" /> Would you recommend Paperware?
                     </p>
                     <div className="flex gap-4 w-full md:w-auto">
                        <button type="button" className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-zinc-200 text-zinc-500 font-bold text-xs uppercase hover:border-[#fabf37] hover:text-black transition-all">
                           Yes, Definitely
                        </button>
                        <button type="button" className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-zinc-200 text-zinc-500 font-bold text-xs uppercase hover:border-zinc-900 hover:text-black transition-all">
                           Maybe Later
                        </button>
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                    <Layers2 className="size-3" /> Photo Evidence (Optional)
                  </label>
                  
                  {/* Upload Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-zinc-200 rounded-[20px] p-6 text-center hover:border-[#fabf37] hover:bg-[#fabf37]/5 transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#fabf37]/20 transition-colors">
                          <Upload className="size-4 text-zinc-400 group-hover:text-[#fabf37]" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-700">Upload Files</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenCamera}
                      className="border-2 border-dashed border-zinc-200 rounded-[20px] p-6 text-center hover:border-[#fabf37] hover:bg-[#fabf37]/5 transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#fabf37]/20 transition-colors">
                          <Camera className="size-4 text-zinc-400 group-hover:text-[#fabf37]" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-700">Take a photo</p>
                      </div>
                    </button>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img loading="lazy" decoding="async" 
                            src={img} 
                            alt={`Upload ${idx + 1}`} 
                            className="w-full aspect-square object-cover rounded-2xl border-2 border-zinc-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -top-2 -right-2 size-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quality Metrics Section */}
                <div className="space-y-6 bg-gradient-to-br from-zinc-50 to-zinc-100/50 p-8 rounded-[40px] border border-zinc-200/50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#fabf37] rounded-full flex items-center justify-center">
                      <Target className="size-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Quality Metrics</h3>
                      <p className="text-xs text-zinc-500 font-bold">Rate individual aspects</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { key: 'durability', label: 'Durability & Strength', icon: <ShieldCheck className="size-4" /> },
                      { key: 'printQuality', label: 'Print Quality', icon: <Sparkles className="size-4" /> },
                      { key: 'materialQuality', label: 'Material Quality', icon: <Award className="size-4" /> },
                      { key: 'design', label: 'Design & Aesthetics', icon: <Zap className="size-4" /> }
                    ].map((metric) => (
                      <div key={metric.key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-zinc-700">
                            {metric.icon}
                            <span className="text-xs font-bold">{metric.label}</span>
                          </div>
                          <span className="text-[10px] font-black text-[#fabf37]">
                            {qualityMetrics[metric.key as keyof typeof qualityMetrics]}/5
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setQualityMetrics(prev => ({ ...prev, [metric.key]: val }))}
                              aria-label={`${metric.label}: ${val} of 5`}
                              aria-pressed={qualityMetrics[metric.key as keyof typeof qualityMetrics] === val}
                              className={`flex-1 h-10 rounded-xl transition-all ${
                                qualityMetrics[metric.key as keyof typeof qualityMetrics] >= val
                                  ? 'bg-[#fabf37] shadow-lg'
                                  : 'bg-white hover:bg-zinc-50'
                              } border-2 ${
                                qualityMetrics[metric.key as keyof typeof qualityMetrics] >= val
                                  ? 'border-[#fabf37]'
                                  : 'border-zinc-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Issue Tags */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                    <AlertTriangle className="size-3" /> Quick Issue Tags (Optional)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'damaged', label: 'Damaged Product', icon: <XCircle className="size-3" /> },
                      { id: 'late', label: 'Late Delivery', icon: <Clock className="size-3" /> },
                      { id: 'wrong', label: 'Wrong Item', icon: <AlertTriangle className="size-3" /> },
                      { id: 'quality', label: 'Quality Issue', icon: <Target className="size-3" /> },
                      { id: 'packaging', label: 'Poor Packaging', icon: <Package className="size-3" /> },
                      { id: 'price', label: 'Pricing Concern', icon: <DollarSign className="size-3" /> }
                    ].map((issue) => (
                      <motion.button
                        key={issue.id}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedIssues(prev => 
                            prev.includes(issue.id) 
                              ? prev.filter(i => i !== issue.id)
                              : [...prev, issue.id]
                          );
                        }}
                        className={`px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                          selectedIssues.includes(issue.id)
                            ? 'bg-red-500 text-white border-2 border-red-600 shadow-lg'
                            : 'bg-white text-zinc-600 border-2 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {issue.icon}
                        {issue.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Delivery & Packaging Feedback */}
                <div className="grid md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-[30px] border border-blue-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Truck className="size-4 text-blue-600" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                        Delivery Experience
                      </label>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setDeliveryRating(val)}
                          aria-label={`Delivery: ${val} star${val === 1 ? "" : "s"}`}
                          aria-pressed={deliveryRating === val}
                          className={`flex-1 h-12 rounded-xl transition-all flex items-center justify-center ${
                            deliveryRating >= val
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-zinc-300 hover:bg-zinc-50'
                          } border-2 ${deliveryRating >= val ? 'border-blue-600' : 'border-zinc-200'}`}
                        >
                          <Star className={`size-4 ${deliveryRating >= val ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Package className="size-4 text-blue-600" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                        Packaging Quality
                      </label>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPackagingRating(val)}
                          aria-label={`Packaging: ${val} star${val === 1 ? "" : "s"}`}
                          aria-pressed={packagingRating === val}
                          className={`flex-1 h-12 rounded-xl transition-all flex items-center justify-center ${
                            packagingRating >= val
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-zinc-300 hover:bg-zinc-50'
                          } border-2 ${packagingRating >= val ? 'border-blue-600' : 'border-zinc-200'}`}
                        >
                          <Star className={`size-4 ${packagingRating >= val ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sustainability Feedback */}
                <div className="space-y-4 bg-emerald-50/50 p-6 rounded-[30px] border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="size-5 text-emerald-600" />
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                          Environmental Impact Score
                        </label>
                        <p className="text-[9px] text-zinc-500 font-bold">How eco-friendly was this product?</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-600">{sustainabilityRating}/5</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSustainabilityRating(val)}
                        aria-label={`Sustainability: ${val} of 5`}
                        aria-pressed={sustainabilityRating === val}
                        className={`flex-1 h-14 rounded-2xl transition-all flex items-center justify-center ${
                          sustainabilityRating >= val
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-white text-zinc-300 hover:bg-zinc-50'
                        } border-2 ${sustainabilityRating >= val ? 'border-emerald-600' : 'border-zinc-200'}`}
                      >
                        <Leaf className={`size-5 ${sustainabilityRating >= val ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>

                </div>

                {/* Comparison with Previous Orders */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                    <RefreshCw className="size-3" /> Compared to Previous Orders
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setComparisonRating('better')}
                      className={`p-6 rounded-[24px] transition-all ${
                        comparisonRating === 'better'
                          ? 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-xl'
                          : 'bg-white text-zinc-600 border-2 border-zinc-200 hover:border-emerald-400'
                      }`}
                    >
                      <ThumbsUp className={`size-8 mx-auto mb-2 ${comparisonRating === 'better' ? '' : 'text-zinc-400'}`} />
                      <p className="text-[10px] font-black uppercase">Better</p>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setComparisonRating('same')}
                      className={`p-6 rounded-[24px] transition-all ${
                        comparisonRating === 'same'
                          ? 'bg-zinc-500 text-white border-2 border-zinc-600 shadow-xl'
                          : 'bg-white text-zinc-600 border-2 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div className="size-8 mx-auto mb-2 flex items-center justify-center">
                        <div className={`w-6 h-1 rounded-full ${comparisonRating === 'same' ? 'bg-white' : 'bg-zinc-400'}`} />
                      </div>
                      <p className="text-[10px] font-black uppercase">Same</p>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setComparisonRating('worse')}
                      className={`p-6 rounded-[24px] transition-all ${
                        comparisonRating === 'worse'
                          ? 'bg-red-500 text-white border-2 border-red-600 shadow-xl'
                          : 'bg-white text-zinc-600 border-2 border-zinc-200 hover:border-red-400'
                      }`}
                    >
                      <ThumbsDown className={`size-8 mx-auto mb-2 ${comparisonRating === 'worse' ? '' : 'text-zinc-400'}`} />
                      <p className="text-[10px] font-black uppercase">Worse</p>
                    </motion.button>
                  </div>
                </div>

                {/* Suggested Improvements */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2 flex items-center gap-2">
                    <Lightbulb className="size-3" /> Suggested Improvements
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Faster Delivery',
                      'Better Packaging',
                      'Improved Quality',
                      'More Eco-Friendly',
                      'Lower Price',
                      'Better Communication',
                      'More Sizes',
                      'Custom Options'
                    ].map((improvement) => (
                      <motion.button
                        key={improvement}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedImprovements(prev => 
                            prev.includes(improvement) 
                              ? prev.filter(i => i !== improvement)
                              : [...prev, improvement]
                          );
                        }}
                        className={`px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                          selectedImprovements.includes(improvement)
                            ? 'bg-[#fabf37] text-black border-2 border-amber-500 shadow-lg'
                            : 'bg-white text-zinc-600 border-2 border-zinc-200 hover:border-[#fabf37]'
                        }`}
                      >
                        {improvement}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Anonymous Feedback Toggle */}
                <div className="flex items-center justify-between p-6 bg-zinc-100/50 rounded-[24px] border border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-zinc-800 rounded-full flex items-center justify-center">
                      <ShieldCheck className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-zinc-800">Submit Anonymously</p>
                      <p className="text-[9px] text-zinc-500 font-bold">Your identity will be protected</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    role="switch"
                    aria-checked={isAnonymous}
                    aria-label="Submit anonymously"
                    className={`relative w-16 h-8 rounded-full transition-all ${
                      isAnonymous ? 'bg-[#fabf37]' : 'bg-zinc-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: isAnonymous ? 32 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute left-1 top-1 size-6 bg-white rounded-full shadow-lg"
                    />
                  </button>
                </div>

                <div className="space-y-4 relative">
                  <div className="flex justify-between items-end px-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                       <MessageSquare className="size-3" /> Detailed Feedback
                     </label>
                     <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                        sentiment === 'positive' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        sentiment === 'neutral' ? 'bg-zinc-50 text-zinc-500 border-zinc-300' :
                        'bg-zinc-50 text-zinc-400 border-zinc-200'
                      }`}>
                        {sentiment === 'positive' ? <Smile className="size-3" /> : sentiment === 'neutral' ? <Meh className="size-3" /> : <Sparkles className="size-3" />}
                        {sentiment} Sentiment
                      </div>
                  </div>
                  <textarea 
                    rows={6} 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[32px] py-6 px-8 font-bold text-sm md:text-base text-zinc-900 focus:border-[#fabf37] focus:bg-white focus:shadow-xl focus:shadow-[#fabf37]/10 outline-none transition-all resize-none placeholder:text-zinc-400" 
                    placeholder="Tell us about the durability, print quality, and overall experience..." 
                  />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-6 md:py-8 rounded-[32px] font-black uppercase tracking-[0.3em] text-xs md:text-sm flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
                    submitted 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                      : 'bg-black text-[#fabf37] hover:bg-[#fabf37] hover:text-black shadow-black/20'
                  }`}
                >
                  {submitted ? <><CircleCheck className="size-6" /> Opened in WhatsApp</> : <><Send className="size-5 md:size-6" /> Send Feedback via WhatsApp</>}
                </motion.button>
                {submitted && (
                  <p role="status" aria-live="polite" className="text-sm font-medium text-zinc-700 leading-relaxed text-center">{INQUIRY_HANDOFF_BODY}</p>
                )}
              </form>
            </motion.div>
          </div>


        </div>
      </section>
    </div>
  );
}
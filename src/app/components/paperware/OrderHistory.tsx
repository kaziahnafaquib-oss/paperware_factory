import { useState, type MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { X, Package, Search, Filter, Calendar, Truck, CheckCircle2, Clock, XCircle, Download, Eye, RefreshCw, MapPin, DollarSign, Box } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

interface OrderHistoryProps {
  onClose: () => void;
}

export function OrderHistory({ onClose }: OrderHistoryProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = [
    { id: "all", label: t('portal_all_orders'), count: 847 },
    { id: "delivered", label: "Delivered", count: 782 },
    { id: "in-transit", label: "In Transit", count: 43 },
    { id: "processing", label: "Processing", count: 18 },
    { id: "cancelled", label: "Cancelled", count: 4 },
  ];

  const orders = [
    {
      id: "#PW-2024-0234",
      date: "Jan 20, 2024",
      product: "Premium Kraft Boxes",
      quantity: "5,000 units",
      amount: "$12,450",
      status: "delivered",
      statusLabel: "Delivered",
      deliveryDate: "Jan 18, 2024",
      location: "Singapore Warehouse",
      icon: CheckCircle2,
      color: "green",
    },
    {
      id: "#PW-2024-0156",
      date: "Jan 15, 2024",
      product: "Custom Printed Bags",
      quantity: "10,000 units",
      amount: "$24,800",
      status: "in-transit",
      statusLabel: "In Transit",
      deliveryDate: "Expected: Jan 25, 2024",
      location: "En route to Jakarta",
      icon: Truck,
      color: "blue",
    },
    {
      id: "#PW-2024-0089",
      date: "Jan 10, 2024",
      product: "Eco-Friendly Packaging",
      quantity: "3,000 units",
      amount: "$8,900",
      status: "processing",
      statusLabel: "Processing",
      deliveryDate: "Expected: Jan 28, 2024",
      location: "Manufacturing Unit 2",
      icon: Clock,
      color: "yellow",
    },
    {
      id: "#PW-2023-1245",
      date: "Dec 28, 2023",
      product: "Luxury Gift Boxes",
      quantity: "2,500 units",
      amount: "$18,750",
      status: "delivered",
      statusLabel: "Delivered",
      deliveryDate: "Jan 5, 2024",
      location: "Manila Distribution Center",
      icon: CheckCircle2,
      color: "green",
    },
    {
      id: "#PW-2023-1198",
      date: "Dec 20, 2023",
      product: "Corrugated Cartons",
      quantity: "8,000 units",
      amount: "$15,200",
      status: "delivered",
      statusLabel: "Delivered",
      deliveryDate: "Dec 30, 2023",
      location: "Bangkok Warehouse",
      icon: CheckCircle2,
      color: "green",
    },
    {
      id: "#PW-2023-1087",
      date: "Dec 15, 2023",
      product: "Food Grade Containers",
      quantity: "4,500 units",
      amount: "$9,450",
      status: "cancelled",
      statusLabel: "Cancelled",
      deliveryDate: "Cancelled on Dec 18, 2023",
      location: "Order cancelled by client",
      icon: XCircle,
      color: "red",
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (orderId: string) => {
    toast.info(`Order Details: ${orderId}`, {
      description: "Opening detailed order information",
    });
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Downloading Invoice: ${orderId}`, {
      description: "Your invoice PDF is being prepared",
    });
  };

  const handleReorder = (orderId: string) => {
    toast.info(`Reorder: ${orderId}`, {
      description: "Initiating reorder process",
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
        className="fixed inset-2 md:inset-4 lg:inset-8 bg-white rounded-3xl shadow-2xl z-[10000] overflow-hidden flex flex-col"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 md:px-6 py-4 border-b border-black/5 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Package className="size-3 text-orange-600" />
              <p className="text-[7px] font-[900] uppercase tracking-[0.3em] text-zinc-400">Complete Order Timeline</p>
            </div>
            <h2 className="text-xl md:text-2xl font-[900] uppercase tracking-tight text-black">{t('portal_order_history')}</h2>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg bg-white border border-black/5 shadow-sm hover:bg-black hover:text-white transition-all flex items-center justify-center shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-8 md:px-12 py-6 border-b border-black/5 bg-zinc-50">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID or product..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-black/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-1.5">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => setStatusFilter(status.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-[800] uppercase tracking-wider transition-all ${statusFilter === status.id
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-black hover:bg-zinc-50"
                  }`}
              >
                <span className="opacity-70">{status.label}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-[900] ${statusFilter === status.id
                  ? "bg-white/20 text-white"
                  : "bg-zinc-100 text-zinc-500"
                  }`}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white border border-black/5 rounded-3xl hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Order Info */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black text-black mb-1">{order.id}</h3>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{order.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${order.color === "green"
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : order.color === "blue"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : order.color === "yellow"
                            ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                    >
                      <order.icon className="size-4" />
                      {order.statusLabel}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Product</p>
                      <p className="text-sm font-black text-black">{order.product}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Quantity</p>
                      <p className="text-sm font-black text-black">{order.quantity}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Amount</p>
                      <p className="text-sm font-black text-black">{order.amount}</p>
                    </div>
                  </div>

                  {/* Location & Delivery */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <MapPin className="size-4" />
                      <span className="font-bold">{order.location}</span>
                    </div>
                    <div className="size-1 bg-zinc-300 rounded-full" />
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Calendar className="size-4" />
                      <span className="font-bold">{order.deliveryDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:w-40 shrink-0">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="flex-1 lg:flex-none px-4 py-3 bg-zinc-50 border border-black/5 text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="size-4" />
                    <span className="hidden lg:inline">View</span>
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="flex-1 lg:flex-none px-4 py-3 bg-zinc-50 border border-black/5 text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="size-4" />
                    <span className="hidden lg:inline">Invoice</span>
                  </button>
                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="flex-1 lg:flex-none px-4 py-3 bg-[#fabf37] text-black text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="size-4" />
                      <span className="hidden lg:inline">Reorder</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-20">
              <Package className="size-16 text-zinc-300 mx-auto mb-4" />
              <p className="text-lg font-black text-zinc-400 uppercase">No orders found</p>
              <p className="text-sm text-zinc-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="px-8 md:px-12 py-6 border-t border-black/5 bg-gradient-to-r from-purple-50 to-zinc-50">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-black text-black mb-1">{filteredOrders.length}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Filtered Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-black mb-1">$1.2M</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Total Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-black mb-1">92%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">On-Time Rate</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
import { Package, FileText, CreditCard, Bell } from "lucide-react";
import yCarryBags from "figma:asset/510221172209f9745471ae8d0b0d125bd25a70f7.webp";

export const inviteProducts = [
  "Custom Kraft Boxes",
  "Premium Coffee Cups",
  "Food Containers",
  "Corrugated Cartons",
  "Paper Bags",
  "Label Stickers"
];

export const orders = [
  { id: "#PW-8821", date: "Oct 24, 2024", item: "Custom Kraft Boxes", qty: "25,000 Pcs", status: "In Transit", progress: 75, destination: "Dhaka, BD", origin: "Singapore", steps: [
     { label: "Order Placed", date: "Oct 24", status: "completed" },
     { label: "Production", date: "Oct 28", status: "completed" },
     { label: "Quality Check", date: "Oct 30", status: "completed" },
     { label: "Shipping", date: "Nov 02", status: "active" },
     { label: "Delivery", date: "Est. Nov 05", status: "pending" }
  ]},
  { id: "#PW-8815", date: "Oct 20, 2024", item: "Premium Coffee Cups", qty: "50,000 Pcs", status: "Production", progress: 40, destination: "Chittagong, BD", origin: "Shanghai", steps: [
     { label: "Order Placed", date: "Oct 20", status: "completed" },
     { label: "Production", date: "Oct 22", status: "active" },
     { label: "Quality Check", date: "Pending", status: "pending" },
     { label: "Shipping", date: "Pending", status: "pending" },
     { label: "Delivery", date: "Est. Nov 15", status: "pending" }
  ]},
  { id: "#PW-8792", date: "Oct 12, 2024", item: "Food Containers", qty: "10,000 Pcs", status: "Delivered", progress: 100, destination: "Sylhet, BD", origin: "Dubai", steps: [
     { label: "Order Placed", date: "Oct 12", status: "completed" },
     { label: "Production", date: "Oct 14", status: "completed" },
     { label: "Quality Check", date: "Oct 16", status: "completed" },
     { label: "Shipping", date: "Oct 18", status: "completed" },
     { label: "Delivery", date: "Oct 20", status: "completed" }
  ]}
];

export const stats = [
  { 
    label: "Active Orders", 
    val: "12", 
    icon: Package, 
    trend: "+2 this month", 
    detail: "8 items in production, 4 in transit",
    breakdown: [
      { label: "Production", count: 8, color: "bg-[#fabf37]" },
      { label: "Shipping", count: 4, color: "bg-emerald-500" }
    ]
  },
  { 
    label: "Pending Quotes", 
    val: "04", 
    icon: FileText, 
    trend: "Requires Action", 
    detail: "Review quotes for Custom Kraft Boxes",
    breakdown: [
      { label: "Draft", count: 1, color: "bg-zinc-200" },
      { label: "Awaiting Review", count: 3, color: "bg-[#fabf37]" }
    ]
  },
  { 
    label: "Total Savings", 
    val: "14%", 
    icon: CreditCard, 
    trend: "Sustainable Credit", 
    detail: "Eco-friendly discount applied",
    breakdown: [
      { label: "Eco Credit", count: "8%", color: "bg-emerald-500" },
      { label: "Bulk Discount", count: "6%", color: "bg-black" }
    ]
  }
];

export const docs = [
  { name: "Proforma Invoice #92", date: "Oct 12", type: "Financial", size: "1.2MB" },
  { name: "Packing List - PW8821", date: "Oct 10", type: "Logistics", size: "845KB" },
  { name: "SGS Quality Cert", date: "Sep 28", type: "Quality", size: "2.4MB" }
];

export const spendingData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

export const supportTickets = [
  { id: "TK-204", subject: "Custom Logo Adjustment", status: "Open", date: "2h ago", priority: "High" },
  { id: "TK-198", subject: "Shipping Delay Inquiry", status: "Closed", date: "1d ago", priority: "Medium" },
  { id: "TK-185", subject: "Billing Question", status: "Closed", date: "3d ago", priority: "Low" },
  { id: "TK-172", subject: "Product Specification", status: "Closed", date: "1w ago", priority: "Medium" },
];

export const suggestedProducts = [
  { name: "Eco-Friendly Straws", price: "$0.02/unit", image: "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?auto=format&fit=crop&q=80&w=200", tag: "New Arrival" },
  { name: "Custom Napkins", price: "$0.01/unit", image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=200", tag: "Best Seller" },
  { name: "Kraft Paper Bags", price: "$0.15/unit", image: yCarryBags, tag: "Trending" },
  { name: "Compostable Cutlery", price: "$0.05/unit", image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=200", tag: "Eco Choice" },
  { name: "Bamboo Plates", price: "$0.12/unit", image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=200", tag: "Organic" },
  { name: "Salad Bowls", price: "$0.18/unit", image: "https://images.unsplash.com/photo-1714013709645-267311b9b045?auto=format&fit=crop&q=80&w=200", tag: "Popular" },
  { name: "Hot Cups", price: "$0.08/unit", image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&q=80&w=200", tag: "Winter Special" },
  { name: "Paper Carriers", price: "$0.10/unit", image: "https://images.unsplash.com/photo-1654160225308-9ccb4d1b38e3?auto=format&fit=crop&q=80&w=200", tag: "Durable" },
  { name: "Wooden Spoons", price: "$0.04/unit", image: "https://images.unsplash.com/photo-1648587456176-4969b0124b12?auto=format&fit=crop&q=80&w=200", tag: "Eco-Friendly" },
  { name: "Burger Boxes", price: "$0.09/unit", image: "https://images.unsplash.com/photo-1744842854127-2d948d9ea673?auto=format&fit=crop&q=80&w=200", tag: "Greaseproof" },
  { name: "Clear Cups", price: "$0.06/unit", image: "https://images.unsplash.com/photo-1649191629386-d828988cc053?auto=format&fit=crop&q=80&w=200", tag: "Recyclable" },
  { name: "Pizza Boxes", price: "$0.25/unit", image: "https://images.unsplash.com/photo-1689793600363-31a3eb87b462?auto=format&fit=crop&q=80&w=200", tag: "Customizable" },
  { name: "Sushi Trays", price: "$0.20/unit", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=200", tag: "Premium" },
  { name: "Tissue Packs", price: "$0.03/unit", image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=200", tag: "Soft" },
  { name: "Trash Bags", price: "$0.10/unit", image: "https://images.unsplash.com/photo-1735050871569-4cb29aae3a30?auto=format&fit=crop&q=80&w=200", tag: "Bio-Degradable" },
];

export const feedItems = [
  "🚀 Production capacity increased by 20% for Q4 2024.",
  "🌱 New sustainable material options available for food packaging.",
  "📅 Holiday shipping schedule updated - please review.",
  "🌍 Track your carbon footprint with our new dashboard."
];

export const notifications = [
  { title: "Order Shipped", desc: "Order #PW-8821 has left Singapore Port", time: "2h ago", type: "logistics" },
  { title: "Invoice Ready", desc: "Proforma Invoice #93 is ready for review", time: "5h ago", type: "finance" },
  { title: "Quality Check", desc: "Custom Kraft Boxes passed SGS inspection", time: "1d ago", type: "quality" }
];

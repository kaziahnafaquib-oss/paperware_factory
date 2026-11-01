import { Package, FileText, CreditCard, Bell } from "lucide-react";
import dp_takeaway_food_box from "figma:asset/products/takeaway-food-box.webp";
import dp_chowmein_boxes from "figma:asset/products/chowmein-boxes.webp";
import dp_cookie_boxes from "figma:asset/products/cookie-boxes.webp";
import dp_confectionery_boxes from "figma:asset/products/confectionery-boxes.webp";
import dp_medicine_boxes from "figma:asset/products/medicine-boxes.webp";
import dp_prescription_pad from "figma:asset/products/prescription-pad.webp";
import dp_gift_bags from "figma:asset/products/gift-bags.webp";
import dp_carry_bag_pink from "figma:asset/products/carry-bag-pink.webp";
import dp_carry_bag_kraft from "figma:asset/cutouts/carry-bag-kraft.webp";
import dp_brochures from "figma:asset/products/brochures.webp";
import dp_flyers from "figma:asset/products/flyers.webp";
import dp_magazines from "figma:asset/products/magazines.webp";
import dp_desk_calendars from "figma:asset/products/desk-calendars.webp";
import dp_stickers from "figma:asset/products/stickers.webp";
import dp_tissue_boxes from "figma:asset/products/tissue-boxes.webp";
import dp_cup from "figma:asset/cutouts/cup.webp";

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
  { name: "Takeaway Food Box", price: "", image: dp_takeaway_food_box, tag: "Food Packaging" },
  { name: "Chowmein Box", price: "", image: dp_chowmein_boxes, tag: "Food Packaging" },
  { name: "Cookie Box", price: "", image: dp_cookie_boxes, tag: "Food Packaging" },
  { name: "Confectionery Box", price: "", image: dp_confectionery_boxes, tag: "Food Packaging" },
  { name: "Medicine Box", price: "", image: dp_medicine_boxes, tag: "Pharmaceutical" },
  { name: "Prescription Pad", price: "", image: dp_prescription_pad, tag: "Pharmaceutical" },
  { name: "Gift Bag", price: "", image: dp_gift_bags, tag: "Bags" },
  { name: "Carry Bag", price: "", image: dp_carry_bag_pink, tag: "Bags" },
  { name: "Kraft Carry Bag", price: "", image: dp_carry_bag_kraft, tag: "Bags" },
  { name: "Brochure", price: "", image: dp_brochures, tag: "Marketing Materials" },
  { name: "Flyer", price: "", image: dp_flyers, tag: "Marketing Materials" },
  { name: "Magazine", price: "", image: dp_magazines, tag: "Marketing Materials" },
  { name: "Desk Calendar", price: "", image: dp_desk_calendars, tag: "Marketing Materials" },
  { name: "Sticker", price: "", image: dp_stickers, tag: "Marketing Materials" },
  { name: "Tissue Box", price: "", image: dp_tissue_boxes, tag: "Tissue" },
  { name: "Paper Cup", price: "", image: dp_cup, tag: "Paper Cups" },
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

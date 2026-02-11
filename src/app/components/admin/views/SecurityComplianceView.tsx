import { useState } from "react";
import { 
  ShieldCheck, RefreshCw, FileText, MoreHorizontal, UserMinus, Settings, AlertTriangle, Plus, 
  Search, Filter, Download, Clock, MapPin, Smartphone, Activity, CheckCircle2, XCircle,
  Lock, Key, ShieldAlert, History, Mail, Globe, Monitor
} from "lucide-react";
import { ViewContainer } from "../ViewContainer";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "../../ui/sheet";
import { ScrollArea } from "../../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

// --- Types ---
type UserRole = "Superuser" | "Manager" | "Viewer" | "Developer" | "Guest";
type AccessLevel = "Full" | "Factory Only" | "CRM Only" | "API Only" | "Read Only";

interface ActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  access: AccessLevel;
  status: 'Active' | 'Suspended' | 'Inactive';
  lastActive: string;
  sessionDuration: string;
  location: string;
  device: string;
  ipAddress: string;
  joinDate: string;
  avatar?: string;
  compliance: {
    ndaSigned: boolean;
    gdprConsented: boolean;
    securityTraining: boolean;
    twoFactorEnabled: boolean;
  };
  recentActivity: ActivityLog[];
}

// --- Mock Data ---
const initialUsers: User[] = [
  { 
    id: 1, 
    name: "JS Admin", 
    email: "admin@paperware.io", 
    role: "Superuser", 
    access: "Full", 
    status: "Active",
    lastActive: "2m ago", 
    sessionDuration: "4h 12m",
    location: "San Francisco, USA",
    device: "MacBook Pro 16\"",
    ipAddress: "192.168.1.1",
    joinDate: "Jan 12, 2024",
    compliance: { ndaSigned: true, gdprConsented: true, securityTraining: true, twoFactorEnabled: true },
    recentActivity: [
      { id: "a1", action: "Changed System Config", target: "Global Settings", timestamp: "2m ago", riskLevel: "High" },
      { id: "a2", action: "User Login", target: "Portal", timestamp: "4h 12m ago", riskLevel: "Low" }
    ]
  },
  { 
    id: 2, 
    name: "Ops Team", 
    email: "ops@paperware.io", 
    role: "Manager", 
    access: "Factory Only", 
    status: "Active",
    lastActive: "1h ago",
    sessionDuration: "2h 45m",
    location: "Berlin, Germany",
    device: "Dell XPS 15",
    ipAddress: "10.0.0.42",
    joinDate: "Feb 28, 2024",
    compliance: { ndaSigned: true, gdprConsented: true, securityTraining: false, twoFactorEnabled: true },
    recentActivity: [
      { id: "b1", action: "Viewed Production Logs", target: "Factory A", timestamp: "1h ago", riskLevel: "Low" },
      { id: "b2", action: "Exported Report", target: "Efficiency Stats", timestamp: "1h 30m ago", riskLevel: "Medium" }
    ]
  },
  { 
    id: 3, 
    name: "Sales Rep", 
    email: "sales.lead@paperware.io", 
    role: "Viewer", 
    access: "CRM Only", 
    status: "Inactive",
    lastActive: "4h ago",
    sessionDuration: "15m",
    location: "London, UK",
    device: "iPad Pro",
    ipAddress: "172.16.0.23",
    joinDate: "Mar 10, 2024",
    compliance: { ndaSigned: true, gdprConsented: true, securityTraining: true, twoFactorEnabled: false },
    recentActivity: [
      { id: "c1", action: "Failed Login Attempt", target: "Portal", timestamp: "4h ago", riskLevel: "Medium" },
      { id: "c2", action: "User Login", target: "Portal", timestamp: "5h ago", riskLevel: "Low" }
    ]
  },
  { 
    id: 4, 
    name: "Dev Team", 
    email: "dev@paperware.io", 
    role: "Developer", 
    access: "API Only", 
    status: "Active",
    lastActive: "1d ago",
    sessionDuration: "8h 00m",
    location: "Remote (VPN)",
    device: "Linux Workstation",
    ipAddress: "10.8.0.1",
    joinDate: "Dec 05, 2023",
    compliance: { ndaSigned: true, gdprConsented: true, securityTraining: true, twoFactorEnabled: true },
    recentActivity: [
      { id: "d1", action: "API Key Generated", target: "Service X", timestamp: "1d ago", riskLevel: "High" },
      { id: "d2", action: "Deployed Hotfix", target: "v2.1.4", timestamp: "1d 2h ago", riskLevel: "High" }
    ]
  },
];

export default function SecurityComplianceView() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // --- Actions ---
  const handleRevoke = (userId: number, userName: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast.success("Access Revoked", {
      description: `User ${userName} has been removed from the access list.`
    });
    setIsSheetOpen(false);
  };

  const handleChangeRole = (userId: number, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(prev => prev ? { ...prev, role: newRole } : null);
    }
    toast.success("Role Updated", {
      description: `User role changed to ${newRole}.`
    });
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now(),
      name: `Guest User ${Math.floor(Math.random() * 100)}`,
      email: `guest${Date.now()}@paperware.io`,
      role: "Guest",
      access: "Read Only",
      status: "Active",
      lastActive: "Just now",
      sessionDuration: "0m",
      location: "Unknown",
      device: "Unknown",
      ipAddress: "127.0.0.1",
      joinDate: new Date().toLocaleDateString(),
      compliance: { ndaSigned: false, gdprConsented: false, securityTraining: false, twoFactorEnabled: false },
      recentActivity: [{ id: `new-${Date.now()}`, action: "Account Created", target: "System", timestamp: "Just now", riskLevel: "Low" }]
    };
    setUsers(prev => [...prev, newUser]);
    toast.success("User Added Successfully", {
      description: `${newUser.name} has been added to the access list.`
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Superuser": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Manager": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Developer": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-emerald-500";
      case "Suspended": return "text-red-500";
      case "Inactive": return "text-zinc-500";
      default: return "text-zinc-500";
    }
  };

  return (
    <ViewContainer title="Security & Compliance" subtitle="Industrial Security Protocols & Legal">
      <div className="space-y-8">
        {/* ERPNext Integration Status */}
        <div className="bg-[#fabf37]/5 border border-[#fabf37]/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#fabf37]/10 to-transparent pointer-events-none" />
           <div className="flex items-center gap-4 z-10">
              <div className="size-10 rounded-xl bg-[#fabf37] flex items-center justify-center text-black font-black">
                 E
              </div>
              <div>
                 <h3 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                    ERPNext Integration Active <span className="flex size-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full size-2 bg-green-500"></span></span>
                 </h3>
                 <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Syncing User Roles & HR Data from Module: HR-2024-X</p>
              </div>
           </div>
           <div className="flex items-center gap-4 z-10">
              <div className="text-right hidden sm:block">
                 <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Last Sync</p>
                 <p className="text-xs font-mono text-[#fabf37]">00:00:12s ago</p>
              </div>
              <button className="px-4 py-2 bg-black border border-[#fabf37]/30 text-[#fabf37] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                 Force Sync
              </button>
           </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "SSL Encryption", status: "Secure", icon: <ShieldCheck />, color: "text-emerald-500" },
            { label: "API Integrity", status: "99.9%", icon: <RefreshCw />, color: "text-blue-500" },
            { label: "Audit Logs", status: "Clean", icon: <FileText />, color: "text-[#fabf37]" },
            { label: "Active Threats", status: "0 Detected", icon: <ShieldAlert />, color: "text-red-500" },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:bg-zinc-900 transition-colors">
              <div className={`size-10 rounded-xl bg-zinc-950 flex items-center justify-center ${item.color} border border-white/5`}>
                {item.icon}
              </div>
              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</p>
                <p className="text-base font-black text-white uppercase">{item.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                   <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]/50 w-64"
                   />
                </div>
                <button className="p-2 text-zinc-400 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                   <Filter className="size-4" />
                </button>
             </div>
             
             <div className="flex items-center gap-3">
               <button className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
                  <Download className="size-4" /> Export Log
               </button>
               <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddUser();
                  }}
                  className="relative z-50 cursor-pointer px-4 py-2 bg-[#fabf37] hover:bg-[#fcc954] text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-[#fabf37] flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.3)] hover:scale-105 active:scale-95 pointer-events-auto"
                >
                   <Plus className="size-3" /> Add User
                </button>
             </div>
          </div>

          {/* User List Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">User / Role</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Last Active</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest hidden md:table-cell">Compliance</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => { setSelectedUser(u); setIsSheetOpen(true); }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-white/10">
                          <AvatarImage src={u.avatar} />
                          <AvatarFallback className="bg-zinc-800 text-xs font-bold text-zinc-400">{u.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#fabf37] transition-colors">{u.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getRoleColor(u.role)} uppercase tracking-wide font-bold`}>{u.role}</span>
                             <span className="text-[10px] text-zinc-600">{u.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <div className={`size-1.5 rounded-full ${getStatusColor(u.status)} bg-current animate-pulse`} />
                          <span className={`text-xs font-bold ${getStatusColor(u.status)}`}>{u.status}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="text-xs font-medium text-zinc-300">{u.lastActive}</span>
                          <span className="text-[10px] text-zinc-600">Session: {u.sessionDuration}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                       <div className="flex items-center gap-1">
                          {u.compliance.twoFactorEnabled ? 
                            <Lock className="size-3.5 text-emerald-500" /> : 
                            <Lock className="size-3.5 text-zinc-700" />
                          }
                          {u.compliance.ndaSigned ? 
                            <FileText className="size-3.5 text-emerald-500" /> : 
                            <FileText className="size-3.5 text-zinc-700" />
                          }
                          {u.compliance.securityTraining ? 
                            <ShieldCheck className="size-3.5 text-emerald-500" /> : 
                            <ShieldCheck className="size-3.5 text-zinc-700" />
                          }
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors outline-none cursor-pointer">
                               <MoreHorizontal className="size-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-[#09090b] border border-white/10 text-white z-[100]">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-500">User Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem onClick={() => { setSelectedUser(u); setIsSheetOpen(true); }}>
                               <Settings className="size-3.5 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRevoke(u.id, u.name)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400">
                               <UserMinus className="size-3.5 mr-2" /> Revoke Access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-zinc-950 border-l border-white/10 text-white w-full sm:w-[540px] overflow-y-auto z-[9999] p-0 shadow-2xl">
           <SheetHeader className="sr-only">
              <SheetTitle>User Security Profile</SheetTitle>
              <SheetDescription>
                Detailed view of user permissions, activity logs, and compliance status.
              </SheetDescription>
           </SheetHeader>
           {selectedUser && (
             <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 pb-8 pt-12 border-b border-white/10 bg-zinc-900/30 relative">
                   {/* Decorative / Safe Area for top navbar overlap if any */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fabf37] to-transparent opacity-50" />
                   
                   <div className="flex items-start justify-between mb-6 mt-4">
                      <div className="flex items-center gap-5">
                         <div className="relative">
                            <Avatar className="size-20 border-4 border-[#09090b] shadow-2xl rounded-2xl">
                                <AvatarImage src={selectedUser.avatar} />
                                <AvatarFallback className="bg-zinc-800 text-2xl font-black text-zinc-500 rounded-2xl">{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 size-5 rounded-full border-4 border-[#09090b] ${selectedUser.status === 'Active' ? 'bg-emerald-500' : 'bg-zinc-500'}`} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{selectedUser.name}</h2>
                               {selectedUser.compliance.twoFactorEnabled && <ShieldCheck className="size-5 text-emerald-500" />}
                            </div>
                            <p className="text-zinc-500 font-bold flex items-center gap-2 text-xs uppercase tracking-wider mb-3">
                               <Mail className="size-3" /> {selectedUser.email}
                            </p>
                            <div className="flex flex-wrap gap-2">
                               <Badge variant="outline" className={`bg-transparent ${getRoleColor(selectedUser.role)} text-[10px] uppercase tracking-widest`}>{selectedUser.role}</Badge>
                               <Badge variant="outline" className="bg-transparent border-white/10 text-zinc-400 text-[10px] uppercase tracking-widest">{selectedUser.access}</Badge>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#09090b] rounded-xl p-4 border border-white/5 shadow-inner">
                         <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Last Active</p>
                         <div className="flex items-center gap-2">
                            <Clock className="size-4 text-[#fabf37]" />
                            <span className="text-sm font-bold">{selectedUser.lastActive}</span>
                         </div>
                      </div>
                      <div className="bg-[#09090b] rounded-xl p-4 border border-white/5 shadow-inner">
                         <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Session</p>
                         <div className="flex items-center gap-2">
                            <History className="size-4 text-blue-500" />
                            <span className="text-sm font-bold">{selectedUser.sessionDuration}</span>
                         </div>
                      </div>
                      <div className="bg-[#09090b] rounded-xl p-4 border border-white/5 shadow-inner">
                         <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Risk Score</p>
                         <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-500">Low</span>
                         </div>
                      </div>
                   </div>
                </div>

                <ScrollArea className="flex-1">
                   <div className="p-6 space-y-8">
                      {/* Technical Details */}
                      <section>
                         <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                            <Monitor className="size-3" /> Device & Location
                         </h3>
                         <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                               <span className="text-sm text-zinc-400 flex items-center gap-2"><Globe className="size-3" /> Location</span>
                               <span className="text-sm font-medium text-white">{selectedUser.location}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                               <span className="text-sm text-zinc-400 flex items-center gap-2"><Smartphone className="size-3" /> Device</span>
                               <span className="text-sm font-medium text-white">{selectedUser.device}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                               <span className="text-sm text-zinc-400 flex items-center gap-2"><Activity className="size-3" /> IP Address</span>
                               <span className="text-sm font-mono text-white bg-black/50 px-2 py-0.5 rounded border border-white/10">{selectedUser.ipAddress}</span>
                            </div>
                         </div>
                      </section>

                      {/* Compliance Checklist */}
                      <section>
                         <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                            <FileText className="size-3" /> Legal Compliance
                         </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: "NDA Signed", active: selectedUser.compliance.ndaSigned },
                              { label: "GDPR Consent", active: selectedUser.compliance.gdprConsented },
                              { label: "Security Training", active: selectedUser.compliance.securityTraining },
                              { label: "2FA Enabled", active: selectedUser.compliance.twoFactorEnabled },
                            ].map((item, i) => (
                               <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${item.active ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                  <span className="text-xs font-bold text-zinc-300">{item.label}</span>
                                  {item.active ? 
                                    <CheckCircle2 className="size-4 text-emerald-500" /> : 
                                    <XCircle className="size-4 text-red-500" />
                                  }
                               </div>
                            ))}
                         </div>
                      </section>

                      {/* Activity Log */}
                      <section>
                         <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                            <History className="size-3" /> Recent Activity
                         </h3>
                         <div className="relative border-l border-white/10 ml-2 space-y-6">
                            {selectedUser.recentActivity.map((log) => (
                               <div key={log.id} className="relative pl-6">
                                  <div className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-[#09090b] ${log.riskLevel === 'High' ? 'bg-red-500' : log.riskLevel === 'Medium' ? 'bg-[#fabf37]' : 'bg-zinc-600'}`} />
                                  <div className="flex flex-col gap-1">
                                     <span className="text-sm font-bold text-white">{log.action}</span>
                                     <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                                        <span>{log.target}</span>
                                        <span>•</span>
                                        <span>{log.timestamp}</span>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </section>
                   </div>
                </ScrollArea>
                
                <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-3">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Change Role</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {(["Viewer", "Manager", "Developer", "Superuser"] as UserRole[]).map((r) => (
                         <button
                           key={r}
                           onClick={() => handleChangeRole(selectedUser.id, r)}
                           disabled={selectedUser.role === r}
                           className={`px-3 py-2 text-xs font-bold border rounded-lg transition-all ${
                             selectedUser.role === r 
                               ? 'bg-[#fabf37] text-black border-[#fabf37]' 
                               : 'bg-black text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white'
                           }`}
                         >
                            {r}
                         </button>
                      ))}
                   </div>
                   <button 
                     onClick={() => handleRevoke(selectedUser.id, selectedUser.name)}
                     className="w-full mt-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                   >
                      <UserMinus className="size-4" /> Revoke Access Immediately
                   </button>
                </div>
             </div>
           )}
        </SheetContent>
      </Sheet>
    </ViewContainer>
  );
}
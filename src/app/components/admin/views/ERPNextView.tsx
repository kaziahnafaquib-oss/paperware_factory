import { useState, useEffect, useRef } from 'react';
import {
  RefreshCw, Link, CircleCheck, Activity, Clock, AlertTriangle,
  Send, User, Bot, CheckCheck, FileText, ChevronRight, X,
  ShieldCheck, Server, Database, ArrowRightLeft, Filter,
  MoreHorizontal, Play, Pause, Layers, BarChart3, Wifi,
  Calendar, Settings2, Sliders, ArrowLeftRight, GitCompare,
  ListRestart, Radio, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, ERPNextConfig } from "../../../../lib/simulated-db";

interface SyncLog {
  id: string;
  type: string;
  msg: string;
  time: string;
  status: 'success' | 'error' | 'pending';
  details?: string;
}

interface ModuleStatus {
  id: string;
  name: string;
  icon: any;
  isEnabled: boolean;
  lastSync: string;
  recordCount: number;
  status: 'idle' | 'syncing' | 'error';
}

interface Webhook {
  id: string;
  event: string;
  endpoint: string;
  status: 'active' | 'inactive';
  lastTriggered: string;
}

interface FailedJob {
  id: string;
  jobName: string;
  error: string;
  time: string;
  retries: number;
}

interface Discrepancy {
  id: string;
  itemCode: string;
  field: string;
  localValue: string;
  erpValue: string;
  status: 'pending' | 'resolved';
}

export default function ERPNextView() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'scheduler' | 'policy' | 'mapping' | 'reconciliation' | 'queue' | 'webhooks'>('overview');
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'error'>('all');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  // New State for Scheduler
  const [syncSchedule, setSyncSchedule] = useState({
    enabled: true,
    interval: '1h', // 15m, 1h, 6h, 24h
    nextRun: '14:00 PM'
  });

  // New State for Conflict Policy
  const [conflictPolicy, setConflictPolicy] = useState<'master' | 'local' | 'manual'>('master');

  // Mappings State
  const [fieldMappings, setFieldMappings] = useState([
    { id: 1, local: 'Product Name', erp: 'item_name', locked: true },
    { id: 2, local: 'SKU / Code', erp: 'item_code', locked: true },
    { id: 3, local: 'Unit Price', erp: 'standard_rate', locked: false },
    { id: 4, local: 'Stock Level', erp: 'actual_qty', locked: false },
    { id: 5, local: 'Description', erp: 'description', locked: false },
    { id: 6, local: 'Category', erp: 'item_group', locked: false },
  ]);

  // Webhooks State
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    { id: 'wh_1', event: 'Sales Order Created', endpoint: '/api/webhooks/order-created', status: 'active', lastTriggered: '10m ago' },
    { id: 'wh_2', event: 'Stock Level Updated', endpoint: '/api/webhooks/stock-update', status: 'active', lastTriggered: '1h ago' },
    { id: 'wh_3', event: 'Customer Added', endpoint: '/api/webhooks/new-customer', status: 'inactive', lastTriggered: 'Never' },
  ]);

  // Failed Jobs State
  const [failedJobs, setFailedJobs] = useState<FailedJob[]>([
    { id: 'job_402', jobName: 'Sync Price List A', error: 'Timeout: ERPNext API did not respond in 30s', time: '2h ago', retries: 2 },
    { id: 'job_405', jobName: 'Export Order #9921', error: 'Validation Error: Customer ID missing', time: '5h ago', retries: 0 },
  ]);

  // Discrepancy State
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([
    { id: 'd1', itemCode: 'ITEM-001', field: 'Stock', localValue: '150', erpValue: '142', status: 'pending' },
    { id: 'd2', itemCode: 'ITEM-004', field: 'Price', localValue: '৳450', erpValue: '৳420', status: 'pending' },
    { id: 'd3', itemCode: 'ITEM-012', field: 'Name', localValue: 'Premium Paper A4', erpValue: 'Paper A4 Premium', status: 'pending' },
  ]);

  // Enhanced Logs State
  const [logs, setLogs] = useState<SyncLog[]>([
    { id: '1', type: "Inventory Update", msg: "Synced 42 SKUs from ERPNext", time: "12m ago", status: "success", details: "Updated stock levels for Category B items. No conflicts found." },
    { id: '2', type: "Customer Data", msg: "Imported 12 new B2B profiles", time: "1h ago", status: "success", details: "New distributors added from Chittagong region." },
    { id: '3', type: "Order Export", msg: "Pushed RFQ-10294 to ERPNext", time: "3h ago", status: "success", details: "Quotation converted to Sales Order SO-2024-001." },
    { id: '4', type: "Price Matrix", msg: "Global price list sync failed", time: "5h ago", status: "error", details: "Timeout waiting for ERPNext API response (504 Gateway Timeout)." },
    { id: '5', type: "HR Attendance", msg: "Shift data synchronized", time: "6h ago", status: "success" },
  ]);

  // Enhanced Module State
  const [modules, setModules] = useState<ModuleStatus[]>([
    { id: 'sales', name: "Sales & Distribution", icon: BarChart3, isEnabled: true, lastSync: "10m ago", recordCount: 1450, status: 'idle' },
    { id: 'inventory', name: "Inventory (Stock)", icon: Layers, isEnabled: true, lastSync: "12m ago", recordCount: 8540, status: 'idle' },
    { id: 'crm', name: "Customer CRM", icon: User, isEnabled: true, lastSync: "1h ago", recordCount: 320, status: 'idle' },
    { id: 'accounts', name: "Financial Accounts", icon: FileText, isEnabled: false, lastSync: "Never", recordCount: 0, status: 'idle' },
    { id: 'manufacturing', name: "Manufacturing Execution", icon: Activity, isEnabled: false, lastSync: "Never", recordCount: 0, status: 'idle' },
  ]);

  const [erpConfig, setErpConfig] = useState<ERPNextConfig>({
    baseUrl: 'https://erp.paperware.com',
    apiKey: '',
    secretKey: '',
    isConnected: false,
    mappings: []
  });

  // Simulated Real-time Metrics
  const [metrics, setMetrics] = useState({
    latency: 24,
    uptime: 99.9,
    requests: 1240,
    errors: 0.2
  });

  useEffect(() => {
    const config = SimulatedDB.getERPConfig();
    if (config) {
      setErpConfig(config);
    }

    // Simulate metric fluctuation
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: 20 + Math.floor(Math.random() * 15),
        requests: prev.requests + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    toast.loading("Initiating Global Sync...");

    setModules(prev => prev.map(m => m.isEnabled ? { ...m, status: 'syncing' } : m));

    setTimeout(() => {
      setIsSyncing(false);
      setModules(prev => prev.map(m => m.isEnabled ? { ...m, status: 'idle', lastSync: 'Just now' } : m));

      const newLog: SyncLog = {
        id: Date.now().toString(),
        type: "Manual Sync",
        msg: "Global sync completed successfully",
        time: "Just now",
        status: "success",
        details: "All enabled modules synchronized with master node."
      };
      setLogs(prev => [newLog, ...prev]);
      toast.dismiss();
      toast.success("ERPNext Sync Complete", { description: "All systems are consistent." });
    }, 2500);
  };

  const handleRetryJob = (id: string) => {
    toast.loading("Retrying job...");
    setTimeout(() => {
      setFailedJobs(prev => prev.filter(job => job.id !== id));
      toast.dismiss();
      toast.success("Job executed successfully");
    }, 1500);
  };

  const handleResolveDiscrepancy = (id: string, action: 'push' | 'pull') => {
    setTimeout(() => {
      setDiscrepancies(prev => prev.filter(d => d.id !== id));
      toast.success(`Discrepancy resolved (${action === 'push' ? 'Pushed to ERP' : 'Pulled from ERP'})`);
    }, 500);
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' } : w));
    toast.success("Webhook status updated");
  };

  const handleModuleSync = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'syncing' } : m));
    toast.info(`Syncing ${modules.find(m => m.id === id)?.name}...`);

    setTimeout(() => {
      setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'idle', lastSync: 'Just now' } : m));
      toast.success(`${modules.find(m => m.id === id)?.name} Synced`);
    }, 1500);
  }

  const handleTestConnection = () => {
    setIsTesting(true);
    const start = Date.now();
    setTimeout(() => {
      setIsTesting(false);
      const latency = Date.now() - start;
      const isConnected = true;

      setErpConfig(prev => {
        const updated = { ...prev, isConnected };
        SimulatedDB.saveERPConfig(updated);
        return updated;
      });

      toast.success(`Connection Established (${latency}ms)`, {
        description: `Connected to ERPNext v15.2.0\nResponse OK: 200`,
        icon: <ShieldCheck className="size-4 text-emerald-500" />
      });
    }, 1200);
  };

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, isEnabled: !m.isEnabled } : m));
    const module = modules.find(m => m.id === id);
    toast.success(`${module?.name} ${!module?.isEnabled ? 'Enabled' : 'Disabled'}`);
  };

  const filteredLogs = logs.filter(log => {
    if (logFilter === 'all') return true;
    return log.status === logFilter;
  });

  const tabs = [
    { id: 'overview', label: 'System Overview' },
    { id: 'scheduler', label: 'Auto-Scheduling' },
    { id: 'policy', label: 'Conflict Policy' },
    { id: 'mapping', label: 'Field Mapping' },
    { id: 'reconciliation', label: 'Data Reconciliation' },
    { id: 'queue', label: 'Failed Job Queue' },
    { id: 'webhooks', label: 'Webhook Manager' },
  ];

  return (
    <ViewContainer
      title="ERPNext Integration"
      subtitle="Enterprise Resource Planning Synchronization Node"
      actions={
        <div className="flex gap-4">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-black/40 rounded-xl border border-white/5 mr-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{metrics.latency}ms Latency</span>
          </div>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} /> {isSyncing ? "Syncing..." : "Sync All"}
          </button>
          <button
            onClick={() => setShowConfig(true)}
            className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(250,191,55,0.3)]"
          >
            <Link className="size-4" /> Config
          </button>
        </div>
      }
    >
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "API Uptime", value: `${metrics.uptime}%`, icon: Wifi, color: "text-emerald-500" },
          { label: "Total Requests", value: metrics.requests.toLocaleString(), icon: ArrowRightLeft, color: "text-blue-500" },
          { label: "Pending Jobs", value: failedJobs.length.toString(), icon: ListRestart, color: failedJobs.length > 0 ? "text-red-500" : "text-zinc-500" },
          { label: "Active Webhooks", value: webhooks.filter(w => w.status === 'active').length.toString(), icon: Radio, color: "text-[#fabf37]" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 group hover:border-[#fabf37]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={`size-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              <Activity className="size-3 text-zinc-700" />
            </div>
            <h4 className="text-2xl font-black text-white tracking-tighter">{stat.value}</h4>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Tab Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                ? 'bg-[#fabf37] text-black'
                : 'bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Config/Modules/Features */}
        <div className="lg:col-span-2 space-y-8">

          {activeTab === 'overview' && (
            <>
              {/* Module Management */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Sync Modules</h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Manage data flow channels</p>
                  </div>
                  <button onClick={() => toast.info("Refreshing module status...")} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"><RefreshCw className="size-4 text-zinc-400" /></button>
                </div>

                <div className="space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`relative overflow-hidden rounded-3xl border transition-all cursor-pointer group hover:shadow-lg ${module.isEnabled ? 'bg-zinc-900/80 border-[#fabf37]/20 hover:border-[#fabf37]/50' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="p-6 flex items-center gap-6 relative z-10">
                        <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${module.isEnabled ? 'bg-[#fabf37]/10 text-[#fabf37]' : 'bg-zinc-800 text-zinc-500'}`}>
                          <module.icon className="size-6" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className={`text-sm font-black uppercase tracking-wide ${module.isEnabled ? 'text-white' : 'text-zinc-500'}`}>{module.name}</h4>
                            {module.status === 'syncing' && <span className="text-[8px] font-bold text-[#fabf37] uppercase tracking-widest animate-pulse">Syncing...</span>}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Clock className="size-3" /> Last: {module.lastSync}</span>
                            <span className="flex items-center gap-1"><Database className="size-3" /> Records: {module.recordCount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => handleModuleSync(module.id, e)}
                            disabled={!module.isEnabled || module.status === 'syncing'}
                            className={`size-10 rounded-xl flex items-center justify-center border transition-all ${module.isEnabled ? 'bg-black text-white border-white/10 hover:bg-[#fabf37] hover:text-black hover:border-[#fabf37]' : 'bg-transparent text-zinc-600 border-transparent cursor-not-allowed'}`}
                          >
                            <RefreshCw className={`size-4 ${module.status === 'syncing' ? 'animate-spin' : ''}`} />
                          </button>
                          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${module.isEnabled ? 'bg-[#fabf37]' : 'bg-zinc-800'}`}>
                            <div className={`size-4 rounded-full bg-white shadow-sm transition-transform ${module.isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhook Health */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-zinc-900/50 rounded-[32px] border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="size-5 text-emerald-500" />
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Webhook Status</h4>
                  </div>
                  <div className="flex items-end gap-2">
                    <h2 className="text-3xl font-black text-white">Active</h2>
                    <div className="size-3 rounded-full bg-emerald-500 mb-2 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Listening on Port 443 (Secure)</p>
                </div>

                <div className="p-8 bg-zinc-900/50 rounded-[32px] border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="size-5 text-blue-500" />
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Data Integrity</h4>
                  </div>
                  <div className="flex items-end gap-2">
                    <h2 className="text-3xl font-black text-white">100%</h2>
                    <CheckCheck className="size-6 text-blue-500 mb-1" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Local vs Remote Hash Match</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'scheduler' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Automated Scheduling</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Configure background sync intervals</p>

              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-black rounded-3xl border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wide">Background Sync</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Allow system to auto-pull updates</p>
                  </div>
                  <div
                    onClick={() => setSyncSchedule({ ...syncSchedule, enabled: !syncSchedule.enabled })}
                    className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${syncSchedule.enabled ? 'bg-[#fabf37]' : 'bg-zinc-800'}`}
                  >
                    <div className={`size-6 rounded-full bg-white shadow-sm transition-transform ${syncSchedule.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div className={`space-y-6 transition-opacity ${syncSchedule.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <div>
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Sync Frequency</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {['15m', '1h', '6h', '24h'].map(int => (
                        <button
                          key={int}
                          onClick={() => setSyncSchedule({ ...syncSchedule, interval: int })}
                          className={`py-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${syncSchedule.interval === int ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-white/20'}`}
                        >
                          {int}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-[#fabf37]/5 border border-[#fabf37]/20 rounded-2xl flex items-center gap-4">
                    <Calendar className="size-6 text-[#fabf37]" />
                    <div>
                      <p className="text-xs font-black text-[#fabf37] uppercase tracking-wide">Next Scheduled Run</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Today at {syncSchedule.nextRun}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policy' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Conflict Resolution</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Data collision handling strategy</p>

              <div className="space-y-4">
                {[
                  { id: 'master', label: 'ERP Master (Preferred)', desc: 'ERPNext data always overwrites local changes.' },
                  { id: 'local', label: 'Local Master', desc: 'Local changes take precedence over ERP data.' },
                  { id: 'manual', label: 'Manual Review', desc: 'Flag conflicts for admin review (stops sync).' },
                ].map((policy: any) => (
                  <div
                    key={policy.id}
                    onClick={() => setConflictPolicy(policy.id)}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all flex items-start gap-4 ${conflictPolicy === policy.id ? 'bg-white/5 border-[#fabf37] shadow-[0_0_20px_rgba(250,191,55,0.1)]' : 'bg-black border-white/5 hover:border-white/20'}`}
                  >
                    <div className={`mt-1 size-5 rounded-full border-2 flex items-center justify-center ${conflictPolicy === policy.id ? 'border-[#fabf37]' : 'border-zinc-600'}`}>
                      {conflictPolicy === policy.id && <div className="size-2.5 rounded-full bg-[#fabf37]" />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-wide ${conflictPolicy === policy.id ? 'text-white' : 'text-zinc-400'}`}>{policy.label}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{policy.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mapping' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Schema Mapper</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Map Local Fields to ERPNext Doctypes</p>

              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  <div className="col-span-5">Local Field</div>
                  <div className="col-span-2 text-center">Map</div>
                  <div className="col-span-5">ERPNext Field ID</div>
                </div>
                {fieldMappings.map((map) => (
                  <div key={map.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-black rounded-2xl border border-white/5">
                    <div className="col-span-5 flex items-center gap-2">
                      <Database className="size-3 text-zinc-600" />
                      <span className="text-sm font-bold text-white">{map.local}</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <ArrowLeftRight className="size-4 text-zinc-600" />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={map.erp}
                        disabled={map.locked}
                        className={`w-full bg-zinc-900 border rounded-lg px-3 py-2 text-xs font-mono text-[#fabf37] outline-none focus:border-[#fabf37] ${map.locked ? 'border-transparent opacity-50 cursor-not-allowed' : 'border-white/10'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-transform text-[10px]">Save Schema Map</button>
            </div>
          )}

          {activeTab === 'reconciliation' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Data Reconciliation</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Resolve Data Discrepancies</p>

              {discrepancies.length > 0 ? (
                <div className="space-y-4">
                  {discrepancies.map((d) => (
                    <div key={d.id} className="p-6 bg-black rounded-3xl border border-white/5 group hover:border-red-500/30 transition-all">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="size-5 text-red-500" />
                          <div>
                            <h4 className="text-sm font-black text-white uppercase">{d.itemCode}</h4>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{d.field} Mismatch</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest">Action Required</span>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-6">
                        <div className="p-4 bg-zinc-900 rounded-xl border border-white/5">
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Local Value</p>
                          <p className="text-lg font-mono text-white">{d.localValue}</p>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-white/5">
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">ERPNext Value</p>
                          <p className="text-lg font-mono text-[#fabf37]">{d.erpValue}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => handleResolveDiscrepancy(d.id, 'push')} className="flex-1 py-3 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-colors">Push Local to ERP</button>
                        <button onClick={() => handleResolveDiscrepancy(d.id, 'pull')} className="flex-1 py-3 bg-[#fabf37] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#fabf37]/90 transition-colors">Pull ERP to Local</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-zinc-500">
                  <CheckCheck className="size-10 mb-4 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest">All Records Matched</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Failed Job Queue</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Retry or flush failed sync tasks</p>

              {failedJobs.length > 0 ? (
                <div className="space-y-4">
                  {failedJobs.map((job) => (
                    <div key={job.id} className="p-6 bg-black rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <X className="size-4 text-red-500" />
                          <h4 className="text-sm font-black text-white uppercase">{job.jobName}</h4>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-400 max-w-md">{job.error}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1"><Clock className="size-3" /> {job.time}</span>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1"><ListRestart className="size-3" /> Retry Count: {job.retries}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRetryJob(job.id)} className="px-6 py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                        <RefreshCw className="size-3" /> Retry Job
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-zinc-500">
                  <ShieldCheck className="size-10 mb-4 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest">Queue is Empty</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 h-full">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Webhook Manager</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Handle real-time events from ERPNext</p>

              <div className="space-y-4">
                {webhooks.map((hook) => (
                  <div key={hook.id} className={`p-6 rounded-3xl border transition-all ${hook.status === 'active' ? 'bg-zinc-900/80 border-[#fabf37]/20 shadow-lg' : 'bg-black border-white/5 opacity-75'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center ${hook.status === 'active' ? 'bg-[#fabf37]/10 text-[#fabf37]' : 'bg-zinc-800 text-zinc-600'}`}>
                          <Radio className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white uppercase">{hook.event}</h4>
                          <code className="text-[10px] text-zinc-500">{hook.endpoint}</code>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleWebhook(hook.id)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${hook.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                      >
                        <div className={`size-4 rounded-full bg-white shadow-sm transition-transform ${hook.status === 'active' ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Activity className="size-3" /> Last Trigger: {hook.lastTriggered}</span>
                      <button className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest hover:underline">Ping Test</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full py-4 border border-zinc-700 border-dashed text-zinc-500 font-black uppercase tracking-widest rounded-xl hover:bg-zinc-900 hover:text-white transition-colors text-[10px] flex items-center justify-center gap-2">
                <MoreHorizontal className="size-4" /> Add New Webhook
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Logs */}
        <div className="space-y-8 h-[calc(100vh-140px)] sticky top-8">
          <div className="bg-black border border-white/5 rounded-[40px] p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">System Logs</h3>
              <div className="flex gap-2">
                {(['all', 'success', 'error'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setLogFilter(f)}
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${logFilter === f ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-2">
              <AnimatePresence initial={false}>
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${expandedLog === log.id ? 'bg-zinc-800 border-white/10' : 'bg-zinc-900/30 border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 size-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] font-black text-white uppercase tracking-wide truncate">{log.type}</p>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider whitespace-nowrap">{log.time}</span>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-400 leading-relaxed line-clamp-2">{log.msg}</p>

                        <AnimatePresence>
                          {expandedLog === log.id && log.details && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 pt-3 border-t border-white/5"
                            >
                              <p className="text-[9px] font-mono text-zinc-500 break-words">{log.details}</p>
                              <div className="mt-2 flex gap-2">
                                <span className="px-2 py-0.5 bg-black rounded text-[8px] font-bold text-zinc-400 uppercase">Log ID: {log.id}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredLogs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                  <div className="size-10 rounded-full bg-zinc-900 flex items-center justify-center mb-3 text-zinc-700"><Filter className="size-4" /></div>
                  No logs found for filter
                </div>
              )}
            </div>

            <button
              onClick={() => setLogs([])}
              className="w-full mt-4 py-3 bg-zinc-900 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              Clear Log History
            </button>
          </div>
        </div>
      </div>

      {/* API Config Modal */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowConfig(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e: any) => e.stopPropagation()}
              className="bg-black border border-zinc-800 rounded-[32px] p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fabf37] to-transparent" />

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Connection Settings</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure ERPNext API Access</p>
                </div>
                <button onClick={() => setShowConfig(false)} className="size-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-all text-white"><X className="size-5" /></button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Instance URL</label>
                    <div className="relative">
                      <Server className="absolute left-4 top-3.5 size-4 text-zinc-600" />
                      <input type="text" value={erpConfig.baseUrl} onChange={(e) => setErpConfig({ ...erpConfig, baseUrl: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white font-mono focus:border-[#fabf37]/50 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">API Key</label>
                    <input type="password" value={erpConfig.apiKey} onChange={(e) => setErpConfig({ ...erpConfig, apiKey: e.target.value })} placeholder={erpConfig.apiKey ? '********' : 'Enter API Key'} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#fabf37]/50 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">API Secret</label>
                    <input type="password" value={erpConfig.secretKey} onChange={(e) => setErpConfig({ ...erpConfig, secretKey: e.target.value })} placeholder={erpConfig.secretKey ? '********' : 'Enter Secret'} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#fabf37]/50 outline-none transition-all" />
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">Connection Diagnostic</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`size-3 rounded-full ${erpConfig.isConnected ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                      <span className="text-xs font-bold text-zinc-400 uppercase">{erpConfig.isConnected ? 'Established' : 'Disconnected'}</span>
                    </div>
                    <button
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      className="px-4 py-2 bg-black border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <RefreshCw className={`size-3 ${isTesting ? 'animate-spin' : ''}`} /> Test Ping
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowConfig(false)} className="flex-1 py-4 bg-zinc-900 text-zinc-400 font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-colors text-[10px]">Cancel</button>
                  <button onClick={() => { SimulatedDB.saveERPConfig(erpConfig); toast.success("Configuration Saved"); setShowConfig(false); }} className="flex-1 py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform text-[10px] shadow-lg shadow-[#fabf37]/20">Save & Connect</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </ViewContainer>
  );
}

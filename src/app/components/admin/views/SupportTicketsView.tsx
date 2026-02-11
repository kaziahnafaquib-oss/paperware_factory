import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, Search, Filter, Clock, CheckCircle2, AlertTriangle, 
  User, Mail, Phone, MessageSquare, Tag, Calendar, Download,
  Eye, Edit2, Trash2, Send, X, UserPlus, FileText, ExternalLink,
  TrendingUp, Users, Archive, RefreshCw, MessageCircle
} from "lucide-react";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
  phone?: string;
  hasWhatsApp?: boolean;
  attachment?: {
    name: string;
    size: number;
  };
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assignedTo?: string;
  submittedBy: {
    name: string;
    email: string;
    company?: string;
  };
  submittedAt: string;
  lastUpdated: string;
  responses: Array<{
    id: string;
    from: string;
    message: string;
    timestamp: string;
  }>;
  tags: string[];
}

export function SupportTicketsView() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Load tickets from localStorage
  useEffect(() => {
    const loadTickets = () => {
      try {
        const savedTickets = localStorage.getItem("supportTickets");
        if (savedTickets) {
          const parsedTickets = JSON.parse(savedTickets);
          setTickets(parsedTickets);
        }
      } catch (error) {
        console.error("Failed to load tickets:", error);
        toast.error("Failed to load tickets");
      }
    };

    loadTickets();
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(loadTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  // Statistics
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    resolved: tickets.filter(t => t.status === "Resolved").length,
    high: tickets.filter(t => t.priority === "High" || t.priority === "Urgent").length,
  };

  // Filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.submittedBy.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Update ticket status
  const updateTicketStatus = (ticketId: string, newStatus: SupportTicket["status"]) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  // Assign ticket to admin
  const assignTicket = (ticketId: string) => {
    const adminName = prompt("Enter admin name to assign:");
    if (!adminName) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          assignedTo: adminName,
          status: "In Progress" as const,
          lastUpdated: new Date().toISOString(),
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    toast.success(`Ticket assigned to ${adminName}`);
  };

  // Send reply
  const sendReply = () => {
    if (!selectedTicket || !replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    const newResponse = {
      id: Date.now().toString(),
      from: "Support Team",
      message: replyMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          responses: [...ticket.responses, newResponse],
          lastUpdated: new Date().toISOString(),
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setReplyMessage("");
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
    });
    toast.success("Reply sent successfully!");
  };

  // Delete ticket
  const deleteTicket = (ticketId: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    const updatedTickets = tickets.filter(t => t.id !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setSelectedTicket(null);
    toast.success("Ticket deleted successfully");
  };

  // Export tickets to CSV
  const exportTickets = () => {
    const csvData = [
      ["Ticket Number", "Subject", "Category", "Priority", "Status", "Submitted By", "Email", "Submitted At", "Assigned To"],
      ...filteredTickets.map(ticket => [
        ticket.ticketNumber,
        ticket.subject,
        ticket.category,
        ticket.priority,
        ticket.status,
        ticket.submittedBy.name,
        ticket.submittedBy.email,
        new Date(ticket.submittedAt).toLocaleDateString(),
        ticket.assignedTo || "Unassigned",
      ])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `support-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Tickets exported successfully!");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-700 border-red-300";
      case "High": return "bg-orange-100 text-orange-700 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Low": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-zinc-100 text-zinc-700 border-zinc-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-700 border-blue-300";
      case "In Progress": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Resolved": return "bg-green-100 text-green-700 border-green-300";
      case "Closed": return "bg-zinc-100 text-zinc-700 border-zinc-300";
      default: return "bg-zinc-100 text-zinc-700 border-zinc-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 border-2 border-zinc-200 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <Ticket className="size-8 text-blue-600" />
            <TrendingUp className="size-5 text-green-500" />
          </div>
          <p className="text-3xl font-black text-zinc-900 mb-1">{stats.total}</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Tickets</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="size-8 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-blue-600 mb-1">{stats.open}</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Open</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <Clock className="size-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-black text-yellow-600 mb-1">{stats.inProgress}</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">In Progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <p className="text-3xl font-black text-green-600 mb-1">{stats.resolved}</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Resolved</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="size-8 text-red-600" />
          </div>
          <p className="text-3xl font-black text-red-600 mb-1">{stats.high}</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">High Priority</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-6 border-2 border-zinc-200 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets, customers, emails..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <button
              onClick={exportTickets}
              className="px-4 py-2.5 bg-[#fabf37] text-black rounded-lg hover:bg-[#e5a820] transition-all text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <Download className="size-4" />
              Export CSV
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <RefreshCw className="size-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-2xl border-2 border-zinc-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b-2 border-zinc-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-black text-zinc-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <Ticket className="size-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-zinc-500">No tickets found</p>
                    <p className="text-xs text-zinc-400 mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-4 text-blue-600" />
                        <span className="text-sm font-black text-zinc-900">{ticket.ticketNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-zinc-900 truncate max-w-xs">{ticket.subject}</p>
                      <p className="text-xs text-zinc-500 mt-1">{ticket.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="size-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{ticket.submittedBy.name}</p>
                          <p className="text-xs text-zinc-500">{ticket.submittedBy.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-zinc-700">{ticket.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority === "Urgent" || ticket.priority === "High" ? (
                          <AlertTriangle className="size-3" />
                        ) : null}
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ticket.assignedTo ? (
                        <span className="text-xs font-bold text-zinc-700">{ticket.assignedTo}</span>
                      ) : (
                        <button
                          onClick={() => assignTicket(ticket.id)}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <UserPlus className="size-3" />
                          Assign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <Calendar className="size-3" />
                        {new Date(ticket.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                          title="View Details"
                        >
                          <Eye className="size-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => deleteTicket(ticket.id)}
                          className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10001]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-white rounded-2xl shadow-2xl z-[10002] max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Ticket className="size-6 text-blue-600" />
                      <h3 className="text-xl font-black text-zinc-900">{selectedTicket.ticketNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-zinc-600">{selectedTicket.subject}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="size-8 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 transition-all flex items-center justify-center"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                    <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-2">Customer</p>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900">{selectedTicket.submittedBy.name}</p>
                        <p className="text-xs text-zinc-600">{selectedTicket.submittedBy.email}</p>
                        {selectedTicket.submittedBy.company && (
                          <p className="text-xs text-zinc-500 mt-0.5">🏢 {selectedTicket.submittedBy.company}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                    <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-2">Details</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Tag className="size-4 text-zinc-500" />
                        <span className="text-xs font-bold text-zinc-700">{selectedTicket.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="size-4 text-zinc-500" />
                        <span className={`px-2 py-0.5 rounded text-xs font-black ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                      {selectedTicket.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="size-4 text-zinc-500" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-700">{selectedTicket.phone}</span>
                            {selectedTicket.hasWhatsApp && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded-full">
                                <MessageCircle className="size-3 text-green-600" />
                                <span className="text-[9px] font-black text-green-700 uppercase tracking-wider">WhatsApp</span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-zinc-500" />
                        <span className="text-xs font-bold text-zinc-700">
                          {new Date(selectedTicket.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3">Original Message</p>
                  <p className="text-sm text-zinc-700 leading-relaxed">{selectedTicket.message}</p>
                  
                  {selectedTicket.attachment && (
                    <div className="mt-4 flex items-center gap-2 p-3 bg-white rounded-lg border border-zinc-200">
                      <FileText className="size-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-zinc-900">{selectedTicket.attachment.name}</p>
                        <p className="text-xs text-zinc-500">{(selectedTicket.attachment.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
                        <Download className="size-4 text-blue-600" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Responses */}
                {selectedTicket.responses.length > 0 && (
                  <div>
                    <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3">Responses ({selectedTicket.responses.length})</p>
                    <div className="space-y-3">
                      {selectedTicket.responses.map((response) => (
                        <div key={response.id} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-black text-blue-900">{response.from}</p>
                            <p className="text-xs text-blue-600">{new Date(response.timestamp).toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-zinc-700">{response.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3">Send Reply</p>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={sendReply}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs font-black uppercase tracking-wider flex items-center gap-2"
                    >
                      <Send className="size-4" />
                      Send Reply
                    </button>
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "Resolved")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-xs font-black uppercase tracking-wider flex items-center gap-2"
                    >
                      <CheckCircle2 className="size-4" />
                      Mark Resolved
                    </button>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2">
                  <p className="w-full text-xs font-black text-zinc-500 uppercase tracking-wider mb-2">Change Status:</p>
                  {["Open", "In Progress", "Resolved", "Closed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateTicketStatus(selectedTicket.id, status as SupportTicket["status"])}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        selectedTicket.status === status
                          ? "bg-zinc-800 text-white"
                          : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
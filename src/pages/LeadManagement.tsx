import { useState, useMemo, useEffect } from 'react';
import { Lead, LeadFilters } from '@/types/lead';
import { mockLeads } from '@/data/mockLeads';
import { LeadCard } from '@/components/LeadCard';
import { LeadModal } from '@/components/LeadModal';
import { AddLeadModal } from '@/components/AddLeadModal';
import { LeadStats } from '@/components/LeadStats';
import { BulkActions } from '@/components/BulkActions';
import { LeadStatsLoading, LeadListLoading } from '@/components/LoadingStates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  UserCheck, 
  UserX,
  Clock,
  SlidersHorizontal,
  Download
} from 'lucide-react';

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [earningsFilter, setEarningsFilter] = useState('all');
  const [contactFilter, setContactFilter] = useState('all');
  const { toast } = useToast();

  const [filters, setFilters] = useState<LeadFilters>({
    timeframe: 'all',
    earnings: 'all',
    searchQuery: '',
  });

  // Listen for the custom event to open add lead modal
  useEffect(() => {
    const handleOpenAddLead = () => {
      setIsAddModalOpen(true);
    };

    window.addEventListener('openAddLeadModal', handleOpenAddLead);
    
    return () => {
      window.removeEventListener('openAddLeadModal', handleOpenAddLead);
    };
  }, []);

  // Enhanced filtering with new filter states
  const filterLeads = (leadList: Lead[], status: 'pending' | 'signed' | 'dead') => {
    return leadList.filter(lead => {
      // Status filter
      if (lead.status !== status) return false;

      // Search filter
      const searchQuery = searchTerm || filters.searchQuery;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = lead.fullName.toLowerCase().includes(query);
        const matchesInstagram = lead.instagramHandle.toLowerCase().includes(query);
        if (!matchesName && !matchesInstagram) return false;
      }

      // Earnings filter
      const earningsFilterValue = earningsFilter !== 'all' ? earningsFilter : filters.earnings;
      if (earningsFilterValue === '100k+' && lead.onlyFansEarnings < 100000) return false;
      if (earningsFilterValue === '50k+' && lead.onlyFansEarnings < 50000) return false;
      if (earningsFilterValue === '25k+' && lead.onlyFansEarnings < 25000) return false;

      // Contact filter (only for pending leads)
      if (status === 'pending') {
        const contactFilterValue = contactFilter !== 'all' ? contactFilter : filters.timeframe;
        if (contactFilterValue !== 'all') {
          const daysSinceContact = Math.floor(
            (Date.now() - lead.lastTimeSpokenTo.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          switch (contactFilterValue) {
            case '7+':
            case '7days':
              if (daysSinceContact < 7) return false;
              break;
            case '14+':
            case '14days':
              if (daysSinceContact < 14) return false;
              break;
            case '30+':
            case '30days':
              if (daysSinceContact < 30) return false;
              break;
          }
        }
      }

      return true;
    });
  };

  const pendingLeads = useMemo(() => filterLeads(leads, 'pending'), [leads, filters]);
  const signedLeads = useMemo(() => filterLeads(leads, 'signed'), [leads, filters]);
  const deadLeads = useMemo(() => filterLeads(leads, 'dead'), [leads, filters]);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

  const handleStatusChange = (leadId: string, newStatus: 'signed' | 'dead') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLeads(prev => prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus }
          : lead
      ));
      
      setIsLoading(false);
      toast({
        title: "Lead Updated",
        description: `Lead has been marked as ${newStatus}.`,
      });
    }, 500);
  };

  const handleAddLead = (leadData: Omit<Lead, 'id' | 'lastTimeSpokenTo' | 'status' | 'conversationTimeline'>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newLead: Lead = {
        ...leadData,
        id: Date.now().toString(),
        lastTimeSpokenTo: new Date(),
        status: 'pending',
        conversationTimeline: [
          {
            id: `${Date.now()}-1`,
            date: new Date(),
            dealStatus: 'Lead Added',
            notes: 'New lead added to system'
          }
        ]
      };
      
      setLeads(prev => [newLead, ...prev]);
      setIsLoading(false);
      toast({
        title: "Lead Added",
        description: `${newLead.fullName} has been added successfully.`,
      });
    }, 500);
  };

  // Bulk actions
  const handleSelectAll = () => {
    const currentLeads = getCurrentTabLeads();
    setSelectedLeadIds(new Set(currentLeads.map(lead => lead.id)));
  };

  const handleDeselectAll = () => {
    setSelectedLeadIds(new Set());
  };

  const handleLeadSelection = (leadId: string, selected: boolean) => {
    const newSelection = new Set(selectedLeadIds);
    if (selected) {
      newSelection.add(leadId);
    } else {
      newSelection.delete(leadId);
    }
    setSelectedLeadIds(newSelection);
  };

  const handleBulkStatusChange = (newStatus: 'signed' | 'dead') => {
    setIsLoading(true);
    
    setTimeout(() => {
      setLeads(prev => prev.map(lead => 
        selectedLeadIds.has(lead.id) 
          ? { ...lead, status: newStatus }
          : lead
      ));
      
      setSelectedLeadIds(new Set());
      setIsLoading(false);
      toast({
        title: "Bulk Update Complete",
        description: `${selectedLeadIds.size} leads updated to ${newStatus}.`,
      });
    }, 1000);
  };

  const handleBulkDelete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setLeads(prev => prev.filter(lead => !selectedLeadIds.has(lead.id)));
      setSelectedLeadIds(new Set());
      setIsLoading(false);
      toast({
        title: "Leads Deleted",
        description: `${selectedLeadIds.size} leads have been deleted.`,
        variant: "destructive"
      });
    }, 1000);
  };

  const handleBulkExport = () => {
    const selectedLeads = leads.filter(lead => selectedLeadIds.has(lead.id));
    
    // Simple CSV export
    const csvData = selectedLeads.map(lead => ({
      name: lead.fullName,
      instagram: lead.instagramHandle,
      earnings: lead.onlyFansEarnings,
      status: lead.status
    }));
    
    console.log('Exporting leads:', csvData);
    
    toast({
      title: "Export Complete",
      description: `${selectedLeads.length} leads exported successfully.`,
    });
  };

  const getCurrentTabLeads = () => {
    switch (activeTab) {
      case 'signed': return signedLeads;
      case 'dead': return deadLeads;
      default: return pendingLeads;
    }
  };

  const resetFilters = () => {
    setFilters({
      timeframe: 'all',
      earnings: 'all',
      searchQuery: '',
    });
  };

  return (
    <div className="container mx-auto py-8 px-6 md:px-10 max-w-screen-2xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-heading tracking-tight">
              <span className="bg-gradient-accent bg-clip-text text-transparent">Lead Management</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Comprehensive CRM dashboard for managing your recruiting pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              size="lg"
              className="bg-card/50 hover:bg-accent/50 border-border/30 hover:border-primary/50"
            >
              <Download className="h-5 w-5 mr-2" />
              Export All
            </Button>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              size="lg"
              className="bg-gradient-accent hover:scale-105 hover:shadow-primary text-primary-foreground shadow-xl px-8 py-3 text-base font-bold rounded-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      {isLoading ? <LeadStatsLoading /> : <LeadStats leads={leads} />}

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedLeadIds.size}
        totalCount={getCurrentTabLeads().length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkExport={handleBulkExport}
      />

      {/* Search and Filters */}
      <div className="mb-8 bg-gradient-card backdrop-blur-xl rounded-3xl p-8 border border-border/20 shadow-glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glass backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Advanced Filters</h3>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6 group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  placeholder="Search leads by name or Instagram handle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 h-14 text-lg bg-card/80 backdrop-blur-sm border-border/30 focus:bg-card/90 focus:border-primary/60 font-medium shadow-md rounded-2xl transition-all duration-300 focus:shadow-primary"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={earningsFilter} onValueChange={setEarningsFilter}>
                <SelectTrigger className="w-56 h-14 bg-card/80 backdrop-blur-sm border-border/30 focus:border-primary/60 shadow-md rounded-2xl transition-all duration-300 hover:shadow-lg">
                  <Filter className="h-5 w-5 text-primary mr-3" />
                  <SelectValue placeholder="Earnings filter" />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border/30 shadow-xl rounded-2xl z-50">
                  <SelectItem value="all">All Earnings</SelectItem>
                  <SelectItem value="100k+">$100k+/month</SelectItem>
                  <SelectItem value="50k+">$50k+/month</SelectItem>
                  <SelectItem value="25k+">$25k+/month</SelectItem>
                </SelectContent>
              </Select>

              <Select value={contactFilter} onValueChange={setContactFilter}>
                <SelectTrigger className="w-56 h-14 bg-card/80 backdrop-blur-sm border-border/30 focus:border-primary/60 shadow-md rounded-2xl transition-all duration-300 hover:shadow-lg">
                  <Clock className="h-5 w-5 text-accent-purple mr-3" />
                  <SelectValue placeholder="Last contact" />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border/30 shadow-xl rounded-2xl z-50">
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="7+">7+ days ago</SelectItem>
                  <SelectItem value="14+">14+ days ago</SelectItem>
                  <SelectItem value="30+">30+ days ago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs with Statistics */}
      <div className="bg-gradient-card backdrop-blur-xl rounded-3xl border border-border/20 shadow-glass overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glass"></div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
          <TabsList className="grid w-full grid-cols-3 mb-0 h-20 p-4 bg-muted/20 backdrop-blur-sm">
            <TabsTrigger 
              value="pending" 
              className="flex items-center gap-4 px-8 py-4 data-[state=active]:bg-gradient-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-primary transition-all duration-300 font-bold text-lg rounded-2xl hover:scale-105"
            >
              <Users className="h-6 w-6" />
              Pending
              <Badge variant="secondary" className="ml-2 font-bold px-3 py-1 text-sm bg-card/80 text-card-foreground">
                {pendingLeads.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="signed" 
              className="flex items-center gap-4 px-8 py-4 data-[state=active]:bg-success data-[state=active]:text-success-foreground data-[state=active]:shadow-lg transition-all duration-300 font-bold text-lg rounded-2xl hover:scale-105"
            >
              <UserCheck className="h-6 w-6" />
              Signed
              <Badge variant="secondary" className="ml-2 font-bold px-3 py-1 text-sm bg-card/80 text-card-foreground">
                {signedLeads.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="dead" 
              className="flex items-center gap-4 px-8 py-4 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground data-[state=active]:shadow-lg transition-all duration-300 font-bold text-lg rounded-2xl hover:scale-105"
            >
              <UserX className="h-6 w-6" />
              Dead
              <Badge variant="secondary" className="ml-2 font-bold px-3 py-1 text-sm bg-card/80 text-card-foreground">
                {deadLeads.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content with Enhanced Loading States */}
          <TabsContent value="pending" className="space-y-6 p-8">
            {isLoading ? (
              <LeadListLoading />
            ) : pendingLeads.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-primary">
                  <Users className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">No pending leads found</h3>
                <p className="text-muted-foreground text-xl max-w-md mx-auto mb-8">
                  {searchTerm || earningsFilter !== 'all' || contactFilter !== 'all'
                    ? 'Try adjusting your filters or search query to see more results.'
                    : 'Add your first lead to get started with your recruiting pipeline.'
                  }
                </p>
                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-accent hover:scale-105 text-primary-foreground shadow-xl px-8 py-3 font-bold rounded-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Lead
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {pendingLeads.map((lead, index) => (
                  <div key={lead.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <LeadCard
                      lead={lead}
                      showLastContact={true}
                      isSelected={selectedLeadIds.has(lead.id)}
                      onSelectionChange={(selected) => handleLeadSelection(lead.id, selected)}
                      onClick={() => handleLeadClick(lead)}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="signed" className="space-y-6 p-8">
            {isLoading ? (
              <LeadListLoading />
            ) : signedLeads.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <UserCheck className="h-12 w-12 text-success-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">No signed leads found</h3>
                <p className="text-muted-foreground text-xl max-w-md mx-auto">
                  Signed leads will appear here when you convert pending leads to successful contracts.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {signedLeads.map((lead, index) => (
                  <div key={lead.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <LeadCard
                      lead={lead}
                      showLastContact={false}
                      isSelected={selectedLeadIds.has(lead.id)}
                      onSelectionChange={(selected) => handleLeadSelection(lead.id, selected)}
                      onClick={() => handleLeadClick(lead)}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="dead" className="space-y-6 p-8">
            {isLoading ? (
              <LeadListLoading />
            ) : deadLeads.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-24 h-24 bg-destructive rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <UserX className="h-12 w-12 text-destructive-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">No dead leads found</h3>
                <p className="text-muted-foreground text-xl max-w-md mx-auto">
                  Dead leads will appear here when prospects are marked as not interested or unresponsive.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {deadLeads.map((lead, index) => (
                  <div key={lead.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <LeadCard
                      lead={lead}
                      showLastContact={false}
                      isSelected={selectedLeadIds.has(lead.id)}
                      onSelectionChange={(selected) => handleLeadSelection(lead.id, selected)}
                      onClick={() => handleLeadClick(lead)}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Modals */}
      <LeadModal
        lead={selectedLead}
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedLead(null);
        }}
        onStatusChange={handleStatusChange}
      />

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLead}
      />
    </div>
  );
};

export default LeadManagement;
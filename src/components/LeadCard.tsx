import { Lead } from '@/types/lead';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface LeadCardProps {
  lead: Lead;
  showLastContact?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  onClick: () => void;
}

export const LeadCard = ({ lead, showLastContact = true, isSelected = false, onSelectionChange, onClick }: LeadCardProps) => {
  const formatEarnings = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const getEarningsBadgeVariant = (earnings: number) => {
    if (earnings >= 100000) return 'default';
    if (earnings >= 50000) return 'secondary';
    return 'outline';
  };

  return (
    <Card 
      className={`group p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 bg-gradient-card backdrop-blur-xl border-border/20 hover:bg-card-hover animate-fade-in hover:scale-[1.02] relative overflow-hidden ${
        isSelected ? 'ring-2 ring-primary shadow-primary' : 'cursor-pointer'
      }`}
      onClick={!onSelectionChange ? onClick : undefined}
    >
      {/* Ultra Modern Glass Effect */}
      <div className="absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-6">
          {/* Selection Checkbox */}
          {onSelectionChange && (
            <div className="flex-shrink-0">
              <Checkbox
                checked={isSelected}
                onCheckedChange={onSelectionChange}
                className="h-5 w-5 border-2 border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-border/30 group-hover:ring-primary/30 transition-all duration-500 shadow-lg">
              <AvatarImage src={lead.profilePicture} alt={lead.fullName} className="object-cover" />
              <AvatarFallback className="bg-gradient-accent text-primary-foreground font-bold text-2xl">
                {lead.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-success rounded-full border-4 border-card shadow-md"></div>
          </div>
          
          <div className="flex-1 min-w-0" onClick={onClick}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-xl text-card-foreground truncate group-hover:text-primary transition-colors duration-500 font-heading">
                  {lead.fullName}
                </h3>
                <p className="text-base text-muted-foreground truncate font-medium mt-1">
                  {lead.instagramHandle}
                </p>
              </div>
              <Badge 
                variant={getEarningsBadgeVariant(lead.onlyFansEarnings)}
                className="shadow-lg font-bold px-4 py-2 text-sm rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-primary transition-all duration-300"
              >
                {formatEarnings(lead.onlyFansEarnings)}/mo
              </Badge>
            </div>
            
            {showLastContact && (
              <div className="flex items-center gap-3 mt-4">
                <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse"></div>
                <p className="text-sm text-muted-foreground font-semibold">
                  Last contact: {formatDistanceToNow(lead.lastTimeSpokenTo, { addSuffix: true })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
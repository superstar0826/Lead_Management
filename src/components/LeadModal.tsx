import { Lead } from '@/types/lead';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Phone, Instagram, User, DollarSign } from 'lucide-react';

interface LeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: 'signed' | 'dead') => void;
}

export const LeadModal = ({ lead, isOpen, onClose, onStatusChange }: LeadModalProps) => {
  if (!lead) return null;

  const formatEarnings = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const showActionButtons = lead.status === 'pending';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-card/95 backdrop-blur-xl border-border/20 shadow-glass rounded-3xl animate-scale-in">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-card-foreground font-heading tracking-tight">
            Lead Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-6">
          <div className="space-y-8 animate-fade-in">
            {/* Lead Info Header */}
            <div className="flex items-start space-x-6 p-6 bg-gradient-muted rounded-xl border border-border/30">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-primary/10 shadow-lg">
                  <AvatarImage src={lead.profilePicture} alt={lead.fullName} className="object-cover" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-2xl">
                    {lead.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-3 border-card shadow-sm"></div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-card-foreground mb-2 font-heading">
                  {lead.fullName}
                </h2>
                <div className="flex items-center gap-6 text-base text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5" />
                    <span className="font-medium">{lead.instagramHandle}</span>
                  </div>
                  {lead.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">{lead.phoneNumber}</span>
                    </div>
                  )}
                </div>
                <Badge 
                  variant={lead.onlyFansEarnings >= 100000 ? 'default' : 'secondary'}
                  className="text-base px-4 py-2 font-bold shadow-md"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  {formatEarnings(lead.onlyFansEarnings)}/month
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Lead Details */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-card/50 rounded-xl border border-border/30">
              <div>
                <label className="font-semibold text-card-foreground text-sm uppercase tracking-wider">Talking To:</label>
                <p className="text-muted-foreground font-medium mt-1">{lead.whosTalkingTo}</p>
              </div>
              
              {lead.currentlySignedTo && (
                <div>
                  <label className="font-semibold text-card-foreground text-sm uppercase tracking-wider">Currently Signed To:</label>
                  <p className="text-muted-foreground font-medium mt-1">{lead.currentlySignedTo}</p>
                </div>
              )}
              
              {lead.referredBy && (
                <div>
                  <label className="font-semibold text-card-foreground text-sm uppercase tracking-wider">Referred By:</label>
                  <p className="text-muted-foreground font-medium mt-1">{lead.referredBy}</p>
                </div>
              )}
              
              <div>
                <label className="font-semibold text-card-foreground text-sm uppercase tracking-wider">Last Contact:</label>
                <p className="text-muted-foreground font-medium mt-1">
                  {formatDistanceToNow(lead.lastTimeSpokenTo, { addSuffix: true })}
                </p>
              </div>
            </div>

            {lead.notes && (
              <div className="p-6 bg-accent/30 rounded-xl border border-border/30">
                <label className="font-semibold text-card-foreground block mb-3 text-sm uppercase tracking-wider">Notes:</label>
                <p className="text-card-foreground leading-relaxed font-medium">
                  {lead.notes}
                </p>
              </div>
            )}

            <Separator />

            {/* Conversation Timeline */}
            <div>
              <h3 className="font-bold text-card-foreground mb-4 text-lg font-heading">Conversation Timeline</h3>
              <div className="space-y-4">
                {lead.conversationTimeline.map((entry, index) => (
                  <div key={entry.id} className="relative bg-gradient-surface p-5 rounded-xl border border-border/30 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-card-foreground text-base">
                        {entry.dealStatus}
                      </span>
                      <span className="text-sm text-muted-foreground font-medium px-3 py-1 bg-muted rounded-full">
                        {format(entry.date, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-muted-foreground leading-relaxed">{entry.notes}</p>
                    )}
                    {index < lead.conversationTimeline.length - 1 && (
                      <div className="absolute left-0 bottom-0 w-px h-4 bg-border translate-y-full ml-5"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        {showActionButtons && (
          <div className="flex justify-end gap-4 pt-6 border-t border-border/30">
            <Button
              variant="outline"
              onClick={() => {
                onStatusChange(lead.id, 'dead');
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-card/50 hover:bg-destructive/5 hover:border-destructive/50 hover:text-destructive transition-all duration-200 font-semibold"
            >
              <XCircle className="h-5 w-5" />
              Mark as Dead
            </Button>
            <Button
              onClick={() => {
                onStatusChange(lead.id, 'signed');
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-success-hover text-success-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              <CheckCircle className="h-5 w-5" />
              Mark as Signed
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
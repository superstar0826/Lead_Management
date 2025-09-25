import { useState } from 'react';
import { Lead } from '@/types/lead';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User } from 'lucide-react';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (lead: Omit<Lead, 'id' | 'lastTimeSpokenTo' | 'status' | 'conversationTimeline'>) => void;
}

export const AddLeadModal = ({ isOpen, onClose, onAdd }: AddLeadModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: '',
    instagramHandle: '',
    phoneNumber: '',
    onlyFansEarnings: '',
    currentlySignedTo: '',
    referredBy: '',
    whosTalkingTo: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLead = {
      fullName: formData.fullName,
      profilePicture: formData.profilePicture || 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=400',
      instagramHandle: formData.instagramHandle.startsWith('@') 
        ? formData.instagramHandle 
        : `@${formData.instagramHandle}`,
      phoneNumber: formData.phoneNumber || undefined,
      onlyFansEarnings: parseInt(formData.onlyFansEarnings) || 0,
      currentlySignedTo: formData.currentlySignedTo || undefined,
      referredBy: formData.referredBy || undefined,
      whosTalkingTo: formData.whosTalkingTo,
      notes: formData.notes || undefined,
    };

    onAdd(newLead);
    
    // Reset form
    setFormData({
      fullName: '',
      profilePicture: '',
      instagramHandle: '',
      phoneNumber: '',
      onlyFansEarnings: '',
      currentlySignedTo: '',
      referredBy: '',
      whosTalkingTo: '',
      notes: '',
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-card/95 backdrop-blur-xl border-border/20 shadow-glass rounded-3xl animate-scale-in">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-card-foreground font-heading tracking-tight">
            Add New Lead
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="max-h-[65vh] pr-6">
            <div className="space-y-6 animate-fade-in">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={formData.profilePicture} alt="Profile" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="profilePicture" className="text-sm font-medium">
                    Profile Picture URL
                  </Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.profilePicture}
                    onChange={(e) => handleInputChange('profilePicture', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramHandle" className="text-sm font-medium">
                    Instagram Handle *
                  </Label>
                  <Input
                    id="instagramHandle"
                    type="text"
                    placeholder="@username or username"
                    value={formData.instagramHandle}
                    onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="onlyFansEarnings" className="text-sm font-medium">
                    OnlyFans Monthly Earnings *
                  </Label>
                  <Input
                    id="onlyFansEarnings"
                    type="number"
                    placeholder="150000"
                    value={formData.onlyFansEarnings}
                    onChange={(e) => handleInputChange('onlyFansEarnings', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentlySignedTo" className="text-sm font-medium">
                    Currently Signed To
                  </Label>
                  <Input
                    id="currentlySignedTo"
                    type="text"
                    placeholder="Agency or Independent"
                    value={formData.currentlySignedTo}
                    onChange={(e) => handleInputChange('currentlySignedTo', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="referredBy" className="text-sm font-medium">
                    Referred By
                  </Label>
                  <Input
                    id="referredBy"
                    type="text"
                    placeholder="Referrer name"
                    value={formData.referredBy}
                    onChange={(e) => handleInputChange('referredBy', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whosTalkingTo" className="text-sm font-medium">
                  Who's Talking To *
                </Label>
                <Input
                  id="whosTalkingTo"
                  type="text"
                  placeholder="Team member name"
                  value={formData.whosTalkingTo}
                  onChange={(e) => handleInputChange('whosTalkingTo', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this lead..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-4 pt-8 border-t border-border/30 mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-6 py-3 bg-card/50 hover:bg-secondary-hover font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!formData.fullName || !formData.instagramHandle || !formData.whosTalkingTo}
              className="px-6 py-3 bg-gradient-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              Add Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
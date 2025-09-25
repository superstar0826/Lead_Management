import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  CheckSquare, 
  Square, 
  Trash2, 
  UserCheck, 
  UserX, 
  MoreVertical,
  Download,
  Mail,
  Phone
} from 'lucide-react'

interface BulkActionsProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onDeselectAll: () => void
  onBulkDelete: () => void
  onBulkStatusChange: (status: 'signed' | 'dead') => void
  onBulkExport: () => void
}

export const BulkActions = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onBulkDelete,
  onBulkStatusChange,
  onBulkExport
}: BulkActionsProps) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0
  const isPartialSelected = selectedCount > 0 && selectedCount < totalCount

  return (
    <div className="bg-gradient-card backdrop-blur-xl rounded-2xl p-4 border border-border/20 shadow-glass mb-6 animate-slide-in-up">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Select All Checkbox */}
          <Button
            variant="ghost"
            size="sm"
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
            className="h-auto p-2 hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            {isAllSelected ? (
              <CheckSquare className="h-5 w-5 text-primary" />
            ) : isPartialSelected ? (
              <div className="h-5 w-5 bg-primary/50 rounded border-2 border-primary flex items-center justify-center">
                <div className="h-2 w-2 bg-primary rounded"></div>
              </div>
            ) : (
              <Square className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>

          {/* Selection Info */}
          <div className="flex items-center gap-2">
            {selectedCount > 0 ? (
              <>
                <Badge variant="default" className="bg-primary text-primary-foreground font-semibold">
                  {selectedCount} selected
                </Badge>
                <span className="text-sm text-muted-foreground">
                  of {totalCount} leads
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground font-medium">
                Select leads to perform bulk actions
              </span>
            )}
          </div>
        </div>

        {/* Bulk Action Buttons */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="bg-card/50 hover:bg-accent/50 border-border/30 hover:border-primary/50 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkStatusChange('signed')}
              className="bg-success/10 hover:bg-success/20 border-success/30 text-success hover:text-success transition-all duration-200"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Mark Signed
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkStatusChange('dead')}
              className="bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive hover:text-destructive transition-all duration-200"
            >
              <UserX className="h-4 w-4 mr-2" />
              Mark Dead
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-card/50 hover:bg-accent/50 border-border/30 hover:border-primary/50 transition-all duration-200"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover backdrop-blur-xl border-border/30 shadow-xl rounded-xl z-50">
                <DropdownMenuItem className="hover:bg-accent/50 transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/50 transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onBulkDelete}
                  className="hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
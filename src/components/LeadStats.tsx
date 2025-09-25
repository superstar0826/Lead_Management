import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Activity
} from 'lucide-react'
import { useLeadStats } from '@/hooks/useLeadStats'
import { Lead } from '@/types/lead'

interface LeadStatsProps {
  leads: Lead[]
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const stats = useLeadStats(leads)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-gradient-accent',
      textColor: 'text-primary-foreground',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Signed Deals',
      value: stats.signedLeads,
      icon: UserCheck,
      color: 'bg-success',
      textColor: 'text-success-foreground',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-accent-purple',
      textColor: 'text-primary-foreground',
      change: '+2.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      change: '+23%',
      changeType: 'positive' as const
    },
    {
      title: 'High Value Leads',
      value: stats.highValueLeads,
      icon: Star,
      color: 'bg-gradient-primary',
      textColor: 'text-primary-foreground',
      change: '+5',
      changeType: 'positive' as const
    },
    {
      title: 'Recent Activity',
      value: stats.recentContacts,
      icon: Activity,
      color: 'bg-muted',
      textColor: 'text-muted-foreground',
      change: 'Last 7 days',
      changeType: 'neutral' as const
    },
    {
      title: 'Need Follow-up',
      value: stats.needsFollowUp,
      icon: Clock,
      color: 'bg-destructive',
      textColor: 'text-destructive-foreground',
      change: '7+ days',
      changeType: 'negative' as const
    },
    {
      title: 'Avg Earnings',
      value: formatCurrency(stats.averageEarnings),
      icon: DollarSign,
      color: 'bg-gradient-surface',
      textColor: 'text-card-foreground',
      change: '+15%',
      changeType: 'positive' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="p-6 bg-gradient-card backdrop-blur-xl border-border/20 shadow-glass hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in group cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-2xl font-bold text-card-foreground group-hover:scale-110 transition-transform duration-200">
                  {stat.value}
                </h3>
                {stat.changeType !== 'neutral' && (
                  <Badge 
                    variant="secondary"
                    className={`text-xs px-2 py-0.5 font-semibold ${
                      stat.changeType === 'positive' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                )}
                {stat.changeType === 'neutral' && (
                  <span className="text-xs text-muted-foreground font-medium">
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110`}>
              <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
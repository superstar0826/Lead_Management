import { useMemo } from 'react'
import { Lead } from '@/types/lead'

export const useLeadStats = (leads: Lead[]) => {
  const stats = useMemo(() => {
    const totalLeads = leads.length
    const pendingLeads = leads.filter(lead => lead.status === 'pending').length
    const signedLeads = leads.filter(lead => lead.status === 'signed').length
    const deadLeads = leads.filter(lead => lead.status === 'dead').length
    
    const conversionRate = totalLeads > 0 ? ((signedLeads / totalLeads) * 100) : 0
    
    const totalRevenue = leads
      .filter(lead => lead.status === 'signed')
      .reduce((sum, lead) => sum + lead.onlyFansEarnings, 0)
    
    const averageEarnings = signedLeads > 0 ? (totalRevenue / signedLeads) : 0
    
    const highValueLeads = leads.filter(lead => lead.onlyFansEarnings >= 100000).length
    
    // Recent activity (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    const recentContacts = leads.filter(lead => 
      lead.lastTimeSpokenTo >= weekAgo
    ).length
    
    const needsFollowUp = leads.filter(lead => {
      const daysSince = Math.floor(
        (Date.now() - lead.lastTimeSpokenTo.getTime()) / (1000 * 60 * 60 * 24)
      )
      return lead.status === 'pending' && daysSince >= 7
    }).length

    return {
      totalLeads,
      pendingLeads,
      signedLeads,
      deadLeads,
      conversionRate,
      totalRevenue,
      averageEarnings,
      highValueLeads,
      recentContacts,
      needsFollowUp
    }
  }, [leads])

  return stats
}
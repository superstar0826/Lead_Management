import { NavLink, useLocation } from "react-router-dom"
import { 
  Users, 
  BarChart3, 
  Settings, 
  Home,
  TrendingUp,
  Plus
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    badge: null
  },
  { 
    title: "Lead Management", 
    url: "/leads", 
    icon: Users,
    badge: "12"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    badge: null,
    disabled: true
  },
  { 
    title: "Pipeline", 
    url: "/pipeline", 
    icon: TrendingUp,
    badge: null,
    disabled: true
  }
]

const toolItems = [
  { 
    title: "Add Lead", 
    action: "add-lead",
    icon: Plus,
    badge: null
  }
]

const settingsItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    badge: null,
    disabled: true
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const isCollapsed = state === "collapsed"
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path === "/leads" && (location.pathname === "/" || location.pathname === "/leads")) return true
    return location.pathname === path
  }

  const handleAddLead = () => {
    // Trigger the add lead modal - we'll dispatch a custom event
    window.dispatchEvent(new CustomEvent('openAddLeadModal'))
  }

  const renderNavigationItems = (items: typeof navigationItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            {item.disabled ? (
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl text-muted-foreground/50 cursor-not-allowed opacity-50">
                <item.icon className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium text-muted-foreground text-sm">{item.title}</span>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted/50 text-muted-foreground">
                      Soon
                    </Badge>
                  </>
                )}
              </div>
            ) : (
              <NavLink 
                to={item.url}
                className={({ isActive: active }) => `
                  flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all duration-200 group
                  ${isActive(item.url) || active
                    ? 'bg-gradient-accent text-primary-foreground shadow-primary font-semibold' 
                    : 'hover:bg-accent/50 hover:scale-105 text-sidebar-foreground hover:text-primary'
                  }
                `}
              >
                <item.icon className={`h-4 w-4 ${isActive(item.url) ? 'text-primary-foreground' : 'text-sidebar-foreground group-hover:text-primary'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium text-sm">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-1.5 py-0.5 bg-card/80 text-card-foreground font-bold"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )

  const renderToolItems = (items: typeof toolItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <button
              onClick={handleAddLead}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group hover:bg-accent/50 hover:scale-105 text-sidebar-foreground hover:text-primary w-full text-left"
            >
              <item.icon className="h-5 w-5 text-sidebar-foreground group-hover:text-primary" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium text-foreground">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-card/80 text-card-foreground font-bold"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )

  const renderSettingsItems = (items: typeof settingsItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            {item.disabled ? (
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl text-muted-foreground/50 cursor-not-allowed opacity-50">
                <item.icon className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium text-muted-foreground text-sm">{item.title}</span>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted/50 text-muted-foreground">
                      Soon
                    </Badge>
                  </>
                )}
              </div>
            ) : (
              <NavLink 
                to={item.url}
                className={({ isActive: active }) => `
                  flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all duration-200 group
                  ${isActive(item.url) || active
                    ? 'bg-gradient-accent text-primary-foreground shadow-primary font-semibold' 
                    : 'hover:bg-accent/50 hover:scale-105 text-sidebar-foreground hover:text-primary'
                  }
                `}
              >
                <item.icon className={`h-4 w-4 ${isActive(item.url) ? 'text-primary-foreground' : 'text-sidebar-foreground group-hover:text-primary'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium text-sm">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-1.5 py-0.5 bg-card/80 text-card-foreground font-bold"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )

  return (
    <Sidebar className="border-r border-border/20 bg-sidebar backdrop-blur-xl z-50 text-sidebar-foreground">
      <SidebarContent className="p-2">
        {/* Logo Section */}
        <div className="mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-accent rounded-lg flex items-center justify-center shadow-lg">
              <Users className="h-3 w-3 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-sm bg-gradient-accent bg-clip-text text-transparent">
                  LeadCRM
                </h2>
                <p className="text-xs text-muted-foreground font-medium">Professional Suite</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderNavigationItems(navigationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">
            {!isCollapsed && "Quick Actions"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderToolItems(toolItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">
            {!isCollapsed && "System"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderSettingsItems(settingsItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile (Bottom) */}
        {!isCollapsed && (
          <div className="mt-auto p-2 bg-gradient-muted rounded-xl border border-border/20 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-primary-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
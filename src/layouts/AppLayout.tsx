import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Toaster } from "@/components/ui/toaster"

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background/98 to-primary/3">
        {/* Ultra Modern Background Effects */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-accent opacity-8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-purple/5 rounded-full blur-3xl"></div>
        </div>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Top Header */}
          <header className="h-16 border-b border-border/20 bg-card/80 backdrop-blur-xl flex items-center px-6 gap-4 sticky top-0 z-50">
            <SidebarTrigger className="hover:scale-110 transition-transform duration-200" />
            <div className="flex-1">
              <h1 className="text-lg font-bold bg-gradient-accent bg-clip-text text-transparent">
                CRM Dashboard
              </h1>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>

        <Toaster />
      </div>
    </SidebarProvider>
  )
}
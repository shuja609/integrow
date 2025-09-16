import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Home, 
  FolderOpen, 
  FileText, 
  GitBranch, 
  BarChart3, 
  TestTube, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Search
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
  onToggle?: () => void
}

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  badge?: string | number
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: "/dashboard"
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="h-4 w-4" />,
    href: "/projects",
    badge: "Soon"
  },
  {
    id: "requirements",
    label: "Requirements",
    icon: <FileText className="h-4 w-4" />,
    href: "/requirements",
    badge: "Soon",
    children: [
      { id: "req-analysis", label: "Analysis", icon: <BarChart3 className="h-3 w-3" /> },
      { id: "req-review", label: "Review", icon: <FileText className="h-3 w-3" /> },
    ]
  },
  {
    id: "uml",
    label: "UML Diagrams",
    icon: <GitBranch className="h-4 w-4" />,
    href: "/uml",
    badge: "Soon"
  },
  {
    id: "analysis",
    label: "Code Analysis",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/analysis",
    badge: "Soon"
  },
  {
    id: "testing",
    label: "Testing",
    icon: <TestTube className="h-4 w-4" />,
    href: "/testing",
    badge: "Soon"
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "/settings",
    badge: "Soon"
  }
]

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed = false, onToggle, ...props }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>([])
    
    const toggleExpanded = (itemId: string) => {
      setExpandedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    }

    const renderSidebarItem = (item: SidebarItem, level = 0) => {
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = expandedItems.includes(item.id)
      
      return (
        <div key={item.id} className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-9 px-3",
              level > 0 && "ml-4 h-8 text-xs",
              collapsed && level === 0 && "justify-center px-2"
            )}
            onClick={() => hasChildren && toggleExpanded(item.id)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                {item.icon}
                {(!collapsed || level > 0) && (
                  <span className="text-sm">{item.label}</span>
                )}
              </div>
              
              {!collapsed && (
                <div className="flex items-center space-x-1">
                  {item.badge && (
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      typeof item.badge === 'number' 
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {hasChildren && (
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                  )}
                </div>
              )}
            </div>
          </Button>
          
          {hasChildren && isExpanded && !collapsed && (
            <div className="space-y-1">
              {item.children!.map(child => renderSidebarItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IG</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">InteGrow</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="p-4 space-y-2">
            <Button size="sm" className="w-full justify-start gap-2" disabled>
              <Plus className="h-4 w-4" />
              New Project
              <Badge variant="outline" className="text-xs ml-auto">Soon</Badge>
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-8 pl-9 pr-3 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                disabled
              />
              <Badge variant="outline" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">Soon</Badge>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && (
            <Card className="bg-sidebar-accent/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <p>3 projects analyzed today</p>
                <p className="mt-1 text-primary">View insights →</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }

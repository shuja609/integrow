'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Sidebar } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BarChart3, 
  Users, 
  GitBranch, 
  FileText, 
  TestTube, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  Brain,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  Zap,
  Target
} from 'lucide-react'

function IndexPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  
  // Sample data for the dashboard
  const metrics = [
    {
      title: "Active Projects",
      value: "12",
      description: "3 new this month",
      icon: <FileText className="h-4 w-4" />,
      trend: { value: 25, label: "from last month", isPositive: true },
      variant: "primary" as const
    },
    {
      title: "Code Quality Score",
      value: "94.2%",
      description: "Above industry average",
      icon: <BarChart3 className="h-4 w-4" />,
      trend: { value: 5.2, label: "improvement", isPositive: true },
      variant: "primary" as const
    },
    {
      title: "Technical Debt",
      value: "2.3h",
      description: "Estimated fix time",
      icon: <AlertTriangle className="h-4 w-4" />,
      trend: { value: 12, label: "reduced", isPositive: true },
      variant: "secondary" as const
    },
    {
      title: "Test Coverage",
      value: "87%",
      description: "Across all projects",
      icon: <TestTube className="h-4 w-4" />,
      trend: { value: 8, label: "increase", isPositive: true },
      variant: "accent" as const
    }
  ]

  const recentProjects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      status: "In Progress",
      progress: 75,
      team: ["JD", "SM", "KR"],
      lastActivity: "2 hours ago",
      aiInsights: "3 optimization suggestions"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      status: "Under Review",
      progress: 90,
      team: ["AL", "TR"],
      lastActivity: "1 day ago",
      aiInsights: "Security scan complete"
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      status: "Planning",
      progress: 25,
      team: ["MS", "JL", "CR", "BT"],
      lastActivity: "3 days ago",
      aiInsights: "Requirements analyzed"
    }
  ]

  const aiInsights = [
    {
      type: "optimization",
      title: "Code Optimization Opportunity",
      description: "Found 5 functions that can be optimized in UserService.ts",
      severity: "medium",
      estimatedImpact: "15% performance improvement"
    },
    {
      type: "security",
      title: "Security Vulnerability Detected",
      description: "Potential SQL injection in authentication module",
      severity: "high",
      estimatedImpact: "Critical security risk"
    },
    {
      type: "testing",
      title: "Low Test Coverage",
      description: "PaymentController needs additional unit tests",
      severity: "low",
      estimatedImpact: "Improved reliability"
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your projects.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="gap-2" disabled>
                <Filter className="h-4 w-4" />
                Filter
                <Badge variant="secondary" className="text-xs ml-1">Soon</Badge>
              </Button>
              <Button size="sm" className="gap-2" disabled>
                <Plus className="h-4 w-4" />
                New Project
                <Badge variant="secondary" className="text-xs ml-1">Soon</Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Metrics Overview */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  description={metric.description}
                  icon={metric.icon}
                  trend={metric.trend}
                  variant={metric.variant}
                />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Projects */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recent Projects
                    </CardTitle>
                    <CardDescription>
                      Your latest project activities and progress
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                    <Badge variant="outline" className="text-xs ml-2">Soon</Badge>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{project.name}</h4>
                          <Badge variant={
                            project.status === 'In Progress' ? 'default' :
                            project.status === 'Under Review' ? 'secondary' : 'outline'
                          }>
                            {project.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1">
                              {project.team.map((member, idx) => (
                                <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">{member}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-muted-foreground">
                              {project.team.length} members
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Brain className="h-3 w-3" />
                              <span className="text-xs">{project.aiInsights}</span>
                              <Badge variant="outline" className="text-xs ml-1">Soon</Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{project.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* AI Insights */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>
                    Intelligent recommendations for your projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="space-y-2 p-3 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {insight.type === 'optimization' && <Target className="h-4 w-4 text-blue-500" />}
                          {insight.type === 'security' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          {insight.type === 'testing' && <TestTube className="h-4 w-4 text-yellow-500" />}
                          <Badge variant={
                            insight.severity === 'high' ? 'destructive' :
                            insight.severity === 'medium' ? 'default' : 'secondary'
                          } className="text-xs">
                            {insight.severity}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" disabled>
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-foreground">{insight.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                        <p className="text-xs text-primary mt-2 font-medium">{insight.estimatedImpact}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    View All Insights
                    <Badge variant="outline" className="text-xs ml-2">Soon</Badge>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Quick Actions */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts for your workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2" disabled>
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">New Requirements</span>
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" disabled>
                    <GitBranch className="h-6 w-6" />
                    <span className="text-sm">Generate UML</span>
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" disabled>
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">Run Analysis</span>
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" disabled>
                    <TestTube className="h-6 w-6" />
                    <span className="text-sm">Generate Tests</span>
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

export default IndexPage

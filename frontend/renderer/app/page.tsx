import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Github, Mail, Star, Download, Play, Code } from 'lucide-react'
import ContactForm from '../components/contact-form'

function IndexPage() {
  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Intelligent insights and predictive analytics for your business",
      icon: <Star className="h-6 w-6 text-primary" />
    },
    {
      title: "Cross-Platform",
      description: "Desktop and web application for seamless access",
      icon: <Code className="h-6 w-6 text-primary" />
    },
    {
      title: "Real-time Intelligence",
      description: "Live data processing and instant business insights",
      icon: <Play className="h-6 w-6 text-primary" />
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Avatar and Title */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="App Logo" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                InteGrow
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered business growth and intelligence platform
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Electron</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Shadcn/ui</Badge>
            <Badge variant="secondary">AI Integration</Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="h-4 w-4" />
              View Source
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-md border border-border">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <ContactForm />

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground">
          <p>Built with ❤️ for modern business intelligence</p>
        </div>
      </div>
    </main>
  )
}

export default IndexPage

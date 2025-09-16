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
      title: "Cross-Platform",
      description: "Build once, run everywhere - Web and Desktop",
      icon: <Code className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Modern Stack",
      description: "Next.js 15, TypeScript, Tailwind CSS",
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "UI Components",
      description: "Beautiful components with Shadcn/ui",
      icon: <Play className="h-6 w-6 text-green-500" />
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                My Nextron App
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                A modern cross-platform application
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Download App
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <ContactForm />

        {/* Footer */}
        <div className="mt-20 text-center text-slate-500 dark:text-slate-400">
          <p>Built with ❤️ using Next.js, Electron, and Shadcn/ui</p>
        </div>
      </div>
    </main>
  )
}

export default IndexPage

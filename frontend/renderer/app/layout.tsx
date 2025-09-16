import React from 'react'
import '@/styles/globals.css'
import { Plus_Jakarta_Sans, Lora, Roboto_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import ThemeProvider from '@/components/providers/theme-provider'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif'
})

const fontMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'InteGrow',
  description:
    'AI-powered business growth and intelligence platform built with Next.js, Electron, TypeScript, TailwindCSS and Shadcn/ui'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased text-foreground',
          fontSans.variable,
          fontSerif.variable,
          fontMono.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

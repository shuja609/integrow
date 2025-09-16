"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

function ContactForm() {
  const [email, setEmail] = useState('')

  return (
    <Card className="mt-20 max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          Stay Updated
        </CardTitle>
        <CardDescription>
          Get notified about new features and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full" disabled={!email}>
          Subscribe
        </Button>
      </CardContent>
    </Card>
  )
}

export default ContactForm
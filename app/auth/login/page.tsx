"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Checkbox } from "@heroui/checkbox"
import { Link as HeroLink } from "@heroui/link"
import { GraduationCap, Eye, EyeOff, X } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-accent/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-5xl bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border/50">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Visual content */}
          <div className="lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent p-12 flex flex-col justify-between min-h-[300px] lg:min-h-[600px]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <GraduationCap className="w-9 h-9 text-white" />
                <p>TutorLink</p>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Welcome Back to TutorLink</h2>
              <p className="text-white/90 text-lg text-pretty">Continue your learning journey with expert tutors</p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Access to 10,000+ expert tutors</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Personalized learning experience</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 relative">
            {/* Close button */}
            <Link
              href="/"
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>

            <div className="max-w-md mx-auto space-y-8">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Sign in</h1>
                <p className="text-muted-foreground">Enter your credentials to access your account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Email or phone number"
                    placeholder="Enter your email or phone"
                    value={email}
                    onValueChange={setEmail}
                    required
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "h-14 border-2",
                    }}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onValueChange={setPassword}
                    required
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "h-14 border-2",
                    }}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox size="md" radius="sm">
                    <span className="text-sm font-medium">Remember me</span>
                  </Checkbox>
                  <HeroLink href="/auth/forgot-password" size="sm" className="text-primary font-semibold hover:underline">
                    Forgot password?
                  </HeroLink>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="lg"
                  className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                >
                  Sign in
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground font-medium">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="bordered"
                  size="lg"
                  radius="lg"
                  className="w-full h-14 text-base font-medium border-2 hover:bg-muted/50 transition-colors"
                  startContent={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  }
                >
                  Google
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <HeroLink href="/signup" className="text-primary font-semibold hover:underline">
                  Sign up for free
                </HeroLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

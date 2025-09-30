"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Link as HeroLink } from "@heroui/link"
import { GraduationCap, ArrowLeft, Mail, X } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
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
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
                Don't Worry, We've Got You
              </h2>
              <p className="text-white/90 text-lg text-pretty">
                Reset your password and get back to learning in no time
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">We'll send you a secure reset link</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-sm">Your account security is our priority</span>
              </div>
            </div>
          </div>

          {/* Right side - Reset Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 relative">
            {/* Close button */}
            <Link
              href="/"
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>

            <div className="max-w-md mx-auto space-y-8">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
                    <p className="text-muted-foreground">
                      Enter your email address and we'll send you a link to reset your password
                    </p>
                  </div>

                  {/* Reset Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type="email"
                      label="Email address"
                      placeholder="Enter your email"
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
                      startContent={<Mail className="w-5 h-5 text-muted-foreground" />}
                    />

                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      radius="lg"
                      className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Send Reset Link
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    <HeroLink href="/auth/login" className="text-primary font-semibold hover:underline">
                      Back to sign in
                    </HeroLink>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="space-y-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-foreground">Check Your Email</h1>
                      <p className="text-muted-foreground text-pretty">
                        We've sent a password reset link to <strong className="text-foreground">{email}</strong>
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                      <p className="text-sm text-muted-foreground text-pretty">
                        Didn't receive the email? Check your spam folder or try again with a different email address.
                      </p>
                      <Button
                        type="button"
                        variant="bordered"
                        size="md"
                        radius="lg"
                        className="w-full border-2"
                        onPress={() => setIsSubmitted(false)}
                      >
                        Try Another Email
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-4">
                      <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                      <HeroLink href="/auth/login" className="text-primary font-semibold hover:underline">
                        Back to sign in
                      </HeroLink>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

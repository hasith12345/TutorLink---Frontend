"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Checkbox } from "@heroui/checkbox"
import { RadioGroup, Radio } from "@heroui/radio"
import { Link as HeroLink } from "@heroui/link"
import { GraduationCap, Eye, EyeOff, X, BookOpen, Users } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("student")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup attempt:", { ...formData, userType })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-accent/20 via-background to-primary/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-6xl bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border/50">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Visual content */}
          <div className="lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-accent via-accent/90 to-primary p-12 flex flex-col justify-between min-h-[300px] lg:min-h-[700px]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-white rounded-full" />
              <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Join TutorLink Today</h2>
              <p className="text-white/90 text-lg text-pretty">
                Start your journey as a student or share your expertise as a tutor
              </p>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">For Students</h3>
                    <p className="text-sm text-white/80">Find expert tutors and excel in your studies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">For Tutors</h3>
                    <p className="text-sm text-white/80">Share knowledge and grow your student base</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 relative overflow-y-auto max-h-[90vh] lg:max-h-none">
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
                <h1 className="text-3xl font-bold text-foreground">Create account</h1>
                <p className="text-muted-foreground">Get started with your free account</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">I want to join as</label>
                  <RadioGroup
                    value={userType}
                    onValueChange={setUserType}
                    orientation="horizontal"
                    classNames={{
                      wrapper: "gap-4",
                    }}
                  >
                    <Radio value="student" classNames={{ base: "flex-1" }}>
                      <span className="font-medium">Student</span>
                    </Radio>
                    <Radio value="tutor" classNames={{ base: "flex-1" }}>
                      <span className="font-medium">Tutor</span>
                    </Radio>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Full name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onValueChange={(value) => handleChange("fullName", value)}
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
                    type="email"
                    label="Email address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onValueChange={(value) => handleChange("email", value)}
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
                    type="tel"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onValueChange={(value) => handleChange("phone", value)}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onValueChange={(value) => handleChange("password", value)}
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

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onValueChange={(value) => handleChange("confirmPassword", value)}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                  />
                </div>

                <Checkbox size="md" radius="sm" required>
                  <span className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <HeroLink href="/terms" size="sm" className="text-primary font-semibold hover:underline">
                      Terms of Service
                    </HeroLink>{" "}
                    and{" "}
                    <HeroLink href="/privacy" size="sm" className="text-primary font-semibold hover:underline">
                      Privacy Policy
                    </HeroLink>
                  </span>
                </Checkbox>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="lg"
                  className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                >
                  Create account
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

              <p className="text-center text-sm text-muted-foreground pb-4">
                Already have an account?{" "}
                <HeroLink href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </HeroLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

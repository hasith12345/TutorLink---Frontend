"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Link as HeroLink } from "@heroui/link"
import { GraduationCap, Eye, EyeOff, CheckCircle2, X } from "lucide-react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    setToken(tokenParam)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    console.log("Password reset with token:", token)
    setIsSuccess(true)
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Create a Strong Password</h2>
              <p className="text-white/90 text-lg text-pretty">
                Choose a secure password to protect your TutorLink account
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm">At least 8 characters long</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm">Mix of letters, numbers & symbols</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm">Unique to your TutorLink account</span>
              </div>
            </div>
          </div>

          {/* Right side - Reset Password Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 relative">
            {/* Close button */}
            <Link
              href="/"
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>

            <div className="max-w-md mx-auto space-y-8">
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Set New Password</h1>
                    <p className="text-muted-foreground">
                      Enter your new password below to reset your account password
                    </p>
                  </div>

                  {/* Reset Password Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type={showPassword ? "text" : "password"}
                      label="New Password"
                      placeholder="Enter new password"
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
                          className="focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Eye className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                      }
                    />

                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirm Password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onValueChange={setConfirmPassword}
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
                          className="focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Eye className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                      }
                    />

                    {error && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      radius="lg"
                      className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Reset Password
                    </Button>
                  </form>

                  <div className="flex items-center justify-center">
                    <HeroLink href="/login" className="text-primary font-semibold hover:underline">
                      Back to sign in
                    </HeroLink>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="space-y-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-foreground">Password Reset Successful!</h1>
                      <p className="text-muted-foreground text-pretty">
                        Your password has been successfully reset. You can now sign in with your new password.
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                      <p className="text-sm text-muted-foreground text-pretty">
                        For your security, we recommend using a unique password that you don&apos;t use on other websites.
                      </p>
                    </div>

                    <Button
                      as={Link}
                      href="/login"
                      color="primary"
                      size="lg"
                      radius="lg"
                      className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Continue to Sign In
                    </Button>
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

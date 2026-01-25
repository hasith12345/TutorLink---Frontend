"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { RoleSelection } from "../auth/role-selection"
import { StudentDetails } from "../auth/student-details"
import { TutorDetails } from "./tutor-details"

export function AuthContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState(pathname === "/login" || pathname === "/")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPanelSliding, setIsPanelSliding] = useState(false)
  const [signupStep, setSignupStep] = useState<"initial" | "role" | "student-details" | "tutor-details">("initial")
  const [userData, setUserData] = useState<{ fullName: string; email: string; password: string } | null>(null)
  // Track if component is ready for animations (after first paint)
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Enable transitions after first paint to prevent initial animation
  useEffect(() => {
    // Force style computation
    if (containerRef.current) {
      void containerRef.current.offsetHeight
    }
    
    // Wait for two animation frames to ensure browser has painted
    let frameId1: number
    let frameId2: number
    
    frameId1 = requestAnimationFrame(() => {
      frameId2 = requestAnimationFrame(() => {
        setIsReady(true)
      })
    })

    return () => {
      cancelAnimationFrame(frameId1)
      cancelAnimationFrame(frameId2)
    }
  }, [])

  // Sync state with pathname only on initial load, not during animations
  useEffect(() => {
    // Only sync if not animating and component is ready
    if (!isAnimating && isReady) {
      const shouldBeLogin = pathname === "/login" || pathname === "/"
      // Only update if different to prevent unnecessary re-renders
      if (shouldBeLogin !== isLogin) {
        setIsLogin(shouldBeLogin)
      }
    }
  }, [pathname, isAnimating, isReady, isLogin])

  const handleToggle = useCallback((toLogin: boolean) => {
    if (isAnimating || isLogin === toLogin) return
    
    const targetPath = toLogin ? "/login" : "/register"
    // Don't push if already on the target path
    if (pathname === targetPath) {
      setIsLogin(toLogin)
      return
    }
    
    setIsAnimating(true)
    
    // Use requestAnimationFrame for smoother state transition
    requestAnimationFrame(() => {
      setIsLogin(toLogin)
      
      // Push route change after animations settle
      setTimeout(() => {
        router.push(targetPath, { scroll: false })
        // Wait a bit more before allowing new animations
        setTimeout(() => {
          setIsAnimating(false)
        }, 100)
      }, 650)
    })
  }, [isAnimating, isLogin, router, pathname])

  // Handler for Sign Up button click - slide panel and show role selection
  const handleSignUpClick = useCallback((data: { fullName: string; email: string; password: string }) => {
    setUserData(data)
    setIsPanelSliding(true)
    // Immediately change step to role for smooth transition
    setSignupStep("role")
  }, [])

  // Handler for role selection
  const handleRoleSelect = useCallback((role: "student" | "tutor") => {
    setSignupStep(role === "student" ? "student-details" : "tutor-details")
  }, [])

  // Handler to go back to role selection
  const handleBackToRoles = useCallback(() => {
    setSignupStep("role")
  }, [])

  // Handler to go back to initial signup
  const handleBackToInitial = useCallback(() => {
    setSignupStep("initial")
    setIsPanelSliding(false)
  }, [])

  // Handler for successful signup
  const handleSignupSuccess = useCallback(() => {
    router.push("/complete-profile")
  }, [router])

  // Transition style - only enabled after first paint
  const getTransition = (duration: string) => 
    isReady ? `opacity ${duration} ease-in-out, transform ${duration} ease-in-out` : "none"

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[72rem] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          contain: "layout style paint",
        }}
      >
        {/* ========== MOBILE VIEW ========== */}
        {/* Always in DOM, hidden via CSS on desktop */}
        <div className="auth-mobile-view w-full h-full flex flex-col relative">
          {/* Login Form - Mobile */}
          <div
            className="absolute inset-0 flex flex-col justify-center p-8"
            style={{
              opacity: isLogin ? 1 : 0,
              transform: `translateZ(0) translateX(${isLogin ? 0 : -20}px)`,
              pointerEvents: isLogin ? "auto" : "none",
              backfaceVisibility: "hidden",
              willChange: isAnimating ? "opacity, transform" : "auto",
              transition: getTransition("0.4s"),
            }}
          >
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => handleToggle(false)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Register Form - Mobile */}
          <div
            className="absolute inset-0 flex flex-col justify-center p-8"
            style={{
              opacity: isLogin ? 0 : 1,
              transform: `translateZ(0) translateX(${isLogin ? 20 : 0}px)`,
              pointerEvents: isLogin ? "none" : "auto",
              backfaceVisibility: "hidden",
              willChange: isAnimating ? "opacity, transform" : "auto",
              transition: getTransition("0.4s"),
            }}
          >
            <RegisterForm onSignUpClick={handleSignUpClick} />
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => handleToggle(true)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* ========== DESKTOP VIEW ========== */}
        {/* Always in DOM, hidden via CSS on mobile */}
        <div className="auth-desktop-view absolute inset-0">
          <div className="absolute inset-0 flex">
            {/* Login Form - Left Side */}
            <div 
              className="h-full flex items-center justify-center"
              style={{
                width: signupStep === "initial" ? "50%" : "0%",
                opacity: signupStep === "initial" ? 1 : 0,
                transition: isReady ? "width 0.5s ease-in-out, opacity 0.5s ease-in-out" : "none",
                overflow: "hidden",
                willChange: signupStep !== "initial" ? "width, opacity" : "auto",
              }}
            >
              <div
                className="w-full flex items-center justify-center p-10"
                style={{
                  opacity: isLogin ? 1 : 0,
                  transform: `translateZ(0) translateX(${isLogin ? 0 : -30}px) scale(${isLogin ? 1 : 0.95})`,
                  pointerEvents: isLogin ? "auto" : "none",
                  backfaceVisibility: "hidden",
                  willChange: isAnimating ? "opacity, transform" : "auto",
                  transition: getTransition("0.5s"),
                  minWidth: "400px",
                  maxWidth: "500px",
                }}
              >
                <div className="w-full">
                  <LoginForm />
                </div>
              </div>
            </div>

            {/* Register Form / Signup Flow - Right Side */}
            <div 
              className="h-full flex items-center justify-center relative"
              style={{
                width: signupStep === "initial" ? "50%" : "100%",
                transition: isReady ? "width 0.5s ease-in-out" : "none",
                willChange: signupStep !== "initial" ? "width" : "auto",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {/* Initial Register Form */}
                {signupStep === "initial" && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isLogin ? 0 : 1, x: isLogin ? 30 : 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center p-10"
                    style={{
                      pointerEvents: isLogin || signupStep !== "initial" ? "none" : "auto",
                      minWidth: "400px",
                      maxWidth: "500px",
                      margin: "0 auto",
                    }}
                  >
                    <div className="w-full max-w-sm">
                      <RegisterForm onSignUpClick={handleSignUpClick} />
                    </div>
                  </motion.div>
                )}

                {/* Role Selection */}
                {signupStep === "role" && (
                  <motion.div
                    key="role"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ pointerEvents: "auto" }}
                  >
                    <RoleSelection 
                      onRoleSelect={handleRoleSelect}
                      onBack={handleBackToInitial}
                    />
                  </motion.div>
                )}

                {/* Student Details Form */}
                {signupStep === "student-details" && userData && (
                  <motion.div
                    key="student-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ pointerEvents: "auto" }}
                  >
                    <StudentDetails 
                      userData={userData}
                      onBack={handleBackToRoles}
                      onSuccess={handleSignupSuccess}
                    />
                  </motion.div>
                )}

                {/* Tutor Details Form */}
                {signupStep === "tutor-details" && userData && (
                  <motion.div
                    key="tutor-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ pointerEvents: "auto" }}
                  >
                    <TutorDetails 
                      userData={userData}
                      onBack={handleBackToRoles}
                      onSuccess={handleSignupSuccess}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sliding Overlay Panel */}
          <div
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center z-10"
            style={{
              transform: `translateZ(0) translateX(${
                isPanelSliding || signupStep !== "initial" ? "-100%" : isLogin ? "100%" : "0%"
              })`,
              backfaceVisibility: "hidden",
              willChange: isAnimating || isPanelSliding ? "transform" : "auto",
              transition: isReady ? "transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Sign Up Panel - Shows when on Login page */}
              <div
                className="absolute inset-0 flex items-center justify-center text-white px-10"
                style={{
                  opacity: isLogin ? 1 : 0,
                  transform: `translateZ(0) translateX(${isLogin ? 0 : 20}px)`,
                  pointerEvents: isLogin ? "auto" : "none",
                  backfaceVisibility: "hidden",
                  willChange: isAnimating ? "opacity, transform" : "auto",
                  transition: getTransition("0.4s"),
                }}
              >
                <div className="text-center">
                  {/* TutorLink Logo and Brand */}
                  <a href="/">
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="TutorLink Logo" />
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-200 bg-clip-text text-transparent">TutorLink</span>
                    </div>
                  </a>
                    
                  <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                  <p className="text-white/80 mb-8 leading-relaxed max-w-xs mx-auto">
                    Enter your personal details and start your journey with us
                  </p>
                  <button
                    onClick={() => handleToggle(false)}
                    disabled={isAnimating}
                    className="px-10 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-[background-color,color] duration-300"
                    style={{
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Sign In Panel - Shows when on Register page */}
              <div
                className="absolute inset-0 flex items-center justify-center text-white px-10"
                style={{
                  opacity: isLogin ? 0 : 1,
                  transform: `translateZ(0) translateX(${isLogin ? -20 : 0}px)`,
                  pointerEvents: isLogin ? "none" : "auto",
                  backfaceVisibility: "hidden",
                  willChange: isAnimating ? "opacity, transform" : "auto",
                  transition: getTransition("0.4s"),
                }}
              >
                <div className="text-center">
                  {/* TutorLink Logo and Brand */}
                  <a href="/">
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="TutorLink Logo" />
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-200 bg-clip-text text-transparent">TutorLink</span>
                    </div>
                  </a>
                  <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                  <p className="text-white/80 mb-8 leading-relaxed max-w-xs mx-auto">
                    To keep connected with us please login with your personal info
                  </p>
                  <button
                    onClick={() => handleToggle(true)}
                    disabled={isAnimating}
                    className="px-10 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-[background-color,color] duration-300"
                    style={{
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

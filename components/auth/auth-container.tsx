"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { RoleSelectorModal } from "./role-selector-modal"

export function AuthContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState(pathname === "/login" || pathname === "/")
  const [isAnimating, setIsAnimating] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [isPanelSliding, setIsPanelSliding] = useState(false)
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
    if (!isAnimating) {
      setIsLogin(pathname === "/login" || pathname === "/")
    }
  }, [pathname, isAnimating])

  const handleToggle = useCallback((toLogin: boolean) => {
    if (isAnimating || isLogin === toLogin) return
    setIsAnimating(true)
    setIsLogin(toLogin)

    // Update URL after animation completes
    setTimeout(() => {
      router.push(toLogin ? "/login" : "/register", { scroll: false })
      setIsAnimating(false)
    }, 600)
  }, [isAnimating, isLogin, router])

  // Handler for Sign Up button click - slide panel and show modal
  const handleSignUpClick = useCallback(() => {
    setIsPanelSliding(true)
    // Wait for panel to slide off before showing modal
    setTimeout(() => {
      setShowRoleModal(true)
    }, 600)
  }, [])

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    setShowRoleModal(false)
    // Slide panel back in
    setTimeout(() => {
      setIsPanelSliding(false)
    }, 300)
  }, [])

  // Transition style - only enabled after first paint
  const getTransition = (duration: string) => 
    isReady ? `opacity ${duration} ease-in-out, transform ${duration} ease-in-out` : "none"

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden"
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
              transition: getTransition("0.3s"),
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
              transition: getTransition("0.3s"),
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
            <div className="w-1/2 h-full flex items-center justify-center">
              <div
                className="w-full flex items-center justify-center p-10"
                style={{
                  opacity: isLogin ? 1 : 0,
                  transform: `translateZ(0) translateX(${isLogin ? 0 : -30}px) scale(${isLogin ? 1 : 0.95})`,
                  pointerEvents: isLogin ? "auto" : "none",
                  backfaceVisibility: "hidden",
                  transition: getTransition("0.4s"),
                }}
              >
                <LoginForm />
              </div>
            </div>

            {/* Register Form - Right Side */}
            <div className="w-1/2 h-full flex items-center justify-center">
              <div
                className="w-full flex items-center justify-center p-10"
                style={{
                  opacity: isLogin ? 0 : 1,
                  transform: `translateZ(0) translateX(${isLogin ? 30 : 0}px) scale(${isLogin ? 0.95 : 1})`,
                  pointerEvents: isLogin ? "none" : "auto",
                  backfaceVisibility: "hidden",
                  transition: getTransition("0.4s"),
                }}
              >
                <RegisterForm onSignUpClick={handleSignUpClick} />
              </div>
            </div>
          </div>

          {/* Sliding Overlay Panel */}
          <div
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center z-10"
            style={{
              transform: `translateZ(0) translateX(${
                isPanelSliding ? "-100%" : isLogin ? "100%" : "0%"
              })`,
              backfaceVisibility: "hidden",
              transition: isReady ? "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
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
                  transition: getTransition("0.3s"),
                }}
              >
                <div className="text-center">
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
                  transition: getTransition("0.3s"),
                }}
              >
                <div className="text-center">
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

      {/* Role Selector Modal */}
      <RoleSelectorModal isOpen={showRoleModal} onClose={handleCloseModal} />
    </div>
  )
}

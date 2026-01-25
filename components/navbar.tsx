"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, Settings, ChevronDown, LogOut } from "lucide-react"
import { authStorage } from "@/lib/api"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = authStorage.getToken()
    if (token) {
      const userData = authStorage.getUser()
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    authStorage.clear()
    setUser(null)
    router.push('/login')
  }

  const isLoggedIn = !!user

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="TutorLink Logo" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              TutorLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#students" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Students
            </Link>
            <Link href="#tutors" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Tutors
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Desktop Auth/User Section */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              {/* Notifications */}
              <button
                onClick={() => router.push('/dashboard/notifications')}
                className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.email?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false)
                        router.push('/dashboard/profile')
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false)
                        handleLogout()
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                <a href="/login">Login</a>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300">
                <a href="/register">Register</a>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible max-h-96" : "opacity-0 invisible max-h-0 pointer-events-none"
        } overflow-hidden bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            href="#students"
            className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Students
          </Link>
          <Link
            href="#tutors"
            className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Tutors
          </Link>
          <Link
            href="#about"
            className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
          
          {isLoggedIn ? (
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={() => router.push('/dashboard/notifications')}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Bell className="w-4 h-4" />
                Notifications
              </button>
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Button variant="outline" className="w-full justify-center bg-transparent">
                <a href="/login">Login</a>
              </Button>
              <Button className="w-full justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white">
                <a href="/register">Register</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

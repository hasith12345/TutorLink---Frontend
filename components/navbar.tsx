"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, Settings, ChevronDown, LogOut, Search, GraduationCap, UserSearch } from "lucide-react"
import { authStorage } from "@/lib/api"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [activeRole, setActiveRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  
  // Hide search bar on search page
  const isSearchPage = pathname === '/search'

  useEffect(() => {
    const token = authStorage.getToken()
    if (token) {
      const userData = authStorage.getUser()
      const role = authStorage.getActiveRole()
      setUser(userData)
      setActiveRole(role)
    }
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  const handleLogout = () => {
    authStorage.clear()
    setUser(null)
    router.push('/login')
  }

  const isLoggedIn = !!user

  const handleSearchBarClick = () => {
    router.push('/search')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="TutorLink Logo" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              TutorLink
            </span>
          </Link>

          {/* Airbnb-style Compact Search Bar (Desktop) - Hidden on search page */}
          {!isSearchPage && (
            <div
              ref={searchBarRef}
              onClick={handleSearchBarClick}
              className="hidden lg:flex items-center flex-1 max-w-xl mx-auto"
            >
              <div className="w-full bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center divide-x divide-gray-300">
                  {/* What */}
                  <div className="flex-1 px-4 py-2">
                    <div className="text-xs font-semibold text-gray-900">What</div>
                    <div className="text-xs text-gray-500 truncate">Search subject or tutor</div>
                  </div>
                  {/* Where */}
                  <div className="flex-1 px-4 py-2">
                    <div className="text-xs font-semibold text-gray-900">Where</div>
                    <div className="text-xs text-gray-500 truncate">Add location</div>
                  </div>
                  {/* Mode */}
                  <div className="flex-1 px-4 py-2 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-900">Mode</div>
                      <div className="text-xs text-gray-500 truncate">Any mode</div>
                    </div>
                    <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">{isLoggedIn ? (
              <>
                {/* Find a Tutor Button */}
                <Button
                  onClick={() => router.push('/search')}
                  variant="ghost"
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium"
                >
                  <UserSearch className="w-4 h-4 mr-2" />
                  Find a Tutor
                </Button>

                {/* Become a Tutor Button */}
                {activeRole !== 'tutor' && (
                  <Button
                    onClick={() => router.push('/become-tutor')}
                    variant="ghost"
                    className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Become a Tutor
                  </Button>
                )}

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
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.email?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {activeRole === 'tutor' && (
                        <button
                          onClick={() => {
                            setIsProfileOpen(false)
                            router.push('/dashboard')
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Dashboard
                        </button>
                      )}
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
              </>
            ) : (
              <>
                {/* Find a Tutor Button */}
                <Button
                  onClick={() => router.push('/search')}
                  variant="ghost"
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium"
                >
                  <UserSearch className="w-4 h-4 mr-2" />
                  Find a Tutor
                </Button>

                {/* Become a Tutor Button */}
                <Button
                  onClick={() => router.push('/become-tutor')}
                  variant="ghost"
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Become a Tutor
                </Button>

                <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                  <a href="/login">Login</a>
                </Button>
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  <a href="/register">Register</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Search Bar (Tablet/Mobile) - Hidden on search page */}
        {!isSearchPage && (
          <div className="lg:hidden pb-4">
            <div
              onClick={handleSearchBarClick}
              className="w-full bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center divide-x divide-gray-300">
                {/* What */}
                <div className="flex-1 px-4 py-2">
                  <div className="text-xs font-semibold text-gray-900">What</div>
                  <div className="text-xs text-gray-500 truncate">Search subject</div>
                </div>
                {/* Where */}
                <div className="flex-1 px-4 py-2">
                  <div className="text-xs font-semibold text-gray-900">Where</div>
                  <div className="text-xs text-gray-500 truncate">Location</div>
                </div>
                {/* Search Button */}
                <div className="px-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible max-h-[500px]" : "opacity-0 invisible max-h-0 pointer-events-none"
        } overflow-hidden bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Find a Tutor Button */}
          <Button
            onClick={() => {
              router.push('/search')
              setIsOpen(false)
            }}
            className="w-full justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <UserSearch className="w-4 h-4 mr-2" />
            Find a Tutor
          </Button>

          {/* Become a Tutor Button */}
          {(!isLoggedIn || activeRole !== 'tutor') && (
            <Button
              onClick={() => {
                router.push('/become-tutor')
                setIsOpen(false)
              }}
              variant="outline"
              className="w-full justify-center border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Become a Tutor
            </Button>
          )}
          
          {isLoggedIn ? (
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {activeRole === 'tutor' && (
                <button
                  onClick={() => {
                    router.push('/dashboard')
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  router.push('/dashboard/notifications')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Bell className="w-4 h-4" />
                Notifications
              </button>
              <button
                onClick={() => {
                  router.push('/dashboard/settings')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={() => {
                  router.push('/dashboard/profile')
                  setIsOpen(false)
                }}
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

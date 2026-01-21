"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
              <a href="/login">Login</a>
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <a href="/register">Register</a>
            </Button>
          </div>

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
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Button variant="outline" className="w-full justify-center bg-transparent">
              Login
            </Button>
            <Button className="w-full justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white">
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

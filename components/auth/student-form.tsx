"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, BookOpen } from "lucide-react"

interface StudentFormProps {
  onBack: () => void
  onSuccess: () => void
}

export function StudentForm({ onBack, onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    grade: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const gradeOptions = [
    "Elementary School",
    "Middle School (6-8)",
    "High School (9-12)",
    "College/University",
    "Graduate School",
    "Other"
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.grade) {
      newErrors.grade = "Please select your education level"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'student'
        }),
      })

      if (response.ok) {
        onSuccess()
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || 'Signup failed. Please try again.' })
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ submit: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left Side - Image Panel */}
      <div className="hidden md:flex relative bg-white items-center justify-center p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/Student.png"
            alt="Student illustration"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full p-8 md:p-12 flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Go back to role selection"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Student Signup</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create your student account
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.fullName ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 characters)"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-11 pr-11 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Grade/Education Level */}
        <div>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 appearance-none ${
                errors.grade ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
              }`}
              required
            >
              <option value="">Select your education level</option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          {errors.grade && (
            <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Student Account"}
        </button>
      </form>

      {/* Terms */}
      <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
      </p>
      </div>
    </div>
  )
}
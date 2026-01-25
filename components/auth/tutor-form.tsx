"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, BookOpen, Clock } from "lucide-react"

interface TutorFormProps {
  onBack: () => void
  onSuccess: () => void
}

export function TutorForm({ onBack, onSuccess }: TutorFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subjects: "",
    yearsExperience: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years"
  ]

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" }
    
    let score = 0
    const hasLength = pwd.length >= 8 && pwd.length <= 12
    const hasUppercase = /[A-Z]/.test(pwd)
    const hasLowercase = /[a-z]/.test(pwd)
    const hasNumber = /[0-9]/.test(pwd)
    const hasSpecialChar = /[!@#$%^&*]/.test(pwd)
    
    if (hasLength) score++
    if (hasUppercase) score++
    if (hasLowercase) score++
    if (hasNumber) score++
    if (hasSpecialChar) score++
    
    if (score <= 2) return { strength: score, label: "Weak", color: "bg-red-500" }
    if (score <= 4) return { strength: score, label: "Medium", color: "bg-yellow-500" }
    return { strength: score, label: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

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
    } else if (formData.password.length < 8 || formData.password.length > 12) {
      newErrors.password = "Password must be 8-12 characters"
    } else {
      const hasUppercase = /[A-Z]/.test(formData.password);
      const hasLowercase = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*]/.test(formData.password);
      
      if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        newErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*)"
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.subjects.trim()) {
      newErrors.subjects = "Please enter subjects you can teach"
    } else {
      const subjectsList = formData.subjects.split(',').map(s => s.trim()).filter(s => s.length > 0)
      if (subjectsList.length === 0) {
        newErrors.subjects = "Please enter at least one subject"
      } else if (subjectsList.some(s => s.length < 2)) {
        newErrors.subjects = "Each subject must be at least 2 characters"
      }
    }

    if (!formData.yearsExperience) {
      newErrors.yearsExperience = "Please select your experience level"
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
      // Clean up subjects list
      const subjects = formData.subjects
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)

      // Simulate API call
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subjects,
          role: 'tutor'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to email verification page
        window.location.href = `/verify-email?email=${encodeURIComponent(formData.email)}`
      } else {
        setErrors({ submit: data.message || 'Signup failed. Please try again.' })
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
            src="/Tutor.png"
            alt="Tutor illustration"
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
          <h1 className="text-3xl font-bold text-slate-800">Tutor Signup</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create your tutor account
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
                errors.fullName ? 'focus:ring-red-500' : 'focus:ring-purple-500'
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
                errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'
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
          <div className="relative mb-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8-12 chars, A-Z, a-z, 0-9, !@#$%^&*)"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-11 pr-11 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.password && (
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600">Password Strength:</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength.label === "Weak" ? "text-red-500" :
                  passwordStrength.label === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full pl-11 pr-11 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Subjects */}
        <div>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Subjects you teach (e.g., Math, Physics, Chemistry)"
              value={formData.subjects}
              onChange={(e) => handleInputChange('subjects', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400 ${
                errors.subjects ? 'focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              required
            />
          </div>
          {errors.subjects && (
            <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Separate multiple subjects with commas
          </p>
        </div>

        {/* Years of Experience */}
        <div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={formData.yearsExperience}
              onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 rounded-lg border-0 focus:ring-2 transition-all text-slate-800 appearance-none ${
                errors.yearsExperience ? 'focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              required
            >
              <option value="">Years of tutoring experience</option>
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
          {errors.yearsExperience && (
            <p className="text-red-500 text-xs mt-1">{errors.yearsExperience}</p>
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
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Tutor Account"}
        </button>
      </form>

      {/* Terms */}
      <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
      </p>
      </div>
    </div>
  )
}
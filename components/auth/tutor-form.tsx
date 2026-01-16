"use client"

import { useState } from "react"
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
    subjects: "",
    yearsExperience: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years"
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
      const response = await fetch('/api/auth/signup', {
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
    <div className="w-full max-w-sm">
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
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 characters)"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
  )
}
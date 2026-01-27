"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, BookOpen, GraduationCap, Clock, X } from "lucide-react"
import { api, authStorage } from "@/lib/api"

interface TutorDetailsProps {
  onBack: () => void
  onSuccess: () => void
  userData: {
    fullName: string
    email: string
    password: string
  }
}

export function TutorDetails({ onBack, onSuccess, userData }: TutorDetailsProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    subjects: [] as string[],
    educationLevels: [] as string[],
    yearsExperience: ""
  })
  const [currentSubject, setCurrentSubject] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const experienceOptions = [
    { value: "0-1", label: "0-1 year" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5+", label: "5+ years" }
  ]

  const educationLevelOptions = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "al", label: "A/L" },
    { value: "undergraduate", label: "Undergraduate" }
  ]

  const popularSubjects = [
    "Math", "Physics", "Chemistry", "Biology", "ICT",
    "English", "Science", "Sinhala", "History", "Geography",
    "Accounting", "Business Studies", "Economics", "Tamil"
  ]

  const handleAddSubject = () => {
    const subject = currentSubject.trim()
    if (subject && !formData.subjects.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject]
      }))
      setCurrentSubject("")
      setErrors(prev => ({ ...prev, subjects: "" }))
    }
  }

  const handleRemoveSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }))
  }

  const handleToggleEducationLevel = (level: string) => {
    setFormData(prev => ({
      ...prev,
      educationLevels: prev.educationLevels.includes(level)
        ? prev.educationLevels.filter(l => l !== level)
        : [...prev.educationLevels, level]
    }))
    setErrors(prev => ({ ...prev, educationLevels: "" }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSubject()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.subjects.length === 0) {
      newErrors.subjects = "Please add at least one subject you can teach"
    }

    if (formData.educationLevels.length === 0) {
      newErrors.educationLevels = "Please select at least one education level"
    }

    if (!formData.yearsExperience) {
      newErrors.yearsExperience = "Please select your years of experience"
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
      const response = await api.signup({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: 'tutor',
        subjects: formData.subjects,
        educationLevels: formData.educationLevels,
        experience: formData.yearsExperience,
      })

      // Redirect to email verification page using Next.js router for instant navigation
      router.push(`/verify-email?email=${encodeURIComponent(userData.email)}`)

    } catch (error) {
      console.error('Signup error:', error)
      setErrors({
        submit: error instanceof Error ? error.message : 'An unexpected error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-[40%_60%] overflow-hidden">
      {/* Left Side - Image Panel */}
      <div className="hidden md:flex relative bg-white items-center justify-center p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/Tutor.png"
            alt="Tutor teaching illustration"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full flex flex-col h-full overflow-hidden">
        {/* Sticky Header */}
        <div className="flex-shrink-0 bg-white px-8 md:px-12 pt-8 md:pt-12 pb-4">
          <div className="flex items-start gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 mt-1"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Complete Your Profile</h1>
              <p className="text-slate-500 text-sm mt-1">
                Tell us about your teaching expertise
              </p>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-4 min-h-0" style={{ scrollBehavior: 'smooth' }}>
          <div className="space-y-6">
          {/* Subjects You Teach */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Subjects You Teach
            </label>
            
            {/* Popular Subjects */}
            <div className="flex flex-wrap gap-2">
              {popularSubjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => {
                    if (formData.subjects.includes(subject)) {
                      handleRemoveSubject(subject)
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        subjects: [...prev.subjects, subject]
                      }))
                      setErrors(prev => ({ ...prev, subjects: "" }))
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    formData.subjects.includes(subject)
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {subject}
                  {formData.subjects.includes(subject) && (
                    <X className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>

            {errors.subjects && (
              <p className="mt-2 text-sm text-red-600">{errors.subjects}</p>
            )}
          </div>

          {/* Education Level You Teach */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              Education Level You Teach
            </label>
            <div className="grid grid-cols-2 gap-3">
              {educationLevelOptions.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleToggleEducationLevel(level.value)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.educationLevels.includes(level.value)
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-slate-300 text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <div className="text-sm font-medium">{level.label}</div>
                </button>
              ))}
            </div>
            {errors.educationLevels && (
              <p className="mt-1 text-sm text-red-600">{errors.educationLevels}</p>
            )}
          </div>

          {/* Years of Tutoring Experience */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Years of Tutoring Experience
            </label>
            <select
              value={formData.yearsExperience}
              onChange={(e) => {
                setFormData({ ...formData, yearsExperience: e.target.value })
                setErrors(prev => ({ ...prev, yearsExperience: "" }))
              }}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                errors.yearsExperience ? "border-red-500" : "border-slate-300"
              }`}
            >
              <option value="">Select your experience</option>
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.yearsExperience && (
              <p className="mt-1 text-sm text-red-600">{errors.yearsExperience}</p>
            )}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 bg-white px-8 md:px-12 pb-8 md:pb-12 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Creating Account..." : "Complete Signup"}
          </button>
        </div>
      </div>
    </div>
  )
}

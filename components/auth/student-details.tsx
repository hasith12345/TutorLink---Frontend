"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, GraduationCap, BookOpen, MapPin, X } from "lucide-react"
import { api, authStorage } from "@/lib/api"

interface StudentDetailsProps {
  onBack: () => void
  onSuccess: () => void
  userData: {
    fullName: string
    email: string
    password: string
  }
}

export function StudentDetails({ onBack, onSuccess, userData }: StudentDetailsProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    educationLevel: "",
    grade: "",
    subjects: [] as string[],
    learningMode: ""
  })
  const [currentSubject, setCurrentSubject] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const educationLevels = [
    { value: "school", label: "School" },
    { value: "ol", label: "O/L" },
    { value: "al", label: "A/L" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
    { value: "other", label: "Other" }
  ]

  const gradeOptions = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"
  ]

  const learningModes = [
    { value: "online", label: "Online", icon: "💻" },
    { value: "physical", label: "Physical", icon: "🏫" },
    { value: "both", label: "Both", icon: "🔄" }
  ]

  const popularSubjects = [
    "Math", "Physics", "Chemistry", "Biology", "ICT",
    "English", "Science", "History", "Geography", "Accounting"
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSubject()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.educationLevel) {
      newErrors.educationLevel = "Please select your education level"
    }

    if (formData.educationLevel === "school" && !formData.grade) {
      newErrors.grade = "Please select your grade"
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = "Please add at least one subject"
    }

    if (!formData.learningMode) {
      newErrors.learningMode = "Please select your preferred learning mode"
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
        role: 'student',
        educationLevel: formData.educationLevel,
        grade: formData.grade,
        subjects: formData.subjects,
        learningMode: formData.learningMode,
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
            src="/Student.png"
            alt="Student learning illustration"
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
                Tell us about your learning needs
              </p>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-4 min-h-0" style={{ scrollBehavior: 'smooth' }}>
          <div className="space-y-6">
          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              Education Level
            </label>
            <select
              value={formData.educationLevel}
              onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value, grade: "" })}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                errors.educationLevel ? "border-red-500" : "border-slate-300"
              }`}
            >
              <option value="">Select your education level</option>
              {educationLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {errors.educationLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.educationLevel}</p>
            )}
          </div>

          {/* Grade Selection (only for school) */}
          {formData.educationLevel === "school" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Grade
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                  errors.grade ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="">Select your grade</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
              )}
            </div>
          )}

          {/* Subjects of Interest */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Subjects of Interest
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
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
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

          {/* Preferred Learning Mode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              <MapPin className="w-4 h-4 inline mr-2" />
              Preferred Learning Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {learningModes.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, learningMode: mode.value })}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.learningMode === mode.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <div className="text-sm font-medium text-slate-700">{mode.label}</div>
                </button>
              ))}
            </div>
            {errors.learningMode && (
              <p className="mt-1 text-sm text-red-600">{errors.learningMode}</p>
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
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Creating Account..." : "Complete Signup"}
          </button>
        </div>
      </div>
    </div>
  )
}

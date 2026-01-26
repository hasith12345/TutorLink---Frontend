"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, GraduationCap, BookOpen, MapPin, X, Clock, UserCheck } from "lucide-react"
import { api, authStorage } from "@/lib/api"

/**
 * OAuth Signup Container
 * 
 * This component handles the complete OAuth signup flow with smooth animations
 * similar to the email/password signup flow in AuthContainer.
 * 
 * Flow:
 * 1. Role Selection (student/tutor)
 * 2. Student Details or Tutor Details form
 * 3. Account creation on "Complete Profile" click
 */

interface OAuthData {
  email: string
  fullName: string
  picture?: string
}

interface OAuthSignupContainerProps {
  oauthData: OAuthData
  onCancel: () => void
}

export function OAuthSignupContainer({ oauthData, onCancel }: OAuthSignupContainerProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [step, setStep] = useState<"role" | "student-details" | "tutor-details">("role")

  // Enable transitions after first paint to prevent initial animation
  useEffect(() => {
    if (containerRef.current) {
      void containerRef.current.offsetHeight
    }
    
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

  const handleRoleSelect = useCallback((role: "student" | "tutor") => {
    setStep(role === "student" ? "student-details" : "tutor-details")
  }, [])

  const handleBackToRoles = useCallback(() => {
    setStep("role")
  }, [])

  const handleSignupSuccess = useCallback((role: "student" | "tutor") => {
    if (role === "student") {
      router.push("/")
    } else {
      router.push("/dashboard")
    }
  }, [router])

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
        <AnimatePresence mode="wait" initial={false}>
          {/* Role Selection */}
          {step === "role" && (
            <motion.div
              key="role"
              initial={isReady ? { opacity: 0, x: 20 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <RoleSelectionPanel 
                onRoleSelect={handleRoleSelect}
                onBack={onCancel}
              />
            </motion.div>
          )}

          {/* Student Details Form */}
          {step === "student-details" && (
            <motion.div
              key="student-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <StudentProfileForm 
                oauthData={oauthData}
                onBack={handleBackToRoles}
                onSuccess={() => handleSignupSuccess("student")}
              />
            </motion.div>
          )}

          {/* Tutor Details Form */}
          {step === "tutor-details" && (
            <motion.div
              key="tutor-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <TutorProfileForm 
                oauthData={oauthData}
                onBack={handleBackToRoles}
                onSuccess={() => handleSignupSuccess("tutor")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Role Selection Panel
function RoleSelectionPanel({ onRoleSelect, onBack }: { 
  onRoleSelect: (role: "student" | "tutor") => void
  onBack: () => void 
}) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left Side - Image Panel */}
      <div className="hidden md:flex relative bg-white items-center justify-center p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/Tutoring.png"
            alt="Tutoring illustration"
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
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Choose Your Role</h1>
            <p className="text-slate-500 text-sm mt-1">
              Select how you'd like to use TutorLink
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {/* Student Card */}
          <button
            onClick={() => onRoleSelect("student")}
            className="w-full p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200 text-left group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  I'm a Student
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Looking for tutoring help to improve my grades and understanding
                </p>
                <div className="mt-3">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    Find Tutors
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Tutor Card */}
          <button
            onClick={() => onRoleSelect("tutor")}
            className="w-full p-6 border-2 border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 text-left group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  I'm a Tutor
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ready to share my knowledge and help students succeed
                </p>
                <div className="mt-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    Teach Students
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          You can always change your role later in settings
        </p>
      </div>
    </div>
  )
}

// Student Profile Form for OAuth users
function StudentProfileForm({ onBack, onSuccess, oauthData }: { 
  onBack: () => void
  onSuccess: () => void
  oauthData: OAuthData 
}) {
  const [formData, setFormData] = useState({
    educationLevel: "",
    grade: "",
    subjects: [] as string[],
    learningMode: ""
  })
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

  const handleRemoveSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }))
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
      const response = await api.oauthSignup({
        email: oauthData.email,
        fullName: oauthData.fullName,
        role: 'student',
        educationLevel: formData.educationLevel,
        grade: formData.grade,
        subjects: formData.subjects,
        learningMode: formData.learningMode,
      })

      authStorage.setToken(response.token)
      if (response.user) {
        authStorage.setUser(response.user)
      }
      authStorage.setActiveRole('student')

      if (typeof window !== 'undefined') {
        localStorage.removeItem('oauthData')
        localStorage.removeItem('selectedRole')
      }

      onSuccess()

    } catch (error) {
      console.error('OAuth signup error:', error)
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
            {isSubmitting ? "Completing Profile..." : "Complete Profile"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Tutor Profile Form for OAuth users
function TutorProfileForm({ onBack, onSuccess, oauthData }: { 
  onBack: () => void
  onSuccess: () => void
  oauthData: OAuthData 
}) {
  const [formData, setFormData] = useState({
    subjects: [] as string[],
    educationLevels: [] as string[],
    yearsExperience: ""
  })
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
      const response = await api.oauthSignup({
        email: oauthData.email,
        fullName: oauthData.fullName,
        role: 'tutor',
        subjects: formData.subjects,
        educationLevels: formData.educationLevels,
        experience: formData.yearsExperience,
      })

      authStorage.setToken(response.token)
      if (response.user) {
        authStorage.setUser(response.user)
      }
      authStorage.setActiveRole('tutor')

      if (typeof window !== 'undefined') {
        localStorage.removeItem('oauthData')
        localStorage.removeItem('selectedRole')
      }

      onSuccess()

    } catch (error) {
      console.error('OAuth signup error:', error)
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
            {isSubmitting ? "Completing Profile..." : "Complete Profile"}
          </button>
        </div>
      </div>
    </div>
  )
}

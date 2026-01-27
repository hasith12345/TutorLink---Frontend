"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, User, Mail, Calendar, Edit, GraduationCap, BookOpen, Loader2, X, Check } from "lucide-react"
import { api, authStorage, UserProfile, UpdateProfileData } from "@/lib/api"

// Available options for dropdowns
const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "History", "Geography", "Computer Science", "Economics", "Accounting"
]

const EDUCATION_LEVELS = [
  "primary", "secondary", "high-school", "undergraduate", "graduate"
]

const LEARNING_MODES = ["online", "physical", "both"]

const EXPERIENCE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    student: {
      educationLevel: '',
      grade: '',
      subjects: [] as string[],
      learningMode: ''
    },
    tutor: {
      subjects: [] as string[],
      educationLevels: [] as string[],
      experience: ''
    }
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!authStorage.isAuthenticated()) {
          router.push('/login')
          return
        }

        const data = await api.getProfile()
        setProfile(data)
        // Initialize form data
        setFormData({
          fullName: data.fullName,
          student: {
            educationLevel: data.student?.educationLevel || '',
            grade: data.student?.grade || '',
            subjects: data.student?.subjects || [],
            learningMode: data.student?.learningMode || ''
          },
          tutor: {
            subjects: data.tutor?.subjects || [],
            educationLevels: data.tutor?.educationLevels || [],
            experience: data.tutor?.experience || ''
          }
        })
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profile')
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          authStorage.clear()
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const openEditModal = () => {
    setSaveError(null)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSaveError(null)
    // Reset form data to current profile
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        student: {
          educationLevel: profile.student?.educationLevel || '',
          grade: profile.student?.grade || '',
          subjects: profile.student?.subjects || [],
          learningMode: profile.student?.learningMode || ''
        },
        tutor: {
          subjects: profile.tutor?.subjects || [],
          educationLevels: profile.tutor?.educationLevels || [],
          experience: profile.tutor?.experience || ''
        }
      })
    }
  }

  const handleSubjectToggle = (subject: string, type: 'student' | 'tutor') => {
    setFormData(prev => {
      const subjects = prev[type].subjects
      const newSubjects = subjects.includes(subject)
        ? subjects.filter(s => s !== subject)
        : [...subjects, subject]
      return {
        ...prev,
        [type]: { ...prev[type], subjects: newSubjects }
      }
    })
  }

  const handleEducationLevelToggle = (level: string) => {
    setFormData(prev => {
      const levels = prev.tutor.educationLevels
      const newLevels = levels.includes(level)
        ? levels.filter(l => l !== level)
        : [...levels, level]
      return {
        ...prev,
        tutor: { ...prev.tutor, educationLevels: newLevels }
      }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)

    try {
      const updateData: UpdateProfileData = {
        fullName: formData.fullName
      }

      // Add student data if student profile exists
      if (profile?.hasStudentProfile) {
        updateData.student = {
          educationLevel: formData.student.educationLevel || undefined,
          grade: formData.student.grade || undefined,
          subjects: formData.student.subjects,
          learningMode: formData.student.learningMode || undefined
        }
      }

      // Add tutor data if tutor profile exists
      if (profile?.hasTutorProfile) {
        updateData.tutor = {
          subjects: formData.tutor.subjects,
          educationLevels: formData.tutor.educationLevels,
          experience: formData.tutor.experience || undefined
        }
      }

      const result = await api.updateProfile(updateData)
      setProfile(result.profile)
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
      setSaveError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <p className="text-red-600 mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={() => router.push('/')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Go back home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {getInitials(profile.fullName)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-800">{profile.fullName}</h1>
              <p className="text-slate-600 mt-1">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                {profile.hasStudentProfile && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Student
                  </span>
                )}
                {profile.hasTutorProfile && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Tutor
                  </span>
                )}
              </div>
              <button 
                onClick={openEditModal}
                className="mt-3 flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <User className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="text-base text-slate-800 font-medium">{profile.fullName}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-base text-slate-800 font-medium">{profile.email}</p>
                {profile.isEmailVerified && (
                  <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Member Since</p>
                <p className="text-base text-slate-800 font-medium">{formatDate(profile.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Profile Details */}
        {profile.student && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-800">Student Profile</h2>
            </div>
            
            <div className="space-y-4">
              {profile.student.educationLevel && (
                <div>
                  <p className="text-sm text-slate-500">Education Level</p>
                  <p className="text-base text-slate-800 font-medium capitalize">{profile.student.educationLevel}</p>
                </div>
              )}
              
              {profile.student.grade && (
                <div>
                  <p className="text-sm text-slate-500">Grade</p>
                  <p className="text-base text-slate-800 font-medium">{profile.student.grade}</p>
                </div>
              )}
              
              {profile.student.subjects && profile.student.subjects.length > 0 && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.student.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.student.learningMode && (
                <div>
                  <p className="text-sm text-slate-500">Preferred Learning Mode</p>
                  <p className="text-base text-slate-800 font-medium capitalize">{profile.student.learningMode}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tutor Profile Details */}
        {profile.tutor && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-slate-800">Tutor Profile</h2>
            </div>
            
            <div className="space-y-4">
              {profile.tutor.experience && (
                <div>
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="text-base text-slate-800 font-medium">{profile.tutor.experience} years</p>
                </div>
              )}
              
              {profile.tutor.subjects && profile.tutor.subjects.length > 0 && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Teaching Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.tutor.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.tutor.educationLevels && profile.tutor.educationLevels.length > 0 && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Teaching Levels</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.tutor.educationLevels.map((level, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium capitalize"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">Edit Profile</h3>
              <button
                onClick={closeEditModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              {saveError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {saveError}
                </div>
              )}

              {/* Basic Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h4>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Student Profile Section */}
              {profile?.hasStudentProfile && (
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-slate-800">Student Profile</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Education Level
                      </label>
                      <select
                        value={formData.student.educationLevel}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          student: { ...prev.student, educationLevel: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      >
                        <option value="">Select education level</option>
                        {EDUCATION_LEVELS.map(level => (
                          <option key={level} value={level} className="capitalize">{level}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Grade
                      </label>
                      <input
                        type="text"
                        value={formData.student.grade}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          student: { ...prev.student, grade: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g., Grade 10, Year 2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subjects
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECTS.map(subject => (
                          <button
                            key={subject}
                            type="button"
                            onClick={() => handleSubjectToggle(subject, 'student')}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              formData.student.subjects.includes(subject)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {formData.student.subjects.includes(subject) && (
                              <Check className="w-3 h-3 inline mr-1" />
                            )}
                            {subject}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Learning Mode
                      </label>
                      <div className="flex gap-3">
                        {LEARNING_MODES.map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              student: { ...prev.student, learningMode: mode }
                            }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                              formData.student.learningMode === mode
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tutor Profile Section */}
              {profile?.hasTutorProfile && (
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <h4 className="text-lg font-semibold text-slate-800">Tutor Profile</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Years of Experience
                      </label>
                      <select
                        value={formData.tutor.experience}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          tutor: { ...prev.tutor, experience: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      >
                        <option value="">Select experience</option>
                        {EXPERIENCE_OPTIONS.map(exp => (
                          <option key={exp} value={exp}>{exp} {exp === '10+' ? '' : 'year(s)'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Teaching Subjects
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECTS.map(subject => (
                          <button
                            key={subject}
                            type="button"
                            onClick={() => handleSubjectToggle(subject, 'tutor')}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              formData.tutor.subjects.includes(subject)
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {formData.tutor.subjects.includes(subject) && (
                              <Check className="w-3 h-3 inline mr-1" />
                            )}
                            {subject}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Education Levels You Teach
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {EDUCATION_LEVELS.map(level => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => handleEducationLevelToggle(level)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                              formData.tutor.educationLevels.includes(level)
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {formData.tutor.educationLevels.includes(level) && (
                              <Check className="w-3 h-3 inline mr-1" />
                            )}
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

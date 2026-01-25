"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authStorage } from "@/lib/api"
import { Navbar } from "@/components/navbar"
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  Star,
  ArrowRight
} from "lucide-react"

/**
 * Unified Dashboard Page
 * 
 * This is the main dashboard that users land on after login.
 * Content changes dynamically based on their active role:
 * - Student role: Shows student-specific content
 * - Tutor role: Shows tutor-specific content
 */
export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeRole, setActiveRole] = useState<'student' | 'tutor' | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (!authStorage.isAuthenticated()) {
      router.push('/login')
      return
    }

    const userData = authStorage.getUser()
    const role = authStorage.getActiveRole()

    if (!userData) {
      router.push('/login')
      return
    }

    // If no active role is set, determine it
    if (!role) {
      if (userData.hasStudentProfile && !userData.hasTutorProfile) {
        authStorage.setActiveRole('student')
        setActiveRole('student')
      } else if (userData.hasTutorProfile && !userData.hasStudentProfile) {
        authStorage.setActiveRole('tutor')
        setActiveRole('tutor')
      } else if (userData.hasStudentProfile && userData.hasTutorProfile) {
        // Both profiles exist but no active role - redirect to selection
        router.push('/select-role')
        return
      } else {
        // No profiles - redirect to complete profile
        router.push('/complete-profile')
        return
      }
    } else {
      setActiveRole(role)
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {user?.fullName}! 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Here's what's happening with your {activeRole} account today.
          </p>
        </div>

        {/* Render content based on active role */}
        {activeRole === 'student' ? (
          <StudentDashboardContent />
        ) : activeRole === 'tutor' ? (
          <TutorDashboardContent />
        ) : null}
      </main>
    </div>
  )
}

/**
 * Student Dashboard Content
 */
function StudentDashboardContent() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Active Courses</h3>
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">5</p>
          <p className="text-xs text-green-600 mt-1">+2 this week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">My Tutors</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">3</p>
          <p className="text-xs text-slate-500 mt-1">Across all subjects</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Upcoming Sessions</h3>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">2</p>
          <p className="text-xs text-orange-600 mt-1">Next: Tomorrow 2pm</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
            <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">Find Tutors</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">Book Session</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group">
            <Award className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">My Progress</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">View Analytics</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">Session with John Smith</p>
              <p className="text-xs text-slate-500">Mathematics • Yesterday at 3pm</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              Completed
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">Upcoming: Physics Tutoring</p>
              <p className="text-xs text-slate-500">With Sarah Johnson • Tomorrow at 2pm</p>
            </div>
            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              Pending
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">Quiz Completed</p>
              <p className="text-xs text-slate-500">Chemistry Chapter 5 • Score: 92%</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Excellent
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Tutor Dashboard Content
 */
function TutorDashboardContent() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Total Students</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">12</p>
          <p className="text-xs text-green-600 mt-1">+3 this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Sessions This Week</h3>
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">8</p>
          <p className="text-xs text-slate-500 mt-1">4 completed, 4 upcoming</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Earnings (MTD)</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800">$850</p>
          <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Avg Rating</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">4.8</p>
          <p className="text-xs text-slate-500 mt-1">Based on 24 reviews</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">Post New Gig</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
            <Calendar className="w-6 h-6 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">Manage Schedule</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">View Earnings</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-700">Analytics</p>
          </button>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Upcoming Sessions</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-purple-700">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">Alice Miller - Mathematics</p>
              <p className="text-xs text-slate-600">Today at 4:00 PM • 1 hour session</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
              Start Session
            </button>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-slate-700">BJ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">Bob Johnson - Physics</p>
              <p className="text-xs text-slate-600">Tomorrow at 2:00 PM • 1.5 hour session</p>
            </div>
            <button className="px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition-colors whitespace-nowrap">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Reviews</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-800">Sarah Thompson</p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Excellent tutor! Very patient and explains concepts clearly. Highly recommend!"
            </p>
            <p className="text-xs text-slate-400 mt-2">2 days ago</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-800">Mike Chen</p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Great session! Helped me understand difficult concepts in no time."
            </p>
            <p className="text-xs text-slate-400 mt-2">1 week ago</p>
          </div>
        </div>
      </div>
    </>
  )
}

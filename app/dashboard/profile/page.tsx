"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()

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
              JD
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-800">John Doe</h1>
              <p className="text-slate-600 mt-1">john.doe@example.com</p>
              <button className="mt-3 flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <User className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="text-base text-slate-800 font-medium">John Doe</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-base text-slate-800 font-medium">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Phone</p>
                <p className="text-base text-slate-800 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Location</p>
                <p className="text-base text-slate-800 font-medium">New York, USA</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500">Member Since</p>
                <p className="text-base text-slate-800 font-medium">January 2026</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import Image from "next/image"
import { ArrowLeft, GraduationCap, UserCheck } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: "student" | "tutor") => void
  onBack: () => void
}

export function RoleSelection({ onRoleSelect, onBack }: RoleSelectionProps) {
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
      <div className="mt-8 text-center">
        <p className="text-slate-400 text-xs">
          You can always change your role later in settings
        </p>
      </div>
      </div>
    </div>
  )
}
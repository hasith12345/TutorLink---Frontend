"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StudentForm } from "../auth/student-form"
import { TutorForm } from "../auth/tutor-form"

type Role = "student" | "tutor" | null

export function RoleSelectorModal({
  onClose,
  isOpen,
}: {
  onClose: () => void
  isOpen: boolean
}) {
  const [selectedRole, setSelectedRole] = useState<Role>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedRole) {
          setSelectedRole(null)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedRole, onClose])

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setIsFlipping(true)
  }

  const handleBack = () => {
    setSelectedRole(null)
    setIsFlipping(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              <AnimatePresence mode="wait">
                {!selectedRole ? (
                  // Role Selection Cards
                  <motion.div
                    key="role-selector"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-xl"
                  >
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Choose Your Role</h2>
                    <p className="text-slate-500 text-center mb-8">Select how you'd like to use our platform</p>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Student Card */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoleSelect("student")}
                        className="relative overflow-hidden rounded-xl border-2 border-slate-200 p-6 text-left hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">👨‍🎓</span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">Student</h3>
                          <p className="text-sm text-slate-500 text-center">Learn from experienced tutors</p>
                        </div>
                      </motion.button>

                      {/* Tutor Card */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoleSelect("tutor")}
                        className="relative overflow-hidden rounded-xl border-2 border-slate-200 p-6 text-left hover:border-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">👨‍🏫</span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">Tutor</h3>
                          <p className="text-sm text-slate-500 text-center">Share your expertise with students</p>
                        </div>
                      </motion.button>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="mt-8 w-full py-2 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      ✕ Close
                    </button>
                  </motion.div>
                ) : (
                  // Form View
                  <motion.div
                    key={`${selectedRole}-form`}
                    initial={{ opacity: 0, x: 50, rotateY: 90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -50, rotateY: -90 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-xl"
                  >
                    {selectedRole === "student" ? (
                      <StudentForm onBack={handleBack} />
                    ) : (
                      <TutorForm onBack={handleBack} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

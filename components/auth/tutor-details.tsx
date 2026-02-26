"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Phone, MapPin, CreditCard } from "lucide-react"
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
    dob: "",
    phone: "",
    address: "",
    idNumber: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required"
    } else if (!/^\d{9}[Vv]|\d{12}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Please enter a valid NIC number (9 digits + V or 12 digits)"
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
        dob: formData.dob,
        phone: formData.phone,
        address: formData.address,
        idNumber: formData.idNumber,
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
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => {
                setFormData({ ...formData, dob: e.target.value })
                setErrors(prev => ({ ...prev, dob: "" }))
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                errors.dob ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="0771234567"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                setErrors(prev => ({ ...prev, phone: "" }))
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                errors.phone ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </label>
            <textarea
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value })
                setErrors(prev => ({ ...prev, address: "" }))
              }}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none ${
                errors.address ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <CreditCard className="w-4 h-4 inline mr-2" />
              ID Number (NIC)
            </label>
            <input
              type="text"
              placeholder="123456789V or 123456789012"
              value={formData.idNumber}
              onChange={(e) => {
                setFormData({ ...formData, idNumber: e.target.value })
                setErrors(prev => ({ ...prev, idNumber: "" }))
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                errors.idNumber ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.idNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
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

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Bell, Lock, Globe, Moon, Sun, Monitor } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

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

        <h1 className="text-3xl font-bold text-slate-800 mb-8">Settings</h1>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Appearance</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-slate-600 block mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  theme === "light"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Sun className="w-6 h-6 mb-2 text-amber-500" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  theme === "dark"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Moon className="w-6 h-6 mb-2 text-slate-700" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  theme === "system"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Monitor className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-medium text-slate-800">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive notifications via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-800">Push Notifications</p>
                <p className="text-sm text-slate-500">Receive push notifications</p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pushNotifications ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pushNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <p className="font-medium text-slate-800">Change Password</p>
              <p className="text-sm text-slate-500 mt-1">Update your account password</p>
            </button>

            <button className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <p className="font-medium text-slate-800">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500 mt-1">Add an extra layer of security</p>
            </button>

            <button className="w-full text-left p-4 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition-all">
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-slate-500 mt-1">Permanently delete your account</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

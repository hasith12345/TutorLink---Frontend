"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Locate, Monitor, Users, Shuffle } from "lucide-react"

export function TutorSearchSection() {
  const [subject, setSubject] = useState("")
  const [location, setLocation] = useState("")
  const [learningMode, setLearningMode] = useState<string | null>(null)

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        () => {
          setLocation("Unable to get location")
        },
      )
    }
  }

  const modes = [
    { id: "online", label: "Online", icon: Monitor },
    { id: "physical", label: "Physical", icon: Users },
    { id: "hybrid", label: "Hybrid", icon: Shuffle },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-2xl rounded-2xl border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Search for Tutors</h2>

            <div className="space-y-4">
              {/* Subject Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="What subject do you want to learn?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Location */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-14 text-lg rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetLocation}
                  className="h-14 px-4 rounded-xl border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors bg-transparent"
                >
                  <Locate className="w-5 h-5" />
                </Button>
              </div>

              {/* Learning Mode Filter */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Learning Mode</p>
                <div className="flex flex-wrap gap-3">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setLearningMode(learningMode === mode.id ? null : mode.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-200 ${
                        learningMode === mode.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      <mode.icon className="w-5 h-5" />
                      <span className="font-medium">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in">
                <Search className="w-5 h-5 mr-2" />
                Search Tutors
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

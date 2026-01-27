"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Locate, Monitor, Users, Shuffle, Star, BookOpen, Clock, Award, Loader2, ArrowLeft, User } from "lucide-react"

interface TutorResult {
  id: string
  name: string
  subject: string
  location: string
  mode: "online" | "physical" | "hybrid"
  rating: number
  reviews: number
  price: string
  avatar: string
  experience: string
  students: number
  verified: boolean
  gradient: string
}

const modeIcons = {
  online: Monitor,
  physical: Users,
  hybrid: Shuffle,
}

const modeColors = {
  online: "bg-blue-100 text-blue-700",
  physical: "bg-green-100 text-green-700",
  hybrid: "bg-purple-100 text-purple-700",
}

export default function SearchPage() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [location, setLocation] = useState("")
  const [learningMode, setLearningMode] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<TutorResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch suggestions as user types
  const handleSubjectChange = (value: string) => {
    setSubject(value)

    if (value.trim().length > 0) {
      // Mock suggestions - replace with actual API call
      const allSuggestions = [
        "Mathematics - Sarah Johnson",
        "Mathematics - Michael Chen",
        "Physics - Emily Davis",
        "Physics - James Wilson",
        "Chemistry - Emma Brown",
        "Chemistry - David Lee",
        "English - Olivia Martinez",
        "English - Daniel Taylor",
        "Biology - Sarah Johnson",
        "History - Michael Chen",
        "Computer Science - Emily Davis",
        "Economics - James Wilson",
      ]

      const filtered = allSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      )

      setSuggestions(filtered.slice(0, 6))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSubject(suggestion)
    setShowSuggestions(false)
  }

  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocation("Unable to get location")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(true)

    // Simulate API call - Replace this with actual API call
    setTimeout(() => {
      // Mock data - replace with actual API response
      const mockResults: TutorResult[] = generateMockResults(subject, location, learningMode)
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)

    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/tutors/search', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ subject, location, learningMode })
    //   })
    //   const data = await response.json()
    //   setSearchResults(data.tutors)
    // } catch (error) {
    //   console.error('Search failed:', error)
    // } finally {
    //   setIsSearching(false)
    // }
  }

  const modes = [
    { id: "online", label: "Online", icon: Monitor },
    { id: "physical", label: "Physical", icon: Users },
    { id: "hybrid", label: "Hybrid", icon: Shuffle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Search Form */}
        <Card className="bg-white shadow-xl rounded-2xl border-0 mb-8">
          <CardContent className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Search for Tutors</h1>

            <div className="space-y-4">
              {/* Subject Search with Autocomplete */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search by subject or tutor name..."
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  onFocus={() => subject.trim().length > 0 && setShowSuggestions(true)}
                  className="pl-12 h-14 text-lg rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  autoComplete="off"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{suggestion}</p>
                        </div>
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
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
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search Tutors
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length > 0 ? `Found ${searchResults.length} tutors` : 'No tutors found'}
              </h2>
              {searchResults.length > 0 && (
                <p className="text-gray-600 mt-1">
                  {subject && `for "${subject}" `}
                  {location && `in ${location}`}
                </p>
              )}
            </div>

            {isSearching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <TutorSkeleton key={i} />
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            ) : (
              <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No tutors found</h3>
                  <p className="text-gray-600">Try adjusting your search filters or location</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

function TutorCard({ tutor }: { tutor: TutorResult }) {
  const ModeIcon = modeIcons[tutor.mode]

  return (
    <Card className="group bg-white rounded-2xl border-0 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Profile Header with Gradient Background */}
        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-6 pb-8">
          {/* Verified Badge */}
          {tutor.verified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-500 text-white border-0 shadow-sm">
                <Award className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg ring-4 ring-white overflow-hidden">
              <img 
                src={tutor.avatar} 
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Subject */}
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-1">{tutor.name}</h3>
            <p className="text-indigo-600 font-semibold text-sm flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              {tutor.subject}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{tutor.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span>{tutor.students} students</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{tutor.location}</span>
          </div>

          {/* Mode Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${modeColors[tutor.mode]} rounded-lg px-3 py-1`}>
              <ModeIcon className="w-3.5 h-3.5 mr-1.5" />
              {tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}
            </Badge>
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-900">{tutor.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-xs">({tutor.reviews})</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Starting at</div>
              <div className="text-lg font-bold text-indigo-600">{tutor.price}</div>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TutorSkeleton() {
  return (
    <Card className="bg-white rounded-2xl border-0 shadow-md overflow-hidden">
      <CardContent className="p-0">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded animate-pulse mx-auto w-3/4" />
            <div className="h-4 bg-gray-300 rounded animate-pulse mx-auto w-1/2" />
          </div>
        </div>
        {/* Body Skeleton */}
        <div className="p-5 space-y-3">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-10 bg-gray-200 rounded-xl animate-pulse mt-4" />
        </div>
      </CardContent>
    </Card>
  )
}

// Mock data generator - Replace with actual API
function generateMockResults(subject: string, location: string, mode: string | null): TutorResult[] {
  const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Biology", "History", "Computer Science", "Economics"]
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"]
  const modes: ("online" | "physical" | "hybrid")[] = ["online", "physical", "hybrid"]
  const names = ["Sarah Johnson", "Michael Chen", "Emily Davis", "James Wilson", "Emma Brown", "David Lee", "Olivia Martinez", "Daniel Taylor"]
  const gradients = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-green-500 to-emerald-600",
    "from-orange-500 to-red-600",
    "from-pink-500 to-rose-600",
    "from-purple-500 to-fuchsia-600",
    "from-teal-500 to-blue-600",
    "from-amber-500 to-orange-600",
  ]

  const count = Math.floor(Math.random() * 8) + 4 // Random 4-12 results

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const seed = `${name}-${i}`
    const tutorSubject = subject || subjects[i % subjects.length]
    const tutorLocation = location || locations[i % locations.length]
    const tutorMode = mode ? (mode as "online" | "physical" | "hybrid") : modes[i % modes.length]

    return {
      id: `tutor-${i}`,
      name,
      subject: tutorSubject,
      location: tutorLocation,
      mode: tutorMode,
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 200) + 10,
      price: `$${Math.floor(Math.random() * 50) + 20}/hr`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      experience: `${Math.floor(Math.random() * 8) + 2} years`,
      students: Math.floor(Math.random() * 150) + 20,
      verified: Math.random() > 0.3,
      gradient: gradients[i % gradients.length],
    }
  })
}

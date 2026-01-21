"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Monitor, Users, Shuffle, Loader2 } from "lucide-react"

interface TutorGig {
  id: number
  name: string
  subject: string
  location: string
  mode: "online" | "physical" | "hybrid"
  rating: number
  reviews: number
  price: string
  avatar: string
}

const generateGigs = (start: number, count: number): TutorGig[] => {
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Biology",
    "History",
    "Computer Science",
    "Economics",
  ]
  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ]
  const modes: ("online" | "physical" | "hybrid")[] = ["online", "physical", "hybrid"]
  const names = [
    "Sarah Johnson",
    "Michael Chen",
    "Emily Davis",
    "James Wilson",
    "Emma Brown",
    "David Lee",
    "Olivia Martinez",
    "Daniel Taylor",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: names[i % names.length],
    subject: subjects[i % subjects.length],
    location: locations[i % locations.length],
    mode: modes[i % modes.length],
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 10,
    price: `$${Math.floor(Math.random() * 50) + 20}/hr`,
    avatar: `/placeholder.svg?height=80&width=80&query=professional tutor portrait ${i + 1}`,
  }))
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

export function TutorGigsFeed() {
  const [gigs, setGigs] = useState<TutorGig[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setGigs(generateGigs(0, 8))
      setLoading(false)
    }, 1000)
  }, [])

  const loadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setGigs((prev) => [...prev, ...generateGigs(prev.length, 4)])
      setLoadingMore(false)
    }, 800)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Tutors</h2>
          <p className="text-gray-600 text-lg">Browse our community of qualified tutors ready to help you succeed</p>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <GigSkeleton key={i} />)
            : gigs.map((gig, index) => <GigCard key={gig.id} gig={gig} index={index} />)}
        </div>

        {/* Load More */}
        {!loading && (
          <div className="text-center mt-10">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="outline"
              size="lg"
              className="px-8 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 bg-transparent"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Tutors"
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function GigCard({ gig, index }: { gig: TutorGig; index: number }) {
  const ModeIcon = modeIcons[gig.mode]

  return (
    <Card
      className="bg-white rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={gig.avatar || "/placeholder.svg"}
            alt={gig.name}
            className="w-14 h-14 rounded-xl object-cover bg-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{gig.name}</h3>
            <p className="text-indigo-600 font-medium text-sm">{gig.subject}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{gig.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${modeColors[gig.mode]} rounded-lg`}>
              <ModeIcon className="w-3 h-3 mr-1" />
              {gig.mode.charAt(0).toUpperCase() + gig.mode.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-900">{gig.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({gig.reviews})</span>
          </div>
          <span className="text-lg font-bold text-indigo-600">{gig.price}</span>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-xl">
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  )
}

function GigSkeleton() {
  return (
    <Card className="bg-white rounded-2xl border-0 shadow-md overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse mt-4" />
      </CardContent>
    </Card>
  )
}

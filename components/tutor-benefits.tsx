import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Upload, Users2, Globe } from "lucide-react"

const benefits = [
  {
    icon: Calendar,
    title: "Publish Schedules",
    description: "Create and share your availability so students can easily book sessions with you.",
  },
  {
    icon: Upload,
    title: "Upload Resources",
    description: "Share learning materials, notes, and assignments directly with your students.",
  },
  {
    icon: Users2,
    title: "Manage Students",
    description: "Track enrollments, attendance, and progress of all your students in one dashboard.",
  },
  {
    icon: Globe,
    title: "Reach More Students",
    description: "Expand your reach and connect with students looking for your expertise.",
  },
]

export function TutorBenefits() {
  return (
    <section id="tutors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              For Tutors
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
              Grow Your Tutoring Business
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join thousands of tutors who are expanding their reach and helping students achieve their goals through
              TutorLink.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-0">
                <img src="/online-tutor-teaching-students-video-call-educatio.jpg" alt="Tutor teaching online" className="w-full h-auto" />
              </CardContent>
            </Card>
            {/* Floating Stats Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrendingUpIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">+40%</p>
                    <p className="text-gray-500 text-sm">Avg. Student Growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

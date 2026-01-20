import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
          Find the Right Tutor.
          <br />
          Learn Smarter with TutorLink.
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty">
          A centralized platform connecting students and tutors for online and physical classes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 rounded-xl"
          >
            <Search className="w-5 h-5 mr-2" />
            Find a Tutor
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6 rounded-xl"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Become a Tutor
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
            <div className="text-white/80 text-sm">Active Tutors</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
            <div className="text-white/80 text-sm">Students</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">100+</div>
            <div className="text-white/80 text-sm">Subjects</div>
          </div>
        </div>
      </div>
    </section>
  )
}

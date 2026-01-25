import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br">
      {/* Floating Images */}
      {/* Top Left - Cap */}
      <div className="absolute rotate-340 top-25 left-10 md:left-50 z-0 animate-float">
        <Image 
          src="/cap.png" 
          alt="Graduation cap" 
          width={200}
          height={200}
          className="opacity-100"
        />
      </div>
      
      {/* Top Right - Book */}
      <div className="rotate-10 absolute top-25 right-10 md:right-45 z-0 animate-float" style={{ animationDelay: '1s' }}>
        <Image 
          src="/book.png" 
          alt="Book" 
          width={200}
          height={200}
          className="opacity-100"
        />
      </div>
      
      {/* Bottom Left - Online */}
      <div className="absolute bottom-37 left-10 md:left-16 z-0 animate-float" style={{ animationDelay: '2s' }}>
        <Image 
          src="/online.png" 
          alt="Online learning" 
          width={400}
          height={400}
          className="opacity-100"
        />
      </div>
      
      {/* Bottom Right - Physical */}
      <div className="absolute bottom-36 right-10 md:right-15 z-0 animate-float" style={{ animationDelay: '1.5s' }}>
        <Image 
          src="/physical.png" 
          alt="Physical learning" 
          width={430}
          height={430}
          className="opacity-100"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-10 -mt-30">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
          Find the Right Tutor.
          <br />
          Learn Smarter with TutorLink.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          A centralized platform connecting students and tutors for online and physical classes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 rounded-xl"
          >
            <Search className="w-5 h-5 mr-2" />
            Find a Tutor
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 text-lg px-8 py-6 rounded-xl"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Become a Tutor
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
            <div className="text-gray-600 text-sm">Active Tutors</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">50K+</div>
            <div className="text-gray-600 text-sm">Students</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">100+</div>
            <div className="text-gray-600 text-sm">Subjects</div>
          </div>
        </div>
      </div>
    </section>
  )
}

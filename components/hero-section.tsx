import { Button } from "@heroui/react";
import { ArrowRight, Users, BookOpen, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-15 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Connect with the <span className="text-primary">Perfect Tutor</span> for Your Learning Journey
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                TutorLink bridges the gap between passionate learners and expert educators. Find your ideal tutor,
                enroll in classes, and access shared resources all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                size="lg"
                color="primary"
                radius="lg"
                className="rounded-xl px-3 py-3 font-bold flex items-center justify-center gap-1 hover:bg-primary/90"
                endContent={<ArrowRight className="h-4 w-4" />}
                >
                Find Your Tutor
                </Button>

                <Button
                variant="bordered"
                size="lg"
                color="primary"
                className="rounded-xl px-3 py-3 font-bold border border-gray-300 flex items-center justify-center hover:bg-green-200"
                >
                Join as a Tutor
                </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">500+ Subjects</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/diverse-students-and-tutors-collaborating-in-moder.jpg"
                alt="Students and tutors collaborating"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

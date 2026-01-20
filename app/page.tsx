import { Navbar } from "../components/navbar"
import { HeroSection } from "../components/hero-section"
import { TutorSearchSection } from "../components/tutor-search-section"
import { TutorGigsFeed } from "../components/tutor-gigs-feed"
import { StudentBenefits } from "../components/student-benefits"
import { TutorBenefits } from "../components/tutor-benefits"
import { PlatformFeatures } from "../components/platform-features"
import { CallToAction } from "../components/call-to-action"
import { Footer } from "../components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <TutorSearchSection />
        <TutorGigsFeed />
        <StudentBenefits />
        <TutorBenefits />
        <PlatformFeatures />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchSection } from "@/components/search-section"

import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
      </main>
      <Footer />
    </div>
  )
}

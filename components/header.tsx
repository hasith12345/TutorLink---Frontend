import { Button } from "@heroui/react";
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="/favicon.png" className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">TutorLink</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="light" size="sm" className="font-medium hidden md:inline-flex rounded-xl px-3 py-5 hover:text-primary">
            Sign In
          </Button>
          <Button color="primary" size="sm" className="hidden md:inline-flex bg-primary font-medium text-primary-foreground hover:bg-primary/90 rounded-xl border-primary py-5 px-3">
            Get Started
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/favicon.png" className="h-8 w-8 text-sidebar-primary" />
              <span className="text-xl font-bold">TutorLink</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting passionate learners with expert educators to create meaningful learning experiences.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-sidebar-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-sidebar-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-sidebar-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-sidebar-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Find Tutors
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Browse Subjects
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Tutors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Join as Tutor
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Tutor Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Pricing Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TutorLink. All rights reserved. Empowering education through smart connections.
          </p>
        </div>
      </div>
    </footer>
  )
}

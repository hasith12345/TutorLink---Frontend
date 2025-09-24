import { Button, Input, Card } from "@heroui/react";
import { Search, MapPin, Clock, DollarSign } from "lucide-react";

export function SearchSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Find Your Perfect Tutor in Minutes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Search by subject, location, availability, or budget to discover tutors that match your learning needs.
          </p>
        </div>

        <Card className="p-6 max-w-4xl mx-auto bg-card border-border rounded-xl">
            <div className="grid md:grid-cols-4 gap-4">
                
                {/* Subject Input */}
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input 
                    placeholder="Subject (e.g., Math)" 
                    className="pl-6 bg-input border border-border rounded-xl py-2.5 relative z-0" 
                />
                </div>

                {/* Location Input */}
                <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input 
                    placeholder="Location" 
                    className="pl-6 bg-input border border-border rounded-xl py-2.5 relative z-0" 
                />
                </div>

                {/* Availability Input */}
                <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input 
                    placeholder="Availability" 
                    className="pl-6 bg-input border border-border rounded-xl py-2.5 relative z-0" 
                />
                </div>

                {/* Search Button */}
                <Button 
                className="bg-primary py-2.5 border rounded-xl text-primary-foreground hover:bg-primary/90"
                >
                Search Tutors
                </Button>

            </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered algorithm finds tutors that match your learning style
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-sm text-muted-foreground">Book sessions that fit your schedule, online or in-person</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-sm text-muted-foreground">Clear pricing with secure payment processing</p>
          </div>
        </div>
      </div>
    </section>
  )
}

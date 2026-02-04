import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="bg-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Our Team
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about TutorLink? Need help getting started?
            Our team is here to support you.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Get in touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Mail className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">support@tutorlink.lk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Phone className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <MapPin className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl  bg-purple-50 p-6 text-purple-900">
              <p className="font-medium mb-1">
                We usually respond within 24 hours.
              </p>
              <p className="text-sm">
                Our support team is available Monday to Friday.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

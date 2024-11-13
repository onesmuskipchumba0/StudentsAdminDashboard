import Link from 'next/link'
import { 
  AiOutlineCheckCircle, 
  AiOutlineRocket,
  AiOutlineSafety,
  AiOutlineTeam,
  AiOutlineCloud,
  AiOutlineCustomerService
} from 'react-icons/ai'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Streamline Your School Management with EduAdmin Pro
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              The complete solution for educational institutions to manage students, 
              courses, and administrative tasks efficiently.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link 
                href="/demo" 
                className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to streamline your educational administration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of schools already using EduAdmin Pro to streamline their operations.
            </p>
            <Link 
              href="/signup" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: AiOutlineCloud,
    title: "Cloud-Based Solution",
    description: "Access your data anywhere, anytime with our secure cloud infrastructure."
  },
  {
    icon: AiOutlineTeam,
    title: "Student Management",
    description: "Efficiently manage student records, attendance, and academic progress."
  },
  {
    icon: AiOutlineRocket,
    title: "Performance Tracking",
    description: "Monitor and analyze academic performance with advanced analytics."
  },
  {
    icon: AiOutlineSafety,
    title: "Secure & Reliable",
    description: "Bank-grade security to protect your institution's sensitive data."
  },
  {
    icon: AiOutlineCheckCircle,
    title: "Easy Integration",
    description: "Seamlessly integrate with existing school systems and tools."
  },
  {
    icon: AiOutlineCustomerService,
    title: "24/7 Support",
    description: "Round-the-clock support to help you whenever you need it."
  }
]

const stats = [
  { value: "1000+", label: "Schools" },
  { value: "500K+", label: "Students" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
]

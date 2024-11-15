'use client';

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { 
  AiOutlineCheckCircle, 
  AiOutlineRocket,
  AiOutlineSafety,
  AiOutlineTeam,
  AiOutlineCloud,
  AiOutlineCustomerService
} from 'react-icons/ai'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    document.querySelectorAll('.fade-in').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-10 -right-10 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-10 -left-10 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 top-1/2 left-1/2 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-8 lg:px-16 relative">
          <div className="max-w-3xl space-y-8 slide-in-left">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Streamline Your School Management
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              The complete solution for educational institutions to manage students, 
              courses, and administrative tasks efficiently.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                Get Started
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </Link>
              <Link 
                href="/demo" 
                className="group bg-transparent border-2 border-white/80 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm"
              >
                Request Demo
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to streamline your educational administration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`fade-in p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="container mx-auto px-8 lg:px-16 relative">
          <div className="grid md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center space-y-3 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto space-y-8 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of schools already using our platform to streamline their operations.
            </p>
            <Link 
              href="/signup" 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Start Free Trial
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
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

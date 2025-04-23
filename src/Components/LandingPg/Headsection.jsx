"use client"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Headsection.css"

const Headsection = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Banner */}
      <div
        className="w-full h-screen max-h-[680px] bg-cover bg-center relative"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SCI-banner.jpg-dVX3KKJE6kZlJmIHUmzxoJ4BGUJwjG.jpeg")
          `,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'top',
          backgroundSize: '2000px',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className={`container mx-auto px-6 relative z-10 h-full flex flex-col justify-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl text-white space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Decentralized</span> Autonomous Legal Record Custodian
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Revolutionizing document management through blockchain-powered Digital Transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/contact")}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Enquire Now
              </button>
              <button
                onClick={() => navigate("/features")}
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Problems Section */}
      <div className="container mx-auto px-6 py-10">
        <div className={`text-center mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
            Challenges We Solve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Modern Legal Record Challenges</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Traditional systems face multiple pain points that blockchain technology can elegantly solve
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ),
              title: "Tampering and Fraud",
              description: "Immutable blockchain records prevent unauthorized alterations and document forgery",
              color: "bg-red-100 text-red-600"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "High Operational Costs",
              description: "Reduce administrative overhead with automated smart contract processes",
              color: "bg-orange-100 text-orange-600"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Inefficiency",
              description: "Instant verification eliminates manual processes and waiting times",
              color: "bg-yellow-100 text-yellow-600"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: "Security Concerns",
              description: "End-to-end encryption and decentralized storage protect sensitive data",
              color: "bg-green-100 text-green-600"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: "Lack of Transparency",
              description: "Complete audit trail with timestamped, verifiable transactions",
              color: "bg-blue-100 text-blue-600"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6 flex flex-col items-center text-center h-full border border-gray-100 hover:border-blue-200"
            >
              <div className={`${item.color} p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Idea Section */}
      <div className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-5xl mx-auto text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-6">
              Our Innovation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Legal Record Management</span>
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 mb-12">
              <p className="leading-relaxed">
                The <strong>Decentralized Autonomous Legal Record Custodian (DALRC)</strong> represents a paradigm shift in document management through blockchain-powered digital transformation. By integrating <strong>Ethereum blockchain</strong> and <strong>InterPlanetary File System (IPFS)</strong>, we deliver:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: '🔒', title: "Tamper-proof records", description: "Immutable blockchain storage prevents unauthorized alterations" },
                { icon: '⚡', title: "Smart contracts", description: "Automated access control and verification processes" },
                { icon: '🌐', title: "Decentralized storage", description: "IPFS ensures data integrity and global availability" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => navigate("/our-idea")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Learn More About Our Solution
              <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Headsection
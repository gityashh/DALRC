import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const features = [
    {
      id: 1,
      title: "Tamper-Proof Immutable Ledger",
      description: "Document hashes stored on blockchain create an unforgeable audit trail. Any alteration attempt changes the hash, immediately signaling tampering while preserving the original record.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-100",
      pattern: "pattern-circuit-board-blue-500/10"
    },
    {
      id: 2,
      title: "Advanced Security Architecture",
      description: "End-to-end encryption combined with multi-factor authentication and granular role-based access controls ensure military-grade protection for sensitive legal documents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-100",
      pattern: "pattern-circuit-board-purple-500/10"
    },
    {
      id: 3,
      title: "Smart Contract Automation",
      description: "Self-executing contracts automate document workflows including sharing, timestamping, version control, and access permissions - eliminating human error while accelerating legal processes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-100",
      pattern: "pattern-circuit-board-green-500/10"
    },
    {
      id: 4,
      title: "Decentralized Storage (IPFS)",
      description: "Files distributed across a peer-to-peer network ensure redundancy, integrity, and censorship resistance - eliminating single points of failure inherent in traditional systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-100",
      pattern: "pattern-circuit-board-yellow-500/10"
    },
    {
      id: 5,
      title: "Seamless Interoperability",
      description: "RESTful APIs and standardized data formats enable effortless integration with existing legal software ecosystems including case management and document review platforms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-100",
      pattern: "pattern-circuit-board-red-500/10"
    },
    {
      id: 6,
      title: "Intuitive User Experience",
      description: "Thoughtfully designed interface bridges the gap between blockchain complexity and legal professionals' needs, with contextual guidance and progressive disclosure.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-100",
      pattern: "pattern-circuit-board-indigo-500/10"
    }
  ];

  return (
    <div className="relative overflow-hidden py-24 bg-gradient-to-br from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium tracking-wider text-blue-600 bg-blue-100 rounded-full mb-6">
            CORE CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blockchain-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Document Revolution</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Transforming legal record management through decentralized innovation
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              
              <div 
                className={`relative h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:border-transparent transition-all duration-300 ${activeFeature === feature.id ? 'ring-2 ring-blue-500 scale-[1.02]' : ''}`}
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              >
                <div className={`absolute inset-0 ${feature.pattern} opacity-30`}></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className={`${feature.bgColor} p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  
                  <AnimatePresence>
                    {activeFeature === feature.id ? (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-gray-600 overflow-hidden"
                      >
                        {feature.description}
                      </motion.p>
                    ) : (
                      <motion.p 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-600 line-clamp-2"
                      >
                        {feature.description.substring(0, 100)}...
                      </motion.p>
                    )}
                  </AnimatePresence>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {String(feature.id).padStart(2, '0')}/{String(features.length).padStart(2, '0')}
                    </span>
                    <button 
                      className={`text-sm font-semibold ${activeFeature === feature.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} transition-colors duration-300`}
                    >
                      {activeFeature === feature.id ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your document management with blockchain technology?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Request Demo
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              Download Whitepaper
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
"use client"

import { useState } from "react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What is the main objective of this project?",
      answer: "The main goal is to ensure secure, transparent, and decentralized document management using blockchain and IPFS.",
    },
    {
      question: "How does this system differ from traditional document management systems?",
      answer: "Unlike traditional systems, this uses blockchain for immutable records and IPFS for decentralized storage, boosting security and transparency.",
    },
    {
      question: "Who are the target users of this platform?",
      answer: "Startups, legal firms, educational institutes, and any individual or organization valuing document integrity and transparency.",
    },
    {
      question: "How does the platform ensure data privacy and security?",
      answer: "With end-to-end encryption, on-chain verification, and zero-knowledge proof models to protect user identity and data.",
    },
    {
      question: "What happens if a user tries to modify a document?",
      answer: "Every modification results in a new immutable version, and previous versions are always traceable.",
    },
    {
      question: "What is IPFS and why is it used?",
      answer: "IPFS is a decentralized file storage system that stores and accesses files across a distributed network, enhancing speed and security.",
    },
    {
      question: "What is the role of smart contracts in this system?",
      answer: "Smart contracts automate document verification, access permissions, and update rules, ensuring trustless interactions.",
    },
    {
      question: "How is user identity managed in this system?",
      answer: "Through blockchain wallets and DID protocols that ensure secure, verifiable, and decentralized identities.",
    },
    {
      question: "What is the benefit of using a freemium business model?",
      answer: "It allows users to explore the platform’s core features for free while offering premium tools for power users.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Still have questions?
        </h2>
        <p className="text-xl text-gray-600 mb-12">Explore our most frequently asked questions.</p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="transition-all duration-300 rounded-2xl bg-white shadow-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none hover:bg-gray-50 transition"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-indigo-600" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`px-6 pt-0 pb-6 text-gray-600 text-base transition-all duration-300 ease-in-out ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Shield, Key, Edit2 } from "lucide-react"
import metamaskLogo from "../../assets/metamask-logo.png"

const UserProfile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch user data from API
    // For now, we'll use mock data from localStorage
    const fetchUserData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Get data from localStorage (set during registration)
        const storedProfile = localStorage.getItem("userProfile")
        const walletAddress = localStorage.getItem("walletAddress")

        if (storedProfile) {
          setUserData(JSON.parse(storedProfile))
        } else {
          // Fallback mock data
          setUserData({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+91 9876543210",
            role: "civilian",
            aadharNumber: "123456789012",
            walletAddress: walletAddress || "0x0000000000000000000000000000000000000000",
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-white p-2 rounded-full h-24 w-24 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <User size={64} className="text-blue-500" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-blue-100 capitalize">{userData.role}</p>
            </div>
            <button className="mt-4 md:mt-0 md:ml-auto bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md flex items-center">
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhar Number</p>
                    <p className="font-medium">{userData.aadharNumber}</p>
                  </div>
                </div>

                {userData.role === "lawyer" && userData.barCouncilId && (
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                      <Key size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bar Council ID</p>
                      <p className="font-medium">{userData.barCouncilId}</p>
                    </div>
                  </div>
                )}

                {(userData.role === "judge" || userData.role === "police") && userData.employeeId && (
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                      <Key size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employee ID</p>
                      <p className="font-medium">{userData.employeeId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Wallet Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Blockchain Wallet</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <img src={metamaskLogo || "/placeholder.svg"} alt="MetaMask" className="h-8 w-8 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">MetaMask Connected</p>
                    <p className="text-sm text-gray-500">Your blockchain identity</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Wallet Address</p>
                  <p className="font-mono text-sm bg-white p-2 rounded border overflow-x-auto">
                    {userData.walletAddress}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

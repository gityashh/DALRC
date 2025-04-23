"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import metamaskLogo from "../../assets/metamask-logo.png"

const MetamaskRegister = () => {
  const [step, setStep] = useState(1)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "civilian", // Default role
    aadharNumber: "",
    barCouncilId: "", // For lawyers
    employeeId: "", // For judges and police
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true)
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      if (!isMetamaskInstalled) {
        throw new Error("MetaMask is not installed")
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const address = accounts[0]
      setWalletAddress(address)

      // Move to step 2 (user details form)
      setStep(2)
    } catch (err) {
      console.error("Error connecting to MetaMask:", err)
      setError(err.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // In a real app, you would send this data to your backend
      // For now, we'll just simulate a successful registration

      // Store the wallet address in localStorage (temporary solution)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          ...formData,
          walletAddress,
        }),
      )

      // Call the login function from auth context
      login(`metamask_${walletAddress}`)

      // Redirect to dashboard
      navigate("/dashboard")
    } catch (err) {
      console.error("Error registering user:", err)
      setError(err.message || "Failed to register user")
    }
  }

  // Conditional rendering based on user role
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "lawyer":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barCouncilId">
              Bar Council ID
            </label>
            <input
              type="text"
              id="barCouncilId"
              name="barCouncilId"
              value={formData.barCouncilId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )
      case "judge":
      case "police":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-600">Register to access DALRC platform</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {step === 1 ? (
        <>
          {!isMetamaskInstalled ? (
            <div className="text-center mb-6">
              <p className="text-red-600 mb-4">MetaMask is not installed</p>
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 inline-block"
              >
                Install MetaMask
              </a>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
            >
              <img src={metamaskLogo || "/placeholder.svg"} alt="MetaMask" className="w-6 h-6 mr-2" />
              {isConnecting ? "Connecting..." : "Connect with MetaMask"}
            </button>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-600 hover:text-blue-800 font-medium">
                Login
              </button>
            </p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Connected Wallet Address:</p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">{walletAddress}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="civilian">Civilian</option>
              <option value="lawyer">Lawyer</option>
              <option value="judge">Judge</option>
              <option value="police">Police</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadharNumber">
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              maxLength="12"
              minLength="12"
            />
          </div>

          {renderRoleSpecificFields()}

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default MetamaskRegister

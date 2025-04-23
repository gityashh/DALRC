"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import metamaskLogo from "../../assets/metamask-logo.png"

const MetamaskLogin = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)
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

      // In a real app, you would verify this address with your backend
      // For now, we'll just simulate a successful login

      // Store the wallet address in localStorage (temporary solution)
      localStorage.setItem("walletAddress", address)

      // Call the login function from auth context
      login(`metamask_${address}`) // Using a prefix to indicate this is a metamask login

      // Redirect to dashboard
      navigate("/dashboard")
    } catch (err) {
      console.error("Error connecting to MetaMask:", err)
      setError(err.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Login to access your DALRC dashboard</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

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
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-blue-600 hover:text-blue-800 font-medium">
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default MetamaskLogin

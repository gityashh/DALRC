"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const roles = ['Civilian', 'Judge', 'Lawyer', 'Police']

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    role: 'Civilian',
    firstName: '',
    lastName: '',
    aadharNumber: '',
    phoneNumber: '+91',
    userId: '',
    employeeId: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const isCivilian = form.role === 'Civilian'

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', form)
      navigate('/OtpVerification', { state: { phoneNumber: form.phoneNumber } })
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Signup on LegalNexus</h2>
        <p className="text-gray-600">Register to access the platform</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
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
              placeholder="John"
              value={form.firstName}
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
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadharNumber">
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            placeholder="12 digit Aadhar number"
            value={form.aadharNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength="12"
            minLength="12"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {isCivilian ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="johnDoe01"
              value={form.userId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              placeholder="Employee Identity Card Id"
              value={form.employeeId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="@95Zln70"
            value={form.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            minLength="6"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 w-full"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
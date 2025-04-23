"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

const NewCaseForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    caseType: "",
    description: "",
    courtName: "",
    filingDate: "",
    status: "pending",
    participants: [{ name: "", role: "", contact: "" }],
    documents: [],
  })
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants]
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    }

    setFormData((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }))
  }

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...prev.participants, { name: "", role: "", contact: "" }],
    }))
  }

  const removeParticipant = (index) => {
    const updatedParticipants = [...formData.participants]
    updatedParticipants.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index) => {
    const updatedFiles = [...uploadedFiles]
    updatedFiles.splice(index, 1)
    setUploadedFiles(updatedFiles)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log("Form submitted:", { ...formData, documents: uploadedFiles })

    // Redirect to cases list
    navigate("/cases")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate("/cases")} className="mr-4 p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Case</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Case Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Case Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Case Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-1">
                Case Type*
              </label>
              <select
                id="caseType"
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Case Type</option>
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="family">Family</option>
                <option value="property">Property</option>
                <option value="corporate">Corporate</option>
                <option value="intellectual_property">Intellectual Property</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Case Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">
                Court Name
              </label>
              <input
                type="text"
                id="courtName"
                name="courtName"
                value={formData.courtName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="filingDate" className="block text-sm font-medium text-gray-700 mb-1">
                Filing Date
              </label>
              <input
                type="date"
                id="filingDate"
                name="filingDate"
                value={formData.filingDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="urgent">Urgent</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Case Participants</h2>
            <button
              type="button"
              onClick={addParticipant}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Participant
            </button>
          </div>

          {formData.participants.map((participant, index) => (
            <div key={index} className="p-4 border rounded-md mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Participant #{index + 1}</h3>
                {formData.participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                  <select
                    value={participant.role}
                    onChange={(e) => handleParticipantChange(index, "role", e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="plaintiff">Plaintiff</option>
                    <option value="defendant">Defendant</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="judge">Judge</option>
                    <option value="witness">Witness</option>
                    <option value="expert">Expert Witness</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                  <input
                    type="text"
                    value={participant.contact}
                    onChange={(e) => handleParticipantChange(index, "contact", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Case Documents</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input type="file" id="documents" multiple onChange={handleFileChange} className="hidden" />
            <label htmlFor="documents" className="cursor-pointer">
              <Upload size={36} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, JPG, PNG (Max 10MB per file)</p>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Uploaded Files ({uploadedFiles.length})</h3>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(index)} className="text-red-600 hover:text-red-800">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/cases")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Case
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCaseForm

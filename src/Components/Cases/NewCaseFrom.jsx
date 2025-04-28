import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../context/useAuth"

const NewCaseForm = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courtName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear errors when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/case/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setSuccess({
        message: "Case created successfully!",
        caseId: response.data.caseId,
      })
      
      // Redirect to cases list after 2 seconds
      setTimeout(() => {
        navigate("/cases")
      }, 2000)
    } catch (err) {
      console.error("Case creation failed:", err)
      if (err.response) {
        // Handle validation errors from Zod
        if (err.response.data.errors) {
          const errorMessages = err.response.data.errors.map(
            (error) => `${error.path.join(".")}: ${error.message}`
          )
          setError(errorMessages.join("\n"))
        } else {
          setError(err.response.data.message || "Failed to create case")
        }
      } else {
        setError(err.message || "Failed to create case")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/cases")}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Case</h1>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>{success.message}</p>
          <p className="text-sm mt-1">Case ID: {success.caseId}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Case Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Case Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Case Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 3 characters required
              </p>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Case Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="courtName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Court Name
              </label>
              <input
                type="text"
                id="courtName"
                name="courtName"
                value={formData.courtName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/cases")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-24"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Case"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCaseForm

// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { ArrowLeft, Upload, Plus, X } from "lucide-react"

// const NewCaseForm = () => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     title: "",
//     caseType: "",
//     description: "",
//     courtName: "",
//     filingDate: "",
//     status: "pending",
//     participants: [{ name: "", role: "", contact: "" }],
//     documents: [],
//   })
//   const [uploadedFiles, setUploadedFiles] = useState([])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleParticipantChange = (index, field, value) => {
//     const updatedParticipants = [...formData.participants]
//     updatedParticipants[index] = {
//       ...updatedParticipants[index],
//       [field]: value,
//     }

//     setFormData((prev) => ({
//       ...prev,
//       participants: updatedParticipants,
//     }))
//   }

//   const addParticipant = () => {
//     setFormData((prev) => ({
//       ...prev,
//       participants: [...prev.participants, { name: "", role: "", contact: "" }],
//     }))
//   }

//   const removeParticipant = (index) => {
//     const updatedParticipants = [...formData.participants]
//     updatedParticipants.splice(index, 1)

//     setFormData((prev) => ({
//       ...prev,
//       participants: updatedParticipants,
//     }))
//   }

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files)
//     setUploadedFiles((prev) => [...prev, ...files])
//   }

//   const removeFile = (index) => {
//     const updatedFiles = [...uploadedFiles]
//     updatedFiles.splice(index, 1)
//     setUploadedFiles(updatedFiles)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     // In a real app, you would send this data to your backend

//     // Redirect to cases list
//     navigate("/cases")
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="flex items-center mb-6">
//         <button onClick={() => navigate("/cases")} className="mr-4 p-2 rounded-full hover:bg-gray-100">
//           <ArrowLeft size={20} />
//         </button>
//         <h1 className="text-2xl font-bold text-gray-800">Create New Case</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Case Information */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Case Information</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 Case Title*
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-1">
//                 Case Type*
//               </label>
//               <select
//                 id="caseType"
//                 name="caseType"
//                 value={formData.caseType}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Case Type</option>
//                 <option value="civil">Civil</option>
//                 <option value="criminal">Criminal</option>
//                 <option value="family">Family</option>
//                 <option value="property">Property</option>
//                 <option value="corporate">Corporate</option>
//                 <option value="intellectual_property">Intellectual Property</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Case Description*
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows="4"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>

//             <div>
//               <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">
//                 Court Name
//               </label>
//               <input
//                 type="text"
//                 id="courtName"
//                 name="courtName"
//                 value={formData.courtName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="filingDate" className="block text-sm font-medium text-gray-700 mb-1">
//                 Filing Date
//               </label>
//               <input
//                 type="date"
//                 id="filingDate"
//                 name="filingDate"
//                 value={formData.filingDate}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="active">Active</option>
//                 <option value="urgent">Urgent</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Participants */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Case Participants</h2>
//             <button
//               type="button"
//               onClick={addParticipant}
//               className="flex items-center text-blue-600 hover:text-blue-800"
//             >
//               <Plus size={16} className="mr-1" />
//               Add Participant
//             </button>
//           </div>

//           {formData.participants.map((participant, index) => (
//             <div key={index} className="p-4 border rounded-md mb-4">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-medium">Participant #{index + 1}</h3>
//                 {formData.participants.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeParticipant(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <X size={16} />
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//                   <input
//                     type="text"
//                     value={participant.name}
//                     onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
//                   <select
//                     value={participant.role}
//                     onChange={(e) => handleParticipantChange(index, "role", e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Role</option>
//                     <option value="plaintiff">Plaintiff</option>
//                     <option value="defendant">Defendant</option>
//                     <option value="lawyer">Lawyer</option>
//                     <option value="judge">Judge</option>
//                     <option value="witness">Witness</option>
//                     <option value="expert">Expert Witness</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
//                   <input
//                     type="text"
//                     value={participant.contact}
//                     onChange={(e) => handleParticipantChange(index, "contact", e.target.value)}
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Document Upload */}

//         { <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Case Documents</h2>

//           <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
//             <input type="file" id="documents" multiple onChange={handleFileChange} className="hidden" />
//             <label htmlFor="documents" className="cursor-pointer">
//               <Upload size={36} className="mx-auto text-gray-400 mb-2" />
//               <p className="text-sm text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
//               <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, JPG, PNG (Max 10MB per file)</p>
//             </label>
//           </div>

//           {/* Uploaded Files List */}
//           {uploadedFiles.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-medium text-gray-700 mb-2">Uploaded Files ({uploadedFiles.length})</h3>
//               <ul className="space-y-2">
//                 {uploadedFiles.map((file, index) => (
//                   <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
//                     <div className="flex items-center">
//                       <div className="text-sm">
//                         <p className="font-medium text-gray-800">{file.name}</p>
//                         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
//                       </div>
//                     </div>
//                     <button type="button" onClick={() => removeFile(index)} className="text-red-600 hover:text-red-800">
//                       <X size={16} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>  }

//         {/* Submit Buttons */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate("/cases")}
//             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Create Case
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default NewCaseForm

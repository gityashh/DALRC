"use client"

import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FileText, Upload, Search } from "lucide-react"

const CaseVerify = () => {
  const caseData = useOutletContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [verifyingDoc, setVerifyingDoc] = useState(null)

  // Filter documents based on search term
  const filteredDocuments = caseData.documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVerifyDocument = (document) => {
    setVerifyingDoc(document)
    // In a real app, this would open a verification flow
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Verify Documents</h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          <Upload size={16} className="mr-2" />
          Upload New Document
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Documents List */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Document
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Uploaded By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <tr key={document.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{document.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{document.uploadedBy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{document.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {document.verified ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {document.verified ? (
                    <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  ) : (
                    <>
                      <button
                        className="text-green-600 hover:text-green-900 mr-4"
                        onClick={() => handleVerifyDocument(document)}
                      >
                        Verify
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* If no documents */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm ? "No documents match your search." : "No documents have been uploaded to this case yet."}
          </p>
        </div>
      )}

      {/* Verification Modal */}
      {verifyingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verify Document</h3>
            <p className="text-gray-600 mb-4">
              You are about to verify "{verifyingDoc.name}". This action will record your verification on the blockchain
              and cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setVerifyingDoc(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would call a blockchain verification function
                  alert(`Document ${verifyingDoc.name} has been verified!`)
                  setVerifyingDoc(null)
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Verify Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseVerify

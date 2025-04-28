"use client"

import { useState, useEffect, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { FileText, Upload, Search, Download, Trash2, Shield, AlertTriangle, X } from "lucide-react"
import { useDocument } from "../../context/useDocument"
import LoadingSpinner from "../common/LoadingSpinner"
import ErrorMessage from "../common/ErrorMessage"
import { formatDistanceToNow } from "date-fns"

const CaseVerify = () => {
  const caseData = useOutletContext()
  const { caseId } = useParams()
  const fileInputRef = useRef(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    file: null,
  })

  const [shareForm, setShareForm] = useState({
    targetWallet: "",
    canView: true,
    canDelete: false,
  })

  const {
    documents,
    loading,
    error,
    uploadProgress,
    fetchCaseDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    grantDocumentAccess,
  } = useDocument()

  // Check if user is admin
  const userWallet = localStorage.getItem("walletAddress")?.toLowerCase()
  const isAdmin = userWallet && caseData.admin?.toLowerCase() === userWallet
  const isCaseClosed = caseData.isClosed

  // Find current user's permissions
  const currentUserPermissions =
    caseData.participants?.find((p) => p.wallet.toLowerCase() === userWallet)?.permissions || {}

  const canUpload = isAdmin || currentUserPermissions.canUpload

  // Load documents on mount
  useEffect(() => {
    if (caseId) {
      fetchCaseDocuments(caseId)
    }
  }, [caseId, fetchCaseDocuments])

  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileType.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadForm({
        ...uploadForm,
        file,
        title: file.name, // Default to file name, user can change
      })
    }
  }

  // Handle document upload
  const handleUpload = async (e) => {
    e.preventDefault()

    if (!uploadForm.file) {
      return
    }

    try {
      await uploadDocument(uploadForm.file, caseId, uploadForm.title)

      // Reset form and close modal
      setUploadForm({ title: "", file: null })
      setShowUploadModal(false)

      // Refresh documents list
      fetchCaseDocuments(caseId)
    } catch (err) {
      console.error("Upload failed:", err)
    }
  }

  // Handle document deletion
  const handleDelete = async () => {
    if (!selectedDocument) return

    try {
      await deleteDocument(selectedDocument._id)
      setSelectedDocument(null)
      setShowDeleteModal(false)

      // Refresh documents list
      fetchCaseDocuments(caseId)
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  // Handle document download
  const handleDownload = async (document) => {
    try {
      await downloadDocument(document.ipfsCid, document.title)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  // Handle sharing document
  const handleShare = async (e) => {
    e.preventDefault()

    if (!selectedDocument || !shareForm.targetWallet) {
      return
    }

    try {
      await grantDocumentAccess(selectedDocument._id, shareForm.targetWallet, {
        canView: shareForm.canView,
        canDelete: shareForm.canDelete,
      })

      // Reset form and close modal
      setShareForm({
        targetWallet: "",
        canView: true,
        canDelete: false,
      })
      setShowShareModal(false)
    } catch (err) {
      console.error("Share failed:", err)
    }
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size"

    const units = ["B", "KB", "MB", "GB"]
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Case Documents</h2>
        {canUpload && !isCaseClosed && (
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={16} className="mr-2" />
            Upload Document
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

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
      {loading && !documents.length ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredDocuments.length > 0 ? (
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
                  Size
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
                <tr key={document._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                        <FileText size={16} />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{document.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {document.uploadedBy === userWallet
                        ? "You"
                        : `${document.uploadedBy.substring(0, 6)}...${document.uploadedBy.substring(document.uploadedBy.length - 4)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {document.createdAt
                        ? formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })
                        : "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatFileSize(document.fileSize)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(document)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>

                      {isAdmin && !isCaseClosed && (
                        <button
                          onClick={() => {
                            setSelectedDocument(document)
                            setShowShareModal(true)
                          }}
                          className="text-green-600 hover:text-green-900"
                          title="Share"
                        >
                          <Shield size={18} />
                        </button>
                      )}

                      {(isAdmin || document.uploadedBy === userWallet) && !isCaseClosed && (
                        <button
                          onClick={() => {
                            setSelectedDocument(document)
                            setShowDeleteModal(true)
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "No documents match your search criteria."
              : "No documents have been uploaded to this case yet."}
          </p>
          {canUpload && !isCaseClosed && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Upload size={16} className="mr-2" />
              Upload First Document
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Enter document title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  {uploadForm.file ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700 truncate max-w-[200px]">{uploadForm.file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadForm({ ...uploadForm, file: null })}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Upload size={36} className="mx-auto mb-2" />
                      <p className="text-sm">Click to select a file</p>
                    </button>
                  )}
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% uploaded</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  disabled={loading || !uploadForm.file}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Document</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="font-medium">{selectedDocument.title}</p>
              <p className="text-sm text-gray-500">
                Uploaded{" "}
                {selectedDocument.createdAt
                  ? formatDistanceToNow(new Date(selectedDocument.createdAt), { addSuffix: true })
                  : "Unknown"}
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedDocument(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Document Modal */}
      {showShareModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Share Document</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="font-medium">{selectedDocument.title}</p>
              <p className="text-sm text-gray-500">
                Uploaded{" "}
                {selectedDocument.createdAt
                  ? formatDistanceToNow(new Date(selectedDocument.createdAt), { addSuffix: true })
                  : "Unknown"}
              </p>
            </div>

            <form onSubmit={handleShare} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                <input
                  type="text"
                  value={shareForm.targetWallet}
                  onChange={(e) => setShareForm({ ...shareForm, targetWallet: e.target.value })}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="canView"
                      checked={shareForm.canView}
                      onChange={(e) => setShareForm({ ...shareForm, canView: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="canView" className="ml-2 text-sm text-gray-700">
                      Can View
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="canDelete"
                      checked={shareForm.canDelete}
                      onChange={(e) => setShareForm({ ...shareForm, canDelete: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="canDelete" className="ml-2 text-sm text-gray-700">
                      Can Delete
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  disabled={
                    loading || !shareForm.targetWallet.startsWith("0x") || (!shareForm.canView && !shareForm.canDelete)
                  }
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" className="mr-2" />
                      Sharing...
                    </>
                  ) : (
                    "Share Document"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseVerify

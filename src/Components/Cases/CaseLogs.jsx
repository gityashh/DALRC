"use client"

import { useState, useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { Filter, Search, FileText, User, Clock, Eye, Upload, Trash2, Shield } from "lucide-react"
import { useDocument } from "../../context/useDocument"
import LoadingSpinner from "../common/LoadingSpinner"
import ErrorMessage from "../common/ErrorMessage"
import { format } from "date-fns"

const CaseLogs = () => {
  const caseData = useOutletContext()
  const { caseId } = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedDocId, setSelectedDocId] = useState(null)

  const { documents, documentLogs, loading, error, fetchCaseDocuments, fetchDocumentLogs } = useDocument()

  // Load documents on mount
  useEffect(() => {
    if (caseId) {
      fetchCaseDocuments(caseId)
    }
  }, [caseId, fetchCaseDocuments])

  // Load logs when a document is selected
  useEffect(() => {
    if (selectedDocId) {
      fetchDocumentLogs(selectedDocId)
    }
  }, [selectedDocId, fetchDocumentLogs])

  // Get action icon based on action type
  const getActionIcon = (action) => {
    switch (action) {
      case "UPLOADED":
        return <Upload size={16} className="text-blue-500" />
      case "VIEWED":
        return <Eye size={16} className="text-green-500" />
      case "DELETED":
        return <Trash2 size={16} className="text-red-500" />
      case "SHARED":
        return <Shield size={16} className="text-purple-500" />
      case "REVOKED":
        return <Shield size={16} className="text-orange-500" />
      default:
        return <Clock size={16} className="text-gray-500" />
    }
  }

  // Filter logs based on search term and filter type
  const filteredLogs = documentLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.userWallet && log.userWallet.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.notes && log.notes.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filterType === "all") return matchesSearch

    // Filter by action type
    return log.action === filterType && matchesSearch
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Document Activity Logs</h2>

      {error && <ErrorMessage message={error} />}

      {/* Document Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Select Document</h3>

        {loading && !documents.length ? (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => setSelectedDocId(doc._id)}
                className={`text-left p-3 rounded-md border transition-colors ${
                  selectedDocId === doc._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div className="flex items-center">
                  <FileText size={16} className="text-blue-500 mr-2" />
                  <span className="font-medium truncate">{doc.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {doc.createdAt ? format(new Date(doc.createdAt), "PPP") : "Unknown date"}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No documents available for this case.</p>
        )}
      </div>

      {selectedDocId && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Activities</option>
                <option value="UPLOADED">Uploads</option>
                <option value="VIEWED">Views</option>
                <option value="DELETED">Deletions</option>
                <option value="SHARED">Sharing</option>
                <option value="REVOKED">Revocations</option>
              </select>
            </div>
          </div>

          {/* Logs Timeline */}
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : filteredLogs.length > 0 ? (
            <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
              {filteredLogs.map((log) => (
                <div key={log._id} className="relative">
                  <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      {getActionIcon(log.action)}
                      <span className="font-medium text-gray-800 ml-2">
                        {log.action === "UPLOADED"
                          ? "Document Uploaded"
                          : log.action === "VIEWED"
                            ? "Document Viewed"
                            : log.action === "DELETED"
                              ? "Document Deleted"
                              : log.action === "SHARED"
                                ? "Access Granted"
                                : log.action === "REVOKED"
                                  ? "Access Revoked"
                                  : log.action}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      {log.timestamp ? format(new Date(log.timestamp), "PPP p") : "Unknown date"}
                    </p>

                    <div className="flex items-center text-sm text-gray-600">
                      <User size={14} className="mr-2" />
                      <span>
                        {log.userWallet === localStorage.getItem("walletAddress")?.toLowerCase()
                          ? "You"
                          : `${log.userWallet?.substring(0, 6)}...${log.userWallet?.substring(log.userWallet.length - 4)}`}
                        {log.userRole ? ` (${log.userRole})` : ""}
                      </span>
                    </div>

                    {log.notes && (
                      <p className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">{log.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm || filterType !== "all"
                  ? "No logs match your search criteria."
                  : "No activity logs available for this document."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CaseLogs

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import { ArrowLeft, FileText, Users, Clock, AlertTriangle, Shield } from "lucide-react"
import Sidebar from "../Dashboard/Sidebar"
import { useCase } from "../../context/useCase"
import LoadingSpinner from "../common/LoadingSpinner"
import ErrorMessage from "../common/ErrorMessage"
import { formatDistanceToNow } from "date-fns"

const CaseDetail = () => {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentCase, loading, error, fetchCaseById, closeCase } = useCase()
  const [isClosing, setIsClosing] = useState(false)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)

  // Fetch case data when component mounts or caseId changes
  useEffect(() => {
    if (caseId) {
      fetchCaseById(caseId)
    }
  }, [caseId, fetchCaseById])

  // If we're on the case detail page without a specific tab, redirect to about
  useEffect(() => {
    if (location.pathname === `/cases/${caseId}`) {
      navigate(`/cases/${caseId}/about`)
    }
  }, [location, caseId, navigate])

  // Handle case closing
  const handleCloseCase = async () => {
    setIsClosing(true)
    try {
      await closeCase(caseId)
      setShowCloseConfirm(false)
    } catch (err) {
      console.error("Failed to close case:", err)
    } finally {
      setIsClosing(false)
    }
  }

  if (loading && !currentCase) {
    return (
      <Sidebar caseId={caseId}>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      </Sidebar>
    )
  }

  if (error && !currentCase) {
    return (
      <Sidebar>
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Case Not Found</h2>
          <p className="text-gray-600 mb-6">
            The case you're looking for doesn't exist or you don't have access to it.
          </p>
          <ErrorMessage message={error} className="mb-6 max-w-md mx-auto" />
          <Link to="/cases" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" />
            Back to Cases
          </Link>
        </div>
      </Sidebar>
    )
  }

  if (!currentCase) {
    return (
      <Sidebar>
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Case Data</h2>
          <p className="text-gray-600 mb-6">Unable to load case data. Please try again.</p>
          <Link to="/cases" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" />
            Back to Cases
          </Link>
        </div>
      </Sidebar>
    )
  }

  // Check if user is admin
  const userWallet = localStorage.getItem("walletAddress")?.toLowerCase()
  const isAdmin = userWallet && currentCase.admin?.toLowerCase() === userWallet

  // Format creation date
  const creationDate = currentCase.createdAt
    ? formatDistanceToNow(new Date(currentCase.createdAt), { addSuffix: true })
    : "Unknown date"

  return (
    <Sidebar caseId={caseId}>
      <div>
        <div className="mb-6">
          <Link to="/cases" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Cases
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{currentCase.title}</h1>
              <p className="text-gray-600">Case ID: {currentCase.caseId}</p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentCase.isClosed ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                }`}
              >
                {currentCase.isClosed ? "Closed" : "Active"}
              </span>

              {isAdmin && !currentCase.isClosed && (
                <button
                  onClick={() => setShowCloseConfirm(true)}
                  className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Close Case
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Case Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Court</p>
                <p className="font-medium">{currentCase.courtName || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="font-medium">{currentCase.participants?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Admin</p>
                <p className="font-medium truncate max-w-[150px]">
                  {isAdmin ? "You" : currentCase.admin?.substring(0, 10) + "..."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{creationDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Content - This will render the appropriate component based on the route */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet context={currentCase} />
        </div>
      </div>

      {/* Close Case Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Close Case</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to close this case? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCloseConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isClosing}
              >
                Cancel
              </button>
              <button
                onClick={handleCloseCase}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={isClosing}
              >
                {isClosing ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Closing...
                  </>
                ) : (
                  "Close Case"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default CaseDetail

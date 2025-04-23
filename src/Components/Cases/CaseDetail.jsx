"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import { ArrowLeft, FileText, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Sidebar from "../Dashboard/Sidebar"

const CaseDetail = () => {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [caseData, setCaseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch case data from API
    // For now, we'll use mock data
    const fetchCaseData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock data
        const mockCase = {
          id: caseId,
          title: "Smith vs. Johnson Property Dispute",
          caseNumber: "12345",
          status: "active",
          description:
            "Property boundary dispute between neighboring landowners in Westfield County. The plaintiff claims that the defendant has encroached on their land by building a fence that extends 3 feet beyond the property line.",
          courtName: "Westfield County Circuit Court",
          filingDate: "2023-01-15",
          lastUpdated: "2023-04-10",
          nextHearing: "2023-05-15",
          participants: [
            { id: 1, name: "John Smith", role: "Plaintiff", contact: "john.smith@email.com" },
            { id: 2, name: "Robert Johnson", role: "Defendant", contact: "robert.j@email.com" },
            { id: 3, name: "Sarah Williams", role: "Lawyer", contact: "sarah.w@lawfirm.com" },
            { id: 4, name: "Judge Michael Brown", role: "Judge", contact: "court@westfield.gov" },
          ],
          documents: [
            { id: 1, name: "Initial Complaint.pdf", uploadedBy: "Sarah Williams", date: "2023-01-15", verified: true },
            { id: 2, name: "Property Survey.pdf", uploadedBy: "John Smith", date: "2023-01-20", verified: true },
            { id: 3, name: "Defendant Response.pdf", uploadedBy: "Robert Johnson", date: "2023-02-05", verified: true },
            { id: 4, name: "Evidence Photos.zip", uploadedBy: "John Smith", date: "2023-02-10", verified: false },
          ],
          logs: [
            { id: 1, action: "Case created", user: "Sarah Williams", timestamp: "2023-01-15 09:30:45" },
            {
              id: 2,
              action: "Document uploaded: Initial Complaint.pdf",
              user: "Sarah Williams",
              timestamp: "2023-01-15 09:35:22",
            },
            {
              id: 3,
              action: "Document uploaded: Property Survey.pdf",
              user: "John Smith",
              timestamp: "2023-01-20 14:22:10",
            },
            {
              id: 4,
              action: "New participant added: Robert Johnson",
              user: "System",
              timestamp: "2023-01-25 10:15:33",
            },
            {
              id: 5,
              action: "Document uploaded: Defendant Response.pdf",
              user: "Robert Johnson",
              timestamp: "2023-02-05 16:45:19",
            },
            {
              id: 6,
              action: "Document uploaded: Evidence Photos.zip",
              user: "John Smith",
              timestamp: "2023-02-10 11:12:05",
            },
            {
              id: 7,
              action: "Court date scheduled: May 15, 2023",
              user: "Judge Michael Brown",
              timestamp: "2023-03-01 13:30:45",
            },
          ],
        }

        setCaseData(mockCase)
      } catch (error) {
        console.error("Error fetching case data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseData()
  }, [caseId])

  // If we're on the case detail page without a specific tab, redirect to about
  useEffect(() => {
    if (location.pathname === `/cases/${caseId}`) {
      navigate(`/cases/${caseId}/about`)
    }
  }, [location, caseId, navigate])

  if (loading) {
    return (
      <Sidebar caseId={caseId}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Sidebar>
    )
  }

  if (!caseData) {
    return (
      <Sidebar>
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Case Not Found</h2>
          <p className="text-gray-600 mb-6">
            The case you're looking for doesn't exist or you don't have access to it.
          </p>
          <Link to="/cases" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" />
            Back to Cases
          </Link>
        </div>
      </Sidebar>
    )
  }

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
              <h1 className="text-2xl font-bold text-gray-800">{caseData.title}</h1>
              <p className="text-gray-600">Case #{caseData.caseNumber}</p>
            </div>

            <div className="mt-4 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  caseData.status === "active"
                    ? "bg-green-100 text-green-800"
                    : caseData.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : caseData.status === "closed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                }`}
              >
                {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
              </span>
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
                <p className="font-medium">{caseData.courtName || "Not specified"}</p>
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
                <p className="font-medium">{caseData.participants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Documents</p>
                <p className="font-medium">{caseData.documents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Hearing</p>
                <p className="font-medium">{caseData.nextHearing || "Not scheduled"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Content - This will render the appropriate component based on the route */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet context={caseData} />
        </div>
      </div>
    </Sidebar>
  )
}

export default CaseDetail

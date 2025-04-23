"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Filter } from "lucide-react"
import CaseCard from "./CaseCard"

const CasesList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data - in a real app, this would come from an API
  const casesData = [
    {
      id: 1,
      title: "Smith vs. Johnson Property Dispute",
      caseNumber: "12345",
      status: "active",
      lastUpdated: "2 days ago",
      participants: 4,
      courtDate: "15 May 2023",
      description: "Property boundary dispute between neighboring landowners in Westfield County.",
    },
    {
      id: 2,
      title: "State vs. Williams",
      caseNumber: "67890",
      status: "pending",
      lastUpdated: "5 days ago",
      participants: 6,
      courtDate: "22 June 2023",
      description: "Criminal case involving allegations of fraud and misrepresentation of financial documents.",
    },
    {
      id: 3,
      title: "Thompson Divorce Settlement",
      caseNumber: "54321",
      status: "closed",
      lastUpdated: "1 month ago",
      participants: 3,
      courtDate: "Completed",
      description: "Divorce proceedings including asset division and custody arrangements.",
    },
    {
      id: 4,
      title: "ABC Corp Intellectual Property Claim",
      caseNumber: "98765",
      status: "urgent",
      lastUpdated: "1 day ago",
      participants: 5,
      courtDate: "10 May 2023",
      description: "Patent infringement case between two technology companies regarding mobile payment systems.",
    },
    {
      id: 5,
      title: "Martinez Medical Malpractice",
      caseNumber: "24680",
      status: "active",
      lastUpdated: "3 days ago",
      participants: 7,
      courtDate: "5 July 2023",
      description: "Medical malpractice claim against Regional Hospital for alleged surgical errors.",
    },
    {
      id: 6,
      title: "Green Environmental Compliance",
      caseNumber: "13579",
      status: "pending",
      lastUpdated: "1 week ago",
      participants: 8,
      courtDate: "Not scheduled",
      description: "Environmental compliance case regarding industrial waste disposal regulations.",
    },
  ]

  // Filter cases based on search term and status filter
  const filteredCases = casesData.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseNumber.includes(searchTerm) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Legal Cases</h1>
        <Link
          to="/cases/new"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Case
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search cases by title, number or description..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseItem) => <CaseCard key={caseItem.id} caseData={caseItem} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No cases found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add New Case Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Link
          to="/cases/new"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>
    </div>
  )
}

export default CasesList

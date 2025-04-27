"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Filter } from "lucide-react"
import CaseCard from "./CaseCard"
import LoadingSpinner from "../common/LoadingSpinner"
import ErrorMessage from "../common/ErrorMessage"
import EmptyState from "../common/EmptyState"
import { useCase } from "../../context/useCase"

const CasesList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredCases, setFilteredCases] = useState([])
  

  const { ownedCases, participatingCases, loading, error, fetchCases } = useCase()

  // Combine and filter cases based on search term and status filter
  useEffect(() => {
    const allCases = [...ownedCases, ...participatingCases]

    const filtered = allCases.filter((caseItem) => {
      const matchesSearch =
        (caseItem.title && caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (caseItem.caseId && caseItem.caseId.includes(searchTerm)) ||
        (caseItem.description && caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "closed" && caseItem.isClosed) ||
        (statusFilter === "active" && !caseItem.isClosed)

      return matchesSearch && matchesStatus
    })

    setFilteredCases(filtered)
  }, [ownedCases, participatingCases, searchTerm, statusFilter])

  // Refresh cases on mount
  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  if (loading && !filteredCases.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading cases...</p>
      </div>
    )
  }

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

      {error && <ErrorMessage message={error} />}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search cases by title, ID or description..."
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
            <option value="all">All Cases</option>
            <option value="active">Active Cases</option>
            <option value="closed">Closed Cases</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.caseId} caseData={caseItem} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No cases found"
          description={
            searchTerm || statusFilter !== "all"
              ? "No cases match your search criteria. Try adjusting your filters."
              : "You don't have any cases yet. Create your first case to get started."
          }
          actionLink="/cases/new"
          actionText="Create New Case"
        />
      )}

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

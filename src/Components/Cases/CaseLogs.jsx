"use client"

import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Filter, Search } from "lucide-react"

const CaseLogs = () => {
  const caseData = useOutletContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Filter logs based on search term and filter type
  const filteredLogs = caseData.logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === "all") return matchesSearch

    // Filter by action type
    if (filterType === "document" && log.action.includes("Document")) return matchesSearch
    if (filterType === "participant" && log.action.includes("participant")) return matchesSearch
    if (filterType === "status" && log.action.includes("status")) return matchesSearch
    if (filterType === "court" && log.action.includes("Court")) return matchesSearch

    return false
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Case Activity Logs</h2>

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
            <option value="document">Document Activities</option>
            <option value="participant">Participant Changes</option>
            <option value="status">Status Updates</option>
            <option value="court">Court Activities</option>
          </select>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
        {filteredLogs.map((log) => (
          <div key={log.id} className="relative">
            <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm text-gray-500">{log.timestamp}</p>
              <p className="font-medium text-gray-800">{log.action}</p>
              <p className="text-sm text-gray-600">By: {log.user}</p>
            </div>
          </div>
        ))}
      </div>

      {/* If no logs */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm || filterType !== "all"
              ? "No logs match your search criteria."
              : "No activity logs available for this case."}
          </p>
        </div>
      )}
    </div>
  )
}

export default CaseLogs

import { Link } from "react-router-dom"
import { Calendar, User, Clock } from "lucide-react"

const CaseCard = ({ caseData }) => {
  const { id, title, caseNumber, status, lastUpdated, participants, courtDate, description } = caseData

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Link to={`/cases/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">Case #{caseNumber}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>{status}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">Court Date: {courtDate || "Not scheduled"}</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{participants} Participants</span>
          </div>

          <div className="flex items-center col-span-2">
            <Clock size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CaseCard

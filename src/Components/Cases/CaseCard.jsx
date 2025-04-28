import { Link } from "react-router-dom"
import { Calendar, User, CheckCircle, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const CaseCard = ({ caseData }) => {
  const { caseId, title, description, createdAt, participants = [], isClosed, admin } = caseData

  // Format the date if available
  const formattedDate = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Date unavailable"

  // Truncate description if too long
  const truncatedDescription =
    description && description.length > 120 ? `${description.substring(0, 120)}...` : description

  return (
    <Link to={`/cases/${caseId}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title || "Untitled Case"}</h3>
            <p className="text-sm text-gray-500">Case ID: {caseId}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isClosed ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
            }`}
          >
            {isClosed ? "Closed" : "Active"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {truncatedDescription || "No description provided"}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">Created: {formattedDate}</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{participants.length} Participants</span>
          </div>

          <div className="flex items-center col-span-2">
            {admin && (
              <>
                {admin.toLowerCase() === localStorage.getItem("walletAddress")?.toLowerCase() ? (
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                ) : (
                  <AlertCircle size={16} className="text-blue-500 mr-2" />
                )}
                <span className="text-gray-600">
                  {admin.toLowerCase() === localStorage.getItem("walletAddress")?.toLowerCase()
                    ? "You are the admin"
                    : "You are a participant"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CaseCard

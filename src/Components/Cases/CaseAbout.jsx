import { useOutletContext } from "react-router-dom"
import { Calendar, MapPin, Clock, FileText, AlertTriangle } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

const CaseAbout = () => {
  const caseData = useOutletContext()

  // Format dates if available
  const formattedCreationDate = caseData.createdAt ? format(new Date(caseData.createdAt), "PPP") : "Not specified"

  const formattedLastUpdate = caseData.updatedAt
    ? formatDistanceToNow(new Date(caseData.updatedAt), { addSuffix: true })
    : "Not available"

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Case</h2>

      {/* Case Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Case Description</h3>
          {caseData.description ? (
            <p className="text-gray-600">{caseData.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description provided</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Creation Date</p>
              <p className="font-medium">{formattedCreationDate}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Court</p>
              <p className="font-medium">{caseData.courtName || "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{formattedLastUpdate}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Case Status</p>
              <p className="font-medium capitalize">{caseData.isClosed ? "Closed" : "Active"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin History */}
      {caseData.adminHistory && caseData.adminHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Admin History</h3>

          <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
            {caseData.adminHistory.map((admin, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm text-gray-500">
                    {admin.changedAt ? format(new Date(admin.changedAt), "PPP p") : "Unknown date"}
                  </p>
                  <p className="font-medium text-gray-800 break-all">
                    {index === 0 ? "Case created by: " : "Admin changed to: "}
                    {admin.wallet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* If no admin history */}
      {(!caseData.adminHistory || caseData.adminHistory.length === 0) && (
        <div className="mt-8 text-center py-8">
          <AlertTriangle size={24} className="mx-auto text-yellow-500 mb-2" />
          <p className="text-gray-500">No admin history available for this case.</p>
        </div>
      )}
    </div>
  )
}

export default CaseAbout

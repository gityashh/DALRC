import { useOutletContext } from "react-router-dom"
import { Calendar, MapPin, Clock, FileText } from "lucide-react"

const CaseAbout = () => {
  const caseData = useOutletContext()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Case</h2>

      {/* Case Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Case Description</h3>
          <p className="text-gray-600">{caseData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Filing Date</p>
              <p className="font-medium">{caseData.filingDate || "Not specified"}</p>
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
              <p className="font-medium">{caseData.lastUpdated || "Not available"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Case Status</p>
              <p className="font-medium capitalize">{caseData.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Case Timeline</h3>

        <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
          {caseData.logs.slice(0, 5).map((log, index) => (
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
      </div>
    </div>
  )
}

export default CaseAbout

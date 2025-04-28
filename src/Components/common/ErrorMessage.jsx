import { AlertTriangle } from "lucide-react"

const ErrorMessage = ({ message, className = "" }) => {
  if (!message) return null

  return (
    <div className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start ${className}`}>
      <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage

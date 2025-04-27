import { FileText, Plus } from "lucide-react"
import { Link } from "react-router-dom"

const EmptyState = ({
  title = "No data found",
  description = "There are no items to display at this time.",
  icon = <FileText size={48} className="text-gray-400" />,
  actionLink = null,
  actionText = "Add New",
  actionIcon = <Plus size={16} className="mr-2" />,
}) => {
  return (
    <div className="text-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>

      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {actionIcon}
          {actionText}
        </Link>
      )}
    </div>
  )
}

export default EmptyState

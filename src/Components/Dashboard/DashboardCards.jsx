import { Link } from "react-router-dom"
import { FileText, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const DashboardCards = () => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    totalCases: 24,
    activeCases: 12,
    pendingVerification: 5,
    completedCases: 7,
    recentActivity: [
      { id: 1, action: "Document uploaded", case: "Case #12345", time: "2 hours ago" },
      { id: 2, action: "New member added", case: "Case #67890", time: "5 hours ago" },
      { id: 3, action: "Document verified", case: "Case #54321", time: "1 day ago" },
    ],
    upcomingDeadlines: [
      { id: 1, title: "Submit evidence", case: "Case #12345", dueDate: "Tomorrow" },
      { id: 2, title: "Court hearing", case: "Case #67890", dueDate: "In 3 days" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Cases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FileText size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Cases</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalCases}</p>
            </div>
          </div>
        </div>

        {/* Active Cases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Cases</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.activeCases}</p>
            </div>
          </div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Verification</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.pendingVerification}</p>
            </div>
          </div>
        </div>

        {/* Completed Cases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed Cases</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.completedCases}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <Clock size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.case} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/activity" className="text-sm text-blue-600 hover:text-blue-800">
              View all activity
            </Link>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {stats.upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-start">
                <div className="p-2 rounded-full bg-red-100 text-red-600">
                  <AlertTriangle size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{deadline.title}</p>
                  <p className="text-xs text-gray-500">
                    {deadline.case} • Due {deadline.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/deadlines" className="text-sm text-blue-600 hover:text-blue-800">
              View all deadlines
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            to="/cases/new"
            className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">New Case</span>
          </Link>

          <Link
            to="/upload"
            className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FileText size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Upload Document</span>
          </Link>

          <Link
            to="/verify"
            className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <CheckCircle size={24} className="text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Verify Document</span>
          </Link>

          <Link
            to="/members"
            className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Users size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Manage Members</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardCards

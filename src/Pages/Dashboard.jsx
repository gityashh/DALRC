import Sidebar from "../Components/Dashboard/Sidebar"
import DashboardCards from "../Components/Dashboard/DashboardCards"

const Dashboard = () => {
  return (
    <Sidebar>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <DashboardCards />
    </Sidebar>
  )
}

export default Dashboard

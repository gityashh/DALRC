import Sidebar from "../Components/Dashboard/Sidebar"
import DashboardCards from "../Components/Dashboard/DashboardCards"
import WalletConnect from "../Components/Dashboard/WalletConnect"

const Dashboard = () => {
  return (
    <Sidebar>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <WalletConnect />
      </div>
      <DashboardCards />
    </Sidebar>
  )
}

export default Dashboard

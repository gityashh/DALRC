import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./Home"
import Register from "./Register"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Cases from "./Cases"
import NewCase from "./NewCase"
import Profile from "./Profile"
import CaseDetail from "../Components/Cases/CaseDetail"
import CaseAbout from "../Components/Cases/CaseAbout"
import CaseMembers from "../Components/Cases/CaseMembers"
import CaseVerify from "../Components/Cases/CaseVerify"
import CaseLogs from "../Components/Cases/CaseLogs"
import ResetPassword from "./ResetPassword"
import OtpVerification from "./OtpVerification"
import ProtectedRoutes from "../utils/ProtectedRoute"

function AllRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/OtpVerification" element={< OtpVerification />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/cases" element={<ProtectedRoutes><Cases /></ProtectedRoutes>} />
        <Route path="/cases/new" element={<ProtectedRoutes><NewCase /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />

        {/* Case Detail Routes */}
        <Route path="/cases/:caseId" element={<ProtectedRoutes><CaseDetail /></ProtectedRoutes>}>
          <Route path="about" element={<ProtectedRoutes><CaseAbout /></ProtectedRoutes>} />
          <Route path="members" element={<ProtectedRoutes><CaseMembers /></ProtectedRoutes>} />
          <Route path="verify" element={<ProtectedRoutes><CaseVerify /></ProtectedRoutes>} />
          <Route path="logs" element={<ProtectedRoutes><CaseLogs /></ProtectedRoutes>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AllRoutes

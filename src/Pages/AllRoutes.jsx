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

function AllRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/new" element={<NewCase />} />
        <Route path="/profile" element={<Profile />} />

        {/* Case Detail Routes */}
        <Route path="/cases/:caseId" element={<CaseDetail />}>
          <Route path="about" element={<CaseAbout />} />
          <Route path="members" element={<CaseMembers />} />
          <Route path="verify" element={<CaseVerify />} />
          <Route path="logs" element={<CaseLogs />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AllRoutes

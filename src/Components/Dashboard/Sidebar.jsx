"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { Home, LayoutDashboard, FileText, User, LogOut, Menu, X, ChevronRight } from "lucide-react"

const Sidebar = ({ children, caseId = null }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  // Main navigation items
  const mainNavItems = [
    { path: "/", name: "Home", icon: <Home size={20} /> },
    { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/cases", name: "Cases", icon: <FileText size={20} /> },
    { path: "/profile", name: "Your Profile", icon: <User size={20} /> },
  ]

  // Case specific navigation items (only shown when viewing a case)
  const caseNavItems = caseId
    ? [
        { path: `/cases/${caseId}/about`, name: "About Case", icon: <FileText size={20} /> },
        { path: `/cases/${caseId}/members`, name: "Members", icon: <User size={20} /> },
        { path: `/cases/${caseId}/verify`, name: "Verify Documents", icon: <FileText size={20} /> },
        { path: `/cases/${caseId}/logs`, name: "Logs", icon: <FileText size={20} /> },
      ]
    : []

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed z-50 bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <Link to="/" className="text-xl font-bold text-blue-800">
              DALRC
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-2 rounded-md ${
                      location.pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}

              {/* Case submenu - only shown when we have a caseId */}
              {caseId && (
                <li className="mt-6">
                  <button
                    onClick={toggleSubMenu}
                    className="flex items-center justify-between w-full p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText size={20} />
                      <span>Case Details</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transform transition-transform ${isSubMenuOpen ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isSubMenuOpen && (
                    <ul className="pl-10 mt-2 space-y-2">
                      {caseNavItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center space-x-3 p-2 rounded-md ${
                              location.pathname === item.path
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-2 w-full rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </div>
    </div>
  )
}

export default Sidebar

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    if (window.innerWidth < 768) {
      setShowNavbar(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm shadow-md"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0 w-40">
            <div
              className="text-xl font-bold text-gray-800 cursor-pointer flex-shrink-0"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center">
                <div className="flex h-full items-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nation%20icon-6fZLXKLDKOGtyQyKrq93Seqr2AjYq3.png"
                    alt="National Emblem"
                    className="h-12 md:h-14 mr-2 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xl md:text-2xl font-bold text-blue-800">
                    DALRC
                  </span>
                  <span className="text-xs text-gray-600 hidden sm:block">
                    Decentralized Autonomous Legal Record Custodian
                  </span>
                  <span className="text-xs text-gray-600 font-sanskrit hidden sm:block">
                    यतो धर्मस्ततो जयः
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={handleShowNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Main menu"
            >
              {showNavbar ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${showNavbar ? "block opacity-100" : "hidden md:flex opacity-0 md:opacity-100"}`}>
            <ul className="px-4 py-2 md:flex md:space-x-6 lg:space-x-8 font-medium text-gray-700">
              <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  Home
                              </NavLink>
                              
                          </li>
                          <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/dashboard"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  Dashboard
                              </NavLink>
                              
              </li>
              <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/our-idea"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  Our Idea
                </NavLink>
              </li>
              <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/features"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  Features
                </NavLink>
              </li>
              <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/faq"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  FAQ
                </NavLink>
              </li>
              <li className="border-b md:border-b-0 border-gray-100 md:border-transparent md:hover:border-blue-600 transition duration-300">
                <NavLink
                  to="/contact"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-3 md:py-2 px-1 transition duration-150 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300 transform hover:scale-105 active:scale-95"
                  onClick={() => navigate("/dashboard")}
                >
                  DASHBOARD
                </button>
                <button
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-150"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
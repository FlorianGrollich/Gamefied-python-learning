import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { User } from '../types/types'

interface NavBarProps {
  user: User | null
  onLogout: () => void
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Close the dropdown when the location changes
    setIsDropdownOpen(false)
  }, [location])

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  return (
    <nav className="bg-slate-800 py-4 fixed top-0 w-full z-30 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300"
        >
          Python Playground
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <NavLink
                to="/editor"
                className="text-white px-3 py-1 mx-2 hover:text-blue-400 transition duration-300 rounded-md"
              >
                Editor
              </NavLink>
              {/* User Profile */}
              <div className="relative inline-block text-left">
                <div
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="font-semibold text-lg">
                    {user.username[0].toUpperCase()}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-white px-3 py-1 mx-2 hover:text-blue-400 transition duration-300 rounded-md"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-white px-3 py-1 mx-2 hover:text-blue-400 transition duration-300 rounded-md"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar

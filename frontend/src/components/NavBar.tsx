import React, {useState, useEffect, useRef} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'


const NavBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const location = useLocation()
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsDropdownOpen(false)
    }, [location])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

    return (
        <nav className="bg-slate-800 py-3 fixed top-0 w-full z-30 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300"
                >
                    Python Playground
                </Link>
            </div>
        </nav>
    )
}

export default NavBar

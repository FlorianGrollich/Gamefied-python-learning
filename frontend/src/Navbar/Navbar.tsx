import {Link} from "react-router-dom";
import React from "react";

const Navbar = () => {
    return <nav className="bg-slate-800 p-4 fixed top-0 w-full">
        <div className="flex justify-between text-white">
            <Link to="/" className="mx-2 hover:text-blue-500">Home</Link>
            <div>
                <Link to="/login" className="mx-2 hover:text-blue-500">Login</Link>
                <Link to="/register" className="mx-2 hover:text-blue-500">Register</Link>
            </div>
        </div>
    </nav>
}
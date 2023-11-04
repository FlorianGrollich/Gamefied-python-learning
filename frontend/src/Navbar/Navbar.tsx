import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

interface User {
    id: number;
    email: string;
    username: string;
}
const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    return <nav className="bg-slate-800 p-4 fixed top-0 w-full">
        <div className="flex justify-between text-white">
            <Link to="/" className="mx-2 hover:text-blue-500">Home</Link>
            <div>
                {user ? (
                    <span className="mx-2 hover:text-blue-500" onClick={() => setUser(null)}>Logout</span>
                ) : (
                    <>
                        <Link to="/login" className="mx-2 hover:text-blue-500">Login</Link>
                        <Link to="/register" className="mx-2 hover:text-blue-500">Register</Link>
                    </>
                )}
            </div>
        </div>
    </nav>
}
export default Navbar;
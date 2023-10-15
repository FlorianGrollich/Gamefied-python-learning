import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

function App() {
    return (
        <div className="App bg-slate-950">
            <Router>
                <nav className="bg-slate-800 p-4 fixed top-0 w-full">
                    <div className="justify-between text-black">
                        <Link to="/" className="mx-2 text-white">Home</Link>
                        <Link to="/login" className="mx-2 text-white">Login</Link>
                        <Link to="/register" className="mx-2 text-white">Register</Link>
                        <a href="#" className="text-white mx-2">Contact</a>
                    </div>
                </nav>
                <Routes>
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

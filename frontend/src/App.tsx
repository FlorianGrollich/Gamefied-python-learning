import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';

function App() {
    return (
        <div className="App bg-slate-950">
            <Router>
                <nav className="bg-slate-800 p-4 fixed top-0 w-full">
                    <div className="flex justify-between text-white">
                        <Link to="/" className="mx-2 hover:text-blue-500">Home</Link>
                        <div>
                            <Link to="/login" className="mx-2 hover:text-blue-500">Login</Link>
                            <Link to="/register" className="mx-2 hover:text-blue-500">Register</Link>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/" element={<h1 className="mt-14 p-5 text-2xl font-bold text-white">Python Playground</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

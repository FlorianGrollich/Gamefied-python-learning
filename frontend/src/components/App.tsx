import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

function App() {
    return (
        <div className="App bg-slate-950">
            <nav className="bg-slate-800 p-4 fixed top-0 w-full">
                <div className="justify-between text-black">
                    <a href="#" className="mx-2">Test</a>
                    <a href="#" className="text-white mx-2">Test</a>
                    <a href="#" className="text-white mx-2">Contact</a>
                </div>
            </nav>
            <Router>
                <Routes>
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

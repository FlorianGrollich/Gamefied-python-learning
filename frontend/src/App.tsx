import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import CodeEditor from './CodeEditor/CodeEditor';
import Grid from "./GameGrid/Grid";

interface User {
    id: number;
    email: string;
    username: string;
}

const App: React.FC = () => {
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

    return (
        <div className="App bg-slate-950">
            <Router>
                <Routes> <Route path="/home" element={<Grid gridArray={[
                    ["", "", "", "", "", "", "", "", "P", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ]}

                />}/>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                    <Route path="/register" element={<RegistrationPage/>}/>
                    <Route path="/editor" element={<CodeEditor/>}/>
                    <Route path="/" element={user ?
                        <h1 className="mt-14 p-5 text-2xl font-bold text-white">Hello, {user.username}</h1> :
                        <Navigate to="/login" replace/>}/>
                </Routes>
            </Router>
        </div>
    );
};


export default App;

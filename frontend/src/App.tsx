import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import CodeEditor from './CodeEditor/CodeEditor';

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
        <nav className="bg-slate-800 p-4 fixed top-0 w-full">
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
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path="/" element={user ? <h1 className="mt-14 p-5 text-2xl font-bold text-white">Hello, {user.username}</h1> : <h1 className="mt-14 p-5 text-2xl font-bold text-white">Python Playground</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

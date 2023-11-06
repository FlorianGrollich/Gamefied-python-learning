import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage'
import RegistrationPage from './RegistrationPage/RegistrationPage'
import CodeEditor from './CodeEditor/CodeEditor'

interface User {
  id: number
  email: string
  username: string
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <div className="App min-h-screen bg-slate-900 text-gray-200">
      <Router>
        <nav className="bg-slate-800 shadow-md p-4 fixed top-0 w-full z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold hover:text-blue-400 transition-colors">
              Python Playground
            </Link>
            <div>
              {user ? (
                <span
                  className="cursor-pointer mx-3 hover:text-blue-400 transition-colors"
                  onClick={() => setUser(null)}
                >
                  Logout ({user.username})
                </span>
              ) : (
                <>
                  <Link to="/login" className="mx-3 hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="mx-3 hover:text-blue-400 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className="pt-16">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/editor" element={<CodeEditor />} />
            <Route
              path="/"
              element={
                user ? (
                  <div className="mt-8 p-5 text-center">
                    <h1 className="text-3xl font-bold">
                      Hello, {user.username}
                    </h1>
                  </div>
                ) : (
                  <div className="mt-8 p-5 text-center">
                    <h1 className="text-3xl font-bold">
                      Welcome to the Python Playground
                    </h1>
                  </div>
                )
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

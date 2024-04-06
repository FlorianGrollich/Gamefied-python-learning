import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {User} from "types/types";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])



  return (
    <div className="App min-h-screen bg-black text-gray-200">
      <Router>
        <NavBar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthenticationPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

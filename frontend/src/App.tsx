import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {User} from "types/types";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import ConstructionPage from "./pages/Construction/ConstructionPage";
import LoginPage from "./pages/Authentication/LoginPage";
import RegisterPage from "./pages/Authentication/RegistrationPage";
import AuthRedirect from "./components/AuthRedirect";

const App: React.FC = () => {


  return (
    <div className="App min-h-screen bg-black text-gray-200">
      <Router>
        <AuthRedirect/>
        <NavBar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/construction" element={<ConstructionPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

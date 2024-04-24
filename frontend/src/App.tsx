import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {User} from "types/types";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import ConstructionPage from "./pages/Construction/ConstructionPage";

const App: React.FC = () => {


  return (
    <div className="App min-h-screen bg-black text-gray-200">
      <Router>
        <NavBar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthenticationPage />} />
            <Route path="/construction" element={<ConstructionPage/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

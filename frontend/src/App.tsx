import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Grid from "./GameGrid/Grid";

const App: React.FC = () => {
    return (
        <div className="App bg-slate-950">
            <Router>

                <Routes>
                    <Route path="/home" element={<Grid gridArray={[
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
                        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    ]}

                    />}/>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegistrationPage/>}/>
                    <Route path="/"
                           element={<h1 className="mt-14 p-5 text-2xl font-bold text-white">Python Playground</h1>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

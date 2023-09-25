import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {

    return (
        <div className="App">
            <nav className="bg-blue-400 p-4 fixed top-0 w-full">
                    <div className="justify-between text-">
                        <a href="#" className="text-white mx-2">Home</a>
                        <a href="#" className="text-white mx-2">About</a>
                        <a href="#" className="text-white mx-2">Contact</a>
                </div>
            </nav>
        </div>
    );
}

export default App;

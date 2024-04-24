import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { AppDispatch } from "../../store";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({username, password}));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="input-field w-full px-4 py-2 border rounded-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field w-full px-4 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-4">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

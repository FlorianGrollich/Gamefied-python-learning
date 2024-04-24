import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login, register} from "../../slices/authSlice";
import {AppDispatch} from "../../store";

const AuthenticationPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register({username, email, password}));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="input-field w-full px-4 py-2 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-4">Register</button>
                        <button type="button" className="text-blue-500 hover:underline" onClick={() => dispatch(login({username, password}))}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default AuthenticationPage;
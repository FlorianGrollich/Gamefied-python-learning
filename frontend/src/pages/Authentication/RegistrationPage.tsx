import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import InputField from '../Authentication/components/InputField';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailError) {
      const error = await dispatch(register({ username, email, password }));
      if (error.payload.toString().includes('Username')) {
        setUsernameError(error.payload);
      }
      if (error.payload.toString().includes('Email')) {
        setEmailError(error.payload);
      }
    }
  };

  const navigate = useNavigate();

  const authStatus = useSelector((state: RootState) => state.auth.status);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (authStatus === 'idle' && token) {
      navigate('/');
    }
  }, [authStatus, token, navigate]);

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Username"
            type="text"
            id="username"
            error={usernameError}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <InputField
            label="Email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            error={passwordError}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className="text-black text-xs cursor-pointer hover:underline"
            onClick={handleNavigate}
          >
            Have an Account?
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 px-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

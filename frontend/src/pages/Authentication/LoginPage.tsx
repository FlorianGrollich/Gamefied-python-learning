import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import InputField from '../Authentication/components/InputField';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credError, setCredError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = await dispatch(login({ email, password }));
    if (errorMsg) {
      setCredError(true);
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
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            id="Email"
            label="Email"
            type="text"
            value={email}
            error={credError ? '' : ''}
            onChange={e => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            error={credError ? 'Invalid Credentials' : ''}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className="text-black text-xs cursor-pointer hover:underline"
            onClick={handleNavigate}
          >
            No Account Yet?
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 px-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

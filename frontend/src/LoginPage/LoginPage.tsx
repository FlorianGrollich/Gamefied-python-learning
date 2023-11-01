import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <h1 className="text-white text-2xl mt-14 mb-4 p-5">Login</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;

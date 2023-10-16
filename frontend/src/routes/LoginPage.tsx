import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-white mt-16 mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoginStatus('Login successful');
      } else {
        setLoginStatus('Login failed: ' + data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-2 m-0.5 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 m-0.5 border rounded"
        required
      />
      <button
        type="submit"
        className="p-2 m-0.5 bg-blue-500 text-white rounded"
      >
        Login
      </button>
      {loginStatus && <p className="mt-4 text-center">{loginStatus}</p>}
    </form>
  );
};

export default LoginForm;

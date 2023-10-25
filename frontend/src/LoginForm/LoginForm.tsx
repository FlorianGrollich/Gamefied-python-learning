import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

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
      const response = await fetch('http://backend-url/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setLoginStatus('Login successful');
      } else if (response.status === 401) {
        setLoginStatus('Invalid email or password');
      } else if (response.status === 404) {
        setLoginStatus('Endpoint not found');
      } else {
        setLoginStatus('An error occurred. Please try again later.');
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
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 m-0.5 border rounded"
      />
      <button
        type="submit"
        className="p-2 m-0.5 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
      {loginStatus && (
        <p className="text-red-500">{loginStatus}</p>
      )}
    </form>
  );
};

export default LoginForm;

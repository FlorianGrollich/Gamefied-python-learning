import React, { useState } from 'react'

interface LoginFormProps {
  onLogin: (user: any) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginStatus, setLoginStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const updateLoginStatus = (message: string, isSuccess: boolean) => {
    setLoginStatus(message)
    if (isSuccess) {
      window.location.href = '/'
    } else {
      setFormData({ ...formData, email: '', password: '' })
    }
  }

  const performLogin = async () => {
    try {
      const response = await fetch('http://localhost:3200/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Response not OK')
      }
      const data = await response.json()
      if (!data.token) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      onLogin(data.user)
      updateLoginStatus('Login successful', true)
    } catch (error) {
      console.error('Login error:', error)
      updateLoginStatus('An error occurred. Please try again later.', false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await performLogin()
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-md p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Login Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            >
              Login
            </button>
          </div>
          {/* Login Status */}
          {loginStatus && (
            <div
              className={`mt-4 text-center p-3 rounded-lg font-medium ${
                loginStatus.startsWith('Login successful')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {loginStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm

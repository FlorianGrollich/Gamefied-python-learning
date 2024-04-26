import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../slices/authSlice'
import { AppDispatch, RootState } from '../../store'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(register({ username, email, password }))
  }
  const navigate = useNavigate()

  const authStatus = useSelector((state: RootState) => state.auth.status)
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (authStatus === 'idle' && token) {
      navigate('/')
    }
  }, [authStatus, token, navigate])

  const handleNavigate = () => {
    navigate('/login')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field w-full px-4 py-2 border rounded-lg"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="input-field w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
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
  )
}

export default RegisterPage

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../slices/authSlice'
import { AppDispatch, RootState } from '../../store'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ username, password }))
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
    navigate('/register')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleLogin} className="space-y-4">
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
              className="input-field"
              value={username}
              onChange={e => setUsername(e.target.value)}
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
              className="input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
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
  )
}

export default LoginPage

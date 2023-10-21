import React from 'react'
import LoginForm from '../LoginForm/LoginForm'

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-white text-2xl mt-14 mb-4 p-5">Login</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage

import React from 'react'
import LoginForm from '../LoginForm/LoginForm'
import { User } from '../types/types'

interface LoginPageProps {
  onLogin: (user: User) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

export default LoginPage

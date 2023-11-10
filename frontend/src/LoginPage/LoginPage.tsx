import React from 'react'
import LoginForm from '../LoginForm/LoginForm'

interface LoginPageProps {
  onLogin: (user: any) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

export default LoginPage

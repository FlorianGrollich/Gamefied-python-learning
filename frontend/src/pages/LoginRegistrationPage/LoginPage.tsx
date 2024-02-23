import React from 'react'
import {User} from "types/types";
import LoginForm from "./components/LoginForm";

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

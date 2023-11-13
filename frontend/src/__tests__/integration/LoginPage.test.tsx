import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import LoginPage from '../../LoginPage/LoginPage'

const LOGIN_BUTTON_TEXT = /login/i

describe('LoginPage', () => {
  let mockOnLogin

  const setupLoginPage = () => {
    mockOnLogin = jest.fn()
    render(<LoginPage onLogin={mockOnLogin} />)
  }

  beforeEach(() => {
    setupLoginPage()
  })

  it('renders the login button correctly', () => {
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON_TEXT })
    expect(loginButton).toBeInTheDocument()
  })
})

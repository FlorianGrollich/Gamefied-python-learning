import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import LoginPage from '../../LoginPage/LoginPage'

describe('LoginPage', () => {
  it('renders correctly', () => {
    const mockOnLogin = jest.fn()
    render(<LoginPage onLogin={mockOnLogin} />)
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
  })
})

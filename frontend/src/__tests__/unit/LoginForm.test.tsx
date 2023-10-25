import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import LoginForm from '../../LoginForm/LoginForm'

describe('LoginForm Component', () => {
  test('renders LoginForm component', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('allows the user to fill the form', () => {
    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'securepassword' },
    })
    expect(
      (screen.getByPlaceholderText('Email') as HTMLInputElement).value,
    ).toBe('user@example.com')
  })
})

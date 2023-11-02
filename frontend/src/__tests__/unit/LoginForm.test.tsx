import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import LoginForm from '../../LoginForm/LoginForm'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

const mockOnLogin = jest.fn()

beforeEach(() => {
  fetchMock.resetMocks()
  fetchMock.mockResponseOnce(JSON.stringify({ token: 'sample_token' }))
})

describe('LoginForm Component', () => {
  afterEach(() => {
    fetchMock.mockRestore()
  })

  test('renders LoginForm component', () => {
    render(<LoginForm onLogin={mockOnLogin} />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('allows the user to fill the form', () => {
    render(<LoginForm onLogin={mockOnLogin} />)
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

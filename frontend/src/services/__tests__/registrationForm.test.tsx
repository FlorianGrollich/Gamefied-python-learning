import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RegistrationForm from '../../RegistrationForm/RegistrationForm'
import fetchMock from 'jest-fetch-mock'
import { beforeEach, describe, it } from 'node:test'
fetchMock.enableMocks()

describe('RegistrationForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should handle registration with matching passwords', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: '12345' }), {
      status: 201,
    })

    render(<RegistrationForm />)

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { name: 'passwordConfirmation', value: 'password123' },
    })
    fireEvent.click(screen.getByText('Sign Up'))

    await screen.findByText('Registration successful')
  })

  it('should handle registration with non-matching passwords', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: 'Passwords do not match' }),
      { status: 400 },
    )

    render(<RegistrationForm />)

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { name: 'passwordConfirmation', value: 'password456' },
    })
    fireEvent.click(screen.getByText('Sign Up'))

    await screen.findByText('Passwords do not match')
  })
})

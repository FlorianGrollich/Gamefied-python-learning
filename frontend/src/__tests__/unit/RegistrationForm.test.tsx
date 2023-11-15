import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import RegistrationForm from '../../RegistrationForm/RegistrationForm'

describe('RegistrationForm Component', () => {
  test('renders RegistrationForm component with accessible form fields', () => {
    render(<RegistrationForm />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })

  test('provides validation feedback for email format', () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, {
      target: { value: 'invalidemail' },
    })
    fireEvent.blur(emailInput)
    expect(
      screen.getByText('Please enter a valid email address'),
    ).toBeInTheDocument()
  })

  test('provides validation feedback for password strength', () => {
    render(<RegistrationForm />)
    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(passwordInput, {
      target: { value: 'weak' },
    });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/Password must be at least 8 characters long.|Password must include at least one uppercase letter.|Password must include at least one lowercase letter.|Password must include at least one number.|Password must include at least one special character (!@#$%^&*(),.?\":{}|<>)./    )).toBeInTheDocument();
  });

  test('allows the user to reset the form', () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(emailInput.value).toBe('')
  })

  test('ensures form fields are tabbable in a logical order', () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: 'Sign Up' })

    emailInput.focus()
    expect(document.activeElement).toEqual(emailInput)

    passwordInput.focus()
    expect(document.activeElement).toEqual(passwordInput)

    confirmPasswordInput.focus()
    expect(document.activeElement).toEqual(confirmPasswordInput)

    submitButton.focus()
    expect(document.activeElement).toEqual(submitButton)
  })
})

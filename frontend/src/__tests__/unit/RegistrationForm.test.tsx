import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('RegistrationForm Component', () => {
  afterEach(() => {
    fetchMock.mockRestore();
  });

  test('renders RegistrationForm component with accessible form fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  test('provides validation feedback for email format', () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.blur(screen.getByLabelText('Email'));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('provides validation feedback for password strength', () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'weak' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    expect(screen.getByText('Password is too weak')).toBeInTheDocument();
  });

  test('allows the user to reset the form', () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByLabelText('Email').value).toBe('');
  });

  test('ensures form fields are tabbable in a logical order', () => {
    render(<RegistrationForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Sign Up');

    fireEvent.keyDown(emailInput, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toEqual(passwordInput);

    fireEvent.keyDown(passwordInput, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toEqual(confirmPasswordInput);

    fireEvent.keyDown(confirmPasswordInput, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toEqual(submitButton);
  });
});

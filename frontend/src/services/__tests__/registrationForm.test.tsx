import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

describe('RegistrationForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle registration with matching passwords', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await screen.findByText('Registration successful');
  });

  it('should handle registration with non-matching passwords', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await screen.findByText('Passwords do not match');
  });
});

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('RegistrationForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle registration with matching passwords', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: '12345' }), {
      status: 201,
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234Dd..' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { name: 'passwordConfirmation', value: '1234Dd..' },
    });
    fireEvent.click(screen.getByText('Sign Up'));

    await screen.findByText('Registration successful. Please log in.');
  });

  it('should handle registration with non-matching passwords', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234Dd..' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { name: 'passwordConfirmation', value: '1234Dd...' },
    });
    fireEvent.click(screen.getByText('Sign Up'));

    await screen.findByText('Passwords do not match', { exact: false });
  });
});

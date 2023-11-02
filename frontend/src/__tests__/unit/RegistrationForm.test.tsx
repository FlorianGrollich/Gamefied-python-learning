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

  test('renders RegistrationForm component', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  test('allows the user to fill the registration form', () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    expect(screen.getByPlaceholderText('Email').value).toBe('user@example.com');

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'securepassword' },
    });
    expect(screen.getByPlaceholderText('Password').value).toBe('securepassword');

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'securepassword' },
    });
    expect(screen.getByPlaceholderText('Confirm Password').value).toBe('securepassword');
  });

  test('displays error message on failed registration attempt', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Email already exists' }), {
      status: 400,
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign Up'));

    const errorMessage = await screen.findByText('Email already exists');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays generic error message on unexpected error during registration', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign Up'));

    const errorMessage = await screen.findByText('An error occurred. Please try again later.');
    expect(errorMessage).toBeInTheDocument();
  });
});

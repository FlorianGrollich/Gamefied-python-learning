import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../../LoginForm/LoginForm';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockOnLogin = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('LoginForm Component', () => {
  afterEach(() => {
    fetchMock.mockRestore();
  });

  test('renders LoginForm component', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('allows the user to fill the form', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'securepassword' },
    });
    expect(screen.getByPlaceholderText('Email').value).toBe('user@example.com');
  });

  test('displays error message on failed login attempt', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
    });

    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText('Login'));

    const errorMessage = await screen.findByText('Login failed: Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays generic error message on unexpected error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    const errorMessage = await screen.findByText('An error occurred. Please try again later.');
    expect(errorMessage).toBeInTheDocument();
  });
});

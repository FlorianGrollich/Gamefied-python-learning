import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../components/LoginForm/LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle login', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'sample_token' }));

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));

    await screen.findByText('Login successful');
  });
});

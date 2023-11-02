import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../../LoginForm/LoginForm';
import fetchMock from 'jest-fetch-mock';
import type { jest } from '@types/jest';

fetchMock.enableMocks();

describe('LoginForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle login', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'sample_token' }));
    
    const mockOnLogin = jest.fn();
    
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    await screen.findByText('Login successful');

    expect(mockOnLogin).toHaveBeenCalled();
  });
});

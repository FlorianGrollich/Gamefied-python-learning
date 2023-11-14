import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../LoginPage/LoginPage';

describe('LoginPage', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    render(<LoginPage onLogin={mockOnLogin} />);
  });

  it('should render the login button correctly', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});

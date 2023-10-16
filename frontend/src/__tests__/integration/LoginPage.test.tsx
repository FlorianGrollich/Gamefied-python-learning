import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../routes/LoginPage/LoginPage';

describe('LoginPage Component', () => {
  test('renders LoginPage component', () => {
    render(<LoginPage />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});

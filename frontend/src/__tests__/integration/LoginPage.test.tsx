import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../routes/LoginPage/LoginPage';

describe('LoginPage Component', () => {
  test('renders LoginPage component', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});

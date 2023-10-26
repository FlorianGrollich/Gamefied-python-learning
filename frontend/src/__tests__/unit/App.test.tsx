import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Python Playground/i);
  expect(welcomeElement).toBeInTheDocument();
});

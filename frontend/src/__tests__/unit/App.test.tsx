import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../App'

test('renders welcome message', () => {
  render(<App />)
  const welcomeElements = screen.getAllByText(/Python Playground/i);
  expect(welcomeElements.length).toBeGreaterThan(0);
})

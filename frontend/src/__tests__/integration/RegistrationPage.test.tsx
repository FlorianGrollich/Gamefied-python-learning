import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import RegistrationPage from '../../RegistrationPage/RegistrationPage';

describe('RegistrationPage Component', () => {
  test('renders RegistrationPage component', () => {
    render(<RegistrationPage />);
    const registrationHeading = screen.getByRole('heading', {
      name: /register/i,
    });
    expect(registrationHeading).toBeInTheDocument();
  });
});

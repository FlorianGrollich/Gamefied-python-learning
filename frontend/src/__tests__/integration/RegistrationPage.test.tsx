import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RegistrationPage from '../../RegistrationPage/RegistrationPage';

describe('RegistrationPage', () => {
  it('renders the registration page with the form', () => {
    render(<RegistrationPage />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
});

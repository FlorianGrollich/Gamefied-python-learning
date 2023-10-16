import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';

describe('RegistrationForm Component', () => {
  test('renders RegistrationForm component', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  test('allows the user to fill the registration form', () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    expect((screen.getByPlaceholderText('Email') as HTMLInputElement).value).toBe('user@example.com');
    
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'securepassword' } });
    expect((screen.getByPlaceholderText('Password') as HTMLInputElement).value).toBe('securepassword');
    
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'securepassword' } });
    expect((screen.getByPlaceholderText('Confirm Password') as HTMLInputElement).value).toBe('securepassword');
  });
});

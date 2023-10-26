import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../../LoginForm/LoginForm';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ token: '12345' }),
    status: 200,
    headers: new Headers(),
    ok: true,
    redirected: false,
    statusText: 'OK',
    type: 'default',
    url: '',
    clone: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    body: null,
    bodyUsed: false,
  })
);

describe('LoginForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginForm component', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('allows the user to fill the form', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'securepassword' },
    });
    expect(
      (screen.getByPlaceholderText('Email') as HTMLInputElement).value,
    ).toBe('user@example.com');
  });
});

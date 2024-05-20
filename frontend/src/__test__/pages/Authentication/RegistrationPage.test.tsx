import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import RegisterPage from '../../../pages/Authentication/RegistrationPage';
import store from '../../../store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: 'mockToken' } })),
}));
describe('RegisterPage component', () => {
  it('renders the component correctly', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        a
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Have an Account?')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('displays error message if email is invalid', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>,
    );
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(getByText('Register'));
    await waitFor(() => {
      expect(
        getByText('Please enter a valid email address'),
      ).toBeInTheDocument();
    });
  });
});

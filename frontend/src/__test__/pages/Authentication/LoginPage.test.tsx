import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '../../../pages/Authentication/LoginPage';
import store from '../../../store';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: 'mockToken' } })),
}));
test('renders LoginPage', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText(/No Account Yet?/i);
  expect(linkElement).toBeInTheDocument();
});

test('username and password input works', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );
  const usernameInput = getByLabelText('Username') as HTMLInputElement;
  const passwordInput = getByLabelText('Password') as HTMLInputElement;

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpass');
});

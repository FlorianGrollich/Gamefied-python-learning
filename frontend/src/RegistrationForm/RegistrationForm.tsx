import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') setEmailError('');
    if (name === 'password') setPasswordError('');
  };

  const getPasswordStrengthError = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    const errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long.`);
    }
    if (!hasUpperCase.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }
    if (!hasLowerCase.test(password)) {
      errors.push("Password must include at least one lowercase letter.");
    }
    if (!hasNumbers.test(password)) {
      errors.push("Password must include at least one number.");
    }
    if (!hasSpecialChar.test(password)) {
      errors.push("Password must include at least one special character (!@#$%^&*(),.?\":{}|<>).");
    }

    return errors.length > 0 ? errors.join(' ') : '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else if (name === 'password') {
      const passwordError = getPasswordStrengthError(value);
      setPasswordError(passwordError);
    }
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email) ? '' : 'Please enter a valid email address';
    const passwordError = getPasswordStrengthError(formData.password);
    setEmailError(emailError);
    setPasswordError(passwordError);

    if (emailError || passwordError) {
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setRegistrationStatus('Passwords do not match.');
      return;
    }

    setRegistrationStatus('Registration successful');
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
    setRegistrationStatus('');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          className="p-2 m-0.5 border rounded"
          required
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-2 m-0.5 border rounded"
          aria-describedby="email-error"
          required
        />
        {emailError && (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {emailError}
          </p>
        )}

        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-2 m-0.5 border rounded"
          aria-describedby="password-error"
          required
        />
        {passwordError && (
          <p id="password-error" className="mt-2 text-sm text-red-600">
            {passwordError}
          </p>
        )}

        <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          placeholder="Confirm Password"
          onChange={handleChange}
          className="p-2 m-0.5 border rounded"
          required
        />

        <button type="button" onClick={handleReset} className="p-2 m-0.5 border rounded">
          Reset
        </button>

        <button type="submit" className="p-2 m-0.5 bg-blue-500 text-white rounded">
          Sign Up
        </button>

        {registrationStatus && (
          <p className="mt-4 text-center">{registrationStatus}</p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;

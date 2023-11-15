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

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

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
      errors.push('Password must include at least one uppercase letter.');
    }
    if (!hasLowerCase.test(password)) {
      errors.push('Password must include at least one lowercase letter.');
    }
    if (!hasNumbers.test(password)) {
      errors.push('Password must include at least one number.');
    }
    if (!hasSpecialChar.test(password)) {
      errors.push(
        'Password must include at least one special character (!@#$%^&*(),.?":{}|<>).',
      );
    }
  
    return errors.length > 0 ? errors.join(' ') : '';
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') setEmailError('');
    if (name === 'password') setPasswordError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else if (name === 'password') {
      setPasswordError(getPasswordStrengthError(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newEmailError = validateEmail(formData.email) ? '' : 'Please enter a valid email address';
    const newPasswordError = getPasswordStrengthError(formData.password);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
  
    if (newEmailError || newPasswordError) {
      return;
    }
  
    if (formData.password !== formData.passwordConfirmation) {
      setRegistrationStatus('Passwords do not match.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3200/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Registration failed');
  
      window.location.href = '/login';
      setRegistrationStatus('Registration successful. Please log in.');
    } catch (error) {
      setRegistrationStatus(error instanceof Error ? error.message : 'An error occurred during registration.');
    }
  };

  const handleReset = () => {
    setFormData({ username: '', email: '', password: '', passwordConfirmation: '' });
    setRegistrationStatus('');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-md p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
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
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="email-error"
              required
            />
            {emailError && (
              <p
                id="email-error"
                className="mt-1 text-xs font-medium text-red-600"
              >
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
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
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="password-error"
              required
            />
            {passwordError && (
              <p
                id="password-error"
                className="mt-1 text-xs font-medium text-red-600"
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* Password Confirmation */}
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Reset
            </button>
            <button
              type="submit"
              className="inline-block px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            >
              Sign Up
            </button>
          </div>

          {/* Registration Status */}
          {registrationStatus && (
            <div className="mt-4 text-center p-3 rounded-lg font-medium bg-green-100 text-green-700">
              {registrationStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm

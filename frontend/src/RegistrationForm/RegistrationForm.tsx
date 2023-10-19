import React, { useState } from 'react'

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [registrationStatus, setRegistrationStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic
    if (formData.password === formData.passwordConfirmation) {
      setRegistrationStatus('Registration successful')
    } else {
      setRegistrationStatus('Passwords do not match')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 m-0.5 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 m-0.5 border rounded"
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          className="p-2 m-0.5 border rounded"
        />
        <button
          type="submit"
          className="p-2 m-0.5 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
      {registrationStatus && (
        <p className="mt-4 text-center">{registrationStatus}</p>
      )}
    </div>
  )
}

export default RegistrationForm

import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  error,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={error ? 'input-field-error' : 'input-field'}
      value={value}
      onChange={onChange}
    />
    {error && <div className="text-red-500 text-xs">{error}</div>}
  </div>
)

export default InputField

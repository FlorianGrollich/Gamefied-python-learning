interface ValidationErrors {
  email?: string[]
  password?: string[]
  username?: string[]
}

const getPasswordStrengthError = (password: string): string[] => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasNumbers = /[0-9]/
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

  const errors: string[] = []

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long.`)
  }
  if (!hasUpperCase.test(password)) {
    errors.push('Password must include at least one uppercase letter.')
  }
  if (!hasLowerCase.test(password)) {
    errors.push('Password must include at least one lowercase letter.')
  }
  if (!hasNumbers.test(password)) {
    errors.push('Password must include at least one number.')
  }
  if (!hasSpecialChar.test(password)) {
    errors.push(
      'Password must include at least one special character (!@#$%^&*(),.?":{}|<>).',
    )
  }

  return errors
}

export const validateUsername = (username: string) => {
  let errors: ValidationErrors = {}
  let isValid = true

  if (!username || username.trim() === '') {
    errors.username = ['Username is required']
    isValid = false
  } else if (username.length < 3) {
    errors.username = ['Username must be at least 3 characters']
    isValid = false
  }

  return { errors, isValid }
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export const validateEmailInput = (email: string) => {
  let errors: ValidationErrors = {}
  let isValid = true

  if (!email || email.trim() === '') {
    errors.email = ['Email is required']
    isValid = false
  } else if (!validateEmail(email)) {
    errors.email = ['Email is invalid']
    isValid = false
  }

  return { errors, isValid }
}

export const validatePasswordInput = (password: string) => {
  let errors: ValidationErrors = {}
  let isValid = true

  const passwordErrors = getPasswordStrengthError(password)
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors
    isValid = false
  }

  return { errors, isValid }
}

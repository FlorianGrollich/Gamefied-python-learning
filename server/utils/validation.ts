interface ValidationErrors {
    email?: string;
    password?: string;
  }  

export const validateEmailInput = (email: string) => {
    let errors: ValidationErrors = {};
    let isValid = true;
  
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!email.includes('@')) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
  
    return { errors, isValid };
  };
  
  export const validatePasswordInput = (password: string) => {
    let errors: ValidationErrors = {};
    let isValid = true;
  
    if (!password || password.trim() === '') {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
  
    return { errors, isValid };
  };
  
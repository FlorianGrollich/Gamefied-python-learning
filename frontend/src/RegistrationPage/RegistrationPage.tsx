import React from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

const RegistrationPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-white text-2xl mt-14 mb-4 p-5">Register</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;

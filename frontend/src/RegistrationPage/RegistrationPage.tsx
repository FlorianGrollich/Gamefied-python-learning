import React from 'react';
<<<<<<<< HEAD:frontend/src/routes/RegistrationPage/RegistrationPage.tsx
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
========
import RegistrationForm from '../RegistrationForm/RegistrationForm';
>>>>>>>> origin/feat/authentication-forms-ui:frontend/src/RegistrationPage/RegistrationPage.tsx

const RegistrationPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-white text-2xl mt-14 mb-4 p-5">Register</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;

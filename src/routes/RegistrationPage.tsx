import React from 'react';
import './RegistrationPage.css';
import Header from '../components/Header/Header';
import RegistrationMain from '../components/Registration/RegistrationMain';

function RegistrationPage() {
  return (
    <div>
      <div className="registration_page_header">
        <Header />
      </div>
      <div className="registration_page_content">
        <RegistrationMain />
      </div>
    </div>
  );
}

export default RegistrationPage;

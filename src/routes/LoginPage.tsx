import React from 'react';
import './LoginPage.css';
import Header from '../components/Header/Header';
import LoginMain from '../components/Login/LoginMain';

function LoginPage() {
  return (
    <div>
      <div className="login_page_header">
        <Header />
      </div>
      <div className="login_page_content">
        <LoginMain />
      </div>
      <div className="empty_block"></div>
    </div>
  );
}

export default LoginPage;

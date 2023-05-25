import React from 'react';
import './MainPage.css';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';

function MainPage() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Content />
      </div>
    </div>
  );
}

export default MainPage;

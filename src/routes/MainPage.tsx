import React from 'react';
import './MainPage.css';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import HelloText from '../components/Content/HelloText';

function MainPage() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="main_page_hello_text">
        <HelloText />
      </div>
      <div className="content">
        <Content />
      </div>
      <div className="empty_block"></div>
    </div>
  );
}

export default MainPage;

import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

function App() {
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

export default App;

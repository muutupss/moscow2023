import React from 'react';
import './CabinetPage.css';
import Header from '../components/Header/Header';
import Cabinet from '../components/Cabinet/Cabinet';

function CabinetPage() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <Cabinet />
      </div>
    </div>
  );
}

export default CabinetPage;

import React from 'react';
import DWChart from './components/DWChart/DWChart'
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <div className='header'>
        <Header/>
      </div>
      <div className='content'>
        <DWChart title="Chart" src="//datawrapper.dwcdn.net/Wh8QV/1/" />
      </div>
    </div>
  );
}

export default App;

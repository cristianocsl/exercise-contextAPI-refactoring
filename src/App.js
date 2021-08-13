import React from 'react';
import './App.css';
import Cars from './Cars';
import MyContext from './MyContext';

function App() {
  return (
    <MyContext.Provider value={contextValue}>
      <Cars />
    </MyContext.Provider>
  );
}

export default App;

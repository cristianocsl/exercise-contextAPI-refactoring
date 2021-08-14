import React from 'react';
import TrafficSignal from './TrafficSignal';
import './App.css';
import Cars from './Cars';
import Provider from '../src/context/Provider';

function App() {
  return (
    <div className="container">
      <Provider>
        <Cars />
        <TrafficSignal />
      </Provider>
    </div>
  );
}

export default App;

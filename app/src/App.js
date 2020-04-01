import React from 'react';
import { CoronaMap } from './features/CoronaMap';
import './App.css';
import { Header } from './features/site/Header';
import { Footer } from './features/site/Footer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <CoronaMap />
        <Footer />
      </div>
      />
    </div>
  );
}

export default App;

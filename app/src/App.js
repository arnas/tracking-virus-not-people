import React, { useState } from 'react';
import { CoronaMap } from './features/CoronaMap';
import './App.css';
import { Header } from './features/site/Header';
import { Footer } from './features/site/Footer';
import { IntroductionModal } from './features/introduction/IntroductionModal';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(
    localStorage.getItem('introductionModalShown') != null
      ? !localStorage.getItem('introductionModalShown')
      : true
  );

  const closeModal = () => {
    localStorage.setItem('introductionModalShown', true);
    setIsOpenModal(false);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <CoronaMap />
        <Footer />
      </div>
      <IntroductionModal
        visible={isOpenModal}
        handleClose={() => closeModal()}
      />
    </div>
  );
}

export default App;

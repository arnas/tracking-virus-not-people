import React, { useState } from 'react';
import { Button } from 'antd';
import './Header.css';
import { UploadDataModal } from '../uploadData/UploadDataModal';
import { IntroductionModal } from '../introduction/IntroductionModal';
import {
  BarChartOutlined,
  NotificationOutlined,
  DeploymentUnitOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import question from '../../question.svg';
import { ResultsModal } from '../uploadData/ResultsModal';
import sekVirusaLogo from '../../sekvirusa_logo.svg';
import { MobileDrawer } from './drawer/MobileDrawer';
export function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenIntroductionModal, setIsOpenIntroductionModal] = useState(false);

  const [isOpenResultsModal, setIsOpenResultsModal] = useState(false);

  const [results, setResults] = useState(undefined);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [mobileMode, setMobileMode] = useState(false);

  const closeDrawerAndCallArg = (arg) => (e) => {
    setIsDrawerOpen(false);
    setMobileMode(true);
    arg();
  };

  return (
    <>
      <div className="header">
        <img alt="" className="title" src={sekVirusaLogo} />

        <Button
          className={'drawerButton'}
          onClick={() => setIsDrawerOpen(true)}
          style={{ marginRight: 16 }}
          size="large"
        >
          <MenuOutlined />
        </Button>

        <div className="toolbar">
          {results && (
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => setIsOpenResultsModal(true)}
              type="primary"
              shape="round"
              size={'normal'}
            >
              <BarChartOutlined> </BarChartOutlined>
              Rezultatai
            </Button>
          )}

          <Button
            size="large"
            href="https://forms.gle/BeNP3soQRq97k4Qw6"
            target="_blank"
          >
            <NotificationOutlined /> Pranešk
          </Button>
          <Button
            onClick={() => setIsOpenModal(true)}
            className="upload-button"
            size="large"
            type="primary"
          >
            <DeploymentUnitOutlined />
            Pasitikrink
          </Button>

          <img
            alt=""
            className="information-svg"
            onClick={() => setIsOpenIntroductionModal(true)}
            src={question}
          />
        </div>
      </div>
      <UploadDataModal
        visible={isOpenModal}
        style={mobileMode && { top: '20px' }}
        handleClose={() => setIsOpenModal(false)}
        handleDataUpload={(data) => {
          setResults(data);
          setIsOpenResultsModal(true);
        }}
      />
      <IntroductionModal
        style={mobileMode && { top: '20px' }}
        visible={isOpenIntroductionModal}
        handleClose={() => setIsOpenIntroductionModal(false)}
      />
      <ResultsModal
        style={mobileMode && { top: '20px' }}
        visible={isOpenResultsModal}
        score={results}
        handleClose={() => setIsOpenResultsModal(false)}
      />
      <MobileDrawer
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        results={results}
        setIsOpenResultsModal={closeDrawerAndCallArg(() =>
          setIsOpenResultsModal(true)
        )}
        setIsOpenModal={closeDrawerAndCallArg(() => setIsOpenModal(true))}
        setIsOpenIntroductionModal={closeDrawerAndCallArg(() =>
          setIsOpenIntroductionModal(true)
        )}
      />
    </>
  );
}

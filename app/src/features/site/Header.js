import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import ReactGA from 'react-ga';
import './Header.css';
import { UploadDataModal } from '../uploadData/UploadDataModal';
import { IntroductionModal } from '../introduction/IntroductionModal';
import { PolicyModal } from './PolicyModal';
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
  const [isOpenPolicyModal, setIsPolicyModal] = useState(false);

  const [isOpenResultsModal, setIsOpenResultsModal] = useState(false);

  const [results, setResults] = useState(undefined);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [mobileMode, setMobileMode] = useState(false);

  const [isOpenIntroductionModal, setIsOpenIntroductionModal] = useState(
    localStorage.getItem('introductionModalShown') != null
      ? !localStorage.getItem('introductionModalShown')
      : true
  );

  useEffect(() => {
    if (!localStorage.getItem('cookieAccepted')) {
      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            ReactGA.initialize('UA-161690757-1');
            notification.close(key);
            localStorage.setItem('cookieAccepted', true);
          }}
        >
          Patvirtinti
        </Button>
      );
      notification.info({
        message: `Slapukų politika`,
        description: (
          <span>
            Ši svetainė naudoja slapukus norint pagerinti jūsų patirtį
            naudojantis šia svetaine. Paspauskite "Patvirtinti", jei sutinkate
            su tuo.
            <Button onClick={() => setIsPolicyModal(true)} type="link">
              Daugiau informacijos
            </Button>
          </span>
        ),
        placement: 'bottomRight',
        duration: 0,
        closeIcon: <></>,
        btn,
        key,
      });
    }
  }, []);

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
        handleClose={() => {
          setIsOpenIntroductionModal(false);
          localStorage.setItem('introductionModalShown', true);
        }}
        openPolicyModal={() => {
          setIsPolicyModal(true);
          setIsOpenIntroductionModal(false);
        }}
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
      <PolicyModal
        visible={isOpenPolicyModal}
        handleClose={() => setIsPolicyModal(false)}
      />
    </>
  );
}

import React from 'react';
import { Drawer, Button } from 'antd';
import {
  BarChartOutlined,
  NotificationOutlined,
  DeploymentUnitOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { UpdateInfo } from '../UpdateInfo';
import './MobileDrawer.css';

export function MobileDrawer({
  setIsDrawerOpen,
  isDrawerOpen,
  results,
  setIsOpenResultsModal,
  setIsOpenModal,
  setIsOpenIntroductionModal,
}) {
  return (
    <Drawer
      width={'200px'}
      title="Meniu"
      placement="right"
      closable={true}
      onClose={() => setIsDrawerOpen(false)}
      visible={isDrawerOpen}
    >
      <div className="drawer-container">
        <div>
          {results && (
            <Button
              onClick={() => setIsOpenResultsModal(true)}
              type="link"
              size={'large'}
            >
              <BarChartOutlined> </BarChartOutlined>
              Rezultatai
            </Button>
          )}
          <Button
            onClick={() => setIsOpenModal(true)}
            className="drawer-button"
            size="large"
            type="link"
          >
            <DeploymentUnitOutlined />
            Pasitikrink
          </Button>
          <Button
            size="large"
            className="drawer-button"
            type={'link'}
            href="https://forms.gle/BeNP3soQRq97k4Qw6"
            target="_blank"
          >
            <NotificationOutlined /> Pranešk
          </Button>

          <Button
            size="large"
            className="drawer-button"
            type={'link'}
            onClick={() => setIsOpenIntroductionModal(true)}
          >
            <QuestionCircleOutlined /> Informacija
          </Button>
        </div>
        <div>
          <UpdateInfo />
        </div>
      </div>
    </Drawer>
  );
}

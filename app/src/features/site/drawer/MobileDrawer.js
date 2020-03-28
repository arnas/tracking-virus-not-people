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
  setIsOpenNotifyModal,
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
              type="primary"
              shape="round"
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
            onClick={() => setIsOpenNotifyModal(true)}
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
        <UpdateInfo />
      </div>
    </Drawer>
  );
}

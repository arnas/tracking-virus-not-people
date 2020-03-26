import React, { useState } from "react";
import { Button } from "antd";
import "./Header.css";
import { UploadDataModal } from "../uploadData/UploadDataModal";
import { NewDataFormModal } from "../newDataForm/NewDataFormModal";
import { IntroductionModal } from "../introduction/IntroductionModal";
import {
  BarChartOutlined,
  NotificationOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons";
import question from "../../question.svg";
import { ResultsModal } from "../uploadData/ResultsModal";
import sekVirusaLogo from "../../sekvirusa_logo.svg";
export function Header() {
  const [isOpenNotifyModal, setIsOpenNotifyModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenIntroductionModal, setIsOpenIntroductionModal] = useState(false);

  const [isOpenResultsModal, setIsOpenResultsModal] = useState(false);

  const [results, setResults] = useState(undefined);

  return (
    <>
      <div className="header">
        <h1 className="title">
          <img alt="" className="logo-svg" src={sekVirusaLogo} />
        </h1>

        <div className="toolbar">
          {results && (
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => setIsOpenResultsModal(true)}
              type="primary"
              shape="round"
              size={"large"}
            >
              <BarChartOutlined> </BarChartOutlined>
              Rezultatai
            </Button>
          )}

          <Button size="large" onClick={() => setIsOpenNotifyModal(true)}>
            <NotificationOutlined />
            Pranešk
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
        handleClose={() => setIsOpenModal(false)}
        handleDataUpload={data => {
          setResults(data);
          setIsOpenResultsModal(true);
        }}
      />
      <NewDataFormModal
        visible={isOpenNotifyModal}
        handleClose={() => setIsOpenNotifyModal(false)}
      />

      <IntroductionModal
        visible={isOpenIntroductionModal}
        handleClose={() => setIsOpenIntroductionModal(false)}
      />
      <ResultsModal
        visible={isOpenResultsModal}
        score={results}
        handleClose={() => setIsOpenResultsModal(false)}
      />
    </>
  );
}

import React, { useState } from 'react';
import { ResultDisplay } from './ResultsDisplay';

import { Alert, message, Modal } from 'antd';
import parse from './dataProcessing/parse';
import process from './dataProcessing/process';
import getFutureRiskScores from './dataProcessing/futureRisk';

export function UploadDataModal(props) {
  const inputRef = React.createRef();

  const [showRes] = useState(false);

  const [loading] = useState(false);

  const handleOk = async () => {
    const files = inputRef.current.files;
    if (files.length > 0) {
      const closeMessage = message.loading('Daroma duomenų analizė...', 0);
      try {
        const parsedData = await parse(files[0]);
        if (parsedData !== null) {
          const score = process(parsedData);
          const futureRisk = getFutureRiskScores(parsedData);
          props.handleDataUpload({ ...score, ...futureRisk });
        } else {
          message.error('Trūksta duomenų.');
        }
      } catch (e) {
        message.error('Įvyko nežinoma klaida.');
      }

      closeMessage();
    }
    props.handleClose();
  };

  const renderContent = () => {
    if (!showRes) {
      return (
        <>
          <ol>
            <li>
              Prisijungę prie savo Google paskyros atidarykite šią{' '}
              <a
                href="https://takeout.google.com/settings/takeout/custom/location_history"
                target="_blank"
                rel="noreferrer noopener"
              >
                nuorodą
              </a>
              .
            </li>
            <li>
              Paspauskite <b>Kitas veiksmas</b>.
            </li>
            <li>
              Pasirinkite Pristatymo būdą{' '}
              <b>Siųsti atsisiuntimo nuorodą el.paštu</b>.
            </li>
            <li>
              Paspauskite <b>Kurti eksportuojamą failą</b>.
            </li>
            <li>
              Palaukite kol failas bus sukurtas. Apie sukurtą failą būsite
              informuoti el.paštu.
            </li>
            <li>
              Paspauskite el.paštu gautą nuorodą, atsisiųskite zip failą ir
              įkelkite jį čia.
            </li>
          </ol>
          <img
            alt=""
            style={{ width: '100%', margin: '16px 0' }}
            src="https://cdn.kapwing.com/final_5e7617fd7a977e001514e5c0_74755.gif"
          />
          <Alert
            style={{ marginBottom: '10px' }}
            message="Jūsų duomenys nėra niekur siunčiami ir yra apdorojami jūsų kompiuteryje."
            type="info"
          />
          <input
            style={{}}
            ref={inputRef}
            type="file"
            accept="application/zip"
          />
        </>
      );
    } else {
      return <ResultDisplay />;
    }
  };

  return (
    <div>
      <Modal
        confirmLoading={loading}
        title="Įkelk Savo Google Vietovių Istoriją"
        visible={props.visible}
        onOk={handleOk}
        okText="Įkelti"
        cancelText="Uždaryti"
        onCancel={props.handleClose}
      >
        {renderContent()}
      </Modal>
    </div>
  );
}

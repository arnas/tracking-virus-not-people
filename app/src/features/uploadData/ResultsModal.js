import React from "react";

import { Modal } from "antd";
import { ResultDisplay } from "./ResultsDisplay";

export function ResultsModal(props) {
  return (
    <div>
      <Modal
        width="960px"
        title="Rezultatai"
        visible={props.visible}
        onCancel={props.handleClose}
        footer={null}
      >
        <ResultDisplay
          score={props.score}
        />
      </Modal>
    </div>
  );
}

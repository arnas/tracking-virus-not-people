import React from "react";

import { Modal } from "antd";

export function IntroductionModal(props) {
  const title =
    localStorage.getItem("introductionModalShown") == null
      ? "Sveiki atvykę!"
      : "Informacija";

  return (
    <Modal
      footer={null}
      title={title}
      visible={props.visible}
      onCancel={props.handleClose}
    >
      <p>
        <span>
          Šiame tinkalapyje jūs galite matyti užsikrėtusių žmonių lankytas
          vietas. Vietos pažymėtos remiantis Nacionalinės visuomenės sveikatos
          centro prie Sveikatos apsaugos ministerijos paskelbtais
        </span>{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://nvsc.lrv.lt/lt/naujienos/covid-19-atveju-epidemiologinio-tyrimo-rezultatai"
        >
          duomenimis
        </a>
        .
      </p>
      <p>
        Taip pat jūs galite pateikti savo Google istorijos duomenis ir mes
        automatiškai patikrinsime jūsų rizikos faktorių.
      </p>
    </Modal>
  );
}

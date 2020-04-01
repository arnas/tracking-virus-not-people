import React from 'react';

import { Modal } from 'antd';

export function PolicyModal(props) {
  return (
    <Modal
      style={props.style ? props.style : {}}
      footer={null}
      title={'„Sek Virusą“ slapukų politika'}
      visible={props.visible}
      onCancel={props.handleClose}
    >
      <p>
        <strong> Kas yra slapukai </strong>{' '}
      </p>

      <p>
        Slapukais vadinami informacijos elementai, perkeliami iš interneto
        svetainės į jūsų kompiuterio standųjį diską. Tai nedideli informacijos
        failai, kurie leidžia interneto svetainėms išsaugoti ir vėl pasiekti
        informaciją apie naudotojo naršymo įpročius. Slapukus naudoja dauguma
        interneto svetainių, nes jie yra viena iš daugybės priemonių, kurios
        padeda pritaikyti interneto turinį prie naudotojų poreikių. Slapukai
        leidžia interneto svetainėms teikti prie naudotojų poreikių pritaikytas
        paslaugas (pavyzdžiui, įsimenant prisijungimo duomenis, išlaikant
        pirkinius pirkinių krepšelyje arba rodant tik konkretų naudotoją
        dominantį turinį).
      </p>
      <p>
        {' '}
        <strong> Mūsų nustatyti slapukai </strong>{' '}
      </p>
      <p>
        {' '}
        <strong> Trečiųjų šalių slapukai </strong>{' '}
      </p>
      <p>
        {' '}
        Šiame skyriuje pateikiama informacija apie trečiųjų šalių slapukus, su
        kuriais galite susidurti šioje svetainėje.{' '}
      </p>
      <ul>
        <li>
          <p>
            {' '}
            Šioje svetainėje naudojama „Google Analytics“, kuris yra vienas iš
            labiausiai paplitusių ir patikimiausių analizės sprendimų
            žiniatinklyje, skirtas padėti mums suprasti, kaip jūs naudojatės
            svetaine ir kaip galime pagerinti jūsų patirtį. Šie slapukai gali
            sekti tokius dalykus kaip laikas, kurį praleidžiate svetainėje, ir
            lankomi puslapiai, kad galėtume kurti jums patrauklų turinį.{' '}
          </p>
          <p>
            {' '}
            Norėdami gauti daugiau informacijos apie „Google Analytics“
            slapukus, žiūrėkite oficialų „Google Analytics“ puslapį.{' '}
          </p>
        </li>
      </ul>
      <p>
        {' '}
        <strong> Daugiau informacijos </strong>{' '}
      </p>
      <p>
        {' '}
        Jei nesate tikri, ar jums reikia slapukų, ar ne, dažniausiai saugiau
        palikti juos įjungtus, jei jie sąveikauja su viena iš jūsų naudojamų
        funkcijų. Ši slapukų politika buvo sukurta padedant{' '}
        <a href="https://www.cookiepolicygenerator.com">
          Slapukų politikos šablonų generatoriui{' '}
        </a>{' '}
        ir{' '}
        <a href="https://www.privacypolicytemplate.net / ">
          {' '}
          Privatumo politikos šablonų generatorius{' '}
        </a>
        .{' '}
      </p>
      <p> Jei ieškote daugiau informacijos, galite susisiekti su mumis: </p>
      <ul>
        <li> El. paštas: sekvirusa@gmail.com </li>
      </ul>
    </Modal>
  );
}

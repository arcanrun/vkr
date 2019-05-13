//@flow
import React from 'react';

import style from './Settings.css';
import { SettingsParsing } from '../SettingsParsing';
import { SettingsNeuralnet } from '../SettingsNeuralnet';

type PROPS = {
  setFrequncy: Function,
  parserFrequncy: number
};

export const Settings = ({ setFrequncy, parserFrequncy }: PROPS) => {
  return (
    <div className={style.container}>
      <div className={style.header}>Настройки</div>
      <div className={style.body}>
        <SettingsNeuralnet />
        <SettingsParsing
          setFrequncy={setFrequncy}
          parserFrequncy={parserFrequncy}
        />
      </div>
    </div>
  );
};

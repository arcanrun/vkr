//@flow
import React from 'react';

import style from './Settings.css';
import { SettingsParsing } from '../SettingsParsing';
import { SettingsNeuralnet } from '../SettingsNeuralnet';

type PROPS = {
  setFrequncy: Function,
  changeSettingsNeuralnet: Function,
  parserFrequncy: number,
  settingsNeuralNet: Object
};

export const Settings = ({
  setFrequncy,
  parserFrequncy,
  settingsNeuralNet,
  changeSettingsNeuralnet
}: PROPS) => {
  return (
    <div className={style.container}>
      <div className={style.header}>Настройки</div>
      <div className={style.body}>
        <SettingsNeuralnet
          settingsNeuralNet={settingsNeuralNet}
          changeSettingsNeuralnet={changeSettingsNeuralnet}
        />
        <SettingsParsing
          setFrequncy={setFrequncy}
          parserFrequncy={parserFrequncy}
        />
      </div>
    </div>
  );
};

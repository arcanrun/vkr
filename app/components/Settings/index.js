//@flow
import React from 'react';

import style from './Settings.css';
import { SettingsParsing } from '../SettingsParsing';
import { SettingsNeuralnet } from '../SettingsNeuralnet';
import { SettingsMap } from '../SettingsMap';

type PROPS = {
  setFrequncy: Function,
  changeSettingsMap: Function,
  changeSettingsNeuralnet: Function,
  parserFrequncy: number,
  settingsNeuralNet: Object,
  settingsMap: Object
};

export const Settings = ({
  setFrequncy,
  parserFrequncy,
  settingsNeuralNet,
  changeSettingsNeuralnet,
  settingsMap,
  changeSettingsMap
}: PROPS) => {
  return (
    <div className={style.container}>
      <div className={style.header}>Настройки</div>
      <div className={style.body}>
        <SettingsNeuralnet
          settingsNeuralNet={settingsNeuralNet}
          changeSettingsNeuralnet={changeSettingsNeuralnet}
        />
        <SettingsMap
          settingsMap={settingsMap}
          changeSettingsMap={changeSettingsMap}
        />
        <SettingsParsing
          setFrequncy={setFrequncy}
          parserFrequncy={parserFrequncy}
        />
      </div>
    </div>
  );
};

//@flow
import React from 'react';
import Select from 'react-select';

import style from './SettingsNeuralNet.css';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export const SettingsNeuralnet = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.icon}>
          <i className="fas fa-brain" />
        </div>
        <div className={style.titleText}>Настройка нейросети</div>
      </div>
      <div className={style.body}>
        <div className={style.control}>
          <div className={style.controlItem}>
            <div className={style.itemTitle}>Чувствительность</div>
            <Select options={options} />
          </div>
        </div>
        <div className={style.footer}>
          <button className={style.btn}>Изменить</button>
        </div>
      </div>
    </div>
  );
};

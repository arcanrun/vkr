//@flow
import React from 'react';

import style from './Profile.css';
type PROPS = {
  showDemo: Function,
  hideDemo: Function
};
export const Profile = ({ showDemo, hideDemo }: PROPS) => {
  return (
    <div className={style.container}>
      <div className={style.header}>Профиль</div>
      <div className={style.body}>
        <button className={style.btn} onClick={showDemo}>
          show demo
        </button>
        <button className={style.btnRed} onClick={hideDemo}>
          hide demo
        </button>
      </div>
    </div>
  );
};

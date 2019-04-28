//@flow
import React from 'react';

import style from './NavBar.css';

type PROPS = {};

export const NavBar = () => {
  return (
    <div className={style.navBar}>
      <div className={style.header}>
        <div className={style.icon}>
          <i className={['fas', 'fa-globe-europe'].join(' ')} />
        </div>
      </div>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <i className="fas fa-cog" />
        </div>
        <div className={style.menuItem}>
          <i className="fas fa-user" />
        </div>
      </div>
    </div>
  );
};

//@flow
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import style from './NavBar.css';

type PROPS = {};

export const NavBar = () => {
  return (
    <div className={style.navBar}>
      <div className={style.header}>
        <div className={style.icon}>
          <NavLink
            to="/"
            exact
            activeStyle={{
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            <i className={['fas', 'fa-globe-europe'].join(' ')} />
          </NavLink>
        </div>
      </div>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <i className="fas fa-user" />
        </div>
        <div className={style.menuItem}>
          <NavLink
            to="/settings"
            activeStyle={{
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            <i className="fas fa-cog" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

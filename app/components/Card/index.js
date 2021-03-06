// @flow
import React from 'react';

import style from './Card.css';

type PROPS = {
  children: any,
  title: string,
  icon: any,
  width?: string,
  height?: string,
  margin?: string,
  flex?: string,
  maxWidth?: string
};

const Card = ({
  children,
  title,
  icon,
  width,
  height,
  margin,
  flex,
  maxWidth
}: PROPS) => {
  let displayIcon = '';
  switch (icon) {
    case 'map':
      displayIcon = <i className="fas fa-globe" />;
      break;
    case 'calendar':
      displayIcon = <i className="far fa-calendar-alt" />;
      break;
    case 'marine':
      displayIcon = <i className="fas fa-anchor" />;
      break;
    case 'jet':
      displayIcon = <i className="fas fa-fighter-jet" />;
      break;
    case 'man':
      displayIcon = <i className="fas fa-male" />;
      break;

    default:
      break;
  }
  return (
    <div
      className={style.container}
      style={{ width, height, margin, flex, maxWidth }}
    >
      <div className={style.header}>
        <div className={style.icon}>{displayIcon}</div>
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.body}>{children}</div>
    </div>
  );
};

export { Card };

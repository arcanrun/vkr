//@flow
import React from 'react';

import style from './Sources.css';
import { SourceItem } from '../index';
import { SourceHeaderContainer } from '../../containers';

export const Sources = () => {
  return (
    <div className={style.sources}>
      <SourceHeaderContainer />
      <div className={style.sourceList}>
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
        <SourceItem />
      </div>
    </div>
  );
};

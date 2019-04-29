//@flow
import React from 'react';

import style from './Sources.css';
import { SourceItem } from '../SourceItem';
import { SourceHeaderContainer } from '../../containers';

export const Sources = () => {
  return (
    <div className={style.sources}>
      <SourceHeaderContainer />
      <div className={style.sourceList}>
        <SourceItem isActive={false} isSpecial={true} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
        <SourceItem isActive={false} isSpecial={false} />
      </div>
    </div>
  );
};

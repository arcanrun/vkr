//@flow
import React from 'react';

import style from './Sources.css';
import { SourceItem } from '../SourceItem';
import { SourceHeader } from '../SourceHeader';

type PROPS = {
  sources: Array<any>
};

export const Sources = ({ sources }: PROPS) => {
  return (
    <div className={style.sources}>
      <SourceHeader />
      <div className={style.sourceList}>
        <SourceItem
          isActive={false}
          isSpecial={true}
          title=""
          descr=""
          trackingDate=""
        />

        {sources.map((el, i) => (
          <SourceItem
            key={el.id}
            isActive={false}
            isSpecial={false}
            title={el.title}
            descr={el.descr}
            trackingDate={el.tracking_date}
          />
        ))}
      </div>
    </div>
  );
};

//@flow
import React from 'react';

import style from './Sources.css';
import { SourceItem } from '../SourceItem';
import { SourceHeader } from '../SourceHeader';

type PROPS = {
  activeAnalyze: Function,
  sources: Array<any>,
  id_activeAnalyze: string
};

export const Sources = ({
  sources,
  activeAnalyze,
  id_activeAnalyze
}: PROPS) => {
  return (
    <div className={style.sources}>
      <SourceHeader />
      <div className={style.sourceList}>
        <SourceItem
          id={'0'}
          isActive={id_activeAnalyze === '0' ? true : false}
          isSpecial={true}
          title=""
          descr=""
          trackingDate=""
          setActiveAnalyze={activeAnalyze}
        />

        {sources.map((el, i) => (
          <SourceItem
            key={el.id}
            id={el.id}
            isActive={id_activeAnalyze === el.id ? true : false}
            isSpecial={false}
            title={el.title}
            descr={el.descr}
            trackingDate={el.tracking_date}
            setActiveAnalyze={activeAnalyze}
          />
        ))}
      </div>
    </div>
  );
};

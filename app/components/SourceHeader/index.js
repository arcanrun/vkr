//@flow
import React from 'react';

import style from './SourceHeader.css';

type PROPS = {
  toggleUrlManager: Function,
  isVisibleUrlManager: boolean
};

export const SourceHeader = ({
  isVisibleUrlManager,
  toggleUrlManager
}: PROPS) => {
  const mainPanel = (
    <>
      <div className={[style.headerItem].join(' ')}>
        <i className="fas fa-search" />
      </div>
      <div className={style.headerItem} onClick={toggleUrlManager}>
        <i className="fas fa-plus-circle" />
      </div>
      <div className={style.headerItem}>
        <i className="fas fa-play-circle" />
      </div>
      <div className={style.headerItem}>
        <i className="fas fa-sort-amount-down" />
      </div>
    </>
  );
  const urlManager = (
    <>
      <input className={style.urlInput} type="text" placeholder="URL..." />
      <div className={style.urlBtns}>
        <i className="fas fa-check-circle" />
        <i className="fas fa-times-circle" onClick={toggleUrlManager} />
      </div>
    </>
  );
  if (isVisibleUrlManager) {
    return <div className={style.header}>{urlManager}</div>;
  } else {
    return <div className={style.header}>{mainPanel}</div>;
  }
};

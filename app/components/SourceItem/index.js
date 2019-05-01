//@flow
import React from 'react';

import style from './SourceItem.css';

type PROPS = {
  setActiveAnalyze: Function,
  isSpecial?: boolean,
  isActive?: boolean,
  title: string,
  descr: string,
  trackingDate: string,
  id: string
};

export const SourceItem = ({
  isSpecial,
  isActive,
  title,
  descr,
  trackingDate,
  setActiveAnalyze,
  id
}: PROPS) => {
  const image = isSpecial ? (
    <div className={style.specailImage}>
      <i className="fas fa-globe-americas" />
    </div>
  ) : (
    <div className={style.imageContainer}>
      <img
        className={style.imageItem}
        src="/Users/admin/Documents/batman_avatar_dribbbb.png"
        alt="icon-site"
      />
    </div>
  );
  const delBtn = (
    <div className={style.crossBtn}>
      <i className="fas fa-times" />
    </div>
  );
  const titleBlock = isSpecial ? (
    <div className={style.title}>
      {' '}
      <div>Все источники </div>
    </div>
  ) : (
    <div className={style.title}>
      <div>{title}</div>
      {delBtn}
    </div>
  );
  const descrBlock = isSpecial ? (
    <div className={style.descr}>Поиск по всем источникам</div>
  ) : (
    <div className={style.descr}>{descr}</div>
  );
  const date = isSpecial ? (
    ''
  ) : (
    <div className={style.date}>{trackingDate}</div>
  );

  return (
    <div
      className={[style.sourceItem, isActive ? style.activeSource : ''].join(
        ' '
      )}
      onClick={() => setActiveAnalyze(id)}
    >
      {image}
      <div className={style.body}>
        {titleBlock}
        {descrBlock}
        {date}
      </div>
    </div>
  );
};

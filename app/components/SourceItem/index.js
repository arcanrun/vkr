//@flow
import React from 'react';

import style from './SourceItem.css';

type PROPS = {
  isSpecial?: boolean,
  isActive?: boolean
};

export const SourceItem = ({ isSpecial, isActive }: PROPS) => {
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
  const title = isSpecial ? (
    <div className={style.title}>
      {' '}
      <div>Все источники </div>
      {delBtn}
    </div>
  ) : (
    <div className={style.title}>
      <div>Title </div>
      {delBtn}
    </div>
  );
  const descr = isSpecial ? (
    <div className={style.descr}>Поиск по всем источникам</div>
  ) : (
    <div className={style.descr}>descr</div>
  );
  const date = isSpecial ? '' : <div className={style.date}>2019.03.12</div>;

  return (
    <div
      className={[style.sourceItem, isActive ? style.sourceActive : ''].join(
        ' '
      )}
    >
      {image}
      <div className={style.body}>
        {title}
        {descr}
        {date}
      </div>
    </div>
  );
};

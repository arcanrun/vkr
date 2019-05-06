/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';

import style from './SourceItem.css';

type PROPS = {
  getSources: Function,
  onClickRemove: Function,
  setActiveAnalyze: Function,
  isSpecial: ?boolean,
  isActive: ?boolean,
  title: string,
  descr: string,
  trackingDate: string,
  id: string
};

type STATE = {};

export class SourceItem extends React.Component<PROPS, STATE> {
  handleActiveAnalyze = (e: any) => {
    const { id, setActiveAnalyze } = this.props;
    const { role } = e.currentTarget.dataset;
    if (role === 'activeAnalyze') {
      setActiveAnalyze(id);
    }
  };

  handleRemove = (e: any) => {
    const { id, onClickRemove, getSources } = this.props;
    const { role } = e.currentTarget.dataset;
    if (role === 'removeSource') {
      onClickRemove(id);
      getSources();
    }
  };

  render() {
    const {
      isActive,
      isSpecial,
      title,
      descr,
      trackingDate,
      setActiveAnalyze,
      id,
      onClickRemove
    } = this.props;
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
      <div
        data-role="removeSource"
        className={style.crossBtn}
        onClick={this.handleRemove}
      >
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
        data-role="activeAnalyze"
        className={[style.sourceItem, isActive ? style.activeSource : ''].join(
          ' '
        )}
        onClick={this.handleActiveAnalyze}
      >
        {image}
        <div className={style.body}>
          {titleBlock}
          {descrBlock}
          {date}
        </div>
      </div>
    );
  }
}

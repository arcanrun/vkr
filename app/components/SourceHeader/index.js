/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';

import { ipcRenderer } from 'electron';
import style from './SourceHeader.css';
import { PulseButton } from '../PulseButton';

type PROPS = {
  startParsing: Function,
  getSources: Function
};
type STATE = {
  isVisibleUrlManager: boolean,
  urlInput: ?string
};

export class SourceHeader extends React.Component<PROPS, STATE> {
  state = {
    isVisibleUrlManager: false,
    urlInput: undefined
  };

  componentDidMount() {}

  toggleUrlManager = () => {
    const { isVisibleUrlManager } = this.state;
    this.setState({ isVisibleUrlManager: !isVisibleUrlManager });
  };

  addToDb = () => {
    const { urlInput } = this.state;
    if (urlInput) {
      ipcRenderer.send('add_to_bd', urlInput);
      this.setState({ urlInput: undefined });
      this.toggleUrlManager();
    } else {
      console.error('some error in url input <SourceHeader>');
    }
  };

  handleUrlInput = (e: any) => {
    const { value } = e.target;
    this.setState({ urlInput: value });
  };


  render() {
    const { isVisibleUrlManager } = this.state;
    const { startParsing } = this.props;
    const mainPanel = (
      <>
        <div className={[style.headerItem].join(' ')}>
          <i className="fas fa-search" />
        </div>
        <div className={style.headerItem} onClick={this.toggleUrlManager}>
          <i className="fas fa-plus-circle" />
        </div>
        <div className={style.headerItem} onClick={startParsing}>
          <i className="fas fa-play-circle" />

          {/*
          <PulseButton />
          */}
        </div>
        <div className={style.headerItem}>
          <i className="fas fa-sort-amount-down" />
        </div>
      </>
    );
    const urlManager = (
      <>
        <input
          className={style.urlInput}
          type="text"
          placeholder="URL..."
          onChange={this.handleUrlInput}
        />
        <div className={style.urlBtns}>
          <i className="fas fa-check-circle" onClick={this.addToDb} />
          <i className="fas fa-times-circle" onClick={this.toggleUrlManager} />
        </div>
      </>
    );
    if (isVisibleUrlManager) {
      return <div className={style.addUrl}>{urlManager}</div>;
    }
    return <div className={style.header}>{mainPanel}</div>;
  }
}

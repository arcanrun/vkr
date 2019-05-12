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
  getSources: Function,
  startParsing: Function,
  stopParsing: Function,
  parserFrequncy: number,
  intervalId: number
};
type STATE = {
  isVisibleUrlManager: boolean,
  urlInput: ?string,
  isParsing: boolean
};

export class SourceHeader extends React.Component<PROPS, STATE> {
  state = {
    isVisibleUrlManager: false,
    urlInput: undefined,
    isParsing: false
  };

  componentDidMount() {
    const { intervalId } = this.props;
    const { isParsing } = this.state;
    if (intervalId) {
      this.setState({ isParsing: !isParsing });
    }
  }

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

  // componentDidUpdate(prevProps: Object, prevState: Object) {
  //   const { isParsing, interValId } = this.state;
  //   if (prevState.isParsing !== isParsing) {
  //     !isParsing ? clearInterval(interValId) : '';
  //   }
  // }

  handleParsing = () => {
    const {
      intervalId,
      startParsing,
      stopParsing,
      parserFrequncy
    } = this.props;
    const { isParsing } = this.state;
    const convertedParserFrequncy = parserFrequncy * 1000;
    if (intervalId) {
      console.log(parserFrequncy, intervalId);
      stopParsing(intervalId);
      this.setState({ isParsing: !isParsing });
    } else {
      startParsing(convertedParserFrequncy);
      this.setState({ isParsing: !isParsing });
    }
  };

  render() {
    const { isVisibleUrlManager, isParsing } = this.state;
    const mainPanel = (
      <>
        <div className={[style.headerItem].join(' ')}>
          <i className="fas fa-search" />
        </div>
        <div className={style.headerItem} onClick={this.toggleUrlManager}>
          <i className="fas fa-plus-circle" />
        </div>
        <div className={style.headerItem} onClick={this.handleParsing}>
          {isParsing ? <PulseButton /> : <i className="fas fa-play-circle" />}
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

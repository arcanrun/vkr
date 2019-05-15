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
  stopParsing: Function,
  searchSource: Function,
  toggleSearch: Function,
  sortByDate: Function,
  sortByName: Function,
  parserFrequncy: number,
  intervalId: number,
  isSortByName: boolean,
  isSortByDate: boolean,
  settingsNeuralNet: Object,
  isShowDemo: boolean
};
type STATE = {
  isVisibleUrlManager: boolean,
  isVisibleSearch: boolean,
  isVisibleFilter: boolean,
  urlInput: ?string,
  isParsing: boolean
};

export class SourceHeader extends React.Component<PROPS, STATE> {
  state = {
    isVisibleUrlManager: false,
    isVisibleSearch: false,
    isVisibleFilter: false,
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

  handleSearch = (e: any) => {
    const { value } = e.currentTarget;
    this.props.searchSource(value);
  };

  toggleManager = (e: any) => {
    const {
      isVisibleUrlManager,
      isVisibleSearch,
      isVisibleFilter
    } = this.state;
    const role = e.currentTarget.dataset.role;
    console.log(role);
    switch (role) {
      case 'url_manager':
        this.setState({ isVisibleUrlManager: !isVisibleUrlManager });
        break;

      case 'search_manager':
        this.props.toggleSearch();
        this.setState({ isVisibleSearch: !isVisibleSearch });
        break;

      case 'filter_manager':
        // this.props.toggleSearch();
        this.setState({ isVisibleFilter: !isVisibleFilter });
        break;

      default:
        console.log('UNKNOWN MANAGER');
        break;
    }
  };

  addToDb = (e: any) => {
    const { urlInput } = this.state;
    const { isShowDemo } = this.props;
    if (urlInput) {
      ipcRenderer.send('add_to_bd', { url: urlInput, showDemo: isShowDemo });
      this.setState({ urlInput: undefined });
      this.toggleManager(e);
    } else {
      console.log('some error in url input <SourceHeader>');
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
      parserFrequncy,
      settingsNeuralNet,
      isShowDemo
    } = this.props;
    const { isParsing } = this.state;
    const convertedParserFrequncy = parserFrequncy * 1000;
    if (intervalId) {
      console.log(parserFrequncy, intervalId);
      stopParsing(intervalId);
      this.setState({ isParsing: !isParsing });
    } else {
      startParsing(convertedParserFrequncy, settingsNeuralNet, isShowDemo);
      this.setState({ isParsing: !isParsing });
    }
  };

  render() {
    const {
      isVisibleUrlManager,
      isVisibleSearch,
      isParsing,
      isVisibleFilter
    } = this.state;
    const { sortByDate, sortByName, isSortByName, isSortByDate } = this.props;
    const mainPanel = (
      <>
        <div
          data-role="search_manager"
          className={[style.headerItem].join(' ')}
          onClick={this.toggleManager}
        >
          <i className="fas fa-search" />
        </div>
        <div
          data-role="url_manager"
          className={style.headerItem}
          onClick={this.toggleManager}
        >
          <i className="fas fa-plus-circle" />
        </div>
        <div className={style.headerItem} onClick={this.handleParsing}>
          {isParsing ? <PulseButton /> : <i className="fas fa-play-circle" />}
        </div>
        <div
          data-role="filter_manager"
          className={style.headerItem}
          onClick={this.toggleManager}
        >
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
          <i
            data-role="url_manager"
            className="fas fa-check-circle"
            onClick={this.addToDb}
          />
          <i
            data-role="url_manager"
            className="fas fa-times-circle"
            onClick={this.toggleManager}
          />
        </div>
      </>
    );
    const searchManager = (
      <>
        <input
          className={style.urlInput}
          type="text"
          placeholder="Поиск..."
          onChange={this.handleSearch}
        />
        <div>
          <i
            data-role="search_manager"
            className={['fas', 'fa-times-circle', style.closeBtn].join(' ')}
            onClick={this.toggleManager}
          />
        </div>
      </>
    );

    const sortManager = (
      <>
        <div className={style.sortBtn} onClick={sortByName}>
          <i
            className="fas fa-sort-alpha-down"
            style={isSortByName ? { color: '#4adbbd' } : {}}
          />
        </div>
        <div className={style.sortBtn} onClick={sortByDate}>
          <i
            className="fas fa-sort-numeric-down"
            style={isSortByDate ? { color: '#4adbbd' } : {}}
          />
        </div>
        <div>
          <i
            data-role="filter_manager"
            className={['fas', 'fa-times-circle', style.closeBtn].join(' ')}
            onClick={this.toggleManager}
          />
        </div>
      </>
    );
    if (isVisibleUrlManager) {
      return <div className={style.addUrl}>{urlManager}</div>;
    }
    if (isVisibleSearch) {
      return <div className={style.addUrl}>{searchManager}</div>;
    }

    if (isVisibleFilter) {
      return <div className={style.addSort}>{sortManager}</div>;
    }

    return <div className={style.header}>{mainPanel}</div>;
  }
}

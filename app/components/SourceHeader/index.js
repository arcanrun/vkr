//@flow
import React from 'react';

import style from './SourceHeader.css';
import { ipcRenderer } from 'electron';

type PROPS = {
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

  componentDidMount() {
    ipcRenderer.on('res_db', (e, msg) => {
      console.log(msg);
    });
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

  render() {
    const { isVisibleUrlManager } = this.state;
    const { getSources } = this.props;
    const mainPanel = (
      <>
        <div className={[style.headerItem].join(' ')}>
          <i className="fas fa-search" />
        </div>
        <div className={style.headerItem} onClick={this.toggleUrlManager}>
          <i className="fas fa-plus-circle" />
        </div>
        <div className={style.headerItem} onClick={getSources}>
          <i className="fas fa-play-circle" />
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
    } else {
      return <div className={style.header}>{mainPanel}</div>;
    }
  }
}

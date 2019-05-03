//@flow
import React from 'react';

import style from './SourceHeader.css';

type PROPS = {
  getSources: Function
};
type STATE = {
  isVisibleUrlManager: boolean
};

export class SourceHeader extends React.Component<PROPS, STATE> {
  state = {
    isVisibleUrlManager: false
  };
  toggleUrlManager = () => {
    const { isVisibleUrlManager } = this.state;
    this.setState({ isVisibleUrlManager: !isVisibleUrlManager });
  };

  render() {
    const { isVisibleUrlManager } = this.state;
    const { getSources, testChange } = this.props;
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
        <input className={style.urlInput} type="text" placeholder="URL..." />
        <div className={style.urlBtns}>
          <i className="fas fa-check-circle" onClick={() => testChange(10)} />
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

//@flow
import React from 'react';
import { remote } from 'electron';

import style from './SystemBar.css';

export class SystemBar extends React.Component<{}, {}> {
  handleMinimaize = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  };
  handleMaximaize = () => {
    if (remote.BrowserWindow.getFocusedWindow().isMaximized()) {
      remote.BrowserWindow.getFocusedWindow().unmaximize();
    } else {
      remote.BrowserWindow.getFocusedWindow().maximize();
    }
  };
  handleClose = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  };
  render() {
    return (
      <div className={style.container}>
        <div className={style.btns}>
          <div
            className={[style.btn, style.redBtn].join(' ')}
            onClick={this.handleClose}
          />
          <div
            className={[style.btn, style.yellowBtn].join(' ')}
            onClick={this.handleMinimaize}
          />
          <div
            className={[style.btn, style.greenBtn].join(' ')}
            onClick={this.handleMaximaize}
          />
        </div>
      </div>
    );
  }
}

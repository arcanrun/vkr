//@flow
import React from 'react';

import { SourceHeader } from '../components';

type STATE = {
  isVisibleUrlManager: boolean
};

export class SourceHeaderContainer extends React.Component<{}, STATE> {
  state = {
    isVisibleUrlManager: false
  };
  toggleUrlManager = () => {
    const { isVisibleUrlManager } = this.state;
    this.setState({ isVisibleUrlManager: !isVisibleUrlManager });
  };

  render() {
    const { isVisibleUrlManager } = this.state;
    return (
      <SourceHeader
        isVisibleUrlManager={isVisibleUrlManager}
        toggleUrlManager={this.toggleUrlManager}
      />
    );
  }
}

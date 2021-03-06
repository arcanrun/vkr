// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import styles from './Home.css';
import { Analyze } from '../index';
import { SourcesContainer } from '../../containers/SourcesContainer';
import { AnalyzeContainer } from '../../containers/AnalyzeContainer';

type Props = {};

export class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SourcesContainer />
        <AnalyzeContainer />
      </div>
    );
  }
}

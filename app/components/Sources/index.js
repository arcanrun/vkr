/* eslint-disable import/prefer-default-export */
// @flow

import React from 'react';
import style from './Sources.css';
import { SourceItem } from '../SourceItem';
import { SourceHeader } from '../SourceHeader';

type PROPS = {
  startParsing: Function,
  removeSource: Function,
  activeAnalyze: Function,
  startParsing: Function,
  stopParsing: Function,
  getSources: Function,
  searchSource: Function,
  toggleSearch: Function,
  sortByDate: Function,
  sortByName: Function,
  sources: Array<any>,
  activeAnalyzeID: string,
  parserFrequncy: number,
  intervalId: number,
  searchIsActive: Boolean,
  search: Array<any>,
  isSortByDate: boolean,
  isSortByName: boolean,
  settingsNeuralNet: Object
};

export class Sources extends React.Component<PROPS, {}> {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getSources();
  }

  // componentDidUpdate(prevProps: Object, prveState: Object) {
  //   const { sources } = this.props;
  //   if (prevProps.sources !== sources) {
  //     this.props.getSources();
  //   }
  // }

  render() {
    const {
      sources,
      activeAnalyze,
      activeAnalyzeID,
      getSources,
      removeSource,
      parserFrequncy,
      startParsing,
      stopParsing,
      intervalId,
      searchSource,
      search,
      searchIsActive,
      toggleSearch,
      sortByDate,
      sortByName,
      isSortByDate,
      isSortByName,
      settingsNeuralNet
    } = this.props;
    let sourcesToDisplay = searchIsActive ? search : sources;
    return (
      <div className={style.sources}>
        <SourceHeader
          getSources={getSources}
          parserFrequncy={parserFrequncy}
          startParsing={startParsing}
          stopParsing={stopParsing}
          intervalId={intervalId}
          searchSource={searchSource}
          toggleSearch={toggleSearch}
          sortByDate={sortByDate}
          sortByName={sortByName}
          isSortByDate={isSortByDate}
          isSortByName={isSortByName}
          settingsNeuralNet={settingsNeuralNet}
        />
        <div className={style.sourceList}>
          <SourceItem
            id="0"
            isActive={activeAnalyzeID === '0'}
            isSpecial
            title=""
            descr=""
            trackingDate=""
            setActiveAnalyze={activeAnalyze}
            onClickRemove=""
            getSources=""
          />

          {sourcesToDisplay.map(el =>
            el.id === '0' ? (
              ''
            ) : (
              <SourceItem
                key={el.id}
                id={el.id}
                icon={el.icon}
                isActive={activeAnalyzeID === el.id}
                isSpecial={false}
                title={el.title}
                descr={el.descr}
                trackingDate={el.trackingDate}
                setActiveAnalyze={activeAnalyze}
                onClickRemove={removeSource}
                getSources={getSources}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

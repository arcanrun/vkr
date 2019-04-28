//@flow
import React from 'react';

import style from './Analyze.css';
import { Card, Map, Calendar } from '../index';

export const Analyze = () => {
  return (
    <div className={style.analyze}>
      <div className={style.header}>
        <div className={style.title}>Analyze Header</div>
        <div className={style.moreBtn}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.control}>
          <Card icon={'map'} title={'Карта активности'} margin={'0 10px 0 0'}>
            <Map />
          </Card>
          <Card icon={'calendar'} title={'Диапазон поиска'}>
            <Calendar />
          </Card>
        </div>
        <div className={style.charts}>
          <Card
            margin={'0 10px 0 0'}
            flex={'1 0 auto'}
            icon={'marine'}
            title={'Переброски ВМС'}
          >
            1
          </Card>
          <Card
            margin={'0 10px 0 10px'}
            flex={'1 0 auto'}
            icon={'jet'}
            title={'Переброски ВВС'}
          >
            2
          </Card>
          <Card
            margin={'0 0 0 10px'}
            flex={'1 0 auto'}
            icon={'man'}
            title={'Переброси СВ'}
          >
            3
          </Card>
        </div>
      </div>
    </div>
  );
};

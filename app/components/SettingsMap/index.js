//@flow
import React from 'react';

import style from './SettingsMap.css';
type PROPS = {
  changeSettingsMap: Function,
  settingsMap: Object
};
type STATE = {
  middle: number,
  high: number
};
export class SettingsMap extends React.Component<PROPS, STATE> {
  constructor(props: Object) {
    super(props);
    this.middle = React.createRef();
    this.high = React.createRef();
    const { middle, high } = this.props.settingsMap;
    this.state = { middle, high };
  }

  handleInput = (e: any) => {
    const { value } = e.currentTarget;
    const { role } = e.currentTarget.dataset;
    if (isNaN(value)) {
      e.currentTarget.value = '';
    }
    switch (role) {
      case 'middle':
        this.setState({ middle: +value });
        break;
      case 'high':
        this.setState({ high: +value });
        break;

      default:
        break;
    }
  };
  handleChange = () => {
    const { middle, high } = this.state;

    this.props.changeSettingsMap(middle, high);
    this.middle.current.value = '';
    this.high.current.value = '';
  };
  toDefault = () => {
    this.props.changeSettingsMap(10, 30);
    this.middle.current.value = '';
    this.high.current.value = '';
  };
  render() {
    const { middle, high } = this.props.settingsMap;
    return (
      <div className={style.container}>
        <div className={style.title}>
          <div className={style.icon}>
            <i className="fas fa-map-marked-alt" />
          </div>
          <div className={style.titleText}>Карта</div>
        </div>
        <div className={style.body}>
          <div className={style.control}>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Средний порог</div>
              <input
                ref={this.middle}
                data-role="middle"
                type="text"
                placeholder={`${middle}`}
                onChange={this.handleInput}
              />
            </div>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Высокий порог</div>
              <input
                ref={this.high}
                data-role="high"
                type="text"
                placeholder={`${high}`}
                onChange={this.handleInput}
              />
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={this.handleChange} className={style.btn}>
              Изменить
            </button>
            <button onClick={this.toDefault} className={style.btnRed}>
              По умолчанию
            </button>
          </div>
        </div>
      </div>
    );
  }
}

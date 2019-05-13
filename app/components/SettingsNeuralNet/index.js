//@flow
import React from 'react';

import style from './SettingsNeuralNet.css';
type PROPS = {
  changeSettingsNeuralnet: Function,
  settingsNeuralNet: Object
};
type STATE = {
  sensWho: ?number,
  sensWhere: ?number,
  sensAirforce: ?number,
  sensMarine: ?number,
  sensInfantry: ?number
};
export class SettingsNeuralnet extends React.Component<PROPS, STATE> {
  constructor(props: Object) {
    super(props);
    const {
      sensWho,
      sensWhere,
      sensAirforce,
      sensMarine,
      sensInfantry
    } = this.props.settingsNeuralNet;
    this.state = {
      sensWho,
      sensWhere,
      sensAirforce,
      sensMarine,
      sensInfantry
    };
  }

  handleInput = (e: any) => {
    const { value } = e.currentTarget;
    const { role } = e.currentTarget.dataset;
    if (isNaN(value) || value > 1) {
      e.currentTarget.value = '';
    }
    switch (role) {
      case 'who':
        this.setState({ sensWho: +value });
        break;
      case 'where':
        this.setState({ sensWhere: +value });
        break;
      case 'airforce':
        this.setState({ sensAirforce: +value });
        break;
      case 'marine':
        this.setState({ sensMarine: +value });
        break;
      case 'infantry':
        this.setState({ sensInfantry: +value });
        break;

      default:
        break;
    }
  };
  handleChange = () => {
    const {
      sensWho,
      sensWhere,
      sensAirforce,
      sensMarine,
      sensInfantry
    } = this.state;

    this.props.changeSettingsNeuralnet(
      sensWho,
      sensWhere,
      sensAirforce,
      sensMarine,
      sensInfantry
    );
  };
  toDefault = () => {
    this.props.changeSettingsNeuralnet(0.3, 0.3, 0.3, 0.3, 0.3);
  };
  render() {
    const {
      sensWho,
      sensWhere,
      sensAirforce,
      sensMarine,
      sensInfantry
    } = this.props.settingsNeuralNet;
    return (
      <div className={style.container}>
        <div className={style.title}>
          <div className={style.icon}>
            <i className="fas fa-brain" />
          </div>
          <div className={style.titleText}>Чувствительность нейросети</div>
        </div>
        <div className={style.body}>
          <div className={style.control}>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Кто</div>
              <input
                data-role="who"
                type="text"
                placeholder={`${sensWho}`}
                onChange={this.handleInput}
              />
            </div>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Куда</div>
              <input
                data-role="where"
                type="text"
                placeholder={`${sensWhere}`}
                onChange={this.handleInput}
              />
            </div>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Авиация</div>
              <input
                data-role="airforce"
                type="text"
                placeholder={`${sensAirforce}`}
                onChange={this.handleInput}
              />
            </div>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Морские силы</div>
              <input
                data-role="marine"
                type="text"
                placeholder={`${sensMarine}`}
                onChange={this.handleInput}
              />
            </div>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Пехота</div>
              <input
                data-role="infantry"
                type="text"
                placeholder={`${sensInfantry}`}
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

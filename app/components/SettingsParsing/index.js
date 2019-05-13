//@flow
import React from 'react';

import style from './SettingsParsing.css';

type PROPS = {
  setFrequncy: Function,
  parserFrequncy: number
};

export class SettingsParsing extends React.Component<PROPS, {}> {
  constructor(props: Object) {
    super(props);
    this.inputValue = React.createRef();
  }

  handleInput = (e: any) => {
    const { value } = this.inputValue.current;
    if (!+value) {
      this.inputValue.current.value = '';
    }
  };
  handleChange = () => {
    const { value } = this.inputValue.current;
    if (value) {
      this.props.setFrequncy(value);
      this.inputValue.current.value = '';
    }
  };
  render() {
    const { parserFrequncy } = this.props;
    return (
      <div className={style.container}>
        <div className={style.title}>
          <div className={style.icon}>
            <i className="fab fa-internet-explorer" />
          </div>
          <div className={style.titleText}>Парсер</div>
        </div>
        <div className={style.body}>
          <div className={style.control}>
            <div className={style.controlItem}>
              <div className={style.itemTitle}>Частота опроса</div>
              <input
                ref={this.inputValue}
                type="text"
                placeholder={`${parserFrequncy} cек.`}
                onChange={this.handleInput}
              />
            </div>
          </div>
          <div className={style.footer}>
            <button className={style.btn} onClick={this.handleChange}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

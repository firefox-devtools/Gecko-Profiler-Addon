import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Range extends PureComponent {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    const { scale, type, update } = this.props;
    const frac = e.target.value / 100;
    update({
      [type]: scale.fromFractionToSingleDigitValue(frac),
    });
  }

  render() {
    const { label, scale, type, value, display } = this.props;
    return (
      <div>
        <h1 className="settings-setting-label">{label}</h1>
        <span className="range-with-value">
          <input
            type="range"
            className={classnames('range-input', `${type}-range`)}
            min="0"
            max="100"
            value={scale.fromValueToFraction(value) * 100}
            onChange={this.handleInput}
          />
          <span className={classnames('range-value', `${type}-value`)}>
            {display(value)}
          </span>
        </span>
      </div>
    );
  }
}

Range.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  scale: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
};

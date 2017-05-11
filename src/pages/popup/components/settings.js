import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as actions from '../actions';

const intervalScale = makeExponentialScale(0.01, 100);
const buffersizeScale = makeExponentialScale(10000, 100000000);

const PROFILE_ENTRY_SIZE = 9; // sizeof(double) + sizeof(char), http://searchfox.org/mozilla-central/rev/e8835f52eff29772a57dca7bcc86a9a312a23729/tools/profiler/core/ProfileEntry.h#73

function makeExponentialScale(rangeStart, rangeEnd) {
  const startExp = Math.log(rangeStart);
  const endExp = Math.log(rangeEnd);
  const fromFractionToValue = frac =>
    Math.exp((1 - frac) * startExp + frac * endExp);
  const fromValueToFraction = value =>
    (Math.log(value) - startExp) / (endExp - startExp);
  const fromFractionToSingleDigitValue = frac => {
    return +fromFractionToValue(frac).toPrecision(1);
  };
  return {
    fromFractionToValue,
    fromValueToFraction,
    fromFractionToSingleDigitValue,
  };
}

const prettyBytes = (function(module) {
  'use strict';
  const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  module.exports = num => {
    if (!Number.isFinite(num)) {
      throw new TypeError(
        `Expected a finite number, got ${typeof num}: ${num}`
      );
    }

    const neg = num < 0;

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' B';
    }

    const exponent = Math.min(
      Math.floor(Math.log(num) / Math.log(1000)),
      UNITS.length - 1
    );
    const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
    const unit = UNITS[exponent];

    return (neg ? '-' : '') + numStr + ' ' + unit;
  };

  return module;
})({}).exports;

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);

    this.handleIntervalInput = this.handleIntervalInput.bind(this);
    this.handleBufferInput = this.handleBufferInput.bind(this);
    this.handleStackWalkChange = this.handleStackWalkChange.bind(this);
    this.handleJSChange = this.handleJSChange.bind(this);
    this.handleTasktracerChange = this.handleTasktracerChange.bind(this);
    this.handleThreadsChange = this.handleThreadsChange.bind(this);
  }

  handleSettingsClick(e) {
    e.preventDefault();
    const { toggle } = this.props;
    toggle();
  }

  handleRestartClick(e) {
    e.preventDefault();
    const { restart } = this.props;
    restart();
  }

  handleIntervalInput(e) {
    e.preventDefault();
    const { update } = this.props;
    const frac = e.target.value / 100;
    update({ interval: intervalScale.fromFractionToSingleDigitValue(frac) });
  }

  handleBufferInput(e) {
    e.preventDefault();
    const { update } = this.props;
    const frac = e.target.value / 100;
    update({
      buffersize: buffersizeScale.fromFractionToSingleDigitValue(frac),
    });
  }

  handleStackWalkChange(e) {
    e.preventDefault();
    const { update } = this.props;
    update({ features: { stackwalk: e.target.checked } });
  }

  handleJSChange(e) {
    e.preventDefault();
    const { update } = this.props;
    update({ features: { js: e.target.checked } });
  }

  handleTasktracerChange(e) {
    e.preventDefault();
    const { update } = this.props;
    update({ features: { tasktracer: e.target.checked } });
  }

  handleThreadsChange(e) {
    e.preventDefault();
    const { update } = this.props;
    update({ threads: e.target.value });
  }

  render() {
    const { settings } = this.props;
    const settingsClass = classnames({
      settings: true,
      open: settings.isOpen,
    });
    return (
      <div>
        <dl className="info-density">
          <dt>Overhead:</dt>
          <dd>
            <div className="discrete-level">
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch normal active" />
              <span className="discrete-level-notch warning active" />
              <span className="discrete-level-notch warning active" />
              <span className="discrete-level-notch warning active" />
              <span className="discrete-level-notch warning active" />
              <span className="discrete-level-notch warning inactive" />
              <span className="discrete-level-notch warning inactive" />
              <span className="discrete-level-notch warning inactive" />
              <span className="discrete-level-notch critical inactive" />
              <span className="discrete-level-notch critical inactive" />
              <span className="discrete-level-notch critical inactive" />
              <span className="discrete-level-notch critical inactive" />
              <span className="discrete-level-notch critical inactive" />
              <span className="discrete-level-notch critical inactive" />
            </div>
          </dd>
          <dt>Information:</dt>
          <dd>
            <div className="relevancy-level">
              <div className="relevancy-level-fill" />
            </div>
          </dd>
        </dl>

        <section className={settingsClass}>
          <h1 id="settings-label" onClick={this.handleSettingsClick}>
            Settings
          </h1>
          <section className="settings-content">
            <h1 className="settings-setting-label">Interval:</h1>
            <span className="range-with-value">
              <input
                type="range"
                className="range-input interval-range"
                min="0"
                max="100"
                onInput={this.handleIntervalInput}
              />
              <span className="range-value interval-value">
                {settings.interval} ms
              </span>
            </span>
            <h1 className="settings-setting-label">Buffer size:</h1>
            <span className="range-with-value">
              <input
                type="range"
                className="range-input buffersize-range"
                min="0"
                max="100"
                dafaultValue={
                  buffersizeScale.fromValueToFraction(settings.buffersize) * 100
                }
                onInput={this.handleBufferInput}
              />
              <span className="range-value buffersize-value">
                {prettyBytes(settings.buffersize * PROFILE_ENTRY_SIZE)} MB
              </span>
            </span>
            <h1 className="settings-setting-label">Threads:</h1>
            <input
              type="text"
              className="settings-textbox threads-textbox"
              title="Comma-separated list of case-insensitive substring filters for the thread name"
              value="GeckoMain,Compositor"
              onChange={this.handleThreadsChange}
            />
            <h1 className="settings-setting-label">Features:</h1>
            <ul className="features-list">
              <li>
                <label>
                  <input
                    type="checkbox"
                    className="stackwalk-checkbox"
                    checked
                    onChange={this.handleStackWalkChange}
                  />
                  Stack walk
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    className="js-checkbox"
                    checked
                    onChange={this.handleJSChange}
                  />
                  JavaScript
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    className="tasktracer-checkbox"
                    onChange={this.handleTasktracerChange}
                  />
                  Task tracer
                </label>
              </li>
            </ul>
          </section>
          <p className="settings-apply-button-wrapper">
            <input
              type="button"
              className="settings-apply-button"
              value="Apply (Restart Profiler)"
              onClick={this.handleRestartClick}
            />
          </p>
        </section>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  restart: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(state => state, actions)(Settings);

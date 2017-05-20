import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as actions from '../../actions';
import pretty from '../../utils/bytes';
import { makeExponentialScale } from '../../utils/scale';

import Range from './range';

const PROFILE_ENTRY_SIZE = 9; // sizeof(double) + sizeof(char), http://searchfox.org/mozilla-central/rev/e8835f52eff29772a57dca7bcc86a9a312a23729/tools/profiler/core/ProfileEntry.h#73

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);

    this.handleFeatureChange = this.handleFeatureChange.bind(this);

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

  handleFeatureChange(e) {
    const name = e.target.name;
    const { update } = this.props;
    update({ features: { [name]: e.target.checked } });
  }

  handleThreadsChange(e) {
    e.preventDefault();
    const { update } = this.props;
    // no spaces are allowed
    update({ threads: e.target.value.split(',').map(v => v.trim()) });
  }

  render() {
    const { settings } = this.props;
    return (
      <div>
        <section
          className={classnames({
            settings: true,
            open: settings.isOpen,
          })}
        >
          <h1 id="settings-label" onClick={this.handleSettingsClick}>
            Settings
          </h1>
          <section className="settings-content">
            <Range
              label="Interval:"
              value={settings.interval}
              type="interval"
              scale={makeExponentialScale(0.01, 100)}
              display={val => `${val} ms`}
              update={this.props.update}
            />
            <Range
              label="Buffer size:"
              value={settings.buffersize}
              type="buffersize"
              scale={makeExponentialScale(10000, 100000000)}
              display={val => pretty(val * PROFILE_ENTRY_SIZE)}
              update={this.props.update}
            />
            <div>
              <h1 className="settings-setting-label">Threads:</h1>
              <input
                type="text"
                className="settings-textbox threads-textbox"
                title="Comma-separated list of case-insensitive substring filters for the thread name"
                value={settings.threads.join(',')}
                onChange={this.handleThreadsChange}
              />
            </div>
            <div>
              <h1 className="settings-setting-label">Features:</h1>
              <ul className="features-list">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      name="stackwalk"
                      className="stackwalk-checkbox"
                      checked={settings.features.stackwalk}
                      onChange={this.handleFeatureChange}
                    />
                    Stack walk
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      name="js"
                      className="js-checkbox"
                      checked={settings.features.js}
                      onChange={this.handleFeatureChange}
                    />
                    JavaScript
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      name="tasktracer"
                      className="tasktracer-checkbox"
                      checked={settings.features.tasktracer}
                      onChange={this.handleFeatureChange}
                    />
                    Task tracer
                  </label>
                </li>
              </ul>
            </div>
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

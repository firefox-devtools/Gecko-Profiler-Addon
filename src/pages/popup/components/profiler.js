import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profiler extends PureComponent {
  constructor(props) {
    super(props);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleCaptureClick = this.handleCaptureClick.bind(this);
  }

  handleStopClick(e) {
    e.preventDefault();
    const { stop } = this.props;
    stop();
  }

  handleStartClick(e) {
    e.preventDefault();
    const { start } = this.props;
    start();
  }

  handleCaptureClick(e) {
    e.preventDefault();
    const { capture } = this.props;
    capture();
    window.close();
  }

  render() {
    return (
      <div>
        <p className="status-display status-display-running">
          The profiler is recording.
          <input
            type="button"
            className="status-display-button button-cancel"
            value="Discard &amp; Stop"
            onClick={this.handleStopClick}
          />
        </p>
        <p className="status-display status-display-stopped">
          The profiler is stopped.
          <input
            type="button"
            className="status-display-button button-start"
            value="Start"
            onClick={this.handleStartClick}
          />
        </p>

        <button id="button-capture" onClick={this.handleCaptureClick}>
          <strong id="capture-label">
            Capture Profile
            {' '}
            <span className="keyboard-hint">
              <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>2</kbd>
            </span>
          </strong>
          <p id="help-capture">
            Capture the current contents of the profile buffer and open the profile in a new tab.
          </p>
        </button>
      </div>
    );
  }
}

Profiler.propTypes = {
  profiler: PropTypes.object.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  capture: PropTypes.func.isRequired,
};

export default connect(state => state, actions)(Profiler);

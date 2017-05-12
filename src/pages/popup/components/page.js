import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as actions from '../actions';

import Profiler from './profiler';
import Overhead from './overhead';
import Information from './information';
import Settings from './settings';

class Page extends PureComponent {
  render() {
    const {
      profiler,
      settings,
      start,
      stop,
      capture,
      restart,
      update,
    } = this.props;

    const pageClass = classnames({
      'status-running': profiler.isRunning,
      'status-stopped': !profiler.isRunning,
    });

    return (
      <div id="page" className={pageClass}>
        <Profiler
          profiler={profiler}
          start={start}
          stop={stop}
          capture={capture}
        />
        <dl className="info-density">
          <dt>Overhead:</dt>
          <Overhead settings={settings} />
          <dt>Information:</dt>
          <Information settings={settings} />
        </dl>
        <Settings update={update} settings={settings} restart={restart} />
      </div>
    );
  }
}

Page.propTypes = {
  settings: PropTypes.object.isRequired,
  profiler: PropTypes.object.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  capture: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(state => state, actions)(Page);

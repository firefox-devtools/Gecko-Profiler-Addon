import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { scaleRangeWithClamping, clamp } from '../utils/scale';

function calculateInformation(state) {
  const informationFromSampling = scaleRangeWithClamping(
    Math.log(state.interval),
    Math.log(0.1),
    Math.log(100),
    0.4,
    0
  );
  const informationFromBuffersize = scaleRangeWithClamping(
    Math.log(state.buffersize),
    Math.log(1000),
    Math.log(10000000),
    0,
    0.3
  );
  const informationFromStackwalk = state.features.stackwalk ? 0.1 : 0;
  const informationFromJavaScrpt = state.features.js ? 0.1 : 0;
  const informationFromTaskTracer = state.features.tasktracer ? 0.1 : 0;
  return clamp(
    informationFromSampling +
      informationFromBuffersize +
      informationFromStackwalk +
      informationFromJavaScrpt +
      informationFromTaskTracer,
    0,
    1
  );
}

export default class Information extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const information = calculateInformation(this.props.settings);
    return (
      <dd>
        <div className="relevancy-level">
          <div
            className="relevancy-level-fill"
            style={{ width: `${information * 100}%` }}
          />
        </div>
      </dd>
    );
  }
}

Information.propTypes = {
  settings: PropTypes.object.isRequired,
};

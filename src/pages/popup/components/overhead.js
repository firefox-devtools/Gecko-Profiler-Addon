import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { scaleRangeWithClamping, clamp } from '../utils/scale';

function calculateOverhead(state) {
  const overheadFromSampling =
    scaleRangeWithClamping(
      Math.log(state.interval),
      Math.log(0.05),
      Math.log(1),
      1,
      0
    ) +
    scaleRangeWithClamping(
      Math.log(state.interval),
      Math.log(1),
      Math.log(100),
      0.1,
      0
    );
  const overheadFromBuffersize = scaleRangeWithClamping(
    Math.log(state.buffersize),
    Math.log(10),
    Math.log(1000000),
    0,
    0.1
  );
  const overheadFromStackwalk = state.features.stackwalk ? 0.05 : 0;
  const overheadFromJavaScrpt = state.features.js ? 0.05 : 0;
  const overheadFromTaskTracer = state.features.tasktracer ? 0.05 : 0;
  return clamp(
    overheadFromSampling +
      overheadFromBuffersize +
      overheadFromStackwalk +
      overheadFromJavaScrpt +
      overheadFromTaskTracer,
    0,
    1
  );
}

const NOTCHES = Array(22).fill('discrete-level-notch');

export default class Overhead extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const overhead = calculateOverhead(this.props.settings);
    return (
      <dd>
        <div className="discrete-level">
          {NOTCHES.map((dln, i) => {
            const isActive = i <= Math.round(overhead * (NOTCHES.length - 1));
            return (
              <span
                key={i}
                className={classnames({
                  [dln]: true,
                  normal: i < 11,
                  warning: i >= 11 && i < 17,
                  critical: i >= 17,
                  active: isActive,
                  inactive: !isActive,
                })}
              />
            );
          })}
        </div>
      </dd>
    );
  }
}

Overhead.propTypes = {
  settings: PropTypes.object.isRequired,
};

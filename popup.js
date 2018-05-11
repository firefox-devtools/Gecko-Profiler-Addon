const intervalScale = makeExponentialScale(0.01, 100);
const buffersizeScale = makeExponentialScale(10000, 100000000);

const PROFILE_ENTRY_SIZE = 9; // sizeof(double) + sizeof(char), http://searchfox.org/mozilla-central/rev/e8835f52eff29772a57dca7bcc86a9a312a23729/tools/profiler/core/ProfileEntry.h#73

function renderState(state) {
  const { isRunning, settingsOpen, interval, buffersize } = state;
  document.documentElement.classList.toggle('status-running', isRunning);
  document.documentElement.classList.toggle('status-stopped', !isRunning);
  document.querySelector('.settings').classList.toggle('open', settingsOpen);
  document.querySelector('.interval-value').textContent = `${interval} ms`;
  document.querySelector('.buffersize-value').textContent = prettyBytes(
    buffersize * PROFILE_ENTRY_SIZE
  );
  const overhead = calculateOverhead(state);
  const overheadDiscreteContainer = document.querySelector('.discrete-level');
  for (let i = 0; i < overheadDiscreteContainer.children.length; i++) {
    const discreteLevelNotch = overheadDiscreteContainer.children[i];
    const isActive =
      i <=
      Math.round(overhead * (overheadDiscreteContainer.children.length - 1));
    discreteLevelNotch.classList.toggle('active', isActive);
    discreteLevelNotch.classList.toggle('inactive', !isActive);
  }
  const information = calculateInformation(state);
  document.querySelector(
    '.relevancy-level-fill'
  ).style.width = `${information * 100}%`;

  renderControls(state);
}

function renderControls(state) {
  document.querySelector('.interval-range').value =
    intervalScale.fromValueToFraction(state.interval) * 100;
  document.querySelector('.buffersize-range').value =
    buffersizeScale.fromValueToFraction(state.buffersize) * 100;
  document.querySelector('.stackwalk-checkbox').value = state.stackwalk;
  document.querySelector('.responsiveness-checkbox').value =
    state.responsiveness;
  document.querySelector('.trackopts-checkbox').value = state.trackopts;
  document.querySelector('.js-checkbox').value = state.js;
  document.querySelector('.tasktracer-checkbox').value = state.tasktracer;
  document.querySelector('.threads-textbox').value = state.threads;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function lerp(frac, rangeStart, rangeEnd) {
  return (1 - frac) * rangeStart + frac * rangeEnd;
}

function scaleRangeWithClamping(
  val,
  sourceRangeStart,
  sourceRangeEnd,
  destRangeStart,
  destRangeEnd
) {
  const frac = clamp(
    (val - sourceRangeStart) / (sourceRangeEnd - sourceRangeStart),
    0,
    1
  );
  return lerp(frac, destRangeStart, destRangeEnd);
}

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
  const overheadFromStackwalk = state.stackwalk ? 0.05 : 0;
  const overheadFromResponsiveness = state.responsiveness ? 0.05 : 0;
  const overheadFromJavaScrpt = state.js ? 0.05 : 0;
  const overheadFromTaskTracer = state.tasktracer ? 0.05 : 0;
  return clamp(
    overheadFromSampling +
      overheadFromBuffersize +
      overheadFromStackwalk +
      overheadFromResponsiveness +
      overheadFromJavaScrpt +
      overheadFromTaskTracer,
    0,
    1
  );
}

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
  const informationFromStackwalk = state.stackwalk ? 0.1 : 0;
  const informationFromResponsiveness = state.responsiveness ? 0.1 : 0;
  const informationFromJavaScrpt = state.js ? 0.1 : 0;
  const informationFromTaskTracer = state.tasktracer ? 0.1 : 0;
  return clamp(
    informationFromSampling +
      informationFromBuffersize +
      informationFromStackwalk +
      informationFromResponsiveness +
      informationFromJavaScrpt +
      informationFromTaskTracer,
    0,
    1
  );
}

function getBackground() {
  return browser.runtime.getBackgroundPage();
}

document.querySelector('.button-start').addEventListener('click', async () => {
  const background = await getBackground();
  await background.startProfiler();
  background.adjustState({ isRunning: true });
  renderState(background.profilerState);
});

document.querySelector('.button-cancel').addEventListener('click', async () => {
  const background = await getBackground();
  await background.stopProfiler();
  background.adjustState({ isRunning: false });
  renderState(background.profilerState);
});

document
  .querySelector('#button-capture')
  .addEventListener('click', async () => {
    if (document.documentElement.classList.contains('status-running')) {
      const background = await getBackground();
      await background.captureProfile();
      window.close();
    }
  });

document
  .querySelector('#settings-label')
  .addEventListener('click', async () => {
    const background = await getBackground();
    background.adjustState({
      settingsOpen: !background.profilerState.settingsOpen,
    });
    renderState(background.profilerState);
  });

document.querySelector('.interval-range').addEventListener('input', async e => {
  const background = await getBackground();
  const frac = e.target.value / 100;
  background.adjustState({
    interval: intervalScale.fromFractionToSingleDigitValue(frac),
  });
  renderState(background.profilerState);
});

document
  .querySelector('.buffersize-range')
  .addEventListener('input', async e => {
    const background = await getBackground();
    const frac = e.target.value / 100;
    background.adjustState({
      buffersize: buffersizeScale.fromFractionToSingleDigitValue(frac),
    });
    renderState(background.profilerState);
  });

/**
 * This helper adds listeners to the features checkboxes that will adjust the profiler
 * state when changed.
 */
function setupFeatureCheckbox(featureName) {
  document
    .querySelector(`.${featureName}-checkbox`)
    .addEventListener('change', async e => {
      const background = await getBackground();
      const features = Object.assign({}, background.profilerState.features);
      features[featureName] = e.target.checked;
      background.adjustState({ features });
      renderState(background.profilerState);
    });
}

setupFeatureCheckbox('responsiveness');
setupFeatureCheckbox('stackwalk');
setupFeatureCheckbox('js');
setupFeatureCheckbox('tasktracer');
setupFeatureCheckbox('trackopts');

document
  .querySelector('.threads-textbox')
  .addEventListener('change', async e => {
    const background = await getBackground();
    background.adjustState({ threads: e.target.value });
    renderState(background.profilerState);
  });

document
  .querySelector('.settings-apply-button')
  .addEventListener('click', async () => {
    (await getBackground()).restartProfiler();
  });

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

getBackground().then(background => renderState(background.profilerState));

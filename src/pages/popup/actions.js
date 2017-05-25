export function start() {
  return {
    type: 'START_PROFILER',
  };
}

export function stop() {
  return {
    type: 'STOP_PROFILER',
  };
}

export function restart() {
  return {
    type: 'RESTART_PROFILER',
  };
}

export function capture() {
  return {
    type: 'CAPTURE_PROFILE',
  };
}

export function toggle() {
  return {
    type: 'TOGGLE_SETTINGS',
  };
}

export function update(data = {}) {
  return {
    type: 'UPDATE_SETTINGS',
    ...data,
  };
}

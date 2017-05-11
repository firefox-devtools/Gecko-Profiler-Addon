export function update(settings = {}) {
  return {
    type: 'UPDATE_SETTINGS',
    data: settings,
  };
}

export function toggle() {
  return {
    type: 'TOGGLE_SETTINGS',
  };
}

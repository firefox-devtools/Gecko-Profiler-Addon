export function update({ data = {} }) {
  return {
    type: 'UPDATE_SETTINGS',
    data,
  };
}

export function toggle() {
  return {
    type: 'TOGGLE_SETTINGS',
  };
}

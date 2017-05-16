export function unique(debugName, breakpadId) {
  return [debugName, breakpadId].join(':');
  // return `${debugName}:${breakpadId}`;
}

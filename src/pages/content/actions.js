export function getSymbols(debugName, breakpadId) {
  return {
    type: 'GET_SYMBOLS',
    debugName,
    breakpadId,
  };
}

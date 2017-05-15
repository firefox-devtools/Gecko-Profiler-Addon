export function symbols(debugName, breakpadId) {
  return {
    type: 'GET_SYMBOL_TABLE',
    data: { debugName, breakpadId },
  };
}

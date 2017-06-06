import { unique } from '../src/utils/symbol';

describe('utils.symbol', () => {
  it('should return the unique combination of a debugName and breakpadId', () => {
    // this is a simple unit test to check that nobody breaks this function
    const debugName = 'DEBUG_NAME';
    const breakpadId = 'BREAKPAD_ID';
    const symbol = `${debugName}:${breakpadId}`;
    expect(unique(debugName, breakpadId)).toBe(symbol);
  });
});

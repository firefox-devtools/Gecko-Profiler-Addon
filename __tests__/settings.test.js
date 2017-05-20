import reducer from '../src/pages/background/redux/reducers/settings';

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isOpen: false,
      reportUrl: 'https://perf-html.io/from-addon/',
      buffersize: 1000000,
      interval: 1,
      threads: ['GeckoMain', 'Compositor'],
      features: {
        js: true,
        stackwalk: true,
        tasktracer: false,
        leaf: true,
        threads: true,
      },
    });
  });

  it('should include threads feature when there are threads', () => {
    const threads = ['this', 'that', 'the', 'other', ''];
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads } })
    ).toEqual({
      threads,
      features: {
        threads: true,
      },
    });
  });

  it('should exclude threads feature when no threads', () => {
    // at first only one thread, then none
    const threads = ['one'];
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads } })
    ).toEqual({
      threads,
      features: {
        threads: true,
      },
    });
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads: [] } })
    ).toEqual({
      threads: [],
      features: {
        threads: false,
      },
    });
  });
});

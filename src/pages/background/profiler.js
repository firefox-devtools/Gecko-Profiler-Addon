import store from './redux/store';
import { running } from './redux/actions';

export default function init() {
  browser.geckoProfiler.onRunning.addListener(isRunning =>
    store.dispatch(running(isRunning))
  );

  // TODO: not sure this should be here
  browser.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(async message => {
      if (message.type === 'ProfilerGetSymbolTable') {
        const { debugName, breakpadId } = message;
        try {
          const [
            addresses,
            index,
            buffer,
          ] = await browser.geckoProfiler.getSymbols(debugName, breakpadId);

          port.postMessage({
            type: 'ProfilerGetSymbolTableReply',
            status: 'success',
            result: [addresses, index, buffer],
            debugName,
            breakpadId,
          });
        } catch (e) {
          port.postMessage({
            type: 'ProfilerGetSymbolTableReply',
            status: 'error',
            error: `${e}`,
            debugName,
            breakpadId,
          });
        }
      }
    });
  });
}

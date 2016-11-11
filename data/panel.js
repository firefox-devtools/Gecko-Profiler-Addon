self.port.on('ProfilerStateUpdated', state => {
  const { isRunning } = state;
  document.documentElement.classList.toggle('status-running', isRunning);
  document.documentElement.classList.toggle('status-stopped', !isRunning);
});

document.querySelector('.button-start').addEventListener('click', () => {
  self.port.emit('ProfilerControlEvent', { type: 'StartProfiler' });
});

document.querySelector('.button-cancel').addEventListener('click', () => {
  self.port.emit('ProfilerControlEvent', { type: 'StopProfiler' });
});

document.querySelector('#button-capture').addEventListener('click', () => {
  if (document.documentElement.classList.contains('status-running')) {
    self.port.emit('ProfilerControlEvent', { type: 'CaptureProfile' });
  }
});

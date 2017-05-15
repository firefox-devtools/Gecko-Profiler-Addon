const injectScript = document.createElement('script');
const injectFunction = () => {
  // Let perf.html know that the addon is installed.
  window.isGeckoProfilerAddonInstalled = true;

  if (window.geckoProfilerAddonInstalled) {
    // In case the add-on was enabled while perf.html was open, notify it that the add-on
    // was installed.
    window.geckoProfilerAddonInstalled();
  }
};
injectScript.innerHTML = `(${injectFunction.toString()})();`;
document.documentElement.appendChild(injectScript);

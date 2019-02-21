/**
 * This file injects a check for if the Gecko Profiler Addon is installed into
 * profiler.firefox.com. It does not work with the dynamically set URL, e.g. for
 * localhost. This method is simpler and doesn't really impede local development.
 */
const injectScript = document.createElement('script');
const injectFunction = () => {
  // Let Firefox Profiler know that the addon is installed.
  window.isGeckoProfilerAddonInstalled = true;

  if (window.geckoProfilerAddonInstalled) {
    // In case the add-on was enabled while Firefox Profiler was open, notify it that the add-on
    // was installed.
    window.geckoProfilerAddonInstalled();
  }
};
injectScript.innerHTML = `(${injectFunction.toString()})();`;
document.documentElement.appendChild(injectScript);

const DEFAULT_OPTIONS = {
  profileViewerURL: 'https://perf-html.io',
};
let currentOptions;

async function saveOptions(e) {
  e.preventDefault();

  const errorsNode = document.getElementById('errors');
  errorsNode.innerHTML = '';

  const optionsObj = {};
  for (let key of Object.keys(DEFAULT_OPTIONS)) {
    optionsObj[key] = document.getElementById(key).value;
    switch (key) {
      case 'profileViewerURL':
        try {
          if (optionsObj[key] !== currentOptions[key]) {
            const granted = await browser.permissions.request({
              origins: [getPermissionFromProfileViewerURL(optionsObj[key])],
            });
            await browser.permissions.remove({
              origins: [getPermissionFromProfileViewerURL(currentOptions[key])],
            });
            if (!granted) {
              throw new Error('Permission for provided URL not granted.');
            }

            currentOptions[key] = optionsObj[key];
          }
        } catch (e) {
          optionsObj[key] = currentOptions[key];
          const errorDiv = document.createElement('div');
          errorDiv.textContent = 'Failed to set permission: ' + key;
          errorsNode.appendChild(errorDiv);
        }
        break;
    }
  }

  browser.storage.local.set(optionsObj);
}

async function restoreOptions() {
  currentOptions = await browser.storage.local.get(DEFAULT_OPTIONS);

  for (let [key, value] of Object.entries(currentOptions)) {
    document.getElementById(key).value = value;
  }
}

function getPermissionFromProfileViewerURL(url) {
  return url.replace(/:[0-9]+/, '') + '/*';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);

// NOTE: this file's only purpose is to be packaged into gecko_profiler_shim.xpi,
// which will download the new WebExtension and then uninstall itself. This is
// a bit of a hack in order to allow us to have the id "geckoprofiler@mozilla.org"
// and still allow us to update from the old SDK-based extension.

const { utils: Cu } = Components;

Cu.import("resource://gre/modules/AddonManager.jsm");

const NEW_ADDON_XPI_URL = "https://raw.githubusercontent.com/devtools-html/Gecko-Profiler-Addon/master/gecko_profiler-0.1.xpi";
const ADDON_ID = "jid0-edalmuivkozlouyij0lpdx548bc@jetpack";

const installListener = {
  onInstallEnded() {
    AddonManager.getAddonByID(ADDON_ID, addon => {
      addon.uninstall();
    });
  }
}

function startup() {
  AddonManager.getInstallForURL(NEW_ADDON_XPI_URL, (install) => {
    install.addListener(installListener);
    install.install();
  }, "application/x-xpinstall");
}

function shutdown() {}
function install() {}
function uninstall() {}



// See https://github.com/tsaost/autoload-temporary-addon

/*
This script automatically loads Firefox addons from a local directory.

The file must be copied to your Firefox installation directory.
For example on Mac: "/Users/andrew/Library/Application Support/Firefox/Profiles/25kwt5j4.default-release/chrome/userChrome.js"
*/


// https://mike.kaply.com/2016/09/08/debugging-firefox-autoconfig-problems/
lockPref("a.b.c.d", "1.2.3.4") // Debugging Firefox AutoConfig Problems

function reportError(ex) {
	Components.utils.reportError("userChrome.js Ex(" + ex + ")")
}

function printDebut(text) {
	Components.utils.reportError("userChrome.js " + text)
}

// Based on class Addon { static async install(path, temporary = false) ... }
// Firefox\omni_ja\chrome\remote\content\marionette\addon.js
// from https://developer.mozilla.org/en-US/Add-ons/Add-on_Manager/AddonManager#AddonInstall_errors
const ERRORS = {
	[-1]: "ERROR_NETWORK_FAILURE: A network error occured.",
	[-2]: "ERROR_INCORECT_HASH: The downloaded file did not match the expected hash.",
	[-3]: "ERROR_CORRUPT_FILE: The file appears to be corrupt.",
	[-4]: "ERROR_FILE_ACCESS: There was an error accessing the filesystem.",
	[-5]: "ERROR_SIGNEDSTATE_REQUIRED: The addon must be signed and isn't.",
}

async function installAddon(file) {
	let install = await AddonManager.getInstallForFile(file, null,
		{ source: "internal", })
	if (install.error) {
		reportError(ERRORS[install.error])
	}
	return install.install().catch(err => {
		reportError(ERRORS[install.error])
	})
}

async function installExtension(path, temporary) {
	let addon
	let file

	printDebut("installTemporaryExtension(" + path + ")")
	try {
		file = new FileUtils.File(path)
	} catch (ex) {
		reportError(`Expected absolute path: ${ex}`, ex)
	}

	if (!file.exists()) {
		reportError(`No such file or directory: ${path}`)
	}

	try {
		if (temporary) {
			addon = await AddonManager.installTemporaryAddon(file)
		} else {
			addon = installAddon(file)
		}
	} catch (ex) {
		reportError(`Could not install add-on: ${path}: ${ex.message}`, ex)
	}
}


function installUnpackedExtensions() {
	installExtension("/Users/andrew/.bin/injected-scripts", true)
}


/*
	 Single function userChrome.js loader to run the above init function 
	 (no external scripts) derived from
	 https://www.reddit.com/r/firefox/comments/kilmm2/ 
*/
try {
	let { classes: Cc, interfaces: Ci, manager: Cm } = Components
	const { Services } = Components.utils.
		import('resource://gre/modules/Services.jsm')
	function ConfigJS() {
		// Use this if your extension needs to be loaded after UI is ready:
		// Services.obs.addObserver(this, 'chrome-document-global-created', false);

		// Wait for startup to avoid "AddonManager is not initialized" error
		Services.obs.addObserver(this, 'final-ui-startup', false)
	}

	const { AddonManager } =
		Components.utils.import("resource://gre/modules/AddonManager.jsm")

	const { FileUtils } =
		Components.utils.import("resource://gre/modules/FileUtils.jsm")

	ConfigJS.prototype = {

		observe: async function observe(subject, topic, data) {
			switch (topic) {
				//			  case 'chrome-document-global-created':
				//			  subject.addEventListener('DOMContentLoaded', this, {once: true});
				//			  break;
				case 'final-ui-startup':
					installUnpackedExtensions()
					break
			}
		}
	}


	if (!Services.appinfo.inSafeMode) {
		new ConfigJS()
	}

} catch (ex) {
	reportError(ex)
};

lockPref("e.f.g.h", "5.6.7.8") // Debugging Firefox AutoConfig Problems


import browser from "webextension-polyfill";
import insaltEncryptor from "@roof-cat/insalt-encryptor/dist/main";

let localData = {};
browser.storage.local.get(['secret', 'passLength']).then((data) => {
	localData = data;
});

browser.runtime.onMessage.addListener(({password, domain}, sender, sendResponse) => {
	const {secret, passLength = 16} = localData;
	sendResponse({password: insaltEncryptor({value: password, domain, secret, passLength})});
});

browser.browserAction.setPopup({popup: ''});  //disable browserAction's popup

browser.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({url: 'dist/options.html'});
});
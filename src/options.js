const insaltApp = require('@roof-cat/insalt-front/dist/module');
const browser = require("webextension-polyfill");
require('@roof-cat/insalt-front/dist/style.css');

const STORED_KEYS = ['passLength', 'secret'];

const encryptor = (params) => {
	return browser.runtime.sendMessage(params)
};

const onChange = (key, value) => {
	if (STORED_KEYS.includes(key)) {
		browser.storage.local.set({[key]: value});
	}
};

browser.storage.local.get(['secret', 'passLength']).then((store) => {
	const container = document.createElement('div');
	document.body.appendChild(container);
	insaltApp({data: store, encryptor, onChange});
})


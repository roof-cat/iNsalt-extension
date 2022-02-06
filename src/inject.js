import browser from "webextension-polyfill";

let _target;

const onChangeInput = () => {
	_target.iNsalted = false;
	_target.removeEventListener('change', onChangeInput)
}

document.addEventListener('keyup', ({target, ctrlKey, key}) => {
	if (!ctrlKey || (key !== '\\' && key !== '/') || target.nodeName !== 'INPUT' ||
		target.type !== 'password' && target.type !== 'text' || target.iNsalted
	) return;

	_target = target;

	browser.runtime.sendMessage({
		password: target.value,
		domain: location.host.replace(/[^.]+\./, '')
	});

});

browser.runtime.onMessage.addListener(({password}) => {
	if (password) {
		_target.value = password;
		_target.iNsalted = true;
		_target.onchange = onChangeInput;
	}
});
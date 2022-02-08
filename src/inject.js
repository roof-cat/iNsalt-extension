const browser = require("webextension-polyfill");

let _target;

const onChangeInput = () => {
	if(_target.value !== _target.iNsalted){
		_target.iNsalted = '';
		_target.removeEventListener('change', onChangeInput)
	}
}

document.addEventListener('keyup', ({target, ctrlKey, key}) => {
	if (!ctrlKey || (key !== '\\' && key !== '/') || target.nodeName !== 'INPUT' ||
		target.type !== 'password' && target.type !== 'text' || target.iNsalted
	) return;

	_target = target;

	browser.runtime.sendMessage({
		password: target.value,
		domain: location.host.replace(/[^.]+\./, '')
	}).then( ({password}) => {
		if (password) {
			_target.value = password;
			_target.iNsalted = password;
			_target.onchange = onChangeInput;
		}
	});
});
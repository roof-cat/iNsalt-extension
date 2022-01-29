let _target;

document.addEventListener('keyup', ({target, ctrlKey, key}) => {
	if (!ctrlKey || (key !== '\\' && key !== '/') || target.nodeName !== 'INPUT' ||
		target.type !== 'password' && target.type !== 'text' || target.iNsalted
	) return;

	_target = target;

	chrome.runtime.sendMessage({
		value: target.value,
		domain: location.host.replace(/[^.]+\./, '')
	});
});

chrome.runtime.onMessage.addListener(({password}) => {
	if (password) {
		_target.value = password;
	}
});
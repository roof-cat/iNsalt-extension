(async ()=>{
	await fetch('/node_modules/@roof-cat/insalt-theme/options.html')
		.then(response => response.text())
		.then(data => {
			document.querySelector('#content').innerHTML = data;
		});

	chrome.storage.local.get(['secret', 'passLength'], ({secret = '', passLength = ''}) => {
		const secretInput = document.getElementById('secret');
		const passLengthInput = document.getElementById('passLength');
		const domainInput = document.getElementById('domain');
		const passwordInput = document.getElementById('password');
		const form = document.getElementById('form');
		const showPassword = document.getElementById('show-password');

		secretInput.value = secret;
		passLengthInput.value = passLength;

		setLocal(secretInput);
		setLocal(passLengthInput);
		form.onsubmit = (evt) => {
			evt.preventDefault();
			chrome.runtime.sendMessage({
				value: passwordInput.value,
				domain: domainInput.value,
			});
		};

		showPassword.onclick = () => {
			secretInput.type = secretInput.type === 'text' ? 'password' : 'text';
		};
	});

	chrome.runtime.onMessage.addListener(({password}) => {
		if (password) {
			const newPasswordInput = document.getElementById('newPassword');
			newPasswordInput.value = password;
		}
	});

	const setLocal = element => {
		element.onkeyup = () => {
			chrome.storage.local.set({[element.id]: element.value}, (data) => {
				console.log(data);
			});
		};
	};
})();

chrome.runtime.onMessage.addListener(({value, domain}, sender) => {
	chrome.storage.local.get(['secret', 'passLength'], ({secret, passLength}) => {
		const password = window.insaltEncryptor({value, domain, secret, passLength});
		if(sender.tab){
			return chrome.tabs.sendMessage(sender.tab.id, {password});
		}
		chrome.runtime.sendMessage({password});
	});
});

chrome.browserAction.setPopup({popup:''});  //disable browserAction's popup

chrome.browserAction.onClicked.addListener(()=>{
	chrome.tabs.create({url:'/src/options/options.html'});
});
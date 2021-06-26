window.onload = () => {

	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			if (request.data === 'host') sendResponse({ host: window.location.href })
			if (request.data === 'support') {
				if (document.getElementById("login-with-extension")) sendResponse({ support: true })
				else sendResponse({ support: false })
			}
			if (request.data === 'login') {
				fetch('/login-with-extension', {
					method: "post",
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						type: "send-pub-key",
						data: {
							username: request.username,
							pubKey: request.pubKey
						}
					})
				})
					.then(res => res.json())
					.then(res => sendResponse({ nonce: res.nonce }))
					.catch(console.log)
				return true;

			}
			if (request.data === 'signature') {
				fetch('/login-with-extension', {
					method: "post",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						type: 'send-signature',
						data: {
							username: request.username,
							signature: request.signature
						}
					})
				})
					.then(res => { window.location.href = "/" })
					.catch(console.log)
			}
		}
	);
}


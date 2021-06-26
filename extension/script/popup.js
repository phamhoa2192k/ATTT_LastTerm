let loginBtn = document.getElementById("login")
let dbFileElm = document.getElementById("dbfile")
let hostname = document.getElementById("host")
let content = document.getElementById("content")
let unsupport = document.getElementById("unsupport")
let nextPageBtn = document.getElementById("nextPageBtn")
let nextPage = document.getElementById("nextPage")
let host;

nextPageBtn.addEventListener('click', () => {
	nextPage.style.display = "block"
	beginPage.style.display = "none"
})

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { data: "host" }, function (response) {
		hostname.innerText = response.host;
		host = response.host
	});
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { data: "support" }, function (response) {
		if (response.support == true) {
			content.style.display = "block";
			unsupport.style.display = "none";
		}
		else {
			content.style.display = "none";
			unsupport.style.display = "block";
		}
	});
});


dbFileElm.onchange = function () {
	var f = dbFileElm.files[0];
	document.getElementById("filename").innerHTML = f.name
	var r = new FileReader();
	r.onload = function () {
		try {
			worker.postMessage({ action: 'open', buffer: r.result }, [r.result]);
			execute(`select * from keys where host = '${host}'`, res => {
				console.log(res)
				console.log(host)
				if (res.length != 0) {
					document.getElementById("haveKey").style.display = 'block'
					document.getElementById("username").innerText = res[0].values[0][1]
				}
				else document.getElementById("dontHaveKey").style.display = 'block'
			})
		}
		catch (exception) {
			worker.postMessage({ action: 'open', buffer: r.result });
		}
	}
	r.readAsArrayBuffer(f);
}

loginBtn.addEventListener('click', () => {
	execute(`select * from keys where host = '${host}'`, res => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				data: 'login',
				username: res[0].values[0][1],
				pubKey: res[0].values[0][4]
			}, function (response) {
				document.getElementById('nonce').innerText = response.nonce
				document.getElementById('signDiv').style.display = 'block'
				document.getElementById("haveKey").style.display = 'none'

				document.getElementById('signBtn').addEventListener('click', () => chrome.tabs.sendMessage(tabs[0].id, {
					data: 'signature',
					username: res[0].values[0][1],
					signature: signature(res[0].values[0][3], response.nonce)
				}))
			});
		})

	});
})

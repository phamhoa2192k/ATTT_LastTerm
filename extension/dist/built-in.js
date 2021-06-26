///----------///////////////////---CRYPTO---////////////////////----------///
function genKeyPEM() {
	let keypair = KEYUTIL.generateKeypair("EC", "secp256r1");
	let prvKeyPEM = KEYUTIL.getPEM(keypair.prvKeyObj, "PKCS8PRV")
	let pubKeyPEM = KEYUTIL.getPEM(keypair.pubKeyObj)
	return {
		prvKeyPEM: prvKeyPEM,
		pubKeyPEM: pubKeyPEM
	}
}

function signature(prvKeyPEM, message) {
	let sig = new KJUR.crypto.Signature({ "alg": "SHA1withECDSA" });
	sig.init(prvKeyPEM);
	sig.updateString(message);
	return sig.sign();
}

function verify(pubKeyPEM, message, signature) {
	let ver = new KJUR.crypto.Signature({ "alg": "SHA1withECDSA" })
	ver.init(pubKeyPEM)
	ver.updateString(message)
	return ver.verify(signature)
}
///--------////////////////////////------DB------/////////////////-------///
var worker = new Worker("./dist/worker.sql-wasm.js");
worker.onerror = error;
// Open a database
worker.postMessage({ action: 'open' });

function error(e) {
	console.log(e);
}

// Run a command in the database
function execute(commands, callback) {
	worker.onmessage = function (event) {
		let results = event.data.results;
		if (!results) {
			error({ message: event.data.error });
			return;
		}
		callback(results) 
	}
	worker.postMessage({ action: 'exec', sql: commands });
}


// Save the db to a file
function savedb() {
	worker.onmessage = function (event) {
		var arraybuff = event.data.buffer;
		var blob = new Blob([arraybuff]);
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.href = window.URL.createObjectURL(blob);
		a.download = "key.db";
		a.onclick = function () {
			setTimeout(function () {
				window.URL.revokeObjectURL(a.href);
			}, 1500);
		};
		a.click();
	};
	worker.postMessage({ action: 'export' });
}


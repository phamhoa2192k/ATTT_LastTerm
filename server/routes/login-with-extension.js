var route = require('express').Router()
var rs = require('jsrsasign')
var User = require('../model/User')

route.post('/', (req, res, next) => {
	let body = req.body
	console.log(body)
	if(body.type === 'send-pub-key'){
		let username = body.data.username
		let pubKey = body.data.pubKey
		User.findOne({where: {username: username}}).then(user => user.dataValues)
		.then(data => {
			console.log(data)
			res.json({nonce: data.nonce})
		})
		.catch(console.log)
	}
	if(body.type === 'send-signature'){
		let username = body.data.username
		let signature = body.data.signature
		User.findOne({where: {username: username}}).then(user => user.dataValues)
		.then(data => {
			let verify = new rs.KJUR.crypto.Signature({ "alg": "SHA1withECDSA" })
			verify.init(data.pubKey)
			verify.updateString(data.nonce)
			let isVerify = verify.verify(signature)
			console.log(isVerify)
			if( isVerify == true) {res.cookie('username',username, {signed: true}); res.end()}
		})
		.catch(console.log)
	}
	
})

module.exports = route
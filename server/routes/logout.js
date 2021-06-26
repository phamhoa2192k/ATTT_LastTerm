var route = require('express').Router()

route.get('/', (req, res) => {
	res.clearCookie('username');
	res.end()
})

module.exports = route
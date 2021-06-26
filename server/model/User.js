const { Sequelize } = require('sequelize')
var sequelize = require('../db')

var User =  sequelize.define('user', {
	username: {
		type: Sequelize.TEXT,
		primaryKey: true
	},
	pubKey: Sequelize.BLOB,
	nonce: Sequelize.INTEGER,
})

module.exports = User

const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', null, null, {
	dialect: 'sqlite',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	storage: './user.db',
	define: {
		timestamps: false
		
	}
})

module.exports = sequelize
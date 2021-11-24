require('dotenv').config();

// config.js
module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 3000,
		appName: process.env.APP_NAME || 'tms',
		env: process.env.NODE_ENV || 'development',
	},
	winiston: {
		logpath: '/tms-be/logs/',
	},
};
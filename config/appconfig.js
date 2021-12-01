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
	sendgrid: {
		api_key: ''
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET || 'secret123',
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
		saltRounds: process.env.SALT_ROUND || 10,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
		refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d', // 2 days
	}
};
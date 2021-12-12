const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');

const Logger = require('../utils/logger.js');
const config = require('../config/appconfig');

const logger = new Logger();
const app = express();

app.set('config', config);

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.set('db', require('../models/index.js'));

/**
 * Register API routes.
 */
app.use(require('../router'));

app.use((req, res, next) => {
	logger.log('the url you are trying to reach is not hosted on our server', 'error');
	const err = new Error('Not Found');
	err.status = 404;
	res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
	next(err);
});

module.exports = app;
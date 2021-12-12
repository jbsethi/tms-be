const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../config/appconfig');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

function getTokenFromHeader(req) {
	const authcookie = req.cookies?.authcookie;

	if (authcookie) return authcookie;

	return null;
}

function verifyToken(req, res, next) {
	try {
		if (_.isUndefined(req.cookies?.authcookie)) {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		const token = req.cookies?.authcookie;

		if (!token) {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		// verifies secret and checks exp
		jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
			if (err) {
				requestHandler.throwError(401, 'Unauthorized', 'Please provide a vaid token ,your token might be expired')();
			}
			
			req.decoded = decoded;
			next();
		});
	} catch (err) {
		requestHandler.sendError(req, res, err);
	}
}


module.exports = { getJwtToken: getTokenFromHeader, isAuthunticated: verifyToken };
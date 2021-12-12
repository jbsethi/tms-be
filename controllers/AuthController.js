const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const async = require('async');
const jwt = require('jsonwebtoken');

const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('./BaseController');
const email = require('../utils/email');
const config = require('../config/appconfig');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class AuthController extends BaseController {
	static async login(req, res) {
		try {
			const schema = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			});

			const { error } = schema.validate({
				email: req.body.email,
				password: req.body.password,
			});

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			
			const options = {
				where: { email: req.body.email },
			};

			const user = await super.getByCustomOptions(req, 'Users', options);

			console.log(user);
			
			if (!user) {
				requestHandler.throwError(400, 'bad request', 'invalid email address')();
			}

			await bcrypt
				.compare(req.body.password, user.password)
				.then(
					requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
					requestHandler.throwError(500, 'bcrypt error'),
				);

			const data = {
				last_login_date: new Date(),
			};

			req.params.id = user.id;
			
			await super.updateById(req, 'Users', data);

			const payload = _.omit(user.dataValues, ['createdAt', 'updatedAt', 'last_login_date', 'password', 'gender', 'mobile_number', 'user_image']);
			
			const token = jwt.sign({ payload }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });

			res.cookie('authcookie', token, {
				httpOnly: true
			}) 
			
			requestHandler.sendSuccess(res, 'User logged in Successfully')({ token });
		} catch (error) {
			requestHandler.sendError(req, res, error);
		}
	}

	static async signUp(req, res) {
		try {
			const data = req.body;

			const schema = Joi.object({
				email: Joi.string().email().required(),
				name: Joi.string().required(),
				password: Joi.string().required(),
			});

			const { error } = schema.validate({ email: data.email, name: data.name, password: data.password });

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const options = { where: { email: data.email } };

			const user = await super.getByCustomOptions(req, 'Users', options);

			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email account,email already existed')();
			}

			async.parallel([
				function one(callback) {
					email.sendEmail(
						callback,
						config.sendgrid.from_email,
						[data.email],
						'Learning Management System',
						`A new account has been created against your email ${data.email}`,
						`<p style="font-size: 32px;">Hello ${data.name}</p>  A new account at LMS has been created against your email : ${data.email}`,
					);
				},
			], (err, results) => {
				if (err) {
					requestHandler.throwError(500, 'internal Server Error', 'failed to send password email')();
				} else {
					logger.log(`an email has been sent at: ${new Date()} to : ${data.email} with the following results ${results}`, 'info');
				}
			});

			const hashedPass = bcrypt.hashSync(data.password, config.auth.saltRounds);

			data.password = hashedPass;

			const createdUser = await super.create(req, 'Users');

			if (!(_.isNull(createdUser))) {
				requestHandler.sendSuccess(res, 'email with your password sent successfully', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async logOut(req, res) {
		try {
			res.clearCookie("authcookie");

			requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = AuthController;
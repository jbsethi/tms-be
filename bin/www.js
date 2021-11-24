const http = require('http');

const app = require('../server/index');
const Logger = require('../utils/logger');

const logger = new Logger();

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? `Pipe ${port}`
		: `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		logger.log(`${bind} requires elevated privileges`);
		process.exit(1);
		break;
	case 'EADDRINUSE':
		logger.log(`${bind} is already in use`);
		process.exit(1);
		break;
	default:
		throw error;
	}
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? `pipe ${addr}`
		: `port ${addr.port}`;

	logger.log(`the server started listining on ${bind}`, 'info');
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const port = process.env.DEV_APP_PORT || 3000;
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
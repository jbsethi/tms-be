const http = require('http');
const app = require('../server/index');

/**
 * Create HTTP server.
 */
 const server = http.createServer(app);

 const port = process.env.PORT || 3000;

 server.listen(port);
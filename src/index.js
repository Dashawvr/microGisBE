const http = require('http');

const app = require('./app');
const {globalConfig} = require('./config');

const server = http.createServer(app);

server.listen(globalConfig.PORT, () => console.log(`(☞ﾟヮﾟ)☞ Server ready at http://localhost:${globalConfig.PORT}/ ☜(ﾟヮﾟ☜)`));


process.on('SIGTERM', () => server.close(() => process.exit(0)));

process.on('uncaughtException', () => server.close(() => process.exit(0)));

process.on('unhandledRejection', () => server.close(() => process.exit(0)));


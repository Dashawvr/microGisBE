const winston = require('winston');

const {winstonConfig} = require('../config');

module.exports = winston.createLogger({
    transports: [
        new (winston.transports.File)(winstonConfig.errorFile)
    ],
    exitOnError: false
});


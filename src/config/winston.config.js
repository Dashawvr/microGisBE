const {join} = require('path');

const {
    enums: {
        winstonFileSizeEnum
    }
} = require('../constants');

module.exports = {
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: join(process.cwd(),'src', 'logs', 'error.log'),
        handleExceptions: true,
        json: true,
        maxsize: winstonFileSizeEnum.MEGABYTES * winstonFileSizeEnum.KILOBYTES * winstonFileSizeEnum.BYTES,
        maxFiles: 100,
        colorize: true
    }
};

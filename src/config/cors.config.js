const {
    enums: {
        responseStatusCodeEnum
    }
} = require('../constants');
const {errors, ErrorHandler} = require('../errors');
const globalConfig = require('./global.config');

module.exports = {
    origin: (origin, callback) => {
        const whiteList = globalConfig.FRONTEND_URL.split(';');

        if (!whiteList.includes(origin)) {
            return callback(new ErrorHandler(
                responseStatusCodeEnum.FORBIDDEN,
                errors.CORS_NOT_ALLOWED.message,
                errors.CORS_NOT_ALLOWED.code
            ), false);
        }
        callback(null, true);
    }
};

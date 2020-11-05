const {
    enums: {
        rateLimitEnum
    }
} = require('../constants');

module.exports = {
    windowMs: rateLimitEnum.MINUTES * rateLimitEnum.SECONDS * rateLimitEnum.MILLISECONDS,
    max: 1000
};

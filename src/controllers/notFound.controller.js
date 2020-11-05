const {
    enums: {
        responseStatusCodeEnum
    }
} = require('../constants');
const {errors, ErrorHandler} = require('../errors');

class NotFoundController {
    all(req, res) {
        throw new ErrorHandler(
            responseStatusCodeEnum.NOT_FOUND,
            errors.NOT_FOUND_ROUTE.message,
            errors.NOT_FOUND_ROUTE.code
        );
    }
}

module.exports = new NotFoundController();

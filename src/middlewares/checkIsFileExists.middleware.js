const {fileService} = require('../services');
const {
    enums: {
        responseStatusCodeEnum
    }
} = require('../constants');
const {ErrorHandler, errors} = require('../errors');

module.exports = async (req, res, next) => {
    try {
        const {file_id} = req.params;

        const file = await fileService.getById(file_id);

        if (!file) {
            return next(new ErrorHandler(
                responseStatusCodeEnum.NOT_FOUND,
                errors.NOT_FOUND_ENTITY_NOT_PRESENT.message,
                errors.NOT_FOUND_ENTITY_NOT_PRESENT.code));
        }
        req.file = file;
        next();
    } catch (error) {
        next(error);
    }
};

const {fileConfig} = require('../config');
const {
    enums: {
        responseStatusCodeEnum
    }
} = require('../constants');
const {ErrorHandler, errors} = require('../errors');

module.exports = (req, res, next) => {
    try {
        if (!req.files) {
            return next();
        }

        const {files} = req.files;

        const data = Array.isArray(files) ? files : [files];
        console.log(data);

        data.forEach(({mimetype, size, name}) => {

            if (!fileConfig.DOCUMENT_MIME_TYPES.includes(mimetype)) {
                return next(new ErrorHandler(
                    responseStatusCodeEnum.BAD_REQUEST,
                    `File ${name} is not valid`,
                    errors.BAD_REQUEST_INVALID_FILE_MIME_TYPE.code));
            }

            if (size > fileConfig.MAX_DOCUMENT_SIZE) {
                return next(new ErrorHandler(
                    responseStatusCodeEnum.BAD_REQUEST,
                    errors.BAD_REQUEST_MAX_DOCUMENT_SIZE.message,
                    errors.BAD_REQUEST_MAX_DOCUMENT_SIZE.code
                ));
            }
        });

        req.file = data[0];
        next();
    } catch (error) {
        next(error);
    }
};

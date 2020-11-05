module.exports = class ErrorHandler extends Error {
    constructor(status, msg, code, data) {
        super(msg);
        this.message = msg;
        this.status = status;
        this.code = code;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
};

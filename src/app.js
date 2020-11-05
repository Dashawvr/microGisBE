const express = require('express');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const {resolve} = require('path');
const dotEnv = require('dotenv');
dotEnv.config();

const {enums: {responseStatusCodeEnum}} = require('./constants');
const {globalConfig, rateLimitConfig, corsConfig} = require('./config');
const {errors} = require('./errors');
const {logger} = require('./loggers');
const {apiRouter, notFoundRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan(globalConfig.MORGAN_FORMAT));

app.use(cors(corsConfig));
app.use(rateLimit(rateLimitConfig));

app.use(fileUpload());
app.use('/public', express.static(resolve(process.cwd(), 'static')));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);

app.use(logErrors);
app.use(customErrorHandler);

setupDB();

function logErrors(err, req, res, next) {
    logger.error({
        method: req.method,
        url: req.path,
        data: req.body,
        time: new Date(),
        massage: err.message
    });
    next(err);
}

function customErrorHandler(err, req, res, next) {
    if (err.parent) {
        err.message = err.parent.sqlMessage;
    }

    res
        .status(err.status || responseStatusCodeEnum.SERVER_ERROR)
        .json({
            message: err.message || errors.SERVER_UNKNOWN_ERROR.message,
            code: err.code || errors.SERVER_UNKNOWN_ERROR.code
        });
}

function setupDB() {
    mongoose.connect(encodeURI(globalConfig.MONGO_URL), {useNewUrlParser: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection error'));
}

module.exports = app;

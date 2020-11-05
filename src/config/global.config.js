module.exports = {
    PORT: process.env.PORT || '3000',
    HOST: process.env.HOST || 'http://localhost',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',

    MORGAN_FORMAT: process.env.MORGAN_FORMAT || 'dev',

    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN || 'http://localhost:4200',

    MONGO_URL: 'mongodb://localhost/microGis'
};

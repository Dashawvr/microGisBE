const {Router} = require('express');

const fileRouter = require('../file');

const router = Router();

router.use('/files', fileRouter);

module.exports = router;

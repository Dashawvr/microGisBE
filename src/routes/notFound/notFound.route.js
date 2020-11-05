const {Router} = require('express');

const {
    notFoundController: {
        all
    }
} = require('../../controllers');

const router = Router();

router.all('*', all);

module.exports = router;

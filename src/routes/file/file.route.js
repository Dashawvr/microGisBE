const {Router} = require('express');

const {
    fileController
} = require('../../controllers');
const {checkIsFileExists, checkIsFilesValid} = require('../../middlewares');

const router = Router();

router.post('/', checkIsFilesValid, fileController.create);
router.get('/', fileController.getAll);

router.get('/watch/:file_id', checkIsFileExists, fileController.watch);

router.use('/:file_id', checkIsFileExists);

router.get('/:file_id', fileController.getById);
router.delete('/:file_id', fileController.delete);


module.exports = router;

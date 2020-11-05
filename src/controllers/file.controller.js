const {statSync, createReadStream} = require('fs');
const {resolve} = require('path');

const {fileService} = require('../services');
const {
    enums: {
        responseStatusCodeEnum
    }
} = require('../constants');

class FileController {
    async create(req, res, next) {
        try {
            await fileService.create(req.file);

            res.status(responseStatusCodeEnum.CREATED).end();
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        await fileService.delete(req.file);

        res.status(responseStatusCodeEnum.NO_CONTENT).end();
    }

    async getAll(req, res, next) {
        const files = await fileService.getAll();

        res.json({
            data: files
        });
    }

    async getById(req, res, next) {
        const file = req.file;

        res.json({
            data: file
        });
    }

    async watch(req, res, next) {
        try {
            const {path} = req.file;
            const filePath = resolve(process.cwd(), 'static', path);

            const stats = statSync(filePath);
            const fileSize = stats.size;
            const range = req.header.range;

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[0], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;
                const file = createReadStream(filePath, {start, end});
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/webm'
                };

                res.writeHead(responseStatusCodeEnum.PARTIAL_CONTENT, head);

                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/webm'
                };
                res.writeHead(responseStatusCodeEnum.CREATED, head);
                createReadStream(filePath).pipe(res);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FileController();

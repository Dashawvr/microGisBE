const {mkdirSync, unlinkSync, readdirSync, rmdirSync} = require('fs');
const {resolve, join} = require('path');
const {v1} = require('uuid');

const {
    models: {
        FileModel
    }
} = require('../database');

class FileService {
    async create(file) {

        const path = 'files';
        const generatedName = `${v1()}.webm`;

        const fileToSave = {
            document_type: file.mimetype,
            name: `${file.name}.webm`,
            path: `${path}/${generatedName}`,
        };

        file.name = generatedName;

        const fileModel = new FileModel(fileToSave);
        const savedFile = await fileModel.save();

        if (savedFile) {
            mkdirSync(resolve(process.cwd(), 'static', path), {recursive: true});
            await file.mv(resolve(process.cwd(), 'static', path, file.name));
        }

        return savedFile;
    }

    async delete({_id, path}) {
        const deletedObj = await FileModel.findByIdAndDelete(_id);

        if (deletedObj) {
            unlinkSync(join(process.cwd(), 'static', path));
        }

        const files = readdirSync(join(process.cwd(), 'static', 'files'));

        if (!files.length) {
            rmdirSync(join(process.cwd(), 'static', 'files'), {recursive: true});
        }
        return deletedObj;
    }

    getAll() {
        return FileModel.find({});
    }

    getById(id) {
        return FileModel.findById(id);
    }
}


module.exports = new FileService();

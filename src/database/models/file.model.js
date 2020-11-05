const {Schema, model} = require('mongoose');

const {
    enums: {
        dataBaseEnum
    }
} = require('../../constants');

const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    document_type: {
        type: String,
        required: true
    },
});

module.exports = model(dataBaseEnum.FILE_COLLECTION_NAME, FileSchema);

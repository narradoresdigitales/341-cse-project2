const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');



const getAll = async (req, res) => {
    //swagger.tags=['Students']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    });
};

module.exports = {
    getAll,

};
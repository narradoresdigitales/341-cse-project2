const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');



const getAll = async (req, res) => {
    //swagger.tags=['Students']
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    });
};

const getSingle = async (req, res) => {
    //swagger.tags=['Contacts']
    const userId = (req.params.id);
    const student = await mongodb.getDatabase().db().collection('students').findOne({ _id: new ObjectId(userId) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student[0]);
    };

module.exports = {
    getAll,
    getSingle

};
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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').findOne({ _id: userId });
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }else {
        res.status(404).json({ message: `Student not found`});
    }        
};

module.exports = {
    getAll,
    getSingle

};
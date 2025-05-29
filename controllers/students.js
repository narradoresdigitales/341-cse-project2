const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');



const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const result = await mongodb.getDatabase().db().collection('students').find();  
        const students = await result.toArray();
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error while fetching students.'});
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid student id to find a student.');
    }
    try { 
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').findOne({ _id: userId });

        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: `Student not found`});
        }    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching student.'});
    }   
    
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gradeLevel: req.body.gradeLevel,
        major: req.body.major,
        gpa: req.body.gpa,
        enrollmentDate: req.body.enrollmentDate,
        isActive: req.body.isActive
        
    };

    try { 
        const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while creating student'});
    }

};

const updateStudent = async (req, res) => {
     //#swagger.tags=['Students']
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid student id to update a student.')
    }
    const userId = new ObjectId(req.params.id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gradeLevel: req.body.gradeLevel,
        major: req.body.major,
        gpa: req.body.gpa,
        enrollmentDate: req.body.enrollmentDate,
        isActive: req.body.isActive 
        
    };
    try {
        const response = await mongodb.getDatabase().db().collection('students').replaceOne( {_id: userId}, student);

        if (response.modifiedCount > 0) {
        res.status(204).send();
        } else {
        res.status(500).json(response.error || 'Some error occurred while updating the student.');
        }
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: 'Server error while updating the student.'});
        }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid student id to delete a student.')
    }
    try { 
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('students').deleteOne( {_id: userId});

        if (response.deletedCount > 0) {
        res.status(204).send();
        } else {
        res.status(404).json({ message: 'Student not found.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting the student.'});
        }
};



module.exports = {
    getAll,
    getSingle, 
    createStudent,
    updateStudent,
    deleteStudent

};
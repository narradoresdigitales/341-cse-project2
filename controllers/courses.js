const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all courses
const getAllCourses = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const result = await mongodb.getDatabase().db().collection('courses').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get a single course
const getCourse = async (req, res) => {
     //#swagger.tags=['Courses']
    try {     
        const courseId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('courses').findOne({ _id: courseId });
        if (result) { 
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Course not found' });
        } 
    } catch (err) {
        console.error(err);  
        res.status(500).json({ message: 'Server error while fetching the course.'});
    }
}; 

// Create a course
const createCourse = async (req, res) => {
     //#swagger.tags=['Courses']
    const course = {
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    credits: req.body.credits,
    isAvailable: req.body.isAvailable
    };

    try {
        const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);    
        if (response.acknowledged) {
            res.status(201).json(response);
        } else  { 
            res.status(500).json(response.error || 'Error creating course');
        }
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Server error while creating the course.'});
    }
};

// Update a course
const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courseId = new ObjectId(req.params.id);
    const course = {
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    credits: req.body.credits,
    isAvailable: req.body.isAvailable
};

    try { 
        const response = await mongodb.getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
        if (response.modifiedCount > 0) { 
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Server error while updating the course.'});
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try { 
        const courseId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else { 
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting the course.'});
    }
};






module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};

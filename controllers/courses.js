const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all courses
const getAllCourses = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('courses').find();
    result.toArray().then((courses) => {
    res.status(200).json(courses);
});
};

// Get a single course
const getCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('courses').findOne({ _id: courseId });
    if (result) res.status(200).json(result);
    else res.status(404).json({ message: 'Course not found' });
};

// Create a course
const createCourse = async (req, res) => {
    const course = {
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    credits: req.body.credits,
    isAvailable: req.body.isAvailable
    };
    const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json(response.error || 'Error creating course');
};

// Update a course
const updateCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const course = {
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    credits: req.body.credits,
    isAvailable: req.body.isAvailable
};
    const response = await mongodb.getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) res.status(204).send();
    else res.status(404).json({ message: 'Course not found' });
};

// Delete a course
const deleteCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) res.status(204).send();
    else res.status(404).json({ message: 'Course not found' });
};

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};

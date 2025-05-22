const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const createCourseValidationRules = () => [
    

    body('courseName')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),

    body('instructor')
    .isString().withMessage('Instructor must be a string')
    .notEmpty().withMessage('Instructor is required'),

    body('credits')
    .isInt({ min: 0 }).withMessage('Credits must be a positive integer'),

    body('isAvailable')
    .isBoolean().withMessage('isActive must be a boolean'),
];

const updateCourseValidationRules = () => [


    body('courseName')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),

    body('instructor')
    .isString().withMessage('Instructor must be a string')
    .notEmpty().withMessage('Instructor is required'),

    body('credits')
    .isInt({ min: 0 }).withMessage('Credits must be a positive integer'),

    body('isAvailable')
    .isBoolean().withMessage('isActive must be a boolean'),
];

const getCourseValidationRules = () => [
    param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid course ID'),
];

const deleteCourseValidationRules = () => [
    param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid course ID'),
];

module.exports = {
    createCourseValidationRules,
    updateCourseValidationRules,
    getCourseValidationRules,
    deleteCourseValidationRules,
};

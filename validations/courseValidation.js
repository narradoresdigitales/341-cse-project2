const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const createCourseValidationRules = () => [
    body('courseCode')
    .isString().withMessage('Course code must be a string')
    .notEmpty().withMessage('Course code is required'),

    body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),

    body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

    body('credits')
    .isInt({ min: 0 }).withMessage('Credits must be a positive integer'),

    body('department')
    .isString().withMessage('Department must be a string')
    .notEmpty().withMessage('Department is required'),

    body('isActive')
    .isBoolean().withMessage('isActive must be a boolean'),
];

const updateCourseValidationRules = () => [
    body('courseCode')
    .optional()
    .isString().withMessage('Course code must be a string'),

    body('title')
    .optional()
    .isString().withMessage('Title must be a string'),

    body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

    body('credits')
    .optional()
    .isInt({ min: 0 }).withMessage('Credits must be a positive integer'),

    body('department')
    .optional()
    .isString().withMessage('Department must be a string'),

    body('isActive')
    .optional()
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

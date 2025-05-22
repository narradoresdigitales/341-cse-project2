const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const createStudentValidationRules = () => [
    body('firstName')
    .isString().withMessage('First name must be a string')
    .notEmpty().withMessage('First name is required'),

    body('lastName')
    .isString().withMessage('Last name must be a string')
    .notEmpty().withMessage('Last name is required'),

    body('email')
    .isEmail().withMessage('Invalid email address'),

    body('gradeLevel')
    .isIn(['Freshman', 'Sophomore', 'Junior', 'Senior']).withMessage('Grade level must be one of Freshman, Sophomore, Junior, Senior'),

    body('major')
    .isString().withMessage('Major must be a string')
    .notEmpty().withMessage('Major is required'),

    body('gpa')
    .isFloat({ min: 0.0, max: 4.0 }).withMessage('GPA must be a number between 0.0 and 4.0'),

    body('enrollmentDate')
    .isISO8601().toDate().withMessage('Enrollment date must be a valid date'),

    body('isActive')
    .isBoolean().withMessage('isActive must be a boolean'),
];

const updateStudentValidationRules = () => [
    body('firstName')
    .optional()
    .isString().withMessage('First name must be a string'),

    body('lastName')
    .optional()
    .isString().withMessage('Last name must be a string'),

    body('email')
    .optional()
    .isEmail().withMessage('Invalid email address'),

    body('gradeLevel')
    .optional()
    .isIn(['Freshman', 'Sophomore', 'Junior', 'Senior']).withMessage('Grade level must be valid'),

    body('major')
    .optional()
    .isString().withMessage('Major must be a string'),

    body('gpa')
    .optional()
    .isFloat({ min: 0.0, max: 4.0 }).withMessage('GPA must be a number between 0.0 and 4.0'),

    body('enrollmentDate')
    .optional()
    .isISO8601().toDate().withMessage('Enrollment date must be a valid date'),

    body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

const getStudentValidationRules = () => [
    param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid student ID'),
];

const deleteStudentValidationRules = () => [
    param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid student ID'),
];

module.exports = {
    createStudentValidationRules,
    updateStudentValidationRules,
    getStudentValidationRules,
    deleteStudentValidationRules,
};

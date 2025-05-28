const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

const {
    createCourseValidationRules,
    updateCourseValidationRules,
    getCourseValidationRules,
    deleteCourseValidationRules,
} = require('../validations/courseValidation'); 

const validateRequest = require('../middleware/validateRequest');

const { isAuthenticated } =  require("../middleware/authenticate");


router.get('/', coursesController.getAllCourses);

router.get('/:id', isAuthenticated, getCourseValidationRules(),validateRequest,coursesController.getCourse);

router.post('/', isAuthenticated, createCourseValidationRules(),validateRequest,coursesController.createCourse);

router.put('/:id', isAuthenticated, updateCourseValidationRules(),validateRequest,coursesController.updateCourse);

router.delete('/:id', isAuthenticated, deleteCourseValidationRules(),validateRequest,coursesController.deleteCourse);

module.exports = router;

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


router.get('/', coursesController.getAllCourses);

router.get('/:id', getCourseValidationRules(),coursesController.getCourse);

router.post('/', createCourseValidationRules(),coursesController.createCourse);

router.put('/:id', updateCourseValidationRules(),coursesController.updateCourse);

router.delete('/:id', deleteCourseValidationRules(),coursesController.deleteCourse);

module.exports = router;

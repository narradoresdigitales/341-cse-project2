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

router.get('/:id', getCourseValidationRules(),validateRequest,coursesController.getCourse);

router.post('/', createCourseValidationRules(),validateRequest,coursesController.createCourse);

router.put('/:id', updateCourseValidationRules(),validateRequest,coursesController.updateCourse);

router.delete('/:id', deleteCourseValidationRules(),validateRequest,coursesController.deleteCourse);

module.exports = router;

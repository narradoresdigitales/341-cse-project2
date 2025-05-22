const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const {
    createStudentValidationRules,
    updateStudentValidationRules,
    getStudentValidationRules,
    deleteStudentValidationRules,
} = require('../validations/studentValidation');


const validateRequest = require('../middleware/validateRequest');

router.get('/', studentsController.getAll);

router.get('/:id', getStudentValidationRules(),validateRequest,studentsController.getSingle);

router.post('/', createStudentValidationRules(), validateRequest,studentsController.createStudent);

router.put('/:id', updateStudentValidationRules(), validateRequest,studentsController.updateStudent);

router.delete('/:id', deleteStudentValidationRules(), validateRequest,studentsController.deleteStudent);





module.exports = router;
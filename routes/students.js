const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const {
    createStudentValidationRules,
    updateStudentValidationRules,
    getStudentValidationRules,
    deleteStudentValidationRules,
} = require('../validations/studentValidation');

const { isAuthenticated } =  require("../middleware/authenticate");


const validateRequest = require('../middleware/validateRequest');

router.get('/', studentsController.getAll);

router.get('/:id', getStudentValidationRules(),validateRequest,studentsController.getSingle);

router.post('/', isAuthenticated, createStudentValidationRules(), validateRequest,studentsController.createStudent);

router.put('/:id', isAuthenticated, updateStudentValidationRules(), validateRequest,studentsController.updateStudent);

router.delete('/:id', isAuthenticated, deleteStudentValidationRules(), validateRequest,studentsController.deleteStudent);





module.exports = router;
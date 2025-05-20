const express = require('express');
const router = express.Router();

const studentControllers = require('../controllers/students');

router.get('/', studentControllers.getAll);

router.get('/:id', studentControllers.getSingle);

router.post('/', studentControllers.createStudent);

router.put('/:id', studentControllers.updateStudent);

router.delete('/:id', studentControllers.deleteStudent);





module.exports = router;
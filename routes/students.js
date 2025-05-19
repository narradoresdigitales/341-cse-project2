const express = require('express');
const router = express.Router();

const studentControllers = require('../controllers/students');

router.get('/', studentControllers.getAll);




module.exports = router;
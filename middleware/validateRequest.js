const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
    console.log('validateRequest middleware running');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = validateRequest;

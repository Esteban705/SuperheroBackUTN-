const { check } = require('express-validator');

exports.registerValidation = [
    check('email', 'Email inválido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('name', 'El nombre es requerido').not().isEmpty()
];

exports.loginValidation = [
    check('email', 'Email inválido').isEmail(),
    check('password', 'La contraseña es requerida').exists()
];

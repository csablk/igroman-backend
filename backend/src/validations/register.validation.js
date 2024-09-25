import {body} from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password')
        .isLength({min: 6, max: 50})
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Пароль должен состоять из латинских букв и цифр'),
    body('role').optional().isString()
]
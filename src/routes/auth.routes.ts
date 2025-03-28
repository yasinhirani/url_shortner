import express from 'express';
import { login, register } from '../controllers/auth.controllers';
import { loginValidation, registerValidation } from '../validations/auth.validations';

const router = express.Router();

router.route('/login').post(loginValidation(), login);
router.route('/register').post(registerValidation(), register);

export default router;
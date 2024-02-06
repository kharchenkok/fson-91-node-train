import { Router } from 'express';
import { authMiddleware } from '../middlewares/index.js';
import { authController } from '../controllers/index.js';

const router = Router();
router.post('/signup', authMiddleware.checkSignupData, authController.signup);// register
router.post('/login', authMiddleware.checkLoginData, authController.login);

export { router };

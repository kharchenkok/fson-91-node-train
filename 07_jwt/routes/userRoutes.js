import { Router } from 'express';

import { userController } from '../controllers/index.js';
import { authMiddleware, userMiddleware } from '../middlewares/index.js';
import { userRoles } from '../constants/index.js';

const router = Router();

router.use(authMiddleware.protect);
router.get('/me', userController.getMe);
router.use(authMiddleware.allowFor(userRoles.ADMIN));
router
  .route('/')
  .post(userMiddleware.checkCreateUserData, userController.createUser)
  .get(userController.getUsersList);

router.use('/:id', userMiddleware.checkUserId);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userMiddleware.checkUpdateUserData, userController.updateUser)
  .delete(userController.deleteUser);

export { router };

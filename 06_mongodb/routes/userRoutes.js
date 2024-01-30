import { Router } from 'express';
// import * as userControllers from '../controllers/userControllers.js';

import { userController } from '../controllers/index.js';
import { userMiddleware } from '../middlewares/index.js';

const router = Router();

/**
 * HTTP methods ================
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST         /users            - user creation
 * GET          /users            - get users list
 * GET          /users/<userID>   - get one user
 * PATCH(PUT)   /users/<userID>   - update one user
 * DELETE       /users/<userID>   - delete one user
 */

// router.post('/', userController.createUser);
// router.get('/', userController.getUsersList);
// router.get('/:id', userMiddleware.getUserData, userController.getUserById);
// router.patch('/:id', userMiddleware.getUserData, userController.updateUser);
// router.delete('/:id', userMiddleware.getUserData, userController.deleteUser);

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

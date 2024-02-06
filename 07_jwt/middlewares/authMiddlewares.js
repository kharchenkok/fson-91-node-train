import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';

import { jwtService, userService } from '../services/index.js';
import { loginUserDataValidator, signupUserDataValidator } from '../utils/userValidators.js';

export const checkSignupData = catchAsync(async (req, res, next) => {
  const { value, error } = signupUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data', error);
  await userService.checkUserExists({ email: value.email });
  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, error } = loginUserDataValidator(req.body);
  if (error) throw new HttpError(401, 'Not authorized', error);

  req.body = value;

  next();
};

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  const userId = jwtService.checkToken(token);
  if (!userId) throw new HttpError(401, 'Not logged in');
  const currentUser = await userService.getUserById(userId);
  if (!currentUser) throw new HttpError(401, 'Not logged in');
  req.user = currentUser;

  next();
});

// roles guard
// must be used only after 'protect' middleware
// allowFor('user', 'admin')
export const allowFor = (...roles) => (req, res, next) => {
// roles === ['user', 'admin']
  if (roles.includes(req.user.role)) return next();

  next(new HttpError(403, 'You are not allowed to perform this action..'));
};

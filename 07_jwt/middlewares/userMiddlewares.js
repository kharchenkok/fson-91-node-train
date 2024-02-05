import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';
import { createUserDataValidator, updateUserDataValidator } from '../utils/userValidators.js';
import { userService } from '../services/index.js';

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = createUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data', error);
  await userService.checkUserExists({ email: value.email });
  req.body = value;

  next();
});

export const checkUserId = catchAsync(async (req, res, next) => {
  await userService.checkUserId(req.params.id);
  next();
});

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = updateUserDataValidator(req.body);

  if (error) throw new HttpError(400, 'Invalid user data..', error);
  await userService.checkUserExists({ email: value.email, _id: { $ne: req.params.id } });

  req.body = value;

  next();
});

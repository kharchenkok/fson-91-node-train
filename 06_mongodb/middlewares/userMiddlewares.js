import { Types } from 'mongoose';
import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';
import { createUserDataValidator, updateUserDataValidator } from '../utils/userValidators.js';
import { User } from '../models/userModel.js';

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = createUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data');
  const userExists = await User.exists({ email: value.email });

  if (userExists) throw new HttpError(409, 'User with this email already exists..');

  req.body = value;

  next();
});

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, 'User not found...');

  const userExists = await User.exists({ _id: id });
  // const userExists = await User.findById(id).select('_id');

  if (!userExists) throw new HttpError(404, 'User not found..');

  next();
});

export const checkUpdateUserData = (req, res, next) => {
  const { value, error } = updateUserDataValidator(req.body);

  if (error) throw new HttpError(400, 'Invalid user data..');

  req.body = value;

  next();
};

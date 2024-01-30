import { promises as fs } from 'fs';
import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';

import { User } from '../models/userModel.js';

export const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  newUser.password = undefined;

  res.status(201).json({ msg: 'User created', user: newUser });
});

export const getUsersList = catchAsync(async (req, res) => {
  const users = await User.find();
  // const users = await User.find().select('+password'); // всі поля + password(незважаючи,що в схемі вказано select:false)
  // const users = await User.find().select('-email');
  // const users = await User.find().select('name email');//поверне тільки name і email

  res.status(200).json({ msg: 'Users list', users, time: req.time });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ msg: 'User', user });
});

export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ msg: 'User updated', user: updatedUser });
});

export const deleteUser = catchAsync(async (req, res) => {
  // const deletedUser = await User.findByIdAndDelete(req.params.id);
  //
  // res.status(200).json({ msg: 'User deleted', user: deletedUser });

  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

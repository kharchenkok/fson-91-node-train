import catchAsync from '../utils/catchAsync.js';
import * as userService from '../services/userService.js';

export const createUser = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ msg: 'User created', user: newUser });
});

export const getUsersList = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ msg: 'Users list', users, time: req.time });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({ msg: 'User', user });
});

export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({ msg: 'User updated', user: updatedUser });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.hideUser(req.params.id);
  res.sendStatus(204);
});

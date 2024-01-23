import { v4 } from 'uuid';
import { promises as fs } from 'fs';
import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';
import { createUserDataValidator } from '../utils/userValidators.js';

export const createUser = catchAsync(async (req, res) => {
  const { value, error } = createUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data');
  const { name, year } = value;
  const newUser = {
    id: v4(),
    name,
    year
  };
    // Save user to DB
  const usersDB = await fs.readFile('data.json');
  const users = JSON.parse(usersDB);
  users.push(newUser);
  await fs.writeFile('data.json', JSON.stringify(users));
  res.status(201).json({ msg: 'User created', user: newUser });
});

export const getUsersList = catchAsync(async (req, res) => {
  const usersDB = await fs.readFile('data.json');
  const users = JSON.parse(usersDB);
  res.status(200).json({ msg: 'Users list', users, time: req.time });
});

export const getUserById = (req, res) => {
  const { id, users } = req;
  const user = users.find((userItem) => userItem.id === id);
  if (!user) throw new HttpError(404, 'User not found');

  // if (!user) {
  //   return res.status(404).json({ msg: 'User not found' });
  // }
  res.status(200).json({ msg: 'User', user });
};

export const updateUser = catchAsync(async (req, res) => {
  const { id, users } = req;
  const userIndex = users.findIndex((userItem) => userItem.id === id);

  if (userIndex === -1) throw new HttpError(404, 'User not found');

  // // Заборона зміни id через тіло запиту
  // if (req.body.id && req.body.id !== id) {
  //     return res.status(400).json({ msg: 'Changing user ID is not allowed' });
  // }

  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;

  await fs.writeFile('data.json', JSON.stringify(users, null, 2));

  res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { id, users } = req;
  const userIndex = users.findIndex((userItem) => userItem.id === id);
  const userDeleted = users[userIndex];
  if (userIndex === -1) throw new HttpError(404, 'User not found');

  const updateUserList = users.filter((userItem) => userItem.id !== id);

  await fs.writeFile('data.json', JSON.stringify(updateUserList, null, 2));

  res.status(200).json({ msg: 'User deleted successfully', userDeleted });
});

import { promises as fs } from 'fs';
import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';

export const getUserData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id.length < 10) throw new HttpError(400, 'Invalid ID');
  // if (id.length < 10) return res.status(400).json({ msg: 'Invalid ID' });
  const usersDB = await fs.readFile('data.json');
  const users = JSON.parse(usersDB);
  req.users = users;
  req.id = id;
  next();
});

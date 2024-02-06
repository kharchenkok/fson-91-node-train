import { Types } from 'mongoose';
// import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import HttpError from '../utils/httpError.js';
import { userRoles } from '../constants/index.js';
import * as jwtService from './jwtService.js';

export const createUser = async (userData) => {
  // хешування паролю за допомогою bcrypt============================
  // const { password, ...restUserData } = userData;
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);
  // const passwordIsValid = await bcrypt.compare(password, hashPassword);
  // const newUser = await User.create({
  //   password: hashPassword,
  //   ...restUserData,
  // });
  // ================================================================
  const newUser = await User.create(userData); // або так:
  // const newUser = User(userData);
  // await newUser.save();
  newUser.password = undefined;

  return newUser;
};

export const getAllUsers = () => User.find();

export const getUserById = (id) => User.findById(id);
export const updateUser = async (id, userData) => {
  const user = await User.findById(id);

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

export const hideUser = (id) => User.findByIdAndDelete(id);

export const checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw new HttpError(409, 'User already exists..');
};

export const checkUserId = async (id) => {
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, 'User not found..');

  const userExists = await User.exists({ _id: id });
  // const userExists = await User.findById(id).select('_id');

  if (!userExists) throw new HttpError(404, 'User not found..');
};

export const signup = async (userData) => {
  const newUser = await User.create({
    ...userData,
    role: userRoles.USER
  });

  newUser.password = undefined;
  const token = jwtService.signToken(newUser.id);

  return { user: newUser, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new HttpError(401, 'Not authorized');
  const isPasswordValid = await user.checkPassword(password, user.password);
  if (!isPasswordValid) throw new HttpError(401, 'Not authorized');
  user.password = undefined;
  const token = jwtService.signToken(user.id);
  return { user, token };
};

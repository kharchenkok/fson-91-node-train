import { Types } from 'mongoose';
// import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import HttpError from '../utils/httpError.js';

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

// export const getAllUsers = async () => {
//   const users = await User.find();
//   // const users = await User.find().select('+password'); // всі поля + password(незважаючи,що в схемі вказано select:false)
//   // const users = await User.find().select('-email');
//   // const users = await User.find().select('name email');//поверне тільки name і email
//
//   return users;
// };

export const getAllUsers = () => User.find();

export const getUserById = (id) => User.findById(id);
export const updateUser = async (id, userData) => {
  // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

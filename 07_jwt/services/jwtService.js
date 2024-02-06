import jwt from 'jsonwebtoken';
import { serverConfig } from '../configs/index.js';
import HttpError from '../utils/httpError.js';

const signToken = (id) => jwt.sign({ id }, serverConfig.jwtSecret, { expiresIn: serverConfig.jwtExpires });

const checkToken = (token) => {
  if (!token) throw new HttpError(401, 'Not logged in..');

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw new HttpError(401, 'Not logged in..');
  }
};

export { checkToken, signToken };

import Joi from 'joi';
import { PASSWD_REGEX, userRoles } from '../constants/index.js';

const createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(userRoles)).default(userRoles.USER),
    })
    .validate(data);

const updateUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data);

export { createUserDataValidator, updateUserDataValidator };

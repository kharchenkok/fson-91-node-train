import Joi from 'joi';

const createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(10).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
    })
    .validate(data);

export { createUserDataValidator };

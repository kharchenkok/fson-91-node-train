export const joiValidator = (validator) => (data) => {
  const { error, value } = validator(data);
  if (!error) return { value };
  return {
    value,
    error: error.details.map((err) => err.message)
  };
};

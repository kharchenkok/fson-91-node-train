import { serverConfig } from '../configs/index.js';

export const globalErrorHendler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`);
  if (serverConfig.environment === 'production') {
    return res.status(err.status ?? 500).json({
      msg: !err.message || err.message === 500 ? 'Internal Server Error' : err.message
    });
  }
  res.status(err.status || 500).json({
    msg: err.message,
    data: err.data,
    stack: err.stack
  });
};

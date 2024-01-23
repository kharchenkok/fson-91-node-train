import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { userRouter } from './routes/index.js';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/development.env', });

const app = express();

// MIDDLEWARES====================================
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
// ROUTES====================================
const pathPrefix = '/api/v1';
app.use(`${pathPrefix}/users`, userRouter);

// 404 handler error====================================
app.all('*', (req, res) => {
  res.status(404).json({ msg: 'Invalid path' });
});
// global error hendler====================================
app.use((err, req, res, next) => {
  console.log(`Error: ${err.message}`);

  res.status(err.status ?? 500).json({
    msg: err.message,
  });
});

// server init====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

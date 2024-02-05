import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/index.js';
import { globalErrorHendler } from './controllers/errorController.js';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/development.env', });

const app = express();
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});

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
app.use(globalErrorHendler);

// server init====================================
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

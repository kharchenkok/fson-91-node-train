import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import './configs/dotenvConfig.js';
import { authRouter, userRouter } from './routes/index.js';
import { globalErrorHendler } from './controllers/errorController.js';
import { serverConfig } from './configs/index.js';

const app = express();
mongoose.connect(serverConfig.mongoUrl).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});

// MIDDLEWARES====================================
if (serverConfig.environment === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
// ROUTES====================================
const pathPrefix = '/api/v1';
app.use(`${pathPrefix}/users`, userRouter);
app.use(`${pathPrefix}/auth`, authRouter);

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

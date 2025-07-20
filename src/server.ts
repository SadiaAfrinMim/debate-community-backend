import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from './config';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { authRoutes } from './routes/auth.routes';
import { debateRoutes } from './routes/debate.routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:4000', // শুধু frontend এর url দিন
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());  // <= এটা route এর আগে আসতে হবে

// এখন route গুলো যুক্ত করো
app.use('/api/auth', authRoutes);
app.use('/api/debates', debateRoutes);
app.use('/api', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}/api`);
});

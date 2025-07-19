import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from './config';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

const corsOptions = {
  origin: 'http://localhost:4000', // শুধুমাত্র আপনার ফ্রন্টেন্ড অ্যাড্রেস
  optionsSuccessStatus: 200 // কিছু ব্রাউজারের জন্য প্রয়োজন
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}/api`);
});

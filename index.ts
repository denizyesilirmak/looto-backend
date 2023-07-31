import cors from 'cors';
import express from 'express';

import connectDB from './src/database';
import { routes } from './src/routes';

import { authorizationMiddleware } from './src/middlewares/auth';
import { loger } from './src/middlewares/loger';
import {
  loginEmailValidation,
  registerEmailOtpValidation,
  registerEmailValidation,
} from './src/middlewares/vadidation';

import fs from 'fs';
import https from 'https';
import { log } from './src/utils';

log('NODE_ENV', process.env.NODE_ENV, 'green');

//connect to database
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//custom middlewares
app.use(loger);
app.use(registerEmailValidation);
app.use(registerEmailOtpValidation);
app.use(loginEmailValidation);
app.use(authorizationMiddleware);

//routes
routes.initRoutes();

//static files
app.use('/images', express.static(`${__dirname}/src/static/images`));

if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('/root/securiry/ssl/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/root/securiry/ssl/cert.pem', 'utf8');
  const ca = fs.readFileSync('/root/securiry/ssl/chain.pem', 'utf8');

  const server = https.createServer(
    {
      key: privateKey,
      cert: certificate,
      ca: ca,
    },
    app
  );
  server.listen(process.env.PORT, () => {
    console.log(`✅ Server listening on port ${process.env.PORT}.`);
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server listening on port ${process.env.PORT}.`);
  });
}

export { app };

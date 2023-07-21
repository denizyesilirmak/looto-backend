import cors from 'cors';
import express from 'express';

import connectDB from './src/database';

import { authRouter } from './src/routes/auth/auth.route';
import { citiesRouter } from './src/routes/city/city.route';
import { generalRouter } from './src/routes/general/general.route';
import { profileRouter } from './src/routes/profile/profile.route';

import { authorizationMiddleware } from './src/middlewares/auth';
import { loger } from './src/middlewares/loger';
import {
  loginEmailValidation,
  registerEmailOtpValidation,
  registerEmailValidation,
} from './src/middlewares/vadidation';

import fs from 'fs';
import https from 'https';
import { adminRouter } from './src/routes/admin/admin.route';
import { gameRouter } from './src/routes/game/game.route';
import { log } from './src/utils';
import { drawRouter } from './src/routes/draw/draw.route';
import { sslRouter } from './src/routes/ssl/ssl.route';

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
app.use(`/api/${process.env.API_VERSION}/`, generalRouter);
app.use(`/api/${process.env.API_VERSION}/cities`, citiesRouter);
app.use(`/api/${process.env.API_VERSION}/auth`, authRouter);
app.use(`/api/${process.env.API_VERSION}/profile`, profileRouter);
app.use(`/api/${process.env.API_VERSION}/games`, gameRouter);
app.use(`/api/${process.env.API_VERSION}/admin`, adminRouter);
app.use(`/api/${process.env.API_VERSION}/draws`, drawRouter);
app.use('/.well-known/acme-challenge', sslRouter);

//static files
app.use('/images', express.static(`${__dirname}/src/static/images`));

if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('/root/deniz/ssl/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/root/deniz/ssl/cert.pem', 'utf8');
  const ca = fs.readFileSync('/root/deniz/ssl/chain.pem', 'utf8');

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

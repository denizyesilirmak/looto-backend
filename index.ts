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

log('NODE_ENV', process.env.NODE_ENV);

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

if (process.env.NODE_ENV === 'production') {
  const server = https.createServer(
    {
      key: fs.readFileSync('/root/deniz/ssl/key.pem'),
      cert: fs.readFileSync('/root/deniz/cert.pem'),
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

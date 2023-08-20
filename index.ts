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
import { rateLimit } from 'express-rate-limit';

import { drawScheduler } from './src/scheduler';
import { rateLimitConfig } from './src/config/rate-limit';

/**
 * @description Environment variables
 * NODE_ENV: development | production
 * this logs whether the app is running in development or production mode
 */
log('NODE_ENV', process.env.NODE_ENV, 'green');

/**
 * @description Start the database connection
 */
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(rateLimit(rateLimitConfig));

//custom middlewares
app.use(loger);
app.use(registerEmailValidation);
app.use(registerEmailOtpValidation);
app.use(loginEmailValidation);
app.use(authorizationMiddleware);

/**
 * @description Routes
 * @memberof App
 * This is where we define our routes
 */
routes.initRoutes();

//draw scheduler
drawScheduler.start();

//static files
app.use('/images', express.static(`${__dirname}/src/static/images`));

/**
 * @description Start the server
 * @memberof App
 * if the app is running in production mode, we need to use https
 * otherwise, we can use http
 * @see https://nodejs.org/api/https.html
 * load the ssl certificates and create a https server instance
 * ssl certificates are stored in shared docker volume
 */

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on port ${process.env.PORT}.`);
});

export { app };

import express from "express";
import cors from "cors";

import connectDB from "./src/database";

import { citiesRouter } from "./src/routes/city/city.route";
import { authRouter } from "./src/routes/auth/auth.route";
import { profileRouter } from "./src/routes/profile/profile.route";
import { generalRouter } from "./src/routes/general/general.route";

import { loger } from "./src/middlewares/loger";
import {
  loginEmailValidation,
  registerEmailOtpValidation,
  registerEmailValidation,
} from "./src/middlewares/vadidation";
import { authorizationMiddleware } from "./src/middlewares/auth";

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

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on port ${process.env.PORT}.`);
});

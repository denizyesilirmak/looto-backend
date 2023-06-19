import express from "express";
import cors from "cors";

import connectDB from "./src/database";

import { citiesRouter } from "./src/routes/city/city.route";
import { authRouter } from "./src/routes/auth/auth.route";

//connect to database
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(`/api/${process.env.API_VERSION}/cities`, citiesRouter);
app.use(`/api/${process.env.API_VERSION}/auth`, authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on port ${process.env.PORT}.`);
});

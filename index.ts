import express from "express";
import connectDB from "./src/database";
import cors from "cors";
import { citiesRouter } from "./src/routes/city/city.route";
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(`/api/${process.env.API_VERSION}/cities`, citiesRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on port ${process.env.PORT}.`);
});

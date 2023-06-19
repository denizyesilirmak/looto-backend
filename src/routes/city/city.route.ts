import { Request, Response, Router } from "express";
import cityModel from "../../models/city/city.model";
import citiesList from "../../static/cities.json";

const router = Router();

//populate cities if empty
cityModel.find().then((cities) => {
  if (cities.length !== citiesList.length) {
    console.log("ℹ️  Populating cities collection...");
    cityModel.insertMany(citiesList);
    console.log("✅ Populating cities collection... Done...");
  }
});

router.get("/", (req: Request, res: Response) => {
  cityModel.find().then((cities) => {
    res.json({
      records: cities.length,
      success: true,
      cities,
    });
  });
});

export { router as citiesRouter };

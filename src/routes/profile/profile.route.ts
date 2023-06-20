import { Request, Response, Router } from "express";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

router.post("/user", (req: Request, res: Response) => {
  //get token from header
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);

  //verify token
  //if token is invalid

  jsonwebtoken.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid.",
      });
    }

    console.log("decoded", decoded);
  });

  res.json({
    success: true,
    message: "User profile.",
  });
});

export { router as profileRouter };

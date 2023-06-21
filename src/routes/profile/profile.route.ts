import e, { Request, Response, Router } from "express";
import jsonWebToken from "jsonwebtoken";
import userModel from "../../models/user/user.model";

const router = Router();

router.post("/user", async (req: Request, res: Response) => {
  //get user profile

  try {
    const decoded = jsonWebToken.decode(
      req.headers.authorization?.split(" ")[1] as string
    );

    if (!decoded) {
      res.sendStatus(401);
      return;
    }

    const email = (decoded as any).email;

    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json({
      success: true,
      message: "User profile.",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
  }
});

router.put("/user", async (req: Request, res: Response) => {
  const decoded = jsonWebToken.decode(
    req.headers.authorization?.split(" ")[1] as string
  );

  if (!decoded) {
    console.log("denemeler");
    res.sendStatus(401);
    return;
  }

  console.log(decoded.email);

  const user = await userModel.findById("6491a01990f0dd3fa5470084");

  console.log(user);

  res.json({
    success: true,
    user,
  });
});

export { router as profileRouter };

import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const protectedPaths = ["/profile/user"];

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("path", req.path.replace("/api/v1", ""));
  
  if (protectedPaths.includes(req.path.replace("/api/v1", ""))) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized.",
          });
        }

        next();
      }
    );
  }

  //if path is not protected
  next();
};

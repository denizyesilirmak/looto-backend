import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const protectedPaths = ["/profile/user"];

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

import { Request, Response, NextFunction } from "express";

const loger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

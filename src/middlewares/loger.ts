import { Request, Response, NextFunction } from "express";
import logModel from "../models/log/log.model";

const loger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );

  logModel.create({
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    method: req.method,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
  });

  next();
};

export { loger };

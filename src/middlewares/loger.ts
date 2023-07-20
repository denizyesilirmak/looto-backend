import { Request, Response, NextFunction } from 'express';
import logModel from '../models/log/log.model';
import { log } from '../utils';

const loger = (req: Request, res: Response, next: NextFunction) => {
  log('REQUEST',`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`, 'purple');

  logModel.create({
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    method: req.method,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  next();
};

export { loger };

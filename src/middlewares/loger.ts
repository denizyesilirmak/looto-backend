import { Request, Response, NextFunction } from 'express';
import logModel from '../models/log/log.model';
import { log } from '../utils';
import TelegramService from '../services/telegram';

const loger = (req: Request, res: Response, next: NextFunction) => {
  log(
    'REQUEST',
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${
      req.ip
    } ${req.get('user-agent')}`,
    'green'
  );

  logModel.create({
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    method: req.method,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  const msg = `→${req.method}
  ${req.protocol}://${req.get('host')}${req.originalUrl}
  ${req.ip}
  ${req.get('user-agent')}
  `;

  TelegramService.sendMessage(msg);

  next();
};

export { loger };

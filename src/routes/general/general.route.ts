import { Request, Response, Router } from 'express';
import { version } from '../../../package.json';
import { RESPONSE_ERRORS } from '../../constants';

const router = Router();

//convert seconds to readable format
const formatDuration = ({ seconds }: { seconds: number }) => {
  const date = new Date(seconds);
  const days = date.getUTCDate() - 1;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  return `${days}d ${hours}h ${minutes}m ${second}s`;
};

router.get('/', (req: Request, res: Response) => {
  //send server status

  const expirationTokenDate = process.env.GMAIL_EXPIRE_TOKEN;

  if (!expirationTokenDate) {
    res.status(500).json(RESPONSE_ERRORS.INTERNAL_SERVER_ERROR);
    return;
  }

  const timestamp = parseInt(expirationTokenDate);
  const date = new Date(timestamp);

  res.json({
    success: true,
    message: 'Server is running.',
    documentation: 'https://documenter.getpostman.com/view/5525431/2s946e9tGu',
    data: {
      status: 'online',
      uptime: formatDuration({
        seconds: process.uptime() * 2000,
      }),
      os: process.platform,
      nodeVersion: process.version,
      apiVersion: version,
      cpuArch: process.arch,
      memoryUsagePercentage:
        process.memoryUsage().heapUsed / process.memoryUsage().heapTotal,
    },
    env: process.env.NODE_ENV,
    gmail_expire_date:
      date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR'),
  });
});

export { router as generalRouter };

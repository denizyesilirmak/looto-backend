import { Request, Response, Router } from 'express';
import userModel from '../../models/user/user.model';
import logModel from '../../models/log/log.model';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 }).exec();

  res.status(200).json({
    success: true,
    count: users.length,
    users: users,
  });
});

router.get('/logs/:pageIndex', async (req: Request, res: Response) => {
    const pageIndex = parseInt(req.params.pageIndex);
    const logs = await logModel.find().sort({ createdAt: -1 }).skip(pageIndex * 10).limit(10).exec();

    res.status(200).json({
      success: true,
      count: logs.length,
      page: pageIndex,
      logs: logs,
    });
});

export { router as adminRouter };

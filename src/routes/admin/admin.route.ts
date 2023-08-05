import { Request, Response, Router } from 'express';
import userModel from '../../models/user/user.model';
import logModel from '../../models/log/log.model';

const router = Router();

/*
 * @description Get all users
 * @route GET /api/admin/users
 * @access Private
 * @memberof AdminRouter
 */
router.get('/users', async (req: Request, res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 }).exec();

  res.status(200).json({
    success: true,
    count: users.length,
    users: users,
  });
});

/*
 * @description Get all logs
 * @route GET /api/admin/logs
 * @access Private
 * @memberof AdminRouter
 * @param {number} pageIndex
 * @returns {Promise<void>}
 * @memberof AdminRouter
 * @returns void
 */
router.get('/logs/:pageIndex', async (req: Request, res: Response) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const logs = await logModel
    .find()
    .sort({ createdAt: -1 })
    .skip(pageIndex * 10)
    .limit(10)
    .exec();

  res.status(200).json({
    success: true,
    count: logs.length,
    page: pageIndex,
    logs: logs,
  });
});

export { router as adminRouter };

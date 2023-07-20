import { Request, Response, Router } from 'express';
import userModel from '../../models/user/user.model';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 }).exec();

  res.status(200).json({
    success: true,
    count: users.length,
    users: users,
  });
});

export { router as adminRouter };

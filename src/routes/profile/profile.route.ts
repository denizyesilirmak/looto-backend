import e, { Request, Response, Router } from 'express';
import jsonWebToken from 'jsonwebtoken';
import userModel from '../../models/user/user.model';
import { RESPONSE_ERRORS } from '../../constants';

const router = Router();

router.post('/user', async (req: Request, res: Response) => {
  //get user profile

  try {
    const decoded = jsonWebToken.decode(
      req.headers.authorization?.split(' ')[1] as string
    );

    if (!decoded) {
      res.status(401).json(RESPONSE_ERRORS.UNAUTHORIZED);
      return;
    }

    const email = (decoded as any).email;

    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'User profile.',
      data: user,
    });
  } catch (error) {
    console.log('error', error);
  }
});

router.patch('/user', async (req: Request, res: Response) => {
  const decoded = jsonWebToken.decode(
    req.headers.authorization?.split(' ')[1] as string
  ) as any;

  if (!decoded) {
    res.sendStatus(401);
    return;
  }

  if (!decoded.email) {
    return;
  }

  const user = await userModel.findOne({ email: decoded.email }).exec();

  console.log(user);

  user &&
    res.status(200).json({
      success: true,
      user,
    });
});

export { router as profileRouter };

import { Request, Response, Router } from 'express';
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
      res.status(404).json(RESPONSE_ERRORS.USER_NOT_FOUND);
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

  //prevent user from updating email
  if (req.body.email) {
    res.status(400).json(RESPONSE_ERRORS.EMAIL_NOT_ALLOWED);
    return;
  }

  //prevent user from updating balance
  if (req.body.balance) {
    res.status(400).json(RESPONSE_ERRORS.BALANCE_NOT_ALLOWED);
    return;
  }

  const user = await userModel.findOneAndUpdate(
    { email: decoded.email },
    req.body,
    { new: true }
  );

  user &&
    res.status(200).json({
      success: true,
      user,
    });
});

export { router as profileRouter };

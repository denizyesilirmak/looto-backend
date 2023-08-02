import { Router } from 'express';
import jsonWebToken from 'jsonwebtoken';
import { RESPONSE_ERRORS } from '../../constants';
import userModel from '../../models/user/user.model';
import { is } from 'date-fns/locale';

const router = Router();

router.post('/', async (req, res) => {
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
      email: user.email,
      userId: user._id,
      balance: user.balance,
      date: Date.now(),
    });
  } catch (error) {
    res.status(500).json(RESPONSE_ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.post('/add', async (req, res) => {
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

    const { amount } = req.body;

    if (!amount) {
      res.status(400).json(RESPONSE_ERRORS.AMOUNT_REQUIRED);
      return;
    }

    if (isNaN(amount)) {
      res.status(400).json(RESPONSE_ERRORS.AMOUNT_MUST_BE_NUMBER);
      return;
    }

    if (amount < 0) {
      res.status(400).json(RESPONSE_ERRORS.AMOUNT_MUST_BE_POSITIVE);
      return;
    }

    user.balance += amount;

    await user.save();

    res.json({
      success: true,
      email: user.email,
      userId: user._id,
      balance: user.balance,
      date: Date.now(),
    });
  } catch (error) {
    res.status(500).json(RESPONSE_ERRORS.INTERNAL_SERVER_ERROR);
  }
});

export { router as balanceRouter };

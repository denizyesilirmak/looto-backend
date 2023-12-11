import { Request, Response, Router } from 'express';
import jsonWebToken from 'jsonwebtoken';
import ticketModel from '../../models/ticket/ticket.model';
import blockModel from '../../models/block/block.model';
import gameModel from '../../models/game/game.model';
import userModel from '../../models/user/user.model';

import { RESPONSE_ERRORS } from '../../constants';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
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

  const tickets = await ticketModel.find({ user: user?._id }).exec();

  const ticketIds = tickets.map((ticket) => ticket._id);

  const blocks = await blockModel.find({ ticket: { $in: ticketIds } }).exec();

  const ticketsWithBlocks = tickets.map((ticket) => {
    return {
      ...ticket.toObject(),
      blocks,
    };
  });

  res.json({
    success: true,
    message: 'User tickets.',
    data: {
      tickets: ticketsWithBlocks,
    },
  });
});

router.post('/', async (req: Request, res: Response) => {
  try {
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

    const numbers = req.body.numbers as number[][];
    const gameId = req.body.game as string;
    const email = decoded.email;

    const game = await gameModel.findById(gameId).exec();

    if (!game) {
      res.status(400).json(RESPONSE_ERRORS.GAME_NOT_FOUND);
      return;
    }

    const requiredNumbers = game.requriedNumbers;

    //number validations

    const invalidBlocks = numbers.filter((block_numbers) => {
      return block_numbers.length !== requiredNumbers;
    });

    //numbers count must be equal to required numbers
    if (invalidBlocks.length > 0) {
      res.status(400).json(RESPONSE_ERRORS.BLOCK_NUMBERS_COUNT_NOT_MATCH);
      return;
    }

    //numbers min and max validations

    const invalidNumbers = numbers.flat().filter((number) => {
      return number < game.mininumNumber || number > game.maximumNumber;
    });

    if (invalidNumbers.length > 0) {
      res.status(400).json({
        ...RESPONSE_ERRORS.INVALID_NUMBERS,
        invalidNumbers,
      });
      return;
    }

    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      res.status(404).json(RESPONSE_ERRORS.USER_NOT_FOUND);
      return;
    }

    //check if user has enough balance

    console.log('user.balance', user.balance);
    console.log('game.price', game.columnPrice);

    if (user.balance < game.columnPrice) {
      res.status(400).json(RESPONSE_ERRORS.INSUFFICIENT_BALANCE);
      return;
    }

    //update user balance

    await userModel.findByIdAndUpdate(
      user._id,
      {
        balance: user.balance - game.columnPrice,
      },
      { new: true }
    );

    const ticket = await ticketModel.create({
      user: user._id,
      game: gameId,
      ticketCode: Math.random().toString(36).substr(2, 3),
    });

    const blocks = numbers.map((block_numbers) => {
      return {
        ticket: ticket._id,
        numbers: block_numbers,
      };
    });

    await blockModel.insertMany(blocks);

    res.json({
      success: true,
      message: 'Ticket created.',
      game: game._id,
      gameName: game.name,
      ticketCode: ticket.ticketCode,
      numbers,
      balance: user.balance - game.columnPrice,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json(RESPONSE_ERRORS.SERVER_ERROR);
  }
});

//TODO: this is a temporary route for testing purposes, implement a real one
router.get('/:ticketCode', async (req: Request, res: Response) => {
  const ticketCode = req.params.ticketCode;

  const games = await gameModel.find();
  const randomGame = games[Math.floor(Math.random() * games.length)];

  const random = Math.random();

  if (random < 0.5) {
    res.json({
      success: true,
      game: randomGame.name,
      prize: randomGame.prize,
      guessedNumbers: Math.trunc(Math.random() * 3) + 3,
      ticketCode: ticketCode,
      currency: randomGame.currency,
      isWinner: true,
    });
  } else {
    res.json({
      success: true,
      game: randomGame.name,
      prize: 0,
      guessedNumbers: 0,
      ticketCode: ticketCode,
      currency: randomGame.currency,
      isWinner: false,
    });
  }
});

export { router as ticketRouter };

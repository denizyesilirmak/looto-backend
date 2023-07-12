import { Router } from 'express';

import gameModel from '../../models/game/game.model';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const games = await gameModel.find();
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await gameModel.findById(req.params.id);
    res.status(200).json(game);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const game = new gameModel(req.body);

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export { router as gameRouter };

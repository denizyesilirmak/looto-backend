import { Router } from 'express';
import drawModel from '../../models/draw/draw.model';

const router = Router();

router.get('/all', (req, res) => {
  drawModel
    .find({})
    .sort({ createdAt: -1 })
    .populate([{ path: 'game', select: ['gameCode', 'prize', 'name'] }])
    .then((draws) => {
      res.json({
        success: true,
        count: draws.length,
        draws: draws,
      });
    });
});

router.get('/recents', (req, res) => {
  drawModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate([{ path: 'game', select: ['gameCode', 'prize', 'name'] }])
    .then((draws) => {
      res.json({
        success: true,
        count: draws.length,
        draws: draws,
      });
    });
});

router.get('/game/:gameCode', (req, res) => {
  drawModel
    .find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'game',
        select: ['gameCode', 'prize', 'name'],
        match: { gameCode: req.params.gameCode },
      },
    ])
    .then((draws) => {
      res.json({
        success: true,
        count: draws.length,
        draws: draws,
      });
    });
});

export { router as drawRouter };

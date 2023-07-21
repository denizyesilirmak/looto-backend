import { Router } from 'express';

const router = Router();

const wellKnownUrlKey = process.env.WELL_KNOWN_URL?.split('/').pop();

router.get(`/${wellKnownUrlKey}`, (req, res) => {
  res.send(process.env.WELL_KNOWN_CONTENT);
});

export { router as sslRouter };

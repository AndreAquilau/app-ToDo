import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: 'API OK',
    });
  } catch (err) {
    return res.status(400).json({
      error: [`Error request ${err.message}`],
    });
  }
});

export default router;

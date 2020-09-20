import { Router } from 'express';
import RouterExpressAdapter from './RouterAdapterExpress';

const router = new RouterExpressAdapter(Router());

router.adapterGet('/', (req, res) => {
  try {
    return res.status(200).json({
      message: 'API OK',
    });
  } catch (err) {
    return res.status(400).json({
      error: ['Bad Request Not Authorization'],
    });
  }
});

export default router.adapterRouter();

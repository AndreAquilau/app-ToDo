import RouterAdapter from './Router';
import routerTask from './task.router';

const router = new RouterAdapter();

router.use('/task', routerTask);

export default router.Router();

import TaskController from '@controllers/TaskController';
import validationTask from '@middleware/task.validation';
import router from './Router';

router.get('/', TaskController.index);
router.post('/', validationTask, TaskController.store);

export default router;

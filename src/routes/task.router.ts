import TaskController from '@controllers/TaskController';
import taskValidationCreate from '@middleware/taskValidationCreate';
import taskValidationUpdate from '@middleware/taskValidationUpdate';
import taskStatusValidationUpdate from '@middleware/taskStatusValidationUpdate';
import taskValidationAllMacaddress from '@middleware/taskValidationAllMacaddress';
import taskValidationDelete from '@middleware/taskValidationDelete';
import taskValidationShow from '@middleware/taskValidationShow';
import taskValidationLate from '@middleware/taskValidationLate';
import taskValidationToday from '@middleware/taskValidationToday';
import RouterAdapter from './Router';

const router = new RouterAdapter();

router.get('/', TaskController.index);

router.get('/:id', taskValidationShow, TaskController.show);

router.get('/filter/late', taskValidationLate, TaskController.late);
router.get('/filter/today', taskValidationToday, TaskController.today);

router.get(
  '/filter/all',
  taskValidationAllMacaddress,
  TaskController.allMacaddress,
);

router.post('/', taskValidationCreate, TaskController.store);

router.put('/:id', taskValidationUpdate, TaskController.update);
router.put('/:id/:done', taskStatusValidationUpdate, TaskController.done);

router.delete('/:id', taskValidationDelete, TaskController.delete);

export default router.Router();

import TaskController from '@controllers/TaskController';
import taskValidationCreate from '@middleware/taskValidationCreate';
import taskValidationUpdate from '@middleware/taskValidationUpdate';
import taskValidationAllMacaddress from '@middleware/taskValidationAllMacaddress';
import taskValidationDelete from '@middleware/taskValidationDelete';
import taskValidationShow from '@middleware/taskValidationShow';
import RouterAdapter from './Router';

const router = new RouterAdapter();

router.get('/', TaskController.index);
router.get('/filter/show/:id', taskValidationShow, TaskController.show);
router.get(
  '/filter/all',
  taskValidationAllMacaddress,
  TaskController.allMacaddress,
);
router.post('/', taskValidationCreate, TaskController.store);
router.put('/:id?', taskValidationUpdate, TaskController.update);
router.delete('/:id?', taskValidationDelete, TaskController.delete);

export default router.Router();

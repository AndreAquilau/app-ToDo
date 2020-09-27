import TaskController from '@controllers/TaskController';
import taskValidationCreate from '@middleware/taskValidationCreate';
import taskValidationUpdate from '@middleware/taskValidationUpdate';
import taskStatusValidationUpdate from '@middleware/taskStatusValidationUpdate';
import taskValidationAllMacaddress from '@middleware/taskValidationAllMacaddress';
import taskValidationDelete from '@middleware/taskValidationDelete';
import taskValidationShow from '@middleware/taskValidationShow';
import taskValidationLate from '@middleware/taskValidationLate';
import taskValidationToday from '@middleware/taskValidationToday';
import taskValidationWeek from '@middleware/taskValidationWeek';
import taskValidationMonth from '@middleware/taskValidationMonth';
import taskValidationYear from '@middleware/taskValidationYear';
import RouterAdapter from './Router';

const router = new RouterAdapter();

router.get('/', TaskController.index);

router.get('/:id', taskValidationShow, TaskController.show);

router.get('/filter/late/:macaddress', taskValidationLate, TaskController.late);
router.get(
  '/filter/today/:macaddress',
  taskValidationToday,
  TaskController.today,
);
router.get('/filter/week/:macaddress', taskValidationWeek, TaskController.week);
router.get(
  '/filter/month/:macaddress',
  taskValidationMonth,
  TaskController.month,
);
router.get('/filter/year/:macaddress', taskValidationYear, TaskController.year);

router.get(
  '/filter/all/:macaddress',
  taskValidationAllMacaddress,
  TaskController.allMacaddress,
);

router.post('/', taskValidationCreate, TaskController.store);

router.put('/:id', taskValidationUpdate, TaskController.update);
router.put('/:id/:done', taskStatusValidationUpdate, TaskController.done);

router.delete('/:id', taskValidationDelete, TaskController.delete);

export default router.Router();

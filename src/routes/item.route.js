import { Router } from 'express';
import { ItemController } from '../controllers';

const router = Router();

const itemController = new ItemController();

router.post('/', itemController.create);
router.get('/:type', itemController.getItems);
router.delete('/', itemController.delete);
router.delete('/force', itemController.forceDelete);
router.put('/', itemController.modify);

export default router;

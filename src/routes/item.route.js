import { Router } from 'express';
import { ItemController } from '../controllers';

const router = Router();

const itemController = new ItemController();

router.post('/', itemController.create);

export default router;

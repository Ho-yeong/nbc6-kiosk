import { Router } from 'express';
import { OrderController } from '../controllers';

const router = Router();

const orderController = new OrderController();

router.post('/', orderController.create);
router.put('/', orderController.updateState);

export default router;

import { Router } from 'express';
import { OrderItemController } from '../controllers';

const router = Router();

const orderItemController = new OrderItemController();

router.post('/', orderItemController.create);

export default router;

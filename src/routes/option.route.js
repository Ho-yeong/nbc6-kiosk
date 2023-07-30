import { Router } from 'express';
import { OptionController } from '../controllers';

const router = Router();

const optionController = new OptionController();

router.post('/', optionController.create);
router.delete('/', optionController.delete);

export default router;

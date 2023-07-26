import express from 'express';
import ItemRoute from './item.route';
import OrderItemRoute from './orderItem.route';

const router = express.Router();

router.use('/item', ItemRoute);
router.use('/orderItem', OrderItemRoute);

module.exports = router;

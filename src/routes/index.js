import express from 'express';
import ItemRoute from './item.route';
import OrderItemRoute from './orderItem.route';
import OrderRoute from './order.route';

const router = express.Router();

router.use('/item', ItemRoute);
router.use('/orderItem', OrderItemRoute);
router.use('/order', OrderRoute);

module.exports = router;

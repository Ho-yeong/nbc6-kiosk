import express from 'express';
import ItemRoute from './item.route';
import OrderItemRoute from './orderItem.route';
import OrderRoute from './order.route';
import OptionRoute from './option.route';

const router = express.Router();

router.use('/item', ItemRoute);
router.use('/orderItem', OrderItemRoute);
router.use('/order', OrderRoute);
router.use('/option', OptionRoute);

module.exports = router;

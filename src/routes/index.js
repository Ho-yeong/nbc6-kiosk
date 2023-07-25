import express from 'express';
import ItemRoute from './item.route';

const router = express.Router();

router.use('/item', ItemRoute);

module.exports = router;

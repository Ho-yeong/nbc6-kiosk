import { OrderService } from '../services';
import { Messages } from '../error/messages';
import { sequelize } from '../db';

class OrderController {
  _orderService = new OrderService();

  create = async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { orders } = req.body;

      const { code, data, message } = await this._orderService.create(orders, t);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      await t.rollback();
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  updateState = async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { orderId } = req.body;

      const { code, data, message } = await this._orderService.updateState(orderId, t);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      await t.rollback();
      res.status(500).json({ message: Messages.ServerError });
    }
  };
}

export default OrderController;

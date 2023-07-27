import { OrderItemService } from '../services';
import { Messages } from '../error/messages';
import { sequelize } from '../db';

class OrderItemController {
  _orderItemServer = new OrderItemService();

  create = async (req, res) => {
    try {
      const { itemId, amount } = req.body;

      const { code, data, message } = await this._orderItemServer.create(itemId, amount);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  updateState = async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { orderItemId, state } = req.body;

      const { code, data, message } = await this._orderItemServer.updateState(
        orderItemId,
        state,
        t,
      );

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      await t.rollback();
      res.status(500).json({ message: Messages.ServerError });
    }
  };
}

export default OrderItemController;

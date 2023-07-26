import { OrderItemService } from '../services';
import { Messages } from '../error/messages';

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
}

export default OrderItemController;

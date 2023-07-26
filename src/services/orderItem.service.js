import { ItemRepository, OrderItemRepository } from '../repositories';
import { Messages } from '../error/messages';

class OrderItemService {
  _orderItemRepo = new OrderItemRepository();
  _itemRepo = new ItemRepository();

  create = async (itemId, amount) => {
    if (!itemId) {
      return {
        code: 400,
        message: Messages.NoneExist,
      };
    }

    const item = await this._itemRepo.findOne(itemId);

    if (!item) {
      return {
        code: 404,
        message: Messages.NoneExist,
      };
    }

    if (!amount || amount <= 0) {
      return {
        code: 400,
        message: Messages.WrongAmount,
      };
    }

    return {
      code: 200,
      data: await this._orderItemRepo.create(itemId, amount),
    };
  };
}

export default OrderItemService;

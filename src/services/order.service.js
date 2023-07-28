import { ItemRepository, OrderRepository } from '../repositories';
import { Messages } from '../error/messages';

class OrderService {
  _orderRepo = new OrderRepository();
  _itemRepo = new ItemRepository();
  create = async (orders, t) => {
    let totalPrice = 0;

    for (let i = 0; i < orders.length; i++) {
      const item = await this._itemRepo.findOne(orders[i].itemId);

      if (!item) {
        return {
          code: 404,
          message: Messages.NoneExist,
        };
      }

      // 수량 체크
      if (item.amount < orders[i].amount) {
        return {
          code: 400,
          message: Messages.LessAmount,
        };
      }

      let price = orders[i].amount * item.price;
      totalPrice += price;

      orders[i].price = item.price;
    }

    return {
      code: 200,
      data: {
        order: await this._orderRepo.create(orders, t),
        totalPrice,
      },
    };
  };

  updateState = async (orderId, t) => {
    const order = await this._orderRepo.findOne(orderId);
    if (order.state) {
      return {
        code: 400,
        message: Messages.AlreadyDone,
      };
    }

    await this._orderRepo.updateState(orderId, t);
    await t.commit();
    return {
      code: 200,
    };
  };
}

export default OrderService;

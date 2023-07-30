import { ItemRepository, OrderRepository } from '../repositories';
import { Messages } from '../error/messages';
import { serverCache } from '../cache';

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

      // 미완료된 주문에 있는 상품 갯수
      const orderedItemCount = await this._orderRepo.findItemOrderCount(orders[i].itemId);

      // 수량 체크
      // 전체 < 현재 주문한 갯수 + 미완료된 주문에 포함된 갯수
      if (item.amount < orders[i].amount + orderedItemCount) {
        return {
          code: 400,
          message: Messages.LessAmount,
        };
      }

      let price = orders[i].amount * item.price;
      if (orders[i].option) {
        const option = serverCache.getOption(item.optionId);
        if (!option) {
          return {
            code: 400,
            message: Messages.NoneExistOption,
          };
        }

        if (orders[i].option.shot) {
          price += option.shotPrice * orders[i].option.shot * orders[i].amount;
        }

        if (orders[i].option.extra) {
          price += option.extraPrice * orders[i].amount;
          console.log(price);
        }
      }
      totalPrice += price;

      orders[i].price = price;
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

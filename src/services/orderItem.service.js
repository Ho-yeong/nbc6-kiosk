import { ItemRepository, OrderItemRepository } from '../repositories';
import { Messages } from '../error/messages';
import { orderItemState } from '../constants';
import { sequelize } from '../db';
import { ValidationCheck } from '../utils/validationCheck';

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

  updateState = async (orderItemId, state, t) => {
    // 트랜잭션이 실행되지 않았을 경우 false
    if (!t) {
      return false;
    }

    if (!ValidationCheck(orderItemState, state)) {
      return {
        code: 400,
        message: Messages.WrongState,
      };
    }

    const orderItem = await this._orderItemRepo.findOne(orderItemId);
    if (!orderItem) {
      return {
        code: 404,
        message: Messages.NoneExistOrder,
      };
    }

    // 현재 상태와 변경 상태가 동일할 경우
    if (orderItem.state === state) {
      await t.commit();
      return {
        code: 200,
      };
    }

    // ORDERED or PENDING or CANCELED => COMPLETED
    if (state === orderItemState.COMPLETED) {
      await this._itemRepo.updateAmount(orderItem.itemId, orderItem.amount, t);
      await this._orderItemRepo.updateState(orderItem.id, state, t);
      await t.commit();

      return {
        code: 200,
      };
    }

    // COMPLETED => ORDERED or PENDING or CANCELED
    if (orderItem.state === orderItemState.COMPLETED) {
      // 현재 수량 확인
      const item = await this._itemRepo.findOne(orderItem.itemId);

      if (!item) {
        return {
          code: 404,
          message: Messages.NoneExist,
        };
      }

      // 현재 수량이 발주 수량보다 적을 경우 변경 불가능
      if (item.amount < orderItem.amount) {
        return {
          code: 400,
          message: Messages.CannotChangeState,
        };
      }

      // 현재 수량에서 발주 수량 뺄셈
      await this._itemRepo.updateAmount(orderItem.itemId, item.amount - orderItem.amount, t);
      await this._orderItemRepo.updateState(orderItem.id, state, t);
      await t.commit();

      return {
        code: 200,
      };
    }

    // 그 외
    // 현재 수량과 상관없으니 그냥 발주 상태만 변경
    await this._orderItemRepo.updateState(orderItem.id, state, t);
    await t.commit();
    return {
      code: 200,
    };
  };
}

export default OrderItemService;

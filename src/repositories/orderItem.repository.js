import { OrderItem, sequelize } from '../db';

class OrderItemRepository {
  create = async (itemId, amount) => {
    return OrderItem.create({
      itemId,
      amount,
    });
  };

  findOne = async (orderItemId) => {
    return OrderItem.findOne({
      where: {
        id: orderItemId,
      },
    });
  };

  updateState = async (orderItemId, state, t) => {
    return OrderItem.update(
      { state },
      {
        where: {
          id: orderItemId,
        },
        transaction: t,
      },
    );
  };

  // repository 의 존재이유 = DB에 접근하는 여러 가지 함수를 조합해서 repo 에서만 사용하기 위함
  // findOne 과 update 를 각각 만들어 사용 가능 하지만 조합해서 사용 가능함의 예시를 위해 생성
  findAndUpdateState = async (orderItemId, state, t) => {
    // 트랜잭션이 실행되지 않았을 경우 false
    if (!t) {
      return false;
    }

    const orderItem = OrderItem.findOne({
      where: {
        id: orderItemId,
      },
    });

    if (!orderItem) {
      return false;
    }

    return OrderItem.update(
      { state },
      {
        where: {
          id: orderItemId,
        },
        transaction: t,
      },
    );
  };
}

export default OrderItemRepository;

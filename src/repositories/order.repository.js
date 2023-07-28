import { ItemOrderCustomer, OrderCustomer, Item } from '../db';

const orderObject = {
  // 유저에게 받는 값
  itemId: 1,
  amount: 1,
  // service 에서 계산해서 넣어준다
  price: 1000,
};

// 주문 관련 Repository
class OrderRepository {
  findOne = async (orderId) => {
    return await OrderCustomer.findOne({
      where: {
        id: orderId,
      },
    });
  };

  create = async (orders, t) => {
    const result = await OrderCustomer.create({}, { transaction: t });

    for (let i = 0; i < orders.length; i++) {
      await ItemOrderCustomer.create(
        {
          itemId: orders[i].itemId,
          amount: orders[i].amount,
          price: orders[i].price,
          orderCustomerId: result.id,
        },
        { transaction: t },
      );
    }

    await t.commit();
    return result;
  };

  updateState = async (orderId, t) => {
    await OrderCustomer.update(
      { state: true },
      {
        where: {
          id: orderId,
        },
        transaction: t,
      },
    );

    const orders = await ItemOrderCustomer.findAll({
      where: {
        orderCustomerId: orderId,
      },
      transaction: t,
    });

    for (let i = 0; i < orders.length; i++) {
      await Item.decrement(
        { amount: orders[i].amount },
        {
          where: {
            id: orders[i].itemId,
          },
          transaction: t,
        },
      );
    }
  };
}

export default OrderRepository;

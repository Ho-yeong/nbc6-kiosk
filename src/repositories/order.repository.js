import { ItemOrderCustomer, OrderCustomer, Item, sequelize } from '../db';
import { QueryTypes } from 'sequelize';

const orderObject = {
  // 유저에게 받는 값
  itemId: 1,
  amount: 1,
  option: {
    shot: 1,
    extra: true,
    hot: true,
  },
  // service 에서 계산해서 넣어준다
  price: 1000,
};

// 주문 관련 Repository
class OrderRepository {
  findOne = async (orderId) => {
    return OrderCustomer.findOne({
      where: {
        id: orderId,
      },
    });
  };

  findItemOrderCount = async (itemId) => {
    const result = await sequelize.query(
      `
        SELECT SUM(a.amount) AS 'sum' FROM item_order_customers AS a
            LEFT JOIN order_customers AS oc ON a.order_customer_id = oc.id
                                    WHERE oc.state = false AND a.item_id = :item_id;
    `,
      {
        replacements: { item_id: itemId },
        type: QueryTypes.SELECT,
      },
    );

    return Number(result[0].sum);
  };

  create = async (orders, t) => {
    const result = await OrderCustomer.create({}, { transaction: t });

    for (let i = 0; i < orders.length; i++) {
      await ItemOrderCustomer.create(
        {
          itemId: orders[i].itemId,
          amount: orders[i].amount,
          price: orders[i].price,
          option: orders[i].option,
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

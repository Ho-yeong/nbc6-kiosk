import OrderCustomer from '../models/orderCustomer';
import ItemOrderCustomer from '../models/itemOrderCustomer';
import Item from '../models/item';

export default () => {
  ItemOrderCustomer.belongsTo(OrderCustomer, {
    targetKey: 'id',
    foreignKey: {
      name: 'orderCustomerId',
      allowNull: false,
    },
  });

  ItemOrderCustomer.belongsTo(Item, {
    targetKey: 'id',
    foreignKey: {
      name: 'itemId',
      allowNull: false,
    },
  });
};

import OrderCustomer from '../models/orderItem';
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
};

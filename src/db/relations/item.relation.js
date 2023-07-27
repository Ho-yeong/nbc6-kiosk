import Item from '../models/item';
import OrderItem from '../models/orderItem';
import ItemOrderCustomer from '../models/itemOrderCustomer';

export default () => {
  Item.hasMany(OrderItem);
  Item.hasOne(ItemOrderCustomer, {
    foreignKey: {
      allowNull: false,
    },
  });
};

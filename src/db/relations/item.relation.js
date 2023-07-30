import Item from '../models/item';
import OrderItem from '../models/orderItem';
import ItemOrderCustomer from '../models/itemOrderCustomer';
import Option from '../models/option';

export default () => {
  Item.hasMany(OrderItem);
  Item.hasMany(ItemOrderCustomer);
  Item.belongsTo(Option, {
    targetKey: 'id',
    foreignKey: {
      name: 'optionId',
      allowNull: true,
    },
    onDelete: 'SET NULL',
  });
};

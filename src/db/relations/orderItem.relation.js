import OrderItem from '../models/orderItem';
import Item from '../models/item';

export default () => {
  OrderItem.belongsTo(Item, {
    targetKey: 'id',
    foreignKey: {
      name: 'itemId',
      allowNull: false,
    },
  });
};

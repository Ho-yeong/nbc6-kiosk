import Item from '../models/item';
import OrderItem from '../models/orderItem';

export default () => {
  Item.hasMany(OrderItem);
};

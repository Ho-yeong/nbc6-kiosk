import orderCustomer from '../models/orderCustomer';
import itemOrderCustomer from '../models/itemOrderCustomer';

export default () => {
  orderCustomer.hasMany(itemOrderCustomer);
};

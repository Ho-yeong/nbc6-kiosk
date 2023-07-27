import sequelize from './sequelize';
import Item from './models/item';
import OrderItem from './models/orderItem';
import OrderCustomer from './models/orderCustomer';
import ItemOrderCustomer from './models/itemOrderCustomer';
import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, Item, OrderItem, OrderCustomer, ItemOrderCustomer };

import sequelize from './sequelize';
import Item from './models/item';
import OrderItem from './models/orderItem';
import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, Item, OrderItem };

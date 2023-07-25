import sequelize from './sequelize';
import Item from './models/item';
import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, Item };

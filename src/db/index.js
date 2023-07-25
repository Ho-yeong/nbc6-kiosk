import sequelize from './sequelize';
import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize };

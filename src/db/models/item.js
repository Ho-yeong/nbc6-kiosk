import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { itemType } from '../../constants';

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM({
        values: Object.values(itemType),
      }),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Item',
    underscored: true,
    timestamps: true,
  },
);

export default Item;

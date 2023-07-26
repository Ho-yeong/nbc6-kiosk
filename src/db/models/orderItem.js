import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { itemOrderState, itemType } from '../../constants';
import item from './item';

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: itemOrderState.ORDERED,
      min: itemOrderState.ORDERED,
      max: itemOrderState.CANCELED,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    underscored: true,
    timestamps: true,
  },
);

export default OrderItem;

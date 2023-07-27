import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { orderItemState, itemType } from '../../constants';
import item from './item';

class OrderCustomer extends Model {}

OrderCustomer.init(
  {
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderCustomer',
    underscored: true,
    timestamps: true,
  },
);

export default OrderCustomer;

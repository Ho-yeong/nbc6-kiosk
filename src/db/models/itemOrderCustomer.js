import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { orderItemState, itemType } from '../../constants';
import item from './item';

class ItemOrderCustomer extends Model {}

ItemOrderCustomer.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ItemOrderCustomer',
    underscored: true,
    timestamps: false,
  },
);

ItemOrderCustomer.removeAttribute('id');

export default ItemOrderCustomer;

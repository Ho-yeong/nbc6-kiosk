import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Option extends Model {}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    extraPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    shotPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // option 상의 hot 이 false 일 경우는 고객이 hot, ice 옵션 선택 불가
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Option',
    underscored: true,
    timestamps: true,
  },
);

export default Option;

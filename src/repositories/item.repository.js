import { Item, Option } from '../db';
import { QueryTypes } from 'sequelize';

class ItemRepository {
  create = async (item) => {
    return Item.create(item);
  };

  getItems = async (type) => {
    return Item.findAll({
      where: {
        ...(type !== 'all' && { type }),
        isDeleted: false,
      },
      attributes: ['id', 'name', 'price', 'type', 'amount', 'createdAt', 'updatedAt', 'optionId'],
    });
  };

  findOne = async (itemId) => {
    return Item.findOne({
      where: {
        id: itemId,
      },
    });
  };

  softDelete = async (itemId) => {
    return Item.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id: itemId,
        },
      },
    );
  };

  modify = async (item) => {
    return Item.update(
      {
        ...(item.name && { name: item.name }),
        ...(item.price && { price: item.price }),
        ...(item.optionId && { optionId: item.optionId }),
      },
      {
        where: {
          id: item.id,
        },
      },
    );
  };

  updateAmount = async (itemId, amount, t) => {
    if (!t) {
      return false;
    }

    return Item.update({ amount }, { where: { id: itemId } });
  };
}

export default ItemRepository;

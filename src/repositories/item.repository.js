import { Item, Option } from '../db';

class ItemRepository {
  create = async (item) => {
    return Item.create(item);
  };

  getItems = async (type) => {
    return Item.findAll({
      where: {
        ...(type !== 'all' && { type }),
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

  delete = async (itemId) => {
    return Item.destroy({
      where: {
        id: itemId,
      },
    });
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

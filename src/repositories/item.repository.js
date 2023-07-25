import { Item } from '../db';

class ItemRepository {
  create = async (item) => {
    return Item.create(item);
  };
}

export default ItemRepository;

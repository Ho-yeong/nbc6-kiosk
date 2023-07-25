import { ItemRepository } from '../repositories';
import { itemType } from '../constants';

class ItemService {
  _itemRepo = new ItemRepository();

  create = async (item) => {
    if (!item.name) {
      return {
        code: 400,
        message: '이름을 입력해주세요.',
      };
    }

    if (!item.price || item.price < 0) {
      return {
        code: 400,
        message: '올바른 가격을 입력해주세요.',
      };
    }

    const itemTypeArray = Object.values(itemType);
    if (!itemTypeArray.includes(item.type)) {
      return {
        code: 400,
        message: '올바른 타입을 지정해주세요',
      };
    }

    return {
      code: 200,
      data: await this._itemRepo.create(item),
    };
  };
}

export default ItemService;

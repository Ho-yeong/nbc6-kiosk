import { ItemRepository } from '../repositories';
import { itemType } from '../constants';
import { Messages } from '../error/messages';
import { Item } from '../db';
import { ValidationCheck } from '../utils/validationCheck';

class ItemService {
  _itemRepo = new ItemRepository();

  create = async (item) => {
    if (!item.name) {
      return {
        code: 400,
        message: Messages.WrongName,
      };
    }

    if (!item.price || item.price < 0) {
      return {
        code: 400,
        message: Messages.WrongPrice,
      };
    }

    if (!ValidationCheck(itemType, item.type)) {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }

    return {
      code: 200,
      data: await this._itemRepo.create(item),
    };
  };

  getItems = async (type) => {
    if (!ValidationCheck(itemType, type) && type !== 'all') {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }

    return {
      code: 200,
      data: await this._itemRepo.getItems(type),
    };
  };

  delete = async (itemId) => {
    const item = await this._itemRepo.findOne(itemId);
    if (item.amount > 0) {
      return {
        code: 400,
        message: '상품의 수량이 남아있습니다.',
      };
    }

    const result = await this._itemRepo.delete(itemId);

    if (!result) {
      return {
        code: 404,
        message: '이미 삭제된 아이템입니다.',
      };
    }

    return {
      code: 200,
    };
  };

  forceDelete = async (itemId) => {
    // 이전에 보냈던 delete 리퀘스트에서 수량이 있는 경우에도 삭제를 원할 경우
    // 이곳에서 이전의 request 정보와 비교.
    // 서버 메모리 데이터 사용 예정

    const result = await this._itemRepo.delete(itemId);

    if (!result) {
      return {
        code: 404,
        message: Messages.NoneExist,
      };
    }

    return {
      code: 200,
    };
  };

  modify = async (item) => {
    if (item.name !== undefined && item.name === '') {
      return {
        code: 400,
        message: Messages.WrongName,
      };
    }
    if (item.price !== undefined && item.price < 0) {
      return {
        code: 400,
        message: Messages.WrongPrice,
      };
    }

    const result = await this._itemRepo.modify(item);
    // 배열의 첫번째 항목 = 영향받은 row 의 갯수
    if (!result[0]) {
      return {
        code: 404,
        message: Messages.NoneExist,
      };
    }

    return {
      code: 200,
    };
  };
}

export default ItemService;

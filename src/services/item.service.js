import { ItemRepository, OrderRepository } from '../repositories';
import { itemType } from '../constants';
import { Messages } from '../error/messages';
import { ValidationCheck } from '../utils/validationCheck';
import { serverCache } from '../cache';

class ItemService {
  _itemRepo = new ItemRepository();
  _orderRepo = new OrderRepository();

  create = async (item) => {
    if (item.optionId) {
      const option = serverCache.getOption(item.optionId);
      if (!option) {
        return {
          code: 404,
          message: Messages.NoneExistOption,
        };
      }
    }

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

    const origin = await this._itemRepo.getItems(type);

    let data = [];

    for (let i = 0; i < origin.length; i++) {
      const orderedCount = await this._orderRepo.findItemOrderCount(origin[i].id);
      const temp = {
        ...origin[i].dataValues,
        amount: origin[i].amount - orderedCount,
        option: serverCache.getOption(origin[i].optionId),
      };

      data.push(temp);
    }

    return {
      code: 200,
      data,
    };
  };

  delete = async (itemId) => {
    const item = await this._itemRepo.findOne(itemId);
    if (item.amount > 0) {
      serverCache.setItemId(itemId);
      return {
        code: 400,
        message: '상품의 수량이 남아있습니다.',
      };
    }

    const result = await this._itemRepo.softDelete(itemId);

    if (!result[0]) {
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

    const check = serverCache.checkWillDeleteItem(itemId);
    if (!check) {
      return {
        code: 400,
        message: Messages.AlreadyDone,
      };
    }

    const result = await this._itemRepo.softDelete(itemId);

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

    if (item.optionId !== undefined) {
      const option = serverCache.getOption(item.optionId);
      if (!option) {
        return {
          code: 404,
          message: Messages.NoneExistOption,
        };
      }
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

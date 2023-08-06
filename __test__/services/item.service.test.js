import { itemType } from '../../src/constants';
import { ItemService } from '../../src/services';

jest.mock('../../src/cache');
import { serverCache } from '../../src/cache';

jest.mock('../../src/db');
import { Item } from '../../src/db';
import { Messages } from '../../src/error/messages';

describe('Item Service', () => {
  let itemService;

  beforeAll(() => {
    itemService = new ItemService();
  });

  it('serverCacheMock should be defined', () => {
    expect(serverCache).toBeDefined();
  });

  it('Item should be defined', () => {
    expect(Item).toBeDefined();
  });

  describe('create', () => {
    let reqItem;

    it('should be code 404, and NoneExistOption Message, if no options', async () => {
      reqItem = {
        optionId: 1,
      };
      serverCache.getOption.mockReturnValue(undefined);
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(404);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.NoneExistOption);
    });

    it('should be code 400, and WrongName Message, if no name', async () => {
      reqItem = {
        optionId: 1,
      };
      serverCache.getOption.mockReturnValue({ id: 1 });
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(400);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.WrongName);
    });

    it('should be code 400, and WrongPrice Message, if no price', async () => {
      reqItem = {
        optionId: 1,
        name: '아메리카노',
      };
      serverCache.getOption.mockReturnValue({ id: 1 });
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(400);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.WrongPrice);
    });

    it('should be code 400, and WrongPrice Message, if price is under 0', async () => {
      reqItem = {
        optionId: 1,
        name: '아메리카노',
        price: -500,
      };
      serverCache.getOption.mockReturnValue({ id: 1 });
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(400);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.WrongPrice);
    });

    it('should be code 400, and WrongType Message, if req type is not in itemType', async () => {
      reqItem = {
        optionId: 1,
        name: '아메리카노',
        price: 3500,
        type: 'TEST',
      };
      serverCache.getOption.mockReturnValue({ id: 1 });
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(400);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.WrongType);
    });

    it('should be code 400, and WrongType Message, if no itemType', async () => {
      reqItem = {
        optionId: 1,
        name: '아메리카노',
        price: 3500,
      };
      serverCache.getOption.mockReturnValue({ id: 1 });
      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(400);
      expect(data).toEqual(undefined);
      expect(message).toBe(Messages.WrongType);
    });

    it('should create item', async () => {
      reqItem = {
        optionId: 1,
        name: '아메리카노',
        price: 3500,
        type: itemType.COFFEE,
      };

      serverCache.getOption.mockReturnValue({ id: 1 });
      Item.create.mockResolvedValue(reqItem);

      const { code, data, message } = await itemService.create(reqItem);

      expect(code).toBe(200);
      expect(data).toEqual(reqItem);
      expect(message).toBe(undefined);
    });
  });

  // describe('getItems', () => {});
  // describe('delete', () => {});
  // describe('forceDelete', () => {});
  // describe('modify', () => {});
});

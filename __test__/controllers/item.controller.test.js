import { ItemController } from '../../src/controllers';
import { itemType } from '../../src/constants';
import { Messages } from '../../src/error/messages';

jest.mock('../../src/services', () => {
  const mItemService = {
    create: jest.fn(),
  };
  return { ItemService: jest.fn(() => mItemService) };
});
import { ItemService } from '../../src/services';

describe('Item Controller', () => {
  let itemController;
  let itemService;

  beforeAll(() => {
    itemController = new ItemController();
    itemService = new ItemService();
  });

  describe('create', () => {
    let req = {
      body: {},
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    it("'should fail if error is occurred", async () => {
      req.body = {
        optionId: 1,
        name: '아메리카노',
        price: 3500,
        type: itemType.COFFEE,
      };

      itemService.create.mockRejectedValue(new Error('Jest Test error'));

      await itemController.create(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ message: Messages.ServerError });
    });

    it("'should create Item", async () => {
      req.body = {
        optionId: 1,
        name: '아메리카노',
        price: 3500,
        type: itemType.COFFEE,
      };

      itemService.create.mockImplementation((item) => {
        return {
          code: 200,
          data: item,
        };
      });

      await itemController.create(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({ data: req.body });
    });
  });
});

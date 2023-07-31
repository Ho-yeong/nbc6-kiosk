import { ItemService } from '../services';
import { sendResponse } from '../lib/api/response';

class ItemController {
  _itemService = new ItemService();

  create = async (req, res) => {
    try {
      const { name, price, type, optionId } = req.body;

      const { code, data, message } = await this._itemService.create({
        name,
        price,
        type,
        optionId,
      });

      sendResponse(res, { ...(data && { items: data }), ...(message && { message }) });
    } catch (e) {
      sendResponse(res, e, 500);
    }
  };

  getItems = async (req, res) => {
    try {
      const { type } = req.params;

      const { code, data, message } = await this._itemService.getItems(type);

      sendResponse(res, { ...(data && { items: data }), ...(message && { message }) });
    } catch (e) {
      sendResponse(res, e, 500);
    }
  };

  delete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.delete(itemId);

      sendResponse(res, { ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      sendResponse(res, e, 500);
    }
  };

  forceDelete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.forceDelete(itemId);

      sendResponse(res, { ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      sendResponse(res, e, 500);
    }
  };

  modify = async (req, res) => {
    try {
      const { id, name, price, optionId } = req.body;

      const { code, data, message } = await this._itemService.modify({ id, name, price, optionId });

      sendResponse(res, { ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      sendResponse(res, e, 500);
    }
  };
}

export default ItemController;

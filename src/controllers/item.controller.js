import { ItemService } from '../services';
import { Messages } from '../error/messages';

class ItemController {
  _itemService = new ItemService();

  create = async (req, res) => {
    try {
      const { name, price, type } = req.body;

      const { code, data, message } = await this._itemService.create({ name, price, type });

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  getItems = async (req, res) => {
    try {
      const { type } = req.params;

      const { code, data, message } = await this._itemService.getItems(type);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  delete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.delete(itemId);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  forceDelete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.forceDelete(itemId);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  modify = async (req, res) => {
    try {
      const { id, name, price } = req.body;

      const { code, data, message } = await this._itemService.modify({ id, name, price });

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };
}

export default ItemController;

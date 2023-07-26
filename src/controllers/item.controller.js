import { ItemService } from '../services';

class ItemController {
  _itemService = new ItemService();

  create = async (req, res) => {
    try {
      const { name, price, type } = req.body;

      const { code, data, message } = await this._itemService.create({ name, price, type });

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  getItems = async (req, res) => {
    try {
      const { type } = req.params;

      const { code, data, message } = await this._itemService.getItems(type);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  delete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.delete(itemId);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  forceDelete = async (req, res) => {
    try {
      const { itemId } = req.body;

      const { code, data, message } = await this._itemService.forceDelete(itemId);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  modify = async (req, res) => {
    try {
      const { id, name, price } = req.body;

      const { code, data, message } = await this._itemService.modify({ id, name, price });

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default ItemController;

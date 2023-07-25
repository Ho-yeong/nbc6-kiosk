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
}

export default ItemController;

import { OptionService } from '../services';
import { Messages } from '../error/messages';

class OptionController {
  _optionService = new OptionService();

  create = async (req, res) => {
    try {
      const { extraPrice, shotPrice, hot } = req.body;

      const { code, data, message } = await this._optionService.create({
        extraPrice,
        shotPrice,
        hot,
      });

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };

  delete = async (req, res) => {
    try {
      const { optionId } = req.body;

      const { code, data, message } = await this._optionService.delete(optionId);

      res.status(code).json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: Messages.ServerError });
    }
  };
}

export default OptionController;

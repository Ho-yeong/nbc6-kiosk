import { OptionRepository } from '../repositories';
import { Messages } from '../error/messages';

class OptionService {
  _optionRepo = new OptionRepository();

  create = async (option) => {
    if (option.shotPrice < 0 || option.extraPrice < 0) {
      return {
        code: 400,
        message: Messages.WrongPrice,
      };
    }

    return {
      code: 200,
      data: await this._optionRepo.create(option),
    };
  };

  delete = async (optionId) => {
    await this._optionRepo.delete(optionId);
    return {
      code: 200,
    };
  };
}

export default OptionService;

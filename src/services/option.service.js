import { OptionRepository } from '../repositories';
import { Messages } from '../error/messages';
import { serverCache } from '../cache';

class OptionService {
  _optionRepo = new OptionRepository();

  create = async (option) => {
    if (option.shotPrice < 0 || option.extraPrice < 0) {
      return {
        code: 400,
        message: Messages.WrongPrice,
      };
    }

    const result = await this._optionRepo.create(option);
    if (result) {
      serverCache.updateOption(result);
    }

    return {
      code: 200,
      data: result,
    };
  };

  delete = async (optionId) => {
    const result = await this._optionRepo.delete(optionId);

    if (result > 0) {
      serverCache.deleteOption(optionId);
    }

    return {
      code: 200,
    };
  };
}

export default OptionService;

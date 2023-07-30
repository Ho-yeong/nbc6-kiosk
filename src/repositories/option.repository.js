import { Option } from '../db';

class OptionRepository {
  create = async (option) => {
    return Option.create(option);
  };

  delete = async (optionId) => {
    return Option.destroy({
      where: {
        id: optionId,
      },
    });
  };

  findOne = async (optionId) => {
    return Option.findOne({
      where: {
        id: optionId,
      },
    });
  };

  findAll = async () => {
    return Option.findAll();
  };
}

export default OptionRepository;

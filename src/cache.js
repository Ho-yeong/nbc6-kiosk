import NodeCache from 'node-cache';
import { OptionRepository } from './repositories';

// singleton
class ServerCache {
  _nodeCache = new NodeCache();
  _optionRepo = new OptionRepository();

  getter = () => {
    return this._nodeCache;
  };

  preCachingOptions = async () => {
    const options = await this._optionRepo.findAll();

    options.map((v) => {
      this._nodeCache.set(`option:${v.id}`, v);
    });
  };

  updateOption = (option) => {
    this._nodeCache.set(`option:${option.id}`, option);
  };

  deleteOption = (id) => {
    this._nodeCache.del(`option:${id}`);
  };
}

export const serverCache = new ServerCache();

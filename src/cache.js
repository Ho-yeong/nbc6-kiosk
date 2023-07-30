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

  getOption = (id) => {
    return this._nodeCache.get(`option:${id}`);
  };

  setItemId = (id) => {
    // 10초 동안 유지
    this._nodeCache.set(`item:${id}`, id, 10000);
  };

  checkWillDeleteItem = (id) => {
    return this._nodeCache.get(`item:${id}`);
  };
}

export const serverCache = new ServerCache();

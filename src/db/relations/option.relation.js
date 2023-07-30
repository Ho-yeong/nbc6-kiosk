import Option from '../models/option';
import Item from '../models/item';

export default () => {
  Option.hasMany(Item);
};

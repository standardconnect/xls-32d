import { encode as _encode } from './encode';
import { decode as _decode } from './decode';
import { EncodeOpts } from '../../types/index';

import utils from '../utils/index';

export default class x {
  input = (uri: string) => {
    utils.checks.isValidSchema(uri);
    return this;
  };
  encode = (opts: EncodeOpts) => _encode(opts);
  decode = (uri: string) => _decode(uri);
}

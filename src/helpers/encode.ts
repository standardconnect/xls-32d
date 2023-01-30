import { EncodeOpts, ExtendedEcodingOpts } from '../../types/index';
import utils from '../utils/index';
import { getVersion } from '../utils/index';

export const encode = (opts: EncodeOpts): string => {
  let object: ExtendedEcodingOpts = {
    protocol: 'xrpl',
    version: getVersion(),
    ...opts,
  };

  return utils.parse.convertToUri(object);
};

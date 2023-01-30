import { EncodeOpts, ExtendedEcodingOpts } from '../../types/types';
import utils from '../utils';
import { getVersion } from '../utils/getVersion';

export const encode = (opts: EncodeOpts): string => {
  try {
    let object: ExtendedEcodingOpts = {
      protocol: 'xrpl',
      version: getVersion(),
      ...opts,
    };

    return utils.parse.convertToUri(object);
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

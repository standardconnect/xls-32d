import { Types } from '../../types';
import utils from '../utils';
import { getVersion } from '../utils/getVersion';
import { ExtendedEcodingOpts } from '../utils/parse';

export interface EncodeOpts {
  type: Types;
  params: any;
}

export const encode = async (opts: EncodeOpts): Promise<string> => {
  try {
    let object: ExtendedEcodingOpts = {
      protocol: 'xrpl',
      version: getVersion(),
      type: opts.type,
      params: opts.params,
    };

    return utils.parse.convertToUri(object);
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

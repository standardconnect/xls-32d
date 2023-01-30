import { DecodeObj } from '../../types';
import utils from '../utils/index';

export const decode = async (uri: string): Promise<DecodeObj> => {
  return {
    protocol: utils.parse.getProtocol(uri),
    version: await utils.parse.getVersion(uri),
    type: utils.parse.getType(uri),
    params: utils.parse.getParams(uri),
  };
};

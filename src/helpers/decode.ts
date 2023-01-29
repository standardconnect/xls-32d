import utils from '../utils';
import { isValidSchema } from '../utils/checks';

export interface DecodeObj {
  protocol: string;
  version: string;
  type: string;
  params: any;
}

export const decode = async (uri: string): Promise<DecodeObj> => {
  try {
    isValidSchema;
    return {
      protocol: utils.parse.getProtocol(uri),
      version: await utils.parse.getVersion(uri),
      type: utils.parse.getType(uri),
      params: utils.parse.getParams(uri),
    };
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

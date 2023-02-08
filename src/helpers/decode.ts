import { DecodeObj } from 'types/index';
import utils from 'utils/index';

export const uri_decode = async (uri: string): Promise<DecodeObj> => {
  return {
    protocol: utils.parse.getProtocol(uri),
    version: await utils.parse.getVersion(uri),
    type: utils.parse.getType(uri),
    params: utils.parse.getParams(uri),
  };
};

export const url_decode = async (url: string): Promise<any> =>
  Object.fromEntries(new URL(url).searchParams);

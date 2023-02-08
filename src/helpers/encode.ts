import {
  URIEncodeOpts,
  ExtendedURIEncodingOpts,
  URLEncodeOpts,
  ExtendedURLEncodingOpts,
} from 'types/index';
import utils from 'utils/index';
import { getVersion } from 'utils/index';

export const uri_encode = (opts: URIEncodeOpts): string => {
  let object: ExtendedURIEncodingOpts = {
    protocol: 'xrpl',
    version: getVersion(),
    ...opts,
  };

  return utils.parse.convertToUri(object);
};

export const url_encode = (opts: URLEncodeOpts): string => {
  let object: ExtendedURLEncodingOpts = {
    protocol: 'xrpl',
    version: getVersion(),
    ...opts,
  };

  return utils.parse.convertToUrl(object);
};

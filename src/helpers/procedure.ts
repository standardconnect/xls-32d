import { uri_encode, url_encode } from './encode';
import { uri_decode, url_decode } from './decode';
import { URIEncodeOpts, URLEncodeOpts } from 'types/index';

import utils from 'utils/index';

export class URI {
  input = (uri: string) => {
    utils.checks.isValidSchema(uri);
    return this;
  };
  encode = (opts: URIEncodeOpts) => uri_encode(opts);
  decode = (uri: string) => uri_decode(uri);
}

export class URL {
  input = (uri: string) => {
    utils.checks.isValidSchema(uri);
    return this;
  };

  fetchProvider = () => {};

  encode = (opts: URLEncodeOpts) => url_encode(opts);

  decode = (uri: string) => url_decode(uri);
}

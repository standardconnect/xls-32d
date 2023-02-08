import { URIEncodeOpts, URLEncodeOpts } from 'types/index';
import { URI, URL } from './procedure';

export const uri = {
  encode: (opts: URIEncodeOpts) => new URI().encode(opts),
  decode: (uri: string) => new URI().input(uri).decode(uri),
};

export const url = {
  encode: (opts: URLEncodeOpts) => new URL().encode(opts),
  decode: (url: string) => new URL().decode(url),
};

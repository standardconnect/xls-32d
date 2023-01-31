import { EncodeOpts } from 'types/index';
import x from './procedure';

export const encode = (opts: EncodeOpts) => new x().encode(opts);
export const decode = (uri: string) => new x().input(uri).decode(uri);

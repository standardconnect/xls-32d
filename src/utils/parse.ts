import { checkForLatestVersion } from './latestVersion';
import { logger } from './logger';
import { error } from './error';
import schemas from '../schemas';
import { ZodSchema } from 'zod';
import { availableTypes, ExtendedEcodingOpts } from '../../types/index';

const versionReg = '^v';
const versionPrefix = '^-';
const containsParams = '[?]';

export const getVersion = async (uri: string): Promise<string> => {
  const scheme = getScheme(uri);
  const reg = new RegExp(versionReg);
  const versionCheck = new RegExp(versionPrefix);

  let versionFull = scheme.replace('xrpl', '') || undefined;

  if (versionFull && versionCheck.test(versionFull)) versionFull = versionFull.replace('-', '');

  const isBeta = versionFull?.includes('beta');
  if (isBeta) logger.warn('This uri is using a beta version of XLS32d');

  const currentVersion = await checkForLatestVersion();

  if (!versionFull && currentVersion) return currentVersion;
  if (!versionFull)
    throw 'Syntax Error: Something went wrong while parsing in the verison of the URI';

  if (!reg.test(versionFull))
    throw 'Syntax Error: version detected but it is not in the right format. See xls-32d for more information';

  const version = versionFull.replace('v', '');

  if (currentVersion !== version) logger.warn('This uri is not using the latest version of XLS32d');

  if (!version)
    throw 'Syntax Error: version detected but it is not in the right format. See xls-32d for more information';
  return version;
};

export const getScheme = (uri: string): string => {
  let scheme = uri.split(':')[0];
  if (!scheme) return error.throw('Could not find scheme for this uri');
  return scheme;
};

export const getProtocol = (uri: string): string => {
  let scheme = getScheme(uri);
  let protocol = scheme.split('-')[0];
  if (!protocol) return error.throw('Could not determine protocol for this uri');
  return protocol;
};

export const getType = (uri: string): string => {
  try {
    if (!/:/.exec(uri)) throw '';

    let type = uri.split(':')[1]?.split('?')[0];
    if (!type) throw '';

    return type;
  } catch (_e: any) {
    return error.throw('No type idenitier detected');
  }
};

export const getParams = (uri: string) => {
  const reg = new RegExp(containsParams);
  const hasParams = reg.test(uri);
  if (!hasParams) {
    logger.warn('No params found on this uri');
  }

  const params = uri.split('?')[1];

  if (!params) return undefined;

  const delimitor = params.split('&');
  const delimitorMap = delimitor.map((param) => param.split('='));
  const paramsMap = delimitorMap.flat();
  //logger.info(paramsMap);
  let keys = paramsMap.filter((_param: string, index: number) => {
    return index % 2 === 0;
  });
  let values = paramsMap.filter((_param: string, index: number) => {
    return !(index % 2 === 0);
  });

  if (keys.length !== values.length)
    error.throw('There was a mistmatch of params. Check syntax formatting.');

  return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
};

export const convertToUri = (opts: ExtendedEcodingOpts): string => {
  // check if type is a valid
  if (!availableTypes.includes(opts.type)) return error.throw('type is not valid');

  let schema: ZodSchema = schemas[opts.type];
  let zodCheck = schema.safeParse(opts.params);
  if (!zodCheck.success)
    return error.throw(`Params input schema could not be validated ${zodCheck.error}`);

  let string = '';
  Object.entries(opts.params).map((entry, index) => {
    string += String(entry[0]);
    string += '=' + String(entry[1]);
    if (index + 1 !== Object.entries(opts.params).length) string += '&';
  });

  return opts.protocol + '-v' + opts.version + ':' + opts.type + '?' + string;
};

export default {
  getVersion,
  getScheme,
  getParams,
  getType,
  getProtocol,
  convertToUri,
};

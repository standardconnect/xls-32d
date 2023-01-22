import { EncodeOpts } from '../helpers/encode';
import { checkForLatestVersion } from './latestVersion';
import { logger } from './logger';

const schemeReg = '^xrpl';
const versionReg = '^v';
const versionPrefix = '^-';
const containsParams = '[?]';

export interface AddedEncodeOpts {
  protocol: string;
  version: string;
}

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
  checkIsValidSchema;
  let scheme = uri.split(':')[0];
  if (!scheme) throw 'Could not finde scheme for this URI';
  return scheme;
};

export const getProtocol = (uri: string): string => {
  checkIsValidSchema;
  let scheme = getScheme(uri);
  let protocol = scheme.split('-')[0];
  if (!protocol) throw 'Could not determine protocol for this URI';
  return protocol;
};

export const isXrplUri = (uri: string) => {
  const reg = new RegExp(schemeReg);
  return reg.test(uri);
};

export const isValidSchema = (_uri: string) => {
  checkIsValidSchema;
  return true;
};

export const checkIsValidSchema = (_uri: string) => {
  if (!isXrplUri) throw 'This is not a valid xrpl uri';
  if (!getType) throw 'URI Type not found';
};

export const getType = (uri: string): string => {
  if (!/:/.exec(uri))
    throw 'Syntax Error: No type idenitier detected. See xls-32d for more information';

  let split = uri.split(':')[1];
  if (!split) throw 'Syntax Error: No type idenitier detected. See xls-32d for more information';

  let type = split.split('?')[0];

  if (!type) throw 'Syntax Error: No type idenitier detected. See xls-32d for more information';

  return type;
};

export const getParams = (uri: string) => {
  checkIsValidSchema;
  const reg = new RegExp(containsParams);
  const hasParams = reg.test(uri);
  if (!hasParams) {
    logger.warn('No params found on this URI');
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
    throw 'Error: There was a mistmatch of params for this URI. Check syntax formatting in xls-32d';

  return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
};

export const isValidParams = (_uri: string) => {
  checkIsValidSchema;
};

export type ExtendedEcodingOpts = EncodeOpts & AddedEncodeOpts;

export const convertToUri = (opts: ExtendedEcodingOpts): string => {
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
  isXrplUri,
  isValidSchema,
  getParams,
  getType,
  isValidParams,
  getProtocol,
  convertToUri,
};

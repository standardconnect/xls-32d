import { checkForLatestVersion } from './latestVersion';
import { logger } from './logger';
import { error } from './error';
import schemas from '../schemas';
import { ZodSchema } from 'zod';
import { availableTypes, ExtendedURIEncodingOpts, ExtendedURLEncodingOpts } from 'types/index';
import cti from '../cti';

const versionReg = '^v';
const versionPrefix = '^-';
const containsParams = '[?]';

const urlify = (s: string) => s.replace(' ', '%20');
const deurlify = (s: string) => s.replace('%20', ' ');

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

  let keys = paramsMap
    .filter((_param: string, index: number) => {
      return index % 2 === 0;
    })
    .map((param) => deurlify(param));

  let values = paramsMap
    .filter((_param: string, index: number) => {
      return !(index % 2 === 0);
    })
    .map((param) => deurlify(param));

  if (keys.length !== values.length)
    error.throw('There was a mistmatch of params. Check syntax formatting.');

  if (getType(uri) === 'cti') {
    let obj = Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
    const { networkId, ledger_index, txn_index } = new cti.Decode(obj.id);

    return Object.assign(obj, {
      networkId: networkId,
      ledger_index: ledger_index,
      txn_index: txn_index,
    });
  }

  return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
};

export function convertToUri(opts: ExtendedURIEncodingOpts): string {
  // check if type is a valid
  if (!availableTypes.includes(opts.type)) return error.throw('type is not valid');

  let schema: ZodSchema = schemas[opts.type];
  if (opts.params['xaddress']) schema = schemas.accountX;

  let zodCheck = schema.safeParse(opts.params);
  if (!zodCheck.success)
    return error.throw(`Params input schema could not be validated ${zodCheck.error}`);

  let version = '';
  if (opts.opts?.version) version = '-v' + opts.version;

  if (opts.type === 'cti' && 'txn_index' in opts.params)
    return opts.protocol + version + ':' + opts.type + '?id=' + new cti.Encode(opts.params).cti;

  let string = '';
  Object.entries(opts.params).map((entry, index) => {
    string += urlify(String(entry[0]));
    string += '=' + urlify(String(entry[1]));
    if (index + 1 !== Object.entries(opts.params).length) string += '&';
  });

  return opts.protocol + version + ':' + opts.type + '?' + string;
}

export function convertToUrl(opts: ExtendedURLEncodingOpts): string {
  // check if type is a valid
  if (!availableTypes.includes(opts.type)) return error.throw('type is not valid');

  let schema: ZodSchema = schemas[opts.type];
  if (opts.params['xaddress']) schema = schemas.accountX;

  let zodCheck = schema.safeParse(opts.params);
  if (!zodCheck.success)
    return error.throw(`Params input schema could not be validated ${zodCheck.error}`);

  let schema_string = 'schema=' + opts.protocol;
  let type_string = '&type=' + opts.type;

  let version_string = '';
  if (opts.opts?.version) version_string = '&version=' + opts.version;

  let query = schema_string + version_string + type_string;

  if (opts.type === 'cti' && 'txn_index' in opts.params) {
    let cti_string = 'id=' + new cti.Encode(opts.params).cti;
    query = query + '&' + cti_string;
    return opts.domain + '?' + query;
  }
  //opts.protocol + version_string + ':' + opts.type + '?id=' + new cti.Encode(opts.params).cti

  let params_string = '';
  Object.entries(opts.params).map((entry, index) => {
    params_string += urlify(String(entry[0]));
    params_string += '=' + urlify(String(entry[1]));
    if (index + 1 !== Object.entries(opts.params).length) params_string += '&';
  });

  query = query + '&' + params_string;

  return opts.domain + '?' + query;
}

export default {
  getVersion,
  getScheme,
  getParams,
  getType,
  getProtocol,
  convertToUri,
  convertToUrl,
};

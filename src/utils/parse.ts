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

//const urlify = (s: string) => s.replace(' ', '%20');
//const deurlify = (s: string) => s.replace('%20', ' ');

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

  if (getType(uri) === 'cti') {
    let obj = Object.fromEntries(new URLSearchParams(params));
    if (!obj.id) throw '';
    const { networkId, ledger_index, txn_index } = new cti.Decode(obj.id);

    return Object.assign(obj, {
      networkId: networkId,
      ledger_index: ledger_index,
      txn_index: txn_index,
    });
  }

  return Object.fromEntries(new URLSearchParams(params));
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

  let query = new URLSearchParams([...Object.entries(opts.params)]).toString();

  if (opts.type === 'cti' && 'txn_index' in opts.params) {
    let id = new cti.Encode(opts.params).cti;
    if (id) query = new URLSearchParams([...Object.entries({ id: id })]).toString();
  }

  return opts.protocol + version + ':' + opts.type + '?' + query;
}

export function convertToUrl(opts: ExtendedURLEncodingOpts): string {
  if (!availableTypes.includes(opts.type)) return error.throw('type is not valid');

  let schema: ZodSchema = schemas[opts.type];
  if (opts.params['xaddress']) schema = schemas.accountX;

  let zodCheck = schema.safeParse(opts.params);
  if (!zodCheck.success)
    return error.throw(`Params input schema could not be validated ${zodCheck.error}`);

  let params = Object.assign(
    { schema: opts.protocol },
    { type: opts.type },
    opts.opts?.version && { version: opts.version },
    opts.params
  );

  let query = new URLSearchParams([...Object.entries(params)]).toString();

  if (opts.type === 'cti' && 'txn_index' in opts.params) {
    let params = Object.assign(
      { schema: opts.protocol },
      { type: opts.type },
      opts.opts?.version && { version: opts.version },
      { id: new cti.Encode(opts.params).cti }
    );
    query = new URLSearchParams([...Object.entries(params)]).toString();
  }

  return new URL(`${opts.domain}?${query}`).toString();
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

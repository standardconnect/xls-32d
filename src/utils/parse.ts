import { checkForLatestVersion } from './latestVersion';
import { logger } from './logger';

const schemeReg = '^xrpl';
const versionReg = '^v';
const versionPrefix = '^-';
const containsParams = '[?]';

export const getVersion = async (uri: string): Promise<string | void> => {
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

export const getScheme = (uri: string) => {
  checkIsValidSchema;
  return uri.split(':')[0];
};

export const isXrplUri = (uri: string) => {
  const reg = new RegExp(schemeReg);
  return reg.test(uri);
};

export const isValidSchema = (uri: string) => {
  checkIsValidSchema;
  return true;
};

export const checkIsValidSchema = (uri: string) => {
  if (!isXrplUri) throw 'This is not a valid xrpl uri';
  if (!getType) throw 'URI Type not found';
};

export const getType = (uri: string) => {
  if (!/:/.exec(uri))
    throw 'Syntax Error: No type idenitier detected. See xls-32d for more information';

  return uri.split(':')[1].split('?')[0] || undefined;
};

export const getParams = (uri: string) => {
  checkIsValidSchema;
  const reg = new RegExp(containsParams);
  const hasParams = reg.test(uri);
  if (!hasParams) {
    logger.warn('No params found on this URI');
  }

  const params = uri.split('?')[1];
  const paramsMap = params.split('=');
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

export const isValidParams = (uri: string) => {
  checkIsValidSchema;
};

export default {
  getVersion,
  getScheme,
  isXrplUri,
  isValidSchema,
  getParams,
  getType,
  isValidParams,
};

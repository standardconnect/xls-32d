import { availableTypes } from 'types/index';
import { error } from './error';

const schemeReg = '^xrpl';

export const isXrplUri = (uri: string) => {
  const reg = new RegExp(schemeReg);
  return reg.test(uri);
};

export const isValidSchema = (_uri: string) => {
  if (!isXrplUri) error.throw('not a valid uri');
  if (!isValidType) error.throw('type not found');
  return true;
};

export const isValidType = (uri: string): boolean => {
  try {
    if (!/:/.exec(uri)) throw '';

    let type = uri.split(':')[1]?.split('?')[0];
    if (!type) throw '';

    return availableTypes.includes(type);
  } catch (_e: any) {
    return false;
  }
};

export const isValidParams = (_uri: string) => {
  isValidSchema;
};

export default {
  isXrplUri,
  isValidSchema,
  isValidType,
  isValidParams,
};

import { logger } from './logger';

export const errorPrefix = {
  uri: 'URI ERROR : ',
  type: 'TYPE ERROR : ',
  syntax: 'SYNTAX ERROR : ',
  ref: 'REF ERROR : ',
  no: 'NOT FOUND ERROR : ',
  gen: 'GENERAL ERROR : ',
};

const errorReference =
  '; For more information, see XLS-32d Standards Proposal at https://github.com/XRPLF/XRPL-Standards/discussions/81';

export const errorMessage = {
  uri: (msg: string) => errorPrefix.uri + msg,
  type: (msg: string) => errorPrefix.type + msg,
  syntax: (msg: string) => errorPrefix.syntax + msg,
  ref: (msg: string) => errorPrefix.ref + msg,
  no: (msg: string) => errorPrefix.no + msg,
  gen: (msg: string) => errorPrefix.gen + msg,
};

export const errorType = (arg: string) => {
  if (arg.includes('syntax'))
    return SyntaxError(errorMessage.syntax(arg), { cause: 'This is a syntax error' });
  if (arg.includes('type'))
    return TypeError(errorMessage.type(arg), { cause: 'This is a type error' });
  if (arg.includes('uri'))
    return URIError(errorMessage.uri(arg), {
      cause: 'This error is produced when the URI could not be encode or decoded',
    });
  if (arg.includes('reference'))
    return ReferenceError(errorMessage.ref(arg), {
      cause: 'This is an error when there is a missing reference',
    });
  if (arg.includes('not found'))
    return Error(errorMessage.no(arg), {
      cause: 'This is an error produced when a reference could not be found',
    });
  return Error(errorMessage.gen(arg), { cause: 'This is a general error' });
};

export const error = {
  throw(msg: string) {
    logger.error(msg + errorReference);
    throw errorType(msg + errorReference);
  },
  return(msg: string) {
    logger.error(msg + errorReference);
    return errorType(msg + errorReference);
  },
  warn(msg: string) {
    logger.warn(msg);
    return;
  },
};

import { ICtiEncodeParams } from './cti';
export const availableTypes = [
  'account',
  'cti',
  'ledger',
  'tx',
  'payload',
  'offline',
  'token',
  'nftoken',
];

export type Types =
  | 'account'
  | 'cti'
  | 'ledger'
  | 'tx'
  | 'payload'
  | 'offline'
  | 'token'
  | 'nftoken';

export interface IAccountEncodeParams {
  address: string;
  tag?: string;
}

export interface XAccountEncodeParams {
  xaddress: string;
}

export interface IAccountEncodeOpts {
  type: 'account';
  params: IAccountEncodeParams | XAccountEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface ILedgerEncodeParams {
  seq: string;
}

export interface ILedgerEncodeOpts {
  type: 'ledger';
  params: ILedgerEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface ITxEncodeParams {
  hash: string;
}

export interface ITxEncodeOpts {
  type: 'tx';
  params: ITxEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface IPayloadEncodeParams {
  blob: string;
}

export interface IPayloadEncodeOpts {
  type: 'payload';
  params: IPayloadEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface IOfflineEncodeParams {
  blob: string;
}

export interface IOfflineEncodeOpts {
  type: 'offline';
  params: IOfflineEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface ITokenEncodeParams {
  address: string;
  code: string;
}

export interface ITokenEncodeOpts {
  type: 'token';
  params: ITokenEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface INFTokenEncodeParams {
  id: string;
}

export interface INFTokenEncodeOpts {
  type: 'nftoken';
  params: INFTokenEncodeParams;
  opts?: ExtendedEncodeOpts;
}

export interface ICtiEncodeOpts {
  type: 'cti';
  params: ICtiEncodeParams;
  opts?: ExtendedEncodeOpts;
}

/* export type EncodeOpts =
  | IPayloadEncodeOpts
  | ITxEncodeOpts
  | IAccountEncodeOpts
  | ITokenEncodeOpts
  | ILedgerEncodeOpts
  | INFTokenEncodeOpts
  | IOfflineEncodeOpts; */

export interface ExtendedEncodeOpts {
  version?: boolean;
  serialize?: boolean;
}

export interface EncodeOpts {
  type: string;
  opts?: ExtendedEncodeOpts;
  params:
    | IPayloadEncodeParams
    | ICtiEncodeParams
    | ITxEncodeParams
    | IAccountEncodeParams
    | XAccountEncodeParams
    | ITokenEncodeParams
    | ILedgerEncodeParams
    | INFTokenEncodeParams
    | IOfflineEncodeParams;
}

export type EncodeParamsTypes = [
  IPayloadEncodeParams,
  ICtiEncodeParams,
  ITxEncodeParams,
  IAccountEncodeParams,
  XAccountEncodeParams,
  ITokenEncodeParams,
  ILedgerEncodeParams,
  INFTokenEncodeParams,
  IOfflineEncodeParams
];

export interface AddedEncodeOpts {
  protocol: string;
  version: string;
}

export type ExtendedEcodingOpts = EncodeOpts & AddedEncodeOpts;

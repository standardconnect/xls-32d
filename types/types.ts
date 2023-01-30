export const availableTypes = ['account', 'ledger', 'tx', 'payload', 'offline', 'token', 'nftoken'];

export type Types = 'account' | 'ledger' | 'tx' | 'payload' | 'offline' | 'token' | 'nftoken';

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
}

export interface ILedgerEncodeParams {
  seq: string;
}

export interface ILedgerEncodeOpts {
  type: 'ledger';
  params: ILedgerEncodeParams;
}

export interface ITxEncodeParams {
  hash: string;
}

export interface ITxEncodeOpts {
  type: 'tx';
  params: ITxEncodeParams;
}

export interface IPayloadEncodeParams {
  blob: string;
}

export interface IPayloadEncodeOpts {
  type: 'payload';
  params: IPayloadEncodeParams;
}

export interface IOfflineEncodeParams {
  blob: string;
}

export interface IOfflineEncodeOpts {
  type: 'offline';
  params: IOfflineEncodeParams;
}

export interface ITokenEncodeParams {
  address: string;
  code: string;
}

export interface ITokenEncodeOpts {
  type: 'token';
  params: ITokenEncodeParams;
}

export interface INFTokenEncodeParams {
  id: string;
}

export interface INFTokenEncodeOpts {
  type: 'nftoken';
  params: INFTokenEncodeParams;
}

/* export type EncodeOpts =
  | IPayloadEncodeOpts
  | ITxEncodeOpts
  | IAccountEncodeOpts
  | ITokenEncodeOpts
  | ILedgerEncodeOpts
  | INFTokenEncodeOpts
  | IOfflineEncodeOpts; */

export interface EncodeOpts {
  type: string;
  params:
    | IPayloadEncodeParams
    | ITxEncodeParams
    | IAccountEncodeParams
    | ITokenEncodeParams
    | ILedgerEncodeParams
    | INFTokenEncodeParams
    | IOfflineEncodeParams;
}

export interface AddedEncodeOpts {
  protocol: string;
  version: string;
}

export type ExtendedEcodingOpts = EncodeOpts & AddedEncodeOpts;

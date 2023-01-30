import { string, object, ZodSchema } from 'zod';

export const account: ZodSchema = object({
  address: string(),
  tag: string().optional(),
});

export const accountX: ZodSchema = object({
  xaddress: string(),
});

export const ledger: ZodSchema = object({
  seq: string(),
});

export const tx: ZodSchema = object({
  hash: string(),
});

export const payload: ZodSchema = object({
  blob: string(),
});

export const offline: ZodSchema = object({
  blob: string(),
});

export const token: ZodSchema = object({
  address: string(),
  code: string(),
});

export const nftoken: ZodSchema = object({
  id: string(),
});

export default {
  account,
  accountX,
  nftoken,
  offline,
  payload,
  ledger,
  token,
  tx,
};

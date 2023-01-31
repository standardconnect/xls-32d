import { Array16, Array32, Array8 } from './buffers';
export const definitions = {
  simple: {
    ledger_index: {
      nth: 4,
      bits: 32,
      array: new Array32(),
      getValue: 0xffffffffn,
      type: 'number',
    },
    txn_index: {
      nth: 3,
      bits: 16,
      array: new Array16(),
      getValue: 0xffffn,
      type: 'number',
    },
    ledger_hash: {
      nth: 1,
      checksum: true,
      bits: 8,
      array: new Array8(),
      getValue: 0xffn,
      type: 'string',
    },
    txn_hash: {
      nth: 2,
      checksum: true,
      bits: 8,
      array: new Array8(),
      getValue: 0xffn,
      type: 'string',
    },
  },
  advanced: {
    networkId: {
      nth: 3,
      bits: 16,
      array: new Array16(),
    },
    ledger_index: {
      nth: 4,
      bits: 32,
      array: new Array32(),
    },
    txn_index: {
      nth: 3,
      bits: 16,
      array: new Array16(),
    },
    ledger_hash: {
      nth: 1,
      checksum: true,
      bits: 16,
      array: new Array16(),
    },
    txn_hash: {
      nth: 2,
      checksum: true,
      bits: 16,
      array: new Array16(),
    },
  },
  mod: {
    networkId: {
      nth: 3,
      bits: 16,
      array: new Array16(),
      getValue: 0xffffn,
      type: 'number',
    },
    ledger_index: {
      nth: 1,
      bits: 32,
      array: new Array32(),
      getValue: 0xffffffffn,
      type: 'number',
    },
    txn_index: {
      nth: 2,
      bits: 32,
      array: new Array32(),
      getValue: 0xffffffffn,
      type: 'number',
    },
  },
};

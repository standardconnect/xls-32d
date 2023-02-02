export const definitions = {
  simple: {
    ledger_index: {
      nth: 4,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
    txn_index: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    ledger_hash: {
      nth: 1,
      checksum: true,
      bits: 4,
      getValue: 0xffn,
      type: 'string',
    },
    txn_hash: {
      nth: 2,
      checksum: true,
      bits: 4,
      getValue: 0xffn,
      type: 'string',
    },
  },
  advanced: {
    networkId: {
      nth: 4,
      bits: 16,
    },
    ledger_index: {
      nth: 5,
      bits: 32,
      varies: true,
    },
    txn_index: {
      nth: 6,
      bits: 16,
      varies: true,
    },
    control: {
      nth: 1,
      bits: 1,
    },
    ledger_hash: {
      nth: 2,
      checksum: true,
      bits: 4,
    },
    txn_hash: {
      nth: 3,
      checksum: true,
      bits: 4,
    },
  },
  mod: {
    networkId: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    ledger_index: {
      nth: 1,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
    txn_index: {
      nth: 2,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
  },
};

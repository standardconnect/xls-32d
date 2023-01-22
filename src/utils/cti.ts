export interface EncodeOpts {
  txn_hash: string /* hex string */;
  txn_index: string;
  ledger_hash: string /* hex string */;
  ledger_index: string;
}

export const encode = (opts: EncodeOpts) => {
  let ledger_check = BigInt(parseInt(opts.ledger_hash.slice(0, 1), 16));
  let txn_check = BigInt(parseInt(opts.txn_hash.slice(0, 1), 16));
  let cti = (ledger_check << 4n) + txn_check;
  cti <<= 16n;
  cti += BigInt(opts.txn_index);
  cti <<= 32n;
  cti += BigInt(opts.ledger_index);
  return cti;
};

export const isSimple = (cti: bigint): boolean => {
  return Number(cti >> 56n) === 0;
};

export const transactionIndex = (cti: bigint): bigint => {
  return (cti >> 32n) & 0xffffn;
};

export const ledgerIndex = (cti: bigint): bigint => {
  return cti & 0xffffffffn;
};
export const ledgerCheck = (cti: bigint): bigint => {
  return (cti >> 52n) & 0xfn;
};

export const transactionCheck = (cti: bigint): bigint => {
  return (cti >> 48n) & 0xfn;
};

export default {
  encode,
  isSimple,
  transactionIndex,
  ledgerIndex,
  ledgerCheck,
  transactionCheck,
};

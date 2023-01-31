export interface CtiSimpleEncodeOpts {
  txn_hash: string /* hex string */;
  txn_index: string;
  ledger_hash: string /* hex string */;
  ledger_index: string;
}

export interface CtiAdvancedEncodeOpts {
  type?: string;
  networkId: number;
  txn_hash: string;
  txn_index: string;
  ledger_hash: string;
  ledger_index: string;
}

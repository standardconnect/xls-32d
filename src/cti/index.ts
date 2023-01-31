import { CtiAdvancedEncodeOpts /* CtiSimpleEncodeOpts */ } from 'types/cti';
import { BytesList } from './buffers';
import { definitions } from './def';

/* const advanced = {
  encode: (opts: CtiAdvancedEncodeOpts) => {
    let ledger_check = BigInt(parseInt(opts.ledger_hash.slice(0, 1), 16));
    let txn_check = BigInt(parseInt(opts.txn_hash.slice(0, 1), 16));
    let txnBin = Number(opts.txn_index).toString(2);
    let lgrBin = Number(opts.ledger_index).toString(2);

    let padding = BigInt('00'); // Will be dropped from BigInt, placeholder
    let T = BigInt(txnBin.length < 16 ? 0 : 1);
    let L = BigInt(lgrBin.length < 32 ? 0 : 1);

    let cti = (padding << 1n) + T;
    cti <<= 1n;
    cti += L;
    cti <<= 4n;
    cti += BigInt(opts.networkId);
    cti <<= 4n;
    cti += ledger_check;
    cti <<= 4n;
    cti += txn_check;
    cti <<= T === 1n ? 32n : 16n;
    cti += BigInt(opts.txn_index);
    cti <<= L === 1n ? 64n : 32n;
    cti += BigInt(opts.ledger_index);
    return cti;
  },
}; */

export default class Handler {
  sink: BytesList = new BytesList();
  type: string;

  constructor(opts: CtiAdvancedEncodeOpts) {
    this.type = opts.type || 'mod';
    this.bytelist(opts);
  }

  private bytelist = (opts: CtiAdvancedEncodeOpts) => {
    let def = definitions[this.type];
    Object.keys(def)
      .sort((a, b) => def[a].nth - def[b].nth)
      .map((key) => {
        let value = Number(opts[key]);
        if (this.type === 'simple' && def[key].checksum)
          value = parseInt(opts[key].slice(0, 1), 16);
        def[key].array.write(value);
        def[key].array.make();
        this.write(def[key].array.bytesArray[0]);
      });
  };

  private write = (bytes: Buffer): void => {
    this.sink.put(new Uint8Array(bytes).buffer);
  };

  public convert = this.sink;

  public isSimple = (cti: bigint): boolean => {
    return Number(cti >> 56n) === 0;
  };

  public get = (key: string): number => {
    let offset = 0;
    let def = definitions[this.type];
    let sort = Object.keys(def).sort((a, b) => def[b].nth - def[a].nth);
    for (const i in sort) {
      if (sort[i] === key) break;
      offset += def[sort[i]].bits;
    }
    let big = this.sink.toBigInt();
    return Number((big >> BigInt(offset)) & def[key].getValue);
  };
}

/* export default {
  simple,
  advanced,
  isSimple,
  Modified,
}; */

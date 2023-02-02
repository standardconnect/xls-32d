export class BytesList {
  public bytesArray: Array<Buffer> = [];
  private bit = 8;

  public getLength(): number {
    return Buffer.concat(this.bytesArray).byteLength;
  }

  public put(bytesArg: ArrayBufferLike | Buffer): BytesList {
    const bytes = Buffer.from(bytesArg); // Temporary, to catch instances of Uint8Array being passed in
    this.bytesArray.push(bytes);
    return this;
  }

  public toBytesSink(list: BytesList): void {
    list.put(this.toBytes());
  }

  public toBytes(): Buffer {
    return Buffer.concat(this.bytesArray);
  }

  public toHex(): string {
    return this.toBytes().toString('hex').toUpperCase();
  }

  public toBin(): string {
    return BigInt('0x' + this.toBytes().toString('hex'))
      .toString(2)
      .padStart(this.toBytes().length * 8, '0');
  }

  public toBigInt = (): bigint => {
    let ret = 0n;
    let bits = BigInt(this.bit);
    for (const i of this.toBytes()) {
      const bi = BigInt(i);
      ret = (ret << bits) + bi;
    }
    return ret;
  };
}

export class UintArray extends BytesList {
  sink: Uint8Array | Uint16Array | Uint32Array = new Uint8Array(1);

  constructor(bits: number) {
    super();
    if (bits === 4) this.sink = new Uint8Array(1);
    if (bits === 16) this.sink = new Uint16Array(1);
    if (bits === 32) this.sink = new Uint32Array(1);
  }
  make = (n: number) => {
    this.sink[0] = n;
    this.put(new Uint8Array(this.sink.buffer).reverse());
  };
}

export default { BytesList, UintArray };

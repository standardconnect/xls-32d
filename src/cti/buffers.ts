export class BytesList {
  private bytesArray: Array<Buffer> = [];
  private bit = 8;
  //private bitArray: number[] | undefined;

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

export class Array32 extends BytesList {
  sink: Uint32Array = new Uint32Array(1);
  write = (n: number) => (this.sink[0] = n);
  make = () => this.put(new Uint8Array(this.sink.buffer).reverse());
}

export class Array16 extends BytesList {
  sink: Uint16Array = new Uint16Array(1);
  write = (n: number) => (this.sink[0] = n);
  make = () => this.put(new Uint8Array(this.sink.buffer).reverse());
}

export class Array8 extends BytesList {
  sink: Uint8Array = new Uint8Array(1);
  write = (n: number) => (this.sink[0] = n);
  make = () => this.put(this.sink.reverse());
}

export default { Array8, Array16, Array32, BytesList };

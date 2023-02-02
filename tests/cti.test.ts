import xls32d from '../dist/src/index';

const mod = {
  networkId: 1,
  ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const advanced = {
  type: 'advanced',
  networkId: 10,
  ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const simple = {
  type: 'simple',
  networkId: 1,
  ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

describe('cti', () => {
  test('simple-encode', () => {
    const { uri, cti, bigInt, hex, bin, bytes } = new xls32d.utils.cti.Encode(simple);
    expect(hex).toEqual('0xF1001903B35672');
    expect(bin).toEqual('11110001000000000001100100000011101100110101011001110010');
    expect(bigInt).toEqual(67835576823535218n);
    expect(cti).toEqual('67835576823535218');
    expect(uri).toEqual('cti:67835576823535218');
    expect(bytes).toMatchObject(Buffer.from([15, 1, 0, 25, 3, 179, 86, 114]));
  });
  test('advanced-encode', () => {
    const { uri, cti, bigInt, hex, bin, bytes } = new xls32d.utils.cti.Encode(advanced);
    expect(hex).toEqual('0xF1000A03B356720019');
    expect(bin).toEqual('111100010000000000001010000000111011001101010110011100100000000000011001');
    expect(bigInt).toEqual(4445668140582553387033n);
    expect(cti).toEqual('4445668140582553387033');
    expect(uri).toEqual('cti:4445668140582553387033');
    expect(bytes).toMatchObject(Buffer.from([0, 15, 1, 0, 10, 3, 179, 86, 114, 0, 25]));
  });
  test('mod-encode', () => {
    const { uri, cti, bigInt, hex, bin, bytes } = new xls32d.utils.cti.Encode(mod);
    expect(hex).toEqual('0x3B35672000000190001');
    expect(bin).toEqual(
      '11101100110101011001110010000000000000000000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(17475295679037553836033n);
    expect(cti).toEqual('17475295679037553836033');
    expect(uri).toEqual('cti:17475295679037553836033');
    expect(bytes).toMatchObject(Buffer.from([3, 179, 86, 114, 0, 0, 0, 25, 0, 1]));
  });
  test('mod-decode', () => {
    const { networkId, ledger_index, txn_index } = new xls32d.utils.cti.Decode(
      '17475295679037553836033'
    );
    expect(networkId).toEqual(1);
    expect(ledger_index).toEqual(62084722);
    expect(txn_index).toEqual(25);
  });
});

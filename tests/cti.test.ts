import xls32d from '../dist/src/index';

const mod = {
  networkId: 1,
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
  test('simple-encode-hex', () => {
    expect(new xls32d.utils.cti(simple).convert.toHex()).toEqual('0F01001903B35672');
  });
  test('simple-encode-binary', () => {
    expect(new xls32d.utils.cti(simple).convert.toBin()).toEqual(
      '0000111100000001000000000001100100000011101100110101011001110010'
    );
  });
  test('simple-encode-int', () => {
    expect(new xls32d.utils.cti(simple).convert.toBigInt()).toEqual(1081145492981896818n);
  });
  test('mod-encode-networkId', () => {
    expect(new xls32d.utils.cti(mod).get('networkId')).toEqual(1);
  });
  test('mod-encode-ledger_index', () => {
    expect(new xls32d.utils.cti(mod).get('ledger_index')).toEqual(62084722);
  });
  test('mod-encode-txn_id', () => {
    expect(new xls32d.utils.cti(mod).get('txn_index')).toEqual(25);
  });
});

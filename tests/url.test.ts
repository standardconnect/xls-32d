import xls32d from '../dist/src/index';

const input = {
  domain: 'https://localhost:3000',
  type: 'payload',
  params: {
    blob: '1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337',
  },
};
const input1 = {
  domain: 'https://localhost:3000',
  type: 'ledger',
  params: {
    seq: '7295400',
  },
};
const input2 = {
  domain: 'https://localhost:3000',
  type: 'cti',
  params: {
    networkId: 1,
    ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
    ledger_index: '62084722',
    txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
    txn_index: '25',
  },
};

describe('url.encode', () => {
  test('account', () => {
    expect(xls32d.url.encode(input)).toBe(
      'https://localhost:3000/?schema=xrpl&type=payload&blob=1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337'
    );
  });
  test('account1', () => {
    expect(xls32d.url.encode(input1)).toBe(
      'https://localhost:3000/?schema=xrpl&type=ledger&seq=7295400'
    );
  });
  test('account2', () => {
    expect(xls32d.url.encode(input2)).toBe(
      'https://localhost:3000/?schema=xrpl&type=cti&id=17475295679037553836033'
    );
  });

  test('account3', async () => {
    expect(
      await xls32d.url.decode(
        'https://localhost:3000/?schema=xrpl&type=cti&id=17475295679037553836033'
      )
    ).toMatchObject({ id: '17475295679037553836033', schema: 'xrpl', type: 'cti' });
  });
});

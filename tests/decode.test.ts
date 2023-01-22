import * as constants from './constants';
import xls32d from '../dist/src/index';

describe('decode', () => {
  test('account', async () => {
    expect(await xls32d.decode(constants.accountSample)).toMatchObject(constants.decodedAccount);
  });

  test('payload', async () => {
    expect(await xls32d.decode(constants.payloadSample)).toMatchObject(constants.decodedPayload);
  });

  test('ledger', async () => {
    expect(await xls32d.decode(constants.lgrSample)).toMatchObject(constants.decodedLedger);
  });

  test('offline', async () => {
    expect(await xls32d.decode(constants.offlineSample)).toMatchObject(constants.decodedOffline);
  });

  test('transaction', async () => {
    expect(await xls32d.decode(constants.txSample)).toMatchObject(constants.decodedTx);
  });

  test('version', async () => {
    expect(await xls32d.decode(constants.versionSample)).toMatchObject(constants.decodedVersion);
  });
});

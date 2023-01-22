import * as constants from './constants';
import xls32d from '../dist/src/index';

describe('encode', () => {
  test('account', async () => {
    expect(await xls32d.encode(constants.decodedAccount)).toBe(constants.accountSampleBeta);
  });

  test('payload', async () => {
    expect(await xls32d.encode(constants.decodedPayload)).toBe(constants.payloadSampleBeta);
  });

  test('ledger', async () => {
    expect(await xls32d.encode(constants.decodedLedger)).toBe(constants.lgrSampleBeta);
  });

  test('offline', async () => {
    expect(await xls32d.encode(constants.decodedOffline)).toBe(constants.offlineSampleBeta);
  });

  test('transaction', async () => {
    expect(await xls32d.encode(constants.decodedTx)).toBe(constants.txSampleBeta);
  });

  test('version', async () => {
    expect(await xls32d.encode(constants.decodedVersion)).toBe(constants.versionSampleBeta);
  });
});

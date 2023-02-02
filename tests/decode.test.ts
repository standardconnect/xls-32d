import * as constants from './constants';
import xls32d from '../dist/src/index';

describe('decode', () => {
  test('account', async () => {
    expect(await xls32d.decode(constants.accountSampleBeta)).toMatchObject(
      constants.decodedAccount
    );
  });

  test('payload', async () => {
    expect(await xls32d.decode(constants.payloadSampleBeta)).toMatchObject(
      constants.decodedPayload
    );
  });

  test('ledger', async () => {
    expect(await xls32d.decode(constants.lgrSampleBeta)).toMatchObject(constants.decodedLedger);
  });

  test('offline', async () => {
    expect(await xls32d.decode(constants.offlineSampleBeta)).toMatchObject(
      constants.decodedOffline
    );
  });

  test('transaction', async () => {
    expect(await xls32d.decode(constants.txSampleBeta)).toMatchObject(constants.decodedTx);
  });

  test('version', async () => {
    expect(await xls32d.decode(constants.versionSampleBeta)).toMatchObject(
      constants.decodedVersion
    );
  });

  test('cti', async () => {
    expect(await xls32d.decode(constants.ctiSampleBeta)).toMatchObject(constants.decodedCti);
  });
});

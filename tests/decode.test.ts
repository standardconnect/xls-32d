import * as constants from './constants';
import xls32d from '../dist/src/index';

describe('uri.decode', () => {
  test('account', async () => {
    expect(await xls32d.uri.decode(constants.accountSampleBeta)).toMatchObject(
      constants.decodedAccount
    );
  });

  test('payload', async () => {
    expect(await xls32d.uri.decode(constants.payloadSampleBeta)).toMatchObject(
      constants.decodedPayload
    );
  });

  test('ledger', async () => {
    expect(await xls32d.uri.decode(constants.lgrSampleBeta)).toMatchObject(constants.decodedLedger);
  });

  test('offline', async () => {
    expect(await xls32d.uri.decode(constants.offlineSampleBeta)).toMatchObject(
      constants.decodedOffline
    );
  });

  test('transaction', async () => {
    expect(await xls32d.uri.decode(constants.txSampleBeta)).toMatchObject(constants.decodedTx);
  });

  test('version', async () => {
    expect(await xls32d.uri.decode(constants.versionSampleBeta)).toMatchObject(
      constants.decodedVersion
    );
  });

  test('cti', async () => {
    expect(await xls32d.uri.decode(constants.ctiSampleBeta)).toMatchObject(constants.decodedCti);
  });
});
